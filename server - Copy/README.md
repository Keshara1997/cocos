# Game Server - TypeScript Architecture

A modern, well-structured Node.js game server built with TypeScript, following best practices and SOLID principles.

## 🏗️ Project Structure

```
server/
├── src/
│   ├── config/                 # Configuration files
│   │   ├── constants.ts        # Application constants
│   │   └── database.ts         # Database configuration
│   ├── controllers/            # Request handlers
│   │   ├── auth.controller.ts  # Authentication endpoints
│   │   └── user.controller.ts  # User management endpoints
│   ├── entities/               # Database entities
│   │   └── user_info.ts        # User entity definition
│   ├── handlers/               # WebSocket handlers
│   │   └── websocket.handler.ts # Main WebSocket message router
│   ├── middleware/             # Middleware functions
│   │   └── validation.middleware.ts # Input validation
│   ├── services/               # Business logic
│   │   ├── auth.service.ts     # Authentication logic
│   │   └── user.service.ts     # User management logic
│   ├── types/                  # TypeScript type definitions
│   │   └── index.ts           # Main types file
│   ├── utils/                  # Utility functions
│   │   ├── error.util.ts      # Error handling utilities
│   │   ├── jwt.util.ts        # JWT token utilities
│   │   └── password.util.ts   # Password utilities
│   └── app.ts                 # Main application class
├── index.ts                   # Entry point
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript configuration
├── .env.example             # Environment variables example
└── README.md               # This file
```

## 🚀 Architecture Principles

### **Layered Architecture**

- **Controllers**: Handle WebSocket messages and route to services
- **Services**: Contain business logic and data operations
- **Middleware**: Handle validation, authentication, and request processing
- **Utilities**: Reusable helper functions
- **Types**: TypeScript interfaces and type definitions

### **SOLID Principles**

- **S**ingle Responsibility: Each class has one reason to change
- **O**pen/Closed: Open for extension, closed for modification
- **L**iskov Substitution: Derived classes are substitutable for base classes
- **I**nterface Segregation: Clients shouldn't depend on unused interfaces
- **D**ependency Inversion: Depend on abstractions, not concretions

### **Design Patterns**

- **Singleton**: Database connection management
- **Factory**: Error creation and handling
- **Strategy**: Message handling routing
- **Repository**: Data access abstraction

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **WebSockets**: `websocket` library
- **Database**: MySQL with TypeORM
- **Authentication**: JWT tokens
- **Password Hashing**: bcrypt
- **Architecture**: Layered + Clean Architecture

## 📋 Features

### **Authentication System**

- User registration with validation
- Secure login with JWT tokens
- Password hashing with bcrypt
- Token-based authentication

### **User Management**

- User profile management
- Room and game state tracking
- Secure data handling

### **WebSocket Communication**

- Real-time bidirectional communication
- Message routing and validation
- Error handling and logging
- Graceful connection management

### **Security Features**

- Input validation and sanitization
- Password strength requirements
- JWT token expiration
- CORS protection
- Environment-based configuration

## 🔧 Setup and Installation

### **Prerequisites**

- Node.js (v16 or higher)
- MySQL database
- npm or yarn

### **Installation**

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   ```bash
   cp .env.example .env
   # Edit .env with your database and JWT settings
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### **Environment Variables**

```env
NODE_ENV=development
PORT=3000
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_DATABASE=sys
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=24h
BCRYPT_SALT_ROUNDS=10
```

## 📡 API Documentation

### **WebSocket Messages**

#### **Sign Up**

```json
{
  "type": "signUp",
  "data": {
    "userName": "player123",
    "password": "securePassword123",
    "name": "Player Name"
  }
}
```

**Response:**

```json
{
  "type": "signUpResponse",
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "userId": 1,
    "userName": "player123",
    "name": "Player Name",
    "userRoomCards": 0,
    "roomId": 0
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### **Login**

```json
{
  "type": "login",
  "data": {
    "userName": "player123",
    "password": "securePassword123"
  }
}
```

**Response:**

```json
{
  "type": "loginResponse",
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "userId": 1,
    "userName": "player123",
    "name": "Player Name",
    "userRoomCards": 100,
    "roomId": 0
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🧪 Development

### **Available Scripts**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run clean        # Clean build directory
```

### **Code Style Guidelines**

- Use TypeScript strict mode
- Follow ESLint and Prettier rules
- Use meaningful variable and function names
- Add JSDoc comments for public methods
- Implement proper error handling
- Use dependency injection where appropriate

### **Testing**

```bash
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

## 🔒 Security Considerations

- Passwords are hashed using bcrypt with salt rounds
- JWT tokens have expiration times
- Input validation prevents injection attacks
- Environment variables protect sensitive data
- CORS protection for WebSocket connections
- Graceful error handling without exposing internals

## 📈 Performance Features

- Connection pooling for database
- Efficient message routing
- Lazy loading of services
- Optimized TypeScript compilation
- Proper memory management
- Graceful shutdown handling

## 🚀 Production Deployment

1. Build the project:

   ```bash
   npm run build
   ```

2. Set production environment variables

3. Start the production server:

   ```bash
   npm start
   ```

4. Configure reverse proxy (nginx/Apache)
5. Set up SSL certificates
6. Configure monitoring and logging

## 📝 Contributing

1. Follow the established architecture patterns
2. Add proper TypeScript types for new features
3. Include comprehensive error handling
4. Write tests for new functionality
5. Update documentation as needed

## 📄 License

This project is licensed under the MIT License.
