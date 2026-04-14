# Library Management System

A full-stack library management application built with **React** (TypeScript + Vite) and **Spring Boot**. Users can browse books, checkout books, write reviews, and manage their library account. Administrators can manage the book catalogue, handle user messages, and oversee all library operations.

---

## 📑 Table of Contents

- [Library Management System](#library-management-system)
  - [📑 Table of Contents](#-table-of-contents)
  - [✅ Features](#-features)
    - [User Features](#user-features)
    - [Admin Features](#admin-features)
    - [System Features](#system-features)
  - [🚀 Tech Stack](#-tech-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [🌐 Deployment](#-deployment)
  - [🧪 Test User Credentials](#-test-user-credentials)
    - [Admin User](#admin-user)
    - [Regular Test Users](#regular-test-users)
  - [👤 How to Use the App — Regular User](#-how-to-use-the-app--regular-user)
    - [Getting Started](#getting-started)
    - [Browsing \& Searching Books](#browsing--searching-books)
    - [Checking Out a Book](#checking-out-a-book)
    - [Managing Your Shelf](#managing-your-shelf)
    - [Writing Reviews](#writing-reviews)
    - [Contacting the Library](#contacting-the-library)
  - [🔑 How to Use the App — Admin User](#-how-to-use-the-app--admin-user)
    - [Accessing the Admin Dashboard](#accessing-the-admin-dashboard)
    - [Managing Books](#managing-books)
    - [Responding to User Messages](#responding-to-user-messages)
  - [📋 Prerequisites](#-prerequisites)
  - [🛠️ Installation \& Setup](#️-installation--setup)
    - [1. Clone the Repository](#1-clone-the-repository)
    - [2. Database Setup](#2-database-setup)
    - [3. Backend Setup](#3-backend-setup)
    - [4. Frontend Setup](#4-frontend-setup)
  - [🔧 Configuration](#-configuration)
    - [Changing the Backend Port](#changing-the-backend-port)
  - [👑 Creating an Admin User](#-creating-an-admin-user)
  - [📁 Project Structure](#-project-structure)
    - [Backend](#backend-1)
  - [📄 License](#-license)
  - [👨‍💻 Author](#-author)

---

## ✅ Features

### User Features

- ✅ Browse the home page carousel showcasing the latest books
- ✅ View detailed book information, availability, and reader reviews
- ✅ Register a new account with name, email, and password
- ✅ Log in and log out securely with JWT-based authentication
- ✅ Checkout books (up to 4 concurrent loans, 7-day loan period)
- ✅ Return books before the due date
- ✅ Renew book loans to extend the borrowing period
- ✅ View current loans and due dates on the personal Shelf page
- ✅ View full Return history
- ✅ Submit a star rating and written review (one per book)
- ✅ Send questions/messages to library administrators
- ✅ View admin responses to submitted messages

### Admin Features

- ✅ Access a dedicated Admin dashboard from the navbar
- ✅ Add new books with title, author, description, category, copies, and cover image
- ✅ Increase or decrease book inventory quantities
- ✅ Delete books from the library catalogue
- ✅ View all pending user questions/messages
- ✅ Reply to user messages directly from the dashboard

### System Features

- ✅ Role-based access control (User / Admin)
- ✅ JWT token authentication with automatic request interception
- ✅ Token validation on application load and on 401 responses
- ✅ Spring Data REST auto-generated paginated endpoints
- ✅ CORS configuration for multiple frontend origins
- ✅ HikariCP connection pool optimised for cloud databases
- ✅ Docker support with multi-stage build for the backend
- ✅ Responsive UI built with Bootstrap 5

---

## 🚀 Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **React 19** | UI library (with TypeScript) |
| **Vite 7** | Build tool & dev server |
| **React Router 7** | Client-side routing |
| **Axios** | HTTP client |
| **Bootstrap 5** | Responsive UI framework |
| **TypeScript 5** | Static type checking |

### Backend

| Technology | Purpose |
|---|---|
| **Spring Boot 3.4** | Application framework |
| **Spring Data JPA** | Data persistence (ORM) |
| **Spring Data REST** | Auto-generated REST API |
| **Spring Security** | CORS & security configuration |
| **MySQL** | Relational database |
| **JWT (jjwt)** | Token-based authentication |
| **Lombok** | Boilerplate reduction |
| **Docker** | Containerisation |
| **Java 21** | Runtime |

---

## 🌐 Deployment

The application is deployed and available at:

> **https://library-ms-springboot-react-jwt-bs-ts-fe.onrender.com**

| Component | URL |
|---|---|
| **Frontend** | https://library-ms-springboot-react-jwt-bs-ts-fe.onrender.com |
| **Backend API** | https://library-ms-springboot-react-jwt-bs-ts.onrender.com |

> **Note:** The application is hosted on Render's starter package. 

---

## 🧪 Test User Credentials

The following accounts are pre-configured for testing the application:

### Admin User

| Field | Value |
|---|---|
| **Email** | `admin@libraryms.com` |
| **Password** | `admin123` |
| **Role** | Admin |

### Regular Test Users

| Name | Email | Password | Role |
|---|---|---|---|
| Alice Johnson | `alice@libraryms.com` | `test1234` | User |
| Bob Smith | `bob@libraryms.com` | `test1234` | User |
| Carol Davis | `carol@libraryms.com` | `test1234` | User |

Each test user has:
- **Active book loans** — visible on the Shelf → Loans tab
- **Return history** — visible on the Shelf → History tab

---

## 👤 How to Use the App — Regular User

### Getting Started

1. Open the application in your browser — use the [live deployment](https://library-ms-springboot-react-jwt-bs-ts-fe.onrender.com) or the local dev server (default: `http://localhost:5173`).
2. Click **Sign In** in the navbar to log in, or click **Register** to create a new account.
3. Fill in your name, email, and password, then submit the registration form.
4. After logging in, you will be redirected to the **Home** page.

### Browsing & Searching Books
`
**NOTE: Browsing books does not require a sign-in when you borrow book(s) from the library, then you need to sign in.**
1. From the **Home** page, browse the featured carousel of the latest books added to the library or click the **Explore Top Books** button to see top books. Clicking this button will take you to the **all books page** with search.
2. Click **Search Books** in the navbar, clicking this button will took you **all books page** with search.
3. Use the search bar to find books by **title**.
4. Use the category dropdown to filter results (e.g. **Frontend**, **Backend**, **Data**, **DevOps**).
5. Click on the **View Details** button on any book card to open its detail page, where you can see the description, availability, and reviews left by other readers.

### Checking Out a Book

1. In the earlier step, we go to the book detail page after clicking on the **View Details** button.
2. If copies are available, click the **Checkout** button to borrow that book from the library. If you are not SIGNED IN, then instead of Checkout, it will show the **Sign in** button.
3. You can have up to **4 books** checked out at the same time.
4. Each checkout creates a **7-day loan** period.

### Managing Your Shelf

1. Click **Shelf** in the navbar to view your personal shelf.
2. The **Loans** tab shows all books you currently have checked out, along with their due dates.
3. From the Loans tab, you can:
   - **Return** When you return a book from loan, that item has been moved from the Loan Tab to the History Tab.
   - **Renew** A loan to extend the due date by another 7 days.
4. The **History** tab shows a log of all books you have previously **Returned** From Loan.

### Writing Reviews

1. On any book's detail page, you can submit a star rating and a written review.
2. You may leave **one review per book**.
3. All reviews are publicly visible to other users on the book's detail page and the dedicated review list page.

### Contacting the Library

1. On the home page, click **Library Services** button to contact the Library and ask a question. 
2. Enter the title of the question, then enter the detailed question, and click the **Submit Question** button to send a message to the library administrators.
3. Switch to the **Responses** tab to view replies from admins.

---

## 🔑 How to Use the App — Admin User

### Accessing the Admin Dashboard

1. Log in with an admin account (see [Creating an Admin User](#-creating-an-admin-user) below).
2. The navbar will display an **Admin** link — click it to open the **Manage Library** dashboard.

### Managing Books

1. **Add New Books** — Select the "Add new book" tab. Fill in the title, author, description, copies, category, and optionally upload a cover image, then click **Add Book**.
2. **Change Quantity** — Select the "Change quantity" tab. Search for a book, then click **Increase Quantity** or **Decrease Quantity** to adjust stock.
3. **Delete Books** — From the same quantity management view, click **Delete** to permanently remove a book from the catalogue.

### Responding to User Messages

1. Select the "Messages" tab inside the Admin dashboard.
2. Browse pending questions submitted by users.
3. Type a response and submit it — the user will see the reply under their **Responses** tab.

---

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Java JDK 21** (or higher)
- **Maven** (3.6 or higher)
- **MySQL** (8.0 or higher)

---

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd library_ms
```

### 2. Database Setup

Create a MySQL database:

```sql
CREATE DATABASE reactlibrarydatabase;
```

The application uses `spring.jpa.hibernate.ddl-auto=update`, so tables are created automatically on first run. If you have seed SQL scripts, run them after the initial startup.

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

The backend will start on `http://localhost:8080`.

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
VITE_API_BASE_URL=http://localhost:8080
```

> **Note:** If your backend runs on a different port, update `VITE_API_BASE_URL` accordingly.

Start the development server:

```bash
npm run dev
```

The frontend will start on `http://localhost:5173` (or another port if 5173 is occupied).

---

## 🔧 Configuration

### Changing the Backend Port

1. Update `backend/spring-boot-library/src/main/resources/application.properties`:
   ```properties
   server.port=YOUR_PORT
   ```

2. Update `frontend/react-library/.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:YOUR_PORT
   ```

3. Restart both servers for changes to take effect.

---
create-admin.htmlcreate-admin.html
## 👑 Creating an Admin User

After the backend is running:

1. Open `create-admin.html` (located in `backend/spring-boot-library/` or `frontend/react-library/`) in your browser.
2. If your backend is not on port 8080, edit the `API_BASE_URL` variable inside the file first.
3. Click **Create Admin**.
4. Save the generated email and password — you will need them to log in as admin.

Alternatively, navigate to `/create-admin` in the frontend app to use the in-app admin creation page.

---

## 📁 Project Structure

```
library_ms/
├── README.md
├── backend/
│   └── spring-boot-library/          # Spring Boot application
│       ├── Dockerfile                # Multi-stage Docker build
│       ├── pom.xml                   # Maven dependencies
│       └── src/
│           ├── main/
│           │   ├── java/com/luv2read/  # Controllers, services, entities, config
│           │   └── resources/          # application.properties, SQL scripts
│           └── test/                   # Unit & integration tests
├── frontend/
│   └── react-library/                # React + Vite application
│       ├── package.json              # npm dependencies & scripts
│       ├── vite.config.ts            # Vite configuration
│       ├── tsconfig.json             # TypeScript configuration
│       └── src/
│           ├── App.tsx               # Root component & routes
│           ├── layouts/              # Page components (Home, Search, Shelf, Admin, etc.)
│           ├── models/               # TypeScript interfaces/models
│           ├── services/             # API service & auth service
│           ├── contexts/             # React context (AuthContext)
│           └── components/           # Shared components (ProtectedRoute)

---

## 🔌 API Endpoints

Base URL: `http://localhost:8080/api`

### Public Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/books` | Get all books (paginated) |
| `GET` | `/books/{id}` | Get a book by ID |
| `GET` | `/reviews/search/findByBookId` | Get reviews for a book |
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Log in and receive a JWT token |
| `GET` | `/auth/validate` | Validate an existing JWT token |

### Protected Endpoints (Requires JWT Token)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/books/secure/currentloans` | Get user's current active loans |
| `GET` | `/books/secure/currentloans/count` | Get count of user's loans |
| `GET` | `/books/secure/ischeckedout/byuser` | Check if user has a specific book checked out |
| `PUT` | `/books/secure/checkout` | Checkout a book |
| `PUT` | `/books/secure/return` | Return a book |
| `PUT` | `/books/secure/renew/loan` | Renew a book loan |
| `GET` | `/reviews/secure/user/book` | Check if user already reviewed a book |
| `POST` | `/reviews/secure` | Submit a review |
| `POST` | `/messages/secure/add/message` | Submit a question to admins |
| `GET` | `/messages/search/findByUserEmail` | Get user's messages |
| `GET` | `/histories/search/findBooksByUserEmail` | Get user's checkout history |

### Admin Endpoints (Requires Admin Role)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/admin/secure/add/book` | Add a new book |
| `PUT` | `/admin/secure/increase/book/quantity` | Increase book quantity |
| `PUT` | `/admin/secure/decrease/book/quantity` | Decrease book quantity |
| `DELETE` | `/admin/secure/delete/book` | Delete a book |
| `PUT` | `/messages/secure/admin/message` | Respond to a user message |

---

## 🐛 Troubleshooting

### Backend Won't Start

- Ensure MySQL is running.
- Check database credentials in `application.properties`.
- Verify port 8080 is not already in use.

### Frontend Won't Connect to Backend

- Verify `VITE_API_BASE_URL` in `.env` matches your backend URL.
- Check CORS configuration — allowed origins are listed in `application.properties`.
- Ensure the backend is running before starting the frontend.

### Database Connection Errors

- Verify the MySQL service is running.
- Check the database name, username, and password.
- Ensure the database `reactlibrarydatabase` exists.

### Authentication Issues

- Clear browser local storage.
- Verify the JWT token is being sent in request headers.
- Check token expiration settings in `application.properties`.

---

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

Or build and run with Docker:

```bash
cd backend/spring-boot-library
docker build -t library-backend .
docker run -p 8080:8080 library-backend
```

---

## 📄 License

This project is for educational purposes.

---

## 👨‍💻 Author

**Tauseef**

---

For any questions or issues, please open an issue in the repository.
