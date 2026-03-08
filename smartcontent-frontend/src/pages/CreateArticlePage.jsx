import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, Sparkles } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { articleService } from '../services/articleService';
import { aiService } from '../services/aiService';

const CreateArticlePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '',
    status: 'DRAFT',
    tags: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAIGenerate = async () => {
    if (!formData.content) return;
    setAiLoading(true);
    try {
      const [summaryRes, tagsRes, seoRes] = await Promise.all([
        aiService.generateSummary(formData.content),
        aiService.generateTags(formData.title, formData.content),
        aiService.calculateSeoScore(formData.title, formData.content),
      ]);
      
      setFormData(prev => ({
        ...prev,
        summary: summaryRes.data.summary,
        tags: tagsRes.data.tags.join(', '),
      }));
    } catch (error) {
      console.error('AI generation error:', error);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      await articleService.create({
        ...formData,
        tags: tagsArray,
      });
      navigate('/articles');
    } catch (error) {
      console.error('Error creating article:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2">Create New Article</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Start writing your next great piece
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter article title..."
            required
          />
        </Card>

        <Card className="p-6">
          <label className="label">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={12}
            className="input resize-none"
            placeholder="Write your article content here..."
            required
          />
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <label className="label mb-0">AI Assistance</label>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleAIGenerate}
              loading={aiLoading}
              disabled={!formData.content}
            >
              <Sparkles className="w-4 h-4" />
              Generate with AI
            </Button>
          </div>
          
          <Input
            label="Summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Brief summary of your article..."
          />

          <Input
            label="Tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Enter tags separated by commas..."
            className="mt-4"
          />
        </Card>

        <Card className="p-6">
          <label className="label">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" loading={loading} className="flex-1">
            <Save className="w-5 h-5" />
            Save Article
          </Button>
          <Button type="button" variant="ghost" onClick={() => navigate('/articles')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateArticlePage;
