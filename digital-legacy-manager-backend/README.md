# Digital Legacy Manager - Backend (Spring Boot)

This is a starter Spring Boot backend for the Digital Legacy Manager project.

Features:
- Spring Boot + Spring Security + JWT authentication
- MySQL integration (configure datasource in src/main/resources/application.properties)
- Sample entities: User, Asset, TrustedContact
- Endpoints:
  - POST /api/auth/register
  - POST /api/auth/login
  - GET/POST /api/assets (secured)
  - GET/POST /api/trusted (secured)

How to run:
1. Update `src/main/resources/application.properties` with your MySQL credentials.
2. Build: `mvn clean package`
3. Run: `java -jar target/digital-legacy-manager-0.0.1-SNAPSHOT.jar`

Note: This is a minimal starter. Improve validation, error handling, and production-ready security for real apps.
