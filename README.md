# 🚀 SmartContent - AI Powered Content Manager

A modern full-stack application for intelligent content management with AI-powered features.

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.2-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Full-stack content management system with Spring Boot backend and React frontend, featuring AI-powered summarization, SEO optimization, and intelligent tagging.**

---

## 📖 Table of Contents

- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the App](#-running-the-app)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎯 Core Features
- **User Authentication** - JWT-based login/register with role-based access (USER, AUTHOR, ADMIN)
- **Article Management** - Create, edit, delete articles with rich text editor
- **AI-Powered Tools** - Auto-summarization, tag generation, and SEO scoring
- **Dashboard Analytics** - Track content performance with stats and metrics
- **Search & Filter** - Search by title, filter by tags and status
- **Dark/Light Mode** - Beautiful Google-inspired UI with theme switching
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile

### 🤖 AI Features
- ✅ Automatic content summarization
- ✅ Intelligent tag generation
- ✅ SEO score calculator with actionable suggestions
- ✅ Readability analysis
- ✅ Keyword density optimization

### 🔐 Security
- ✅ JWT token authentication
- ✅ BCrypt password encryption
- ✅ Role-based authorization
- ✅ Secure API endpoints
- ✅ CORS configuration

---

## 📸 Screenshots

> **Note:** Add your screenshots to `docs/screenshots/` folder

| Landing Page | Dashboard |
|-------------|-----------|
| ![Landing](docs/screenshots/landing.png) | ![Dashboard](docs/screenshots/dashboard.png) |

| Article Editor | Dark Mode |
|---------------|-----------|
| ![Editor](docs/screenshots/editor.png) | ![Dark Mode](docs/screenshots/dark-mode.png) |

---

## 🛠️ Tech Stack

### Backend
- **Java 17** - Programming language
- **Spring Boot 3.2.2** - Application framework
- **Spring Security** - Authentication & authorization
- **Spring Data JPA** - Database operations
- **MySQL 8.0** - Database
- **JWT** - Token-based authentication
- **Lombok** - Reduce boilerplate code
- **MapStruct** - Object mapping
- **Swagger/OpenAPI** - API documentation
- **Maven** - Build tool

### Frontend
- **React 18.2** - UI library
- **Vite 5.0** - Build tool & dev server
- **TailwindCSS 3.4** - Styling framework
- **Framer Motion** - Animations
- **React Router 6** - Navigation
- **Zustand** - State management
- **Axios** - HTTP client
- **Lucide React** - Icons

---

## 🚀 Quick Start

### Prerequisites

Make sure you have these installed:

```bash
Java 17+          # java -version
Maven 3.6+        # mvn -version
MySQL 8.0+        # mysql --version
Node.js 18+       # node -v
npm 9+            # npm -v
```

### Installation in 5 Minutes

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/smartcontent.git
cd smartcontent

# 2. Setup Backend
cd smartcontent-backend
mysql -u root -p -e "CREATE DATABASE smart_content_db;"
mysql -u root -p smart_content_db < schema.sql
mvn clean install
mvn spring-boot:run

# 3. Setup Frontend (in new terminal)
cd ../smartcontent-frontend
npm install
cp .env.example .env
npm run dev

# 4. Open browser
http://localhost:3000
```

**That's it! 🎉**

---

## 📦 Installation

### Step 1: Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/smartcontent.git
cd smartcontent
```

### Step 2: Backend Setup

#### 2.1 Create MySQL Database

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE smart_content_db;
exit;
```

#### 2.2 Import Database Schema

```bash
cd smartcontent-backend
mysql -u root -p smart_content_db < schema.sql
```

#### 2.3 Configure Database Connection

Edit `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/smart_content_db
    username: root
    password: YOUR_MYSQL_PASSWORD  # ← Change this!
```

#### 2.4 Add CORS Configuration

Create file: `src/main/java/com/smartcontent/config/CorsConfig.java`

```java
package com.smartcontent.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import java.util.Arrays;

@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setExposedHeaders(Arrays.asList("Authorization"));
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
```

#### 2.5 Build Backend

```bash
mvn clean install
```

### Step 3: Frontend Setup

#### 3.1 Install Dependencies

```bash
cd smartcontent-frontend
npm install
```

#### 3.2 Configure Environment

```bash
# Create .env file
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## ⚙️ Configuration

### Backend Configuration (`application.yml`)

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/smart_content_db
    username: root
    password: your_password
    driver-class-name: com.mysql.cj.jdbc.Driver

  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true

app:
  security:
    jwt:
      secret-key: YOUR_SECRET_KEY_HERE  # Change this!
      expiration-ms: 86400000  # 24 hours
```

### Frontend Configuration (`.env`)

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## 🏃 Running the App

### Development Mode

#### Terminal 1 - Start Backend

```bash
cd smartcontent-backend
mvn spring-boot:run
```

✅ Backend running at: **http://localhost:8080**  
📚 API Docs at: **http://localhost:8080/swagger-ui.html**

#### Terminal 2 - Start Frontend

```bash
cd smartcontent-frontend
npm run dev
```

✅ Frontend running at: **http://localhost:3000**

### Production Mode

#### Backend

```bash
cd smartcontent-backend
mvn clean package
java -jar target/ai-content-manager-1.0.0.jar
```

#### Frontend

```bash
cd smartcontent-frontend
npm run build
npm run preview
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |

**Register Example:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123",
    "fullName": "John Doe",
    "roles": ["AUTHOR"]
  }'
```

### Articles

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/articles` | Get all articles (paginated) | No |
| GET | `/api/articles/{id}` | Get article by ID | No |
| POST | `/api/articles` | Create new article | Required |
| PUT | `/api/articles/{id}` | Update article | Required |
| DELETE | `/api/articles/{id}` | Delete article | Required |
| GET | `/api/articles/search?title={title}` | Search articles | No |
| GET | `/api/articles/filter/tags?tags={tags}` | Filter by tags | No |
| GET | `/api/articles/my-articles` | Get user's articles | Required |

**Create Article Example:**
```bash
curl -X POST http://localhost:8080/api/articles \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Article",
    "content": "Article content here...",
    "status": "PUBLISHED",
    "tags": ["Technology", "AI"]
  }'
```

### AI Features

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/ai/summarize` | Generate summary | Required |
| POST | `/api/ai/generate-tags` | Generate tags | Required |
| POST | `/api/ai/seo-score` | Calculate SEO score | Required |

**Generate Summary Example:**
```bash
curl -X POST http://localhost:8080/api/ai/summarize \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"content": "Your article content..."}'
```

### Swagger Documentation

Full API documentation available at: **http://localhost:8080/swagger-ui.html**

---

## 📁 Project Structure

```
smartcontent/
│
├── smartcontent-backend/           # Spring Boot Backend
│   ├── src/main/java/com/smartcontent/
│   │   ├── config/                 # Configuration (Security, CORS, Swagger)
│   │   ├── controller/             # REST Controllers
│   │   ├── service/                # Business Logic
│   │   ├── repository/             # Database Repositories
│   │   ├── entity/                 # JPA Entities
│   │   ├── dto/                    # Data Transfer Objects
│   │   ├── security/               # JWT & Security
│   │   ├── exception/              # Exception Handling
│   │   └── util/                   # Utilities
│   ├── src/main/resources/
│   │   └── application.yml         # Configuration
│   ├── pom.xml                     # Maven Dependencies
│   └── schema.sql                  # Database Schema
│
└── smartcontent-frontend/          # React Frontend
    ├── src/
    │   ├── components/
    │   │   ├── common/             # Reusable Components
    │   │   ├── landing/            # Landing Page
    │   │   └── dashboard/          # Dashboard Components
    │   ├── pages/                  # Page Components
    │   ├── layouts/                # Layout Wrappers
    │   ├── store/                  # State Management
    │   ├── services/               # API Services
    │   ├── hooks/                  # Custom Hooks
    │   └── utils/                  # Utilities
    ├── package.json                # Dependencies
    ├── tailwind.config.js          # Tailwind Config
    ├── vite.config.js              # Vite Config
    └── .env                        # Environment Variables
```

---

## 🚢 Deployment

### Backend Deployment

#### Option 1: Docker

```bash
# Build Docker image
cd smartcontent-backend
docker build -t smartcontent-backend .
docker run -p 8080:8080 smartcontent-backend
```

**Dockerfile:**
```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

#### Option 2: Heroku

```bash
cd smartcontent-backend
heroku create smartcontent-api
git push heroku main
```

### Frontend Deployment

#### Option 1: Vercel (Recommended)

```bash
cd smartcontent-frontend
npm i -g vercel
vercel
```

#### Option 2: Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

#### Option 3: Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. CORS Error

**Problem:** `Access to fetch... has been blocked by CORS policy`

**Solution:** Make sure you added `CorsConfig.java` to backend and restarted the server.

#### 2. Database Connection Failed

**Problem:** `Connection refused` or `Unknown database`

**Solution:**
```bash
# Check MySQL is running
sudo systemctl status mysql  # Linux
net start MySQL80           # Windows

# Create database if missing
mysql -u root -p -e "CREATE DATABASE smart_content_db;"
```

#### 3. Port Already in Use

**Problem:** `Port 8080 is already in use`

**Solution:**
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8080 | xargs kill -9
```

#### 4. Frontend Not Connecting to Backend

**Problem:** Network errors in browser console

**Solution:**
```bash
# Check .env file exists and is correct
cat smartcontent-frontend/.env

# Should show:
VITE_API_BASE_URL=http://localhost:8080/api

# Restart frontend
npm run dev
```

#### 5. JWT Token Issues

**Problem:** `401 Unauthorized` errors

**Solution:**
- Token expires after 24 hours - login again
- Check token is being sent in Authorization header
- Make sure you're logged in

### Testing Backend

```bash
# Test backend is running
curl http://localhost:8080/api/auth/login

# Expected: 400 or 401 (NOT 404)
```

### Testing Frontend

```bash
# Test frontend is running
curl http://localhost:3000

# Should return HTML
```

---

## 🧪 Testing

### Run Backend Tests

```bash
cd smartcontent-backend
mvn test
```

### Run Frontend Tests

```bash
cd smartcontent-frontend
npm test
```

---

## 🎨 Customization

### Change Theme Colors

Edit `smartcontent-frontend/tailwind.config.js`:

```js
colors: {
  google: {
    blue: '#4285F4',   // Change to your color
    red: '#EA4335',
    yellow: '#FBBC05',
    green: '#34A853',
  }
}
```

### Disable Dark Mode

Edit `smartcontent-frontend/index.html`:

```html
<!-- Change from: -->
<html lang="en" class="dark">

<!-- To: -->
<html lang="en">
```

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Code Style

- **Backend:** Follow Java conventions
- **Frontend:** Use ESLint
- Write meaningful commit messages
- Add tests for new features

---

## 📝 License

This project is licensed under the MIT License.

```
MIT License

Copyright (c) 2024 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- Spring Boot team for the amazing framework
- React community for excellent libraries
- Google for design inspiration
- All contributors

---

## 🗺️ Roadmap

- [ ] Integrate real AI API (OpenAI)
- [ ] Add image upload
- [ ] Email notifications
- [ ] Social sharing
- [ ] Mobile app
- [ ] Real-time collaboration
- [ ] Advanced analytics
- [ ] Multi-language support

---

## 📞 Support

Found a bug or have questions?

- **Issues:** [GitHub Issues](https://github.com/YOUR_USERNAME/smartcontent/issues)
- **Email:** your.email@example.com
- **Discussions:** [GitHub Discussions](https://github.com/YOUR_USERNAME/smartcontent/discussions)

---

## ⭐ Star This Project

If you found this helpful, please give it a ⭐ on GitHub!

---

**Made with ❤️ using Spring Boot and React**
   
**Happy Coding! 🚀**
