# AI Powered Smart Content Manager

A production-ready Spring Boot backend application for managing articles with AI-powered features including auto-summarization, tag generation, and SEO scoring.

## 🚀 Features

### Core Features
- ✅ User Authentication & Authorization (JWT)
- ✅ Role-Based Access Control (USER, AUTHOR, ADMIN)
- ✅ Complete CRUD operations for Articles
- ✅ Pagination, Sorting, and Filtering
- ✅ Search by Title
- ✅ Filter by Tags and Status
- ✅ Soft Delete Implementation

### AI Features (Mock Implementation)
- 🤖 Auto Summarization
- 🏷️ Automatic Tag Generation
- 📊 SEO Score Calculator with Suggestions
- 📈 Readability Analysis

### Technical Features
- 🔐 JWT Authentication with Spring Security
- 🗄️ MySQL Database with JPA/Hibernate
- 🎯 Clean Layered Architecture
- ✨ MapStruct for DTO Mapping
- 📝 Global Exception Handling
- ✅ Bean Validation
- 📚 Swagger/OpenAPI Documentation
- 🔄 RESTful API Design

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+
- IDE (IntelliJ IDEA, Eclipse, VS Code)

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 17 | Programming Language |
| Spring Boot | 3.2.2 | Framework |
| Spring Security | 3.2.2 | Security & Authentication |
| Spring Data JPA | 3.2.2 | Database Access |
| MySQL | 8.0+ | Database |
| JWT | 0.12.3 | Token Generation |
| Lombok | 1.18.30 | Boilerplate Reduction |
| MapStruct | 1.5.5 | Object Mapping |
| SpringDoc OpenAPI | 2.3.0 | API Documentation |
| Maven | 3.6+ | Build Tool |

## 📁 Project Structure

```
com.smartcontent
├── config/                  # Configuration classes
│   ├── SecurityConfig.java
│   └── OpenApiConfig.java
├── controller/              # REST Controllers
│   ├── AuthController.java
│   ├── ArticleController.java
│   └── AiController.java
├── service/                 # Service Layer
│   ├── AuthService.java
│   ├── ArticleService.java
│   ├── AiService.java
│   └── impl/               # Service Implementations
├── repository/              # Data Access Layer
│   ├── UserRepository.java
│   ├── RoleRepository.java
│   ├── ArticleRepository.java
│   ├── TagRepository.java
│   └── AiMetadataRepository.java
├── entity/                  # JPA Entities
│   ├── User.java
│   ├── Role.java
│   ├── Article.java
│   ├── Tag.java
│   └── AiMetadata.java
├── dto/                     # Data Transfer Objects
│   ├── ApiResponse.java
│   ├── AuthDto.java
│   ├── ArticleDto.java
│   ├── TagDto.java
│   ├── AiMetadataDto.java
│   └── PageResponse.java
├── security/                # Security Components
│   ├── JwtUtil.java
│   ├── JwtAuthenticationFilter.java
│   ├── CustomUserDetailsService.java
│   └── JwtAuthenticationEntryPoint.java
├── exception/               # Exception Handling
│   ├── GlobalExceptionHandler.java
│   ├── ResourceNotFoundException.java
│   ├── DuplicateResourceException.java
│   ├── UnauthorizedException.java
│   ├── BadRequestException.java
│   └── ErrorResponse.java
└── util/                    # Utility Classes
    ├── SecurityUtil.java
    └── ArticleMapper.java
```

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd smartcontent
```

### 2. Configure MySQL Database

Create a MySQL database:
```sql
CREATE DATABASE smart_content_db;
```

Update `application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/smart_content_db
    username: your_mysql_username
    password: your_mysql_password
```

### 3. Run the SQL Schema

Execute the `schema.sql` file to create tables and insert sample data:
```bash
mysql -u root -p smart_content_db < schema.sql
```

### 4. Build the Project
```bash
mvn clean install
```

### 5. Run the Application
```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## 📊 Database Schema

### Entities and Relationships

```
Users (1) ----< (M) User_Roles (M) >---- (1) Roles
  |
  | (1:M - author)
  v
Articles (M) >----< (M) Article_Tags (M) >----< (M) Tags
  |
  | (1:1)
  v
AI_Metadata
```

### Key Tables
- **users**: User accounts with credentials
- **roles**: User roles (USER, AUTHOR, ADMIN)
- **articles**: Article content and metadata
- **tags**: Article categorization
- **ai_metadata**: AI-generated insights
- **user_roles**: User-Role mapping
- **article_tags**: Article-Tag mapping

## 🔐 Authentication Flow

1. **Register**: POST `/api/auth/register`
   - Create new user account
   - Assign default USER role
   - Return JWT token

2. **Login**: POST `/api/auth/login`
   - Validate credentials
   - Generate JWT token
   - Return token with user info

3. **Protected Endpoints**:
   - Include JWT in Authorization header: `Bearer <token>`
   - Token validated by JwtAuthenticationFilter
   - User loaded from database
   - Authorization checked via @PreAuthorize

## 🎯 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | User login | No |

### Articles
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/articles` | Create article | AUTHOR/ADMIN |
| PUT | `/api/articles/{id}` | Update article | AUTHOR/ADMIN |
| DELETE | `/api/articles/{id}` | Delete article | AUTHOR/ADMIN |
| GET | `/api/articles/{id}` | Get article by ID | No |
| GET | `/api/articles` | Get all articles (paginated) | No |
| GET | `/api/articles/search` | Search by title | No |
| GET | `/api/articles/filter/tags` | Filter by tags | No |
| GET | `/api/articles/filter/status` | Filter by status | No |
| GET | `/api/articles/my-articles` | Get user's articles | AUTHOR/ADMIN |

### AI Features
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/ai/summarize` | Generate summary | AUTHOR/ADMIN |
| POST | `/api/ai/generate-tags` | Generate tags | AUTHOR/ADMIN |
| POST | `/api/ai/seo-score` | Calculate SEO score | AUTHOR/ADMIN |

## 📖 API Documentation

### Swagger UI
Access interactive API documentation:
```
http://localhost:8080/swagger-ui.html
```

### OpenAPI Specification
```
http://localhost:8080/v3/api-docs
```

## 🧪 Testing

### Using cURL

**Register User:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "fullName": "Test User",
    "roles": ["AUTHOR"]
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "usernameOrEmail": "testuser",
    "password": "password123"
  }'
```

**Create Article:**
```bash
curl -X POST http://localhost:8080/api/articles \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Article",
    "content": "This is the content of my article...",
    "status": "PUBLISHED",
    "tags": ["Technology", "Tutorial"]
  }'
```

### Using Postman

1. Import the Postman collection from `API_DOCUMENTATION.md`
2. Set the `baseUrl` variable to `http://localhost:8080`
3. After login, save the JWT token in the `token` variable
4. Use `{{token}}` in Authorization headers

## 🔒 Security Configuration

### JWT Configuration
- Secret Key: Configured in `application.yml`
- Expiration: 24 hours (configurable)
- Token Type: Bearer

### Endpoint Security
- Public: Auth endpoints, GET articles
- AUTHOR/ADMIN: Create, Update, Delete articles, AI features
- ADMIN: Admin-specific operations

### Password Encryption
- BCrypt with strength 10
- Passwords hashed before storage

## 🎨 Response Format

All API responses follow this structure:

**Success Response:**
```json
{
  "timestamp": "2024-02-15T10:30:00",
  "status": 200,
  "message": "Success message",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "timestamp": "2024-02-15T10:30:00",
  "status": 404,
  "message": "Error message",
  "path": "/api/endpoint"
}
```

## 🚀 Deployment

### Production Checklist

1. **Security**
   - [ ] Change JWT secret key
   - [ ] Update database credentials
   - [ ] Enable HTTPS
   - [ ] Configure CORS

2. **Database**
   - [ ] Use production database
   - [ ] Set `ddl-auto: validate`
   - [ ] Enable connection pooling
   - [ ] Configure backup strategy

3. **Application**
   - [ ] Set appropriate logging levels
   - [ ] Configure actuator endpoints
   - [ ] Set up monitoring
   - [ ] Configure rate limiting

4. **Build**
```bash
mvn clean package -DskipTests
java -jar target/ai-content-manager-1.0.0.jar
```

## 📝 Configuration

### Application Properties

Key configurations in `application.yml`:

```yaml
# Database
spring.datasource.url: Your database URL
spring.datasource.username: Database username
spring.datasource.password: Database password

# JWT
app.security.jwt.secret-key: Your secret key
app.security.jwt.expiration-ms: Token expiration (ms)

# AI Mock
app.ai.mock-delay-ms: Simulated AI processing delay
app.ai.summarization.max-length: Max summary length
app.ai.tagging.max-tags: Maximum tags to generate
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created by Senior Java Backend Architect

## 🐛 Known Issues

None at this time.

## 📮 Support

For issues and questions, please open an issue in the repository.

## 🔄 Future Enhancements

- [ ] Integrate real AI APIs (OpenAI, Google AI)
- [ ] Add file upload for images
- [ ] Implement caching (Redis)
- [ ] Add rate limiting
- [ ] Implement WebSocket for real-time updates
- [ ] Add email notifications
- [ ] Implement full-text search (Elasticsearch)
- [ ] Add API versioning
- [ ] Implement OAuth2 social login
- [ ] Add content revision history

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Security Documentation](https://spring.io/projects/spring-security)
- [JWT.io](https://jwt.io/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---

**Built with ❤️ using Spring Boot**
