# Library Management System

A full-stack library management application built with React (TypeScript + Vite) and Spring Boot. This system allows users to browse books, checkout books, write reviews, and manage their library account. Administrators can manage books, handle user messages, and monitor the system.

## 🚀 Technology Stack

### Frontend
- **React 19** with TypeScript
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **Bootstrap 5** - UI framework

### Backend
- **Spring Boot 4.0.2**
- **Spring Data JPA** - Data persistence
- **Spring Data REST** - REST API
- **MySQL** - Database
- **JWT** - Authentication

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Java JDK** (17 or higher)
- **Maven** (3.6 or higher)
- **MySQL** (8.0 or higher)

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "React_Library_Tauseef - Copy (6)"
```

### 2. Database Setup

Create a MySQL database:
```sql
CREATE DATABASE reactlibrarydatabase;
```

Run the SQL scripts located in `01-starter-files/Scripts/` in the following order:
1. `Create-Users-Table.sql`
2. `React-Springboot-Add-Tables-Script-1.sql`
3. `React-SpringBoot-Add-Books-Script-2.sql`
4. `React-SpringBoot-Add-Books-Script-3.sql`
5. `React-SpringBoot-Add-Books-Script-4.sql`
6. `React-SpringBoot-Add-Books-Script-5.sql`

Optional: Run `Update-Admin-Password.sql` if you need to update admin credentials.

### 3. Backend Setup

Navigate to the backend directory:
```bash
cd backend/spring-boot-library
```

Update `src/main/resources/application.properties` with your MySQL credentials:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/reactlibrarydatabase?useSSL=false&useUnicode=yes&characterEncoding=UTF-8&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
```

Build and run the Spring Boot application:
```bash
# Using Maven Wrapper (recommended)
./mvnw spring-boot:run

# Or using Maven directly
mvn spring-boot:run
```

The backend will start on `http://localhost:8081`

### 4. Frontend Setup

Navigate to the frontend directory:
```bash
cd frontend/react-library
```

Install dependencies:
```bash
npm install
```

Configure the environment variables by updating `.env`:
```env
VITE_APP_NAME="Luv 2 Read - Library Management System"
VITE_API_BASE_URL=http://localhost:8081
```

**Note:** If your backend runs on a different port, update `VITE_API_BASE_URL` accordingly.

Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173` (or another port if 5173 is occupied)

## 🔧 Configuration

### Changing the Backend Port

If you need to run the backend on a different port:

1. Update `backend/spring-boot-library/src/main/resources/application.properties`:
   ```properties
   server.port=YOUR_PORT
   ```

2. Update `frontend/react-library/.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:YOUR_PORT
   ```

3. Restart both servers for changes to take effect.

## 👤 Creating Admin User

To create an admin user, open `create-admin.html` in your browser after the backend is running:

1. Open the file in a browser
2. Click "Create Admin" button
3. Save the generated credentials

Alternatively, update the `API_BASE_URL` in the file if your backend runs on a different port.

## 🎯 Features

### User Features
- Browse and search books by title, author, or category
- View book details and reviews
- Checkout books (up to 5 books at a time)
- Return books
- Renew book loans
- Write and submit book reviews
- View checkout history
- Send messages to administrators

### Admin Features
- Add new books to the library
- Update book quantities
- Delete books
- Respond to user messages
- View and manage all library operations

## 📁 Project Structure

```
.
├── backend/
│   └── spring-boot-library/      # Spring Boot application
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/         # Java source files
│       │   │   └── resources/    # Application properties
│       │   └── test/             # Test files
│       └── pom.xml               # Maven dependencies
├── frontend/
│   └── react-library/            # React application
│       ├── src/
│       │   ├── layouts/          # Page components
│       │   ├── models/           # TypeScript models
│       │   ├── services/         # API services
│       │   └── contexts/         # React contexts
│       ├── .env                  # Environment variables
│       └── package.json          # npm dependencies
├── 01-starter-files/
│   ├── Scripts/                  # Database scripts
│   └── Images/                   # Image assets
└── create-admin.html             # Admin user creation tool
```

## 🔌 API Endpoints

Base URL: `http://localhost:8081/api`

### Public Endpoints
- `GET /books` - Get all books (paginated)
- `GET /books/{id}` - Get book by ID
- `GET /reviews/search/findByBookId` - Get reviews for a book
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login

### Protected Endpoints (Requires JWT Token)
- `GET /books/secure/currentloans/count` - Get user's current loans count
- `GET /books/secure/ischeckedout/byuser` - Check if book is checked out
- `PUT /books/secure/checkout` - Checkout a book
- `PUT /books/secure/return` - Return a book
- `PUT /books/secure/renew/loan` - Renew a book loan
- `POST /reviews/secure` - Submit a review
- `GET /messages/search/findByUserEmail` - Get user messages
- `GET /histories/search/findBooksByUserEmail` - Get user history

### Admin Endpoints (Requires Admin Role)
- `POST /admin/secure/add/book` - Add new book
- `PUT /admin/secure/increase/book/quantity` - Increase book quantity
- `PUT /admin/secure/decrease/book/quantity` - Decrease book quantity
- `DELETE /admin/secure/delete/book` - Delete a book
- `PUT /messages/secure/admin/message` - Respond to user message

## 🐛 Troubleshooting

### Backend won't start
- Ensure MySQL is running
- Check database credentials in `application.properties`
- Verify port 8081 is not already in use

### Frontend won't connect to backend
- Verify `VITE_API_BASE_URL` in `.env` matches your backend URL
- Check CORS configuration in Spring Boot
- Ensure backend is running before starting frontend

### Database connection errors
- Verify MySQL service is running
- Check database name, username, and password
- Ensure the database `reactlibrarydatabase` exists

### Authentication issues
- Clear browser local storage
- Verify JWT token is being sent in request headers
- Check token expiration settings

## 📝 Building for Production

### Frontend
```bash
cd frontend/react-library
npm run build
```

The build output will be in the `dist/` directory.

### Backend
```bash
cd backend/spring-boot-library
mvn clean package
```

The JAR file will be in the `target/` directory.

Run the JAR:
```bash
java -jar target/spring-boot-library-0.0.1-SNAPSHOT.jar
```

## 📄 License

This project is for educational purposes.

## 👨‍💻 Author

Tauseef

---

For any questions or issues, please open an issue in the repository.
