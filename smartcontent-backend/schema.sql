-- Smart Content Manager Database Schema
-- MySQL Database

-- Create Database
CREATE DATABASE IF NOT EXISTS smart_content_db;
USE smart_content_db;

-- Users Table
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_is_deleted (is_deleted)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Roles Table
CREATE TABLE roles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL UNIQUE,
    description VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- User Roles Join Table (Many-to-Many)
CREATE TABLE user_roles (
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_role_id (role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tags Table
CREATE TABLE tags (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Articles Table
CREATE TABLE articles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    summary VARCHAR(500),
    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    is_deleted BOOLEAN DEFAULT FALSE,
    author_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    published_at TIMESTAMP NULL,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_author_id (author_id),
    INDEX idx_status (status),
    INDEX idx_is_deleted (is_deleted),
    INDEX idx_created_at (created_at),
    INDEX idx_title (title),
    FULLTEXT INDEX idx_content (content, title)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Article Tags Join Table (Many-to-Many)
CREATE TABLE article_tags (
    article_id BIGINT NOT NULL,
    tag_id BIGINT NOT NULL,
    PRIMARY KEY (article_id, tag_id),
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
    INDEX idx_article_id (article_id),
    INDEX idx_tag_id (tag_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- AI Metadata Table (One-to-One with Articles)
CREATE TABLE ai_metadata (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    article_id BIGINT NOT NULL UNIQUE,
    auto_summary TEXT,
    generated_tags VARCHAR(500),
    seo_score INT,
    seo_suggestions TEXT,
    readability_score DOUBLE,
    word_count INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    INDEX idx_article_id (article_id),
    INDEX idx_seo_score (seo_score)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert Default Roles
INSERT INTO roles (name, description) VALUES
('ROLE_USER', 'Default user role with read access'),
('ROLE_AUTHOR', 'Author role with content creation permissions'),
('ROLE_ADMIN', 'Administrator role with full access');

-- Sample Data (Optional - for testing)

-- Insert Sample Users (password is 'password123' encrypted with BCrypt)
INSERT INTO users (username, email, password, full_name, is_active) VALUES
('admin', 'admin@smartcontent.com', '$2a$10$YourBCryptHashedPasswordHere', 'Admin User', TRUE),
('john_author', 'john@example.com', '$2a$10$YourBCryptHashedPasswordHere', 'John Doe', TRUE),
('jane_user', 'jane@example.com', '$2a$10$YourBCryptHashedPasswordHere', 'Jane Smith', TRUE);

-- Assign Roles to Users
INSERT INTO user_roles (user_id, role_id) VALUES
(1, 3), -- admin has ADMIN role
(2, 2), -- john has AUTHOR role
(2, 1), -- john also has USER role
(3, 1); -- jane has USER role

-- Insert Sample Tags
INSERT INTO tags (name, description) VALUES
('Technology', 'Technology related content'),
('AI', 'Artificial Intelligence'),
('Spring Boot', 'Spring Boot framework'),
('Java', 'Java programming language'),
('Tutorial', 'Tutorial content');

-- Insert Sample Articles
INSERT INTO articles (title, content, summary, status, author_id, published_at) VALUES
('Getting Started with Spring Boot',
 'Spring Boot is an open-source Java framework used for creating microservices. It provides a good platform for Java developers to develop a stand-alone and production-grade spring application.',
 'A comprehensive guide to Spring Boot basics',
 'PUBLISHED',
 2,
 NOW()),
('Introduction to AI',
 'Artificial Intelligence is transforming how we interact with technology. This article explores the fundamentals of AI and its applications in modern software development.',
 'Understanding the basics of Artificial Intelligence',
 'DRAFT',
 2,
 NULL);

-- Link Articles with Tags
INSERT INTO article_tags (article_id, tag_id) VALUES
(1, 3), -- Spring Boot article tagged with Spring Boot
(1, 4), -- Spring Boot article tagged with Java
(1, 5), -- Spring Boot article tagged with Tutorial
(2, 2), -- AI article tagged with AI
(2, 1); -- AI article tagged with Technology

-- Insert Sample AI Metadata
INSERT INTO ai_metadata (article_id, auto_summary, seo_score, word_count) VALUES
(1, 'Spring Boot simplifies Java development...', 85, 250),
(2, 'AI is revolutionizing technology...', 72, 180);

-- Useful Queries for Development

-- Get all published articles with author info
SELECT 
    a.id,
    a.title,
    a.summary,
    a.status,
    u.username as author,
    a.created_at,
    GROUP_CONCAT(t.name) as tags
FROM articles a
JOIN users u ON a.author_id = u.id
LEFT JOIN article_tags at ON a.id = at.article_id
LEFT JOIN tags t ON at.tag_id = t.id
WHERE a.is_deleted = FALSE
GROUP BY a.id;

-- Get articles by tag
SELECT DISTINCT a.*
FROM articles a
JOIN article_tags at ON a.id = at.article_id
JOIN tags t ON at.tag_id = t.id
WHERE t.name IN ('Spring Boot', 'Java')
  AND a.is_deleted = FALSE;

-- Get user with roles
SELECT 
    u.id,
    u.username,
    u.email,
    GROUP_CONCAT(r.name) as roles
FROM users u
LEFT JOIN user_roles ur ON u.id = ur.user_id
LEFT JOIN roles r ON ur.role_id = r.id
WHERE u.is_deleted = FALSE
GROUP BY u.id;
