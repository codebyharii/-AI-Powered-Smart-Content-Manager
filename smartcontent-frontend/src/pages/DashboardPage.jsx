import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, TrendingUp, Users, Eye } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import { LoadingSkeleton } from '../components/common/Loading';
import { articleService } from '../services/articleService';

const DashboardPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats] = useState({
    totalArticles: 24,
    published: 18,
    drafts: 6,
    views: 1240,
  });

  useEffect(() => {
    fetchRecentArticles();
  }, []);

  const fetchRecentArticles = async () => {
    try {
      const response = await articleService.getMyArticles({ page: 0, size: 5 });
      setArticles(response.data.content);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsData = [
    { icon: FileText, label: 'Total Articles', value: stats.totalArticles, change: 12, index: 0 },
    { icon: TrendingUp, label: 'Published', value: stats.published, change: 8, index: 1 },
    { icon: Users, label: 'Drafts', value: stats.drafts, change: -5, index: 2 },
    { icon: Eye, label: 'Total Views', value: stats.views, change: 23, index: 3 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening with your content.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Recent Articles */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Articles</h2>
          <Link to="/articles">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </div>

        {loading ? (
          <LoadingSkeleton count={3} />
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No articles yet. Start creating your first article!
            </p>
            <Link to="/articles/create">
              <Button>Create Article</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-light-accent dark:hover:border-dark-accent transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-medium mb-1">{article.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {article.summary || 'No summary'}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      article.status === 'PUBLISHED'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
                    }`}>
                      {article.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Link to={`/articles/edit/${article.id}`}>
                  <Button variant="ghost" size="sm">Edit</Button>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default DashboardPage;
