# SmartContent Backend - Spring Boot API

Production-ready RESTful API for AI-powered content management.

## 🚀 Quick Start

```bash
# Install dependencies and build
mvn clean install

# Run the application
mvn spring-boot:run
```

**API will be available at:** `http://localhost:8080`

## 📋 Prerequisites

- Java 17+
- Maven 3.6+
- MySQL 8.0+

## ⚙️ Configuration

### 1. Database Setup

```bash
# Create database
mysql -u root -p
CREATE DATABASE smart_content_db;
exit;

# Run schema
mysql -u root -p smart_content_db < schema.sql
```

### 2. Update application.yml

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/smart_content_db
    username: root
    password: YOUR_PASSWORD  # Update this!
```

### 3. Configure CORS

Create `src/main/java/com/smartcontent/config/CorsConfig.java`:

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

## 🏗️ Architecture

```
src/main/java/com/smartcontent/
├── config/             # Configuration classes
├── controller/         # REST endpoints
├── service/           # Business logic
│   └── impl/         # Service implementations
├── repository/        # Data access layer
├── entity/           # JPA entities
├── dto/              # Data transfer objects
├── security/         # Security components
├── exception/        # Exception handling
└── util/             # Utilities
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Articles
- `GET /api/articles` - Get all articles (paginated)
- `GET /api/articles/{id}` - Get article by ID
- `POST /api/articles` - Create article (AUTH required)
- `PUT /api/articles/{id}` - Update article (AUTH required)
- `DELETE /api/articles/{id}` - Delete article (AUTH required)
- `GET /api/articles/search?title={title}` - Search articles
- `GET /api/articles/filter/tags?tags={tags}` - Filter by tags
- `GET /api/articles/my-articles` - Get user's articles (AUTH required)

### AI Features
- `POST /api/ai/summarize` - Generate summary (AUTH required)
- `POST /api/ai/generate-tags` - Generate tags (AUTH required)
- `POST /api/ai/seo-score` - Calculate SEO score (AUTH required)

## 📚 API Documentation

Access Swagger UI at: **http://localhost:8080/swagger-ui.html**

## 🗄️ Database Schema

### Main Tables
- `users` - User accounts
- `roles` - User roles (USER, AUTHOR, ADMIN)
- `articles` - Article content
- `tags` - Article tags
- `ai_metadata` - AI-generated metadata
- `user_roles` - User-Role mapping (join table)
- `article_tags` - Article-Tag mapping (join table)

## 🔐 Security

- JWT-based authentication
- BCrypt password encryption
- Role-based access control
- Stateless session management

## 🧪 Testing

```bash
# Run all tests
mvn test

# Run with coverage
mvn test jacoco:report
```

## 📦 Build for Production

```bash
# Create JAR file
mvn clean package

# Run JAR
java -jar target/ai-content-manager-1.0.0.jar
```

## 🐳 Docker

```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

```bash
docker build -t smartcontent-backend .
docker run -p 8080:8080 smartcontent-backend
```

## 🔧 Environment Variables

```bash
# Database
DB_URL=jdbc:mysql://localhost:3306/smart_content_db
DB_USERNAME=root
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRATION=86400000

# Server
SERVER_PORT=8080
```

## 📝 License

MIT License
