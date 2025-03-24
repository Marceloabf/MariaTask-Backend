<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

-----MARIA TASK API -------
-----NestJs + Swagger------

A RESTful API for a task management application (To-Do List) built with NestJS, featuring user authentication, task CRUD operations, and comprehensive API documentation.

## Overview

This project was developed as a full-stack web application for task management with the following features:

- **User Authentication**: Secure login and registration using JWT and Bcrypt
- **Task Management**: Create, read, update, delete, and mark tasks as complete
- **Task Filtering**: Filter tasks by status (pending, completed, in progress)
- **Task Progress Overview**: Displays the percentage of tasks in different statuses
- **API Documentation**: Complete Swagger documentation
- **Docker Integration**: Containerized application for easy setup and deployment


## Technologies Used

### Backend

- NestJS framework
- TypeORM for database interaction
- PostgreSQL database
- JWT for authentication
- Bcrypt for password hashing
- Swagger for API documentation


### Infrastructure

- Docker and Docker Compose for containerization
- Environment variable configuration


## Installation and Setup

### Prerequisites

- Docker and Docker Compose installed on your machine
- Git for cloning the repository


### Installation Steps

1. Clone the repository:

```shellscript
git clone https://github.com/Marceloabf/MariaTask-Backend
cd MariaTask-Backend
```


2. Create a `.env` file based on the provided `.env.example`:

```shellscript
cp .env.example .env
```


3. Update the `.env` file with your secure credentials:

```plaintext
NODE_ENV=production
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_secure_password
DB_NAME=maria_task
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=maria_task
API_FRONT=http://localhost:4200
```


4. Start the application using Docker Compose:

```shellscript
docker-compose up -d
```


5. The API will be available at:

```plaintext
http://localhost:3000
```


6. Access the Swagger documentation at:

```plaintext
http://localhost:3000/api/docs
```

## Environment Variables and Security

This project uses environment variables to manage sensitive information like database credentials. The docker-compose.yml file is configured to use these variables instead of hardcoded values:

```yaml
version: '3.8'

services:
  backend:
    # ...
    environment:
      - NODE_ENV=${NODE_ENV:-production}
      - DB_HOST=${DB_HOST:-postgres}
      - DB_PORT=${DB_PORT:-5432}
      - DB_USERNAME=${DB_USERNAME:-postgres}
      - DB_PASSWORD=${DB_PASSWORD:-changeme}
      - DB_NAME=${DB_NAME:-maria_task}
    # ...

  postgres:
    # ...
    environment:
      - POSTGRES_USER=${POSTGRES_USER:-postgres}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-changeme}
      - POSTGRES_DB=${POSTGRES_DB:-maria_task}
    # ...
```

For security reasons:

- The actual `.env` file is not committed to the repository
- A `.env.example` file with placeholder values is provided
- Make sure to add `.env` to your `.gitignore` file


This approach ensures that sensitive information like passwords is not exposed in your Git repository.

## API Documentation

The API is fully documented using Swagger. You can explore all available endpoints, request/response models, and even test the API directly through the Swagger UI.

To access the documentation, navigate to `/api/docs` after starting the application.

The documentation includes:

- Authentication endpoints (login, register)
- Task management endpoints (CRUD operations)
- Request/response schemas
- Authorization requirements


## Database Configuration

This project uses TypeORM with the following configuration:

```typescript
{
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  autoLoadEntities: true,
  synchronize: true,
}
```

> **Note**: The current configuration uses `autoLoadEntities: true` and `synchronize: true` for development convenience. This automatically creates and updates database tables based on entity definitions.

**Important**: In a production environment, this approach is not recommended. Instead, you should:

- Set `synchronize: false` to prevent automatic schema changes
- Use migrations to manage database schema changes in a controlled manner
- Implement a proper migration strategy for version control of your database schema


## Testing

To run the tests:

```shellscript
# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Future Improvements

- Add task categories or tags
- Implement user roles and permissions
- Add email notifications for task deadlines
- Implement CI/CD pipeline
- AWS deploy


## License

[MIT](LICENSE)
