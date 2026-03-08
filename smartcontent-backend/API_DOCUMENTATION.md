# AI Powered Smart Content Manager - API Documentation

Base URL: `http://localhost:8080`

---

## Authentication Endpoints

### 1. Register User

**POST** `/api/auth/register`

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "roles": ["AUTHOR"]
}
```

**Response (201 Created):**
```json
{
  "timestamp": "2024-02-15T10:30:00",
  "status": 200,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "type": "Bearer",
    "userId": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "roles": ["ROLE_AUTHOR", "ROLE_USER"]
  }
}
```

---

### 2. Login User

**POST** `/api/auth/login`

**Request Body:**
```json
{
  "usernameOrEmail": "john_doe",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "timestamp": "2024-02-15T10:35:00",
  "status": 200,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "type": "Bearer",
    "userId": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "roles": ["ROLE_AUTHOR", "ROLE_USER"]
  }
}
```

---

## Article Management Endpoints

### 3. Create Article

**POST** `/api/articles`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "title": "Introduction to Spring Boot",
  "content": "Spring Boot is a powerful framework for building Java applications. It simplifies the development process by providing auto-configuration and production-ready features out of the box. In this article, we'll explore the key features of Spring Boot and how to get started with your first application.",
  "summary": "A comprehensive guide to Spring Boot basics",
  "status": "PUBLISHED",
  "tags": ["Spring Boot", "Java", "Tutorial"]
}
```

**Response (201 Created):**
```json
{
  "timestamp": "2024-02-15T10:40:00",
  "status": 200,
  "message": "Article created successfully",
  "data": {
    "id": 1,
    "title": "Introduction to Spring Boot",
    "content": "Spring Boot is a powerful framework...",
    "summary": "A comprehensive guide to Spring Boot basics",
    "status": "PUBLISHED",
    "author": {
      "id": 1,
      "username": "john_doe",
      "fullName": "John Doe"
    },
    "tags": [
      {
        "id": 1,
        "name": "Spring Boot",
        "description": "Auto-generated tag",
        "createdAt": "2024-02-15T10:40:00"
      }
    ],
    "aiMetadata": {
      "id": 1,
      "autoSummary": "Spring Boot is a powerful framework for building Java applications...",
      "seoScore": 85,
      "seoSuggestions": "Great job! Your content is well-optimized for SEO",
      "readabilityScore": 75.0,
      "wordCount": 45,
      "createdAt": "2024-02-15T10:40:00"
    },
    "createdAt": "2024-02-15T10:40:00",
    "updatedAt": "2024-02-15T10:40:00",
    "publishedAt": "2024-02-15T10:40:00"
  }
}
```

---

### 4. Update Article

**PUT** `/api/articles/{id}`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "title": "Updated: Introduction to Spring Boot 3.0",
  "content": "Updated content here...",
  "status": "PUBLISHED",
  "tags": ["Spring Boot", "Java", "Spring Framework"]
}
```

---

### 5. Delete Article (Soft Delete)

**DELETE** `/api/articles/{id}`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response (200 OK):**
```json
{
  "timestamp": "2024-02-15T10:50:00",
  "status": 200,
  "message": "Article deleted successfully",
  "data": null
}
```

---

### 6. Get Article by ID

**GET** `/api/articles/{id}`

**Response (200 OK):**
```json
{
  "timestamp": "2024-02-15T10:55:00",
  "status": 200,
  "message": "Article retrieved successfully",
  "data": {
    "id": 1,
    "title": "Introduction to Spring Boot",
    "content": "Spring Boot is a powerful framework...",
    "summary": "A comprehensive guide to Spring Boot basics",
    "status": "PUBLISHED",
    "author": {
      "id": 1,
      "username": "john_doe",
      "fullName": "John Doe"
    },
    "tags": [...],
    "aiMetadata": {...},
    "createdAt": "2024-02-15T10:40:00",
    "updatedAt": "2024-02-15T10:40:00",
    "publishedAt": "2024-02-15T10:40:00"
  }
}
```

---

### 7. Get All Articles (Paginated)

**GET** `/api/articles?page=0&size=10&sortBy=createdAt&sortDir=DESC`

**Query Parameters:**
- `page` (default: 0)
- `size` (default: 10)
- `sortBy` (default: createdAt) - Options: createdAt, updatedAt, title
- `sortDir` (default: DESC) - Options: ASC, DESC

**Response (200 OK):**
```json
{
  "timestamp": "2024-02-15T11:00:00",
  "status": 200,
  "message": "Articles retrieved successfully",
  "data": {
    "content": [
      {
        "id": 1,
        "title": "Introduction to Spring Boot",
        "summary": "A comprehensive guide to Spring Boot basics",
        "status": "PUBLISHED",
        "authorName": "john_doe",
        "tagCount": 3,
        "createdAt": "2024-02-15T10:40:00",
        "publishedAt": "2024-02-15T10:40:00"
      }
    ],
    "pageNumber": 0,
    "pageSize": 10,
    "totalElements": 1,
    "totalPages": 1,
    "last": true,
    "first": true
  }
}
```

---

### 8. Search Articles by Title

**GET** `/api/articles/search?title=Spring&page=0&size=10`

**Response:** Same structure as Get All Articles

---

### 9. Filter Articles by Tags

**GET** `/api/articles/filter/tags?tags=Spring Boot,Java&page=0&size=10`

**Response:** Same structure as Get All Articles

---

### 10. Filter Articles by Status

**GET** `/api/articles/filter/status?status=PUBLISHED&page=0&size=10`

**Status Options:**
- DRAFT
- PUBLISHED

---

### 11. Get My Articles (Current User)

**GET** `/api/articles/my-articles?page=0&size=10`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response:** Same structure as Get All Articles

---

## AI Features Endpoints

### 12. Generate AI Summary

**POST** `/api/ai/summarize`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "content": "Spring Boot is a powerful framework for building Java applications. It provides auto-configuration, embedded servers, and production-ready features. Developers can quickly create stand-alone applications with minimal configuration."
}
```

**Response (200 OK):**
```json
{
  "timestamp": "2024-02-15T11:10:00",
  "status": 200,
  "message": "Summary generated successfully",
  "data": {
    "summary": "Spring Boot is a powerful framework for building Java applications. It provides auto-configuration, embedded servers, and production-ready features.",
    "wordCount": 30,
    "summaryLength": 156,
    "compressionRatio": 0.65
  }
}
```

---

### 13. Generate AI Tags

**POST** `/api/ai/generate-tags`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "title": "Introduction to Spring Boot",
  "content": "Spring Boot simplifies Java development with auto-configuration and embedded servers. It's perfect for microservices and REST APIs."
}
```

**Response (200 OK):**
```json
{
  "timestamp": "2024-02-15T11:15:00",
  "status": 200,
  "message": "Tags generated successfully",
  "data": {
    "tags": ["Spring", "Boot", "Java", "Microservice", "Api"],
    "tagCount": 5,
    "confidence": "HIGH"
  }
}
```

---

### 14. Calculate SEO Score

**POST** `/api/ai/seo-score`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "title": "Introduction to Spring Boot: A Complete Guide",
  "content": "Spring Boot is a powerful framework for building Java applications. It provides auto-configuration, embedded servers, and production-ready features. In this comprehensive guide, we'll explore Spring Boot's key features and how to build your first application."
}
```

**Response (200 OK):**
```json
{
  "timestamp": "2024-02-15T11:20:00",
  "status": 200,
  "message": "SEO score calculated successfully",
  "data": {
    "score": 85,
    "rating": "EXCELLENT",
    "suggestions": [
      "Great job! Your content is well-optimized for SEO",
      "Consider adding more content. Articles with 300+ words tend to rank better"
    ],
    "metrics": {
      "titleLength": 48,
      "contentLength": 245,
      "keywordDensity": 35,
      "hasMetaDescription": true,
      "readabilityScore": 78
    }
  }
}
```

---

## Error Response Format

All error responses follow this structure:

```json
{
  "timestamp": "2024-02-15T11:25:00",
  "status": 404,
  "message": "Article not found with id: '999'",
  "path": "/api/articles/999"
}
```

**Common HTTP Status Codes:**
- 200: Success
- 201: Created
- 400: Bad Request (validation errors)
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict (duplicate resource)
- 500: Internal Server Error

---

## Swagger/OpenAPI Documentation

Access interactive API documentation at:
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

---

## Testing with cURL

### Register User:
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john_doe","email":"john@example.com","password":"password123","fullName":"John Doe","roles":["AUTHOR"]}'
```

### Login:
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"usernameOrEmail":"john_doe","password":"password123"}'
```

### Create Article:
```bash
curl -X POST http://localhost:8080/api/articles \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Article","content":"Test content here","status":"PUBLISHED","tags":["Test"]}'
```

### Get All Articles:
```bash
curl -X GET "http://localhost:8080/api/articles?page=0&size=10"
```

---

## Postman Collection

Import this JSON into Postman for quick testing:

```json
{
  "info": {
    "name": "Smart Content Manager API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:8080"
    },
    {
      "key": "token",
      "value": ""
    }
  ]
}
```

Save the JWT token from login response and use `{{token}}` in Authorization headers.
