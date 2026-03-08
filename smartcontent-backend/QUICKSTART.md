# Quick Start Guide - AI Powered Smart Content Manager

## ⚡ 5-Minute Setup

### Step 1: Prerequisites Check
```bash
java -version    # Should be 17+
mvn -version     # Should be 3.6+
mysql --version  # Should be 8.0+
```

### Step 2: Database Setup
```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE smart_content_db;
exit;

# Import schemaD
mysql -u root -p smart_content_db < schema.sql
```

### Step 3: Configure Application
Edit `src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    username: YOUR_MYSQL_USERNAME
    password: YOUR_MYSQL_PASSWORD
```

### Step 4: Build & Run
```bash
# Build
mvn clean install

# Run
mvn spring-boot:run
```

### Step 5: Test the API
```bash
# Register a user
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"demo","email":"demo@test.com","password":"demo123","roles":["AUTHOR"]}'

# You'll get a JWT token in response - save it!

# Create an article (replace YOUR_TOKEN with actual token)
curl -X POST http://localhost:8080/api/articles \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"My First Article","content":"This is my first article using the Smart Content Manager API!","status":"PUBLISHED","tags":["Test"]}'
```

## 🎯 Access Points

- **Application**: http://localhost:8080
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **API Docs**: http://localhost:8080/v3/api-docs

## 📌 Default Roles

After running schema.sql, you'll have these roles:
- `ROLE_USER` - Read-only access
- `ROLE_AUTHOR` - Can create/edit articles
- `ROLE_ADMIN` - Full access

## 🔑 Sample Credentials

If you ran the complete schema.sql with sample data:

| Username | Password | Role |
|----------|----------|------|
| admin | password123 | ADMIN |
| john_author | password123 | AUTHOR |
| jane_user | password123 | USER |

⚠️ **Note**: Passwords in schema.sql are placeholders. Update them with actual BCrypt hashes for production.

## 🧪 Quick Test Workflow

1. **Register** a new user with AUTHOR role
2. **Login** to get JWT token
3. **Create** an article
4. **View** the article (public endpoint)
5. **Generate** AI summary
6. **Update** the article
7. **Search** for articles

## 🐛 Troubleshooting

### Port 8080 Already in Use
```yaml
# Change port in application.yml
server:
  port: 8081
```

### MySQL Connection Error
- Check if MySQL is running: `sudo systemctl status mysql`
- Verify credentials in application.yml
- Ensure database exists: `SHOW DATABASES;`

### JWT Token Issues
- Check if token is included in header: `Authorization: Bearer <token>`
- Verify token hasn't expired (24 hours default)
- Check secret key in application.yml

## 📱 Postman Setup

1. Import the API collection
2. Create environment with:
   - `baseUrl`: http://localhost:8080
   - `token`: (will be set after login)
3. Use `{{baseUrl}}` and `{{token}}` in requests

## 🚀 Next Steps

- Read full [README.md](README.md)
- Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- Review [schema.sql](schema.sql) for database structure
- Explore code in `src/main/java/com/smartcontent/`

## 💡 Pro Tips

1. **Use Swagger UI** for interactive API testing
2. **Check logs** for debugging: `tail -f logs/application.log`
3. **Enable SQL logging** in application.yml for debugging queries
4. **Use Postman** for systematic API testing
5. **Review exception messages** - they're descriptive!

Happy Coding! 🎉
