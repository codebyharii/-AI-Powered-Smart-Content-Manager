import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    Product: ['Features', 'Pricing', 'Documentation', 'API'],
    Company: ['About', 'Blog', 'Careers', 'Contact'],
    Legal: ['Privacy', 'Terms', 'Security', 'Compliance'],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', color: 'hover:text-google-blue' },
    { icon: Github, href: '#', color: 'hover:text-google-blue' },
    { icon: Linkedin, href: '#', color: 'hover:text-google-blue' },
  ];

  return (
    <footer className="bg-light-surface dark:bg-dark-surface border-t border-light-border dark:border-dark-border py-12">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-google-blue rounded-lg shadow-glow-blue">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gradient">SmartContent</span>
            </Link>
            <p className="text-light-muted dark:text-dark-muted text-sm mb-4">
              AI-powered content management for modern teams.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`p-2 bg-light-card dark:bg-dark-card rounded-lg ${social.color} transition-all duration-300 hover:shadow-glow-blue`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold mb-4 text-light-text dark:text-dark-text">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-light-muted dark:text-dark-muted hover:text-google-blue dark:hover:text-google-blue transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-light-border dark:border-dark-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-light-muted dark:text-dark-muted">
            © 2024 SmartContent. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-light-muted dark:text-dark-muted hover:text-google-blue dark:hover:text-google-blue transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-light-muted dark:text-dark-muted hover:text-google-blue dark:hover:text-google-blue transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
