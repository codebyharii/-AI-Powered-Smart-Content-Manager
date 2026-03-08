import { motion } from 'framer-motion';
import { User, Mail, Shield } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useAuthStore } from '../store/authStore';

const ProfilePage = () => {
  const { user } = useAuthStore();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account information
        </p>
      </motion.div>

      <Card className="p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-light-accent to-blue-600 dark:from-dark-accent dark:to-blue-500 flex items-center justify-center text-white text-3xl font-bold">
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user?.fullName || user?.username}</h2>
            <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
            <div className="flex gap-2 mt-2">
              {user?.roles?.map(role => (
                <span key={role} className="text-xs px-2 py-1 rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">
                  {role.replace('ROLE_', '')}
                </span>
              ))}
            </div>
          </div>
        </div>

        <form className="space-y-6">
          <Input label="Full Name" icon={User} defaultValue={user?.fullName} />
          <Input label="Email" type="email" icon={Mail} defaultValue={user?.email} />
          <Input label="Username" icon={User} defaultValue={user?.username} disabled />
          
          <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            <div className="space-y-4">
              <Input label="Current Password" type="password" icon={Shield} />
              <Input label="New Password" type="password" icon={Shield} />
              <Input label="Confirm New Password" type="password" icon={Shield} />
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit">Save Changes</Button>
            <Button type="button" variant="ghost">Cancel</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProfilePage;
