import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, Trash2 } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Loading from '../components/common/Loading';
import { articleService } from '../services/articleService';

const EditArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '',
    status: 'DRAFT',
    tags: '',
  });

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const response = await articleService.getById(id);
      const article = response.data;
      setFormData({
        title: article.title || '',
        content: article.content || '',
        summary: article.summary || '',
        status: article.status || 'DRAFT',
        tags: article.tags?.map(t => t.name).join(', ') || '',
      });
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      await articleService.update(id, { ...formData, tags: tagsArray });
      navigate('/articles');
    } catch (error) {
      console.error('Error updating article:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await articleService.delete(id);
        navigate('/articles');
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };

  if (loading) return <Loading fullScreen text="Loading article..." />;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2">Edit Article</h1>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <Input label="Title" name="title" value={formData.title} onChange={handleChange} required />
        </Card>

        <Card className="p-6">
          <label className="label">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={12}
            className="input resize-none"
            required
          />
        </Card>

        <Card className="p-6">
          <Input label="Summary" name="summary" value={formData.summary} onChange={handleChange} />
          <Input label="Tags" name="tags" value={formData.tags} onChange={handleChange} className="mt-4" />
        </Card>

        <Card className="p-6">
          <label className="label">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className="input">
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" loading={saving} className="flex-1">
            <Save className="w-5 h-5" />
            Save Changes
          </Button>
          <Button type="button" variant="danger" onClick={handleDelete}>
            <Trash2 className="w-5 h-5" />
          </Button>
          <Button type="button" variant="ghost" onClick={() => navigate('/articles')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditArticlePage;
