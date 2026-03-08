import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusCircle, Search, Filter } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { LoadingSkeleton } from '../components/common/Loading';
import { articleService } from '../services/articleService';

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchArticles();
  }, [currentPage]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await articleService.getMyArticles({ page: currentPage, size: 10 });
      setArticles(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      try {
        const response = await articleService.search(searchTerm);
        setArticles(response.data.content);
      } catch (error) {
        console.error('Search error:', error);
      }
    } else {
      fetchArticles();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Articles</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and organize your content
          </p>
        </div>
        <Link to="/articles/create">
          <Button className="w-full md:w-auto">
            <PlusCircle className="w-5 h-5" />
            New Article
          </Button>
        </Link>
      </div>

      <Card className="p-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles..."
              className="input pl-10"
            />
          </div>
          <Button type="submit">Search</Button>
          <Button type="button" variant="ghost">
            <Filter className="w-5 h-5" />
          </Button>
        </form>
      </Card>

      {loading ? (
        <LoadingSkeleton count={5} />
      ) : (
        <div className="grid gap-6">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card hover>
                <Link to={`/articles/edit/${article.id}`} className="block">
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {article.summary || 'No summary available'}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      article.status === 'PUBLISHED'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
                    }`}>
                      {article.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </span>
                    {article.tagCount > 0 && (
                      <span className="text-sm text-gray-500">
                        {article.tagCount} tags
                      </span>
                    )}
                  </div>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="ghost"
            disabled={currentPage === 0}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous
          </Button>
          <span className="px-4 py-2">
            Page {currentPage + 1} of {totalPages}
          </span>
          <Button
            variant="ghost"
            disabled={currentPage >= totalPages - 1}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ArticlesPage;
