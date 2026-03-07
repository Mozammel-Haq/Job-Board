# QuickHire - Modern Job Board Platform

A professional full-stack job board application that connects employers with talented job seekers. Built with Next.js and Laravel, featuring intelligent job search, real-time application tracking, and a powerful admin dashboard.

![QuickHire](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![Laravel](https://img.shields.io/badge/Laravel-12-red?style=for-the-badge&logo=laravel)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

## 🌐 Live Demo

- **Application:** https://job-board-five-sage.vercel.app/
- **API Endpoint:** http://mozammel.intelsofts.com/job-board.public/api
- **Demo Video:** [Watch 5-min Walkthrough](your-loom-link)

## 🎯 Project Overview

QuickHire is a comprehensive job board platform designed to streamline the hiring process. Job seekers can browse listings, apply filters to find relevant opportunities, and submit applications directly through the platform. Employers can manage job postings, track applications, and gain insights through an analytics dashboard.

This project was developed as part of a technical assessment, demonstrating proficiency in modern web development, API design, database architecture, and user experience design.

## ✨ Key Features

### For Job Seekers
- **Smart Search** - Find jobs by title, company, or keywords
- **Scalable Filtering** - Dynamic filters for categories, locations, and employment types with a searchable dropdown for 100+ locations
- **Dynamic Category Counts** - Real-time job counts for each category on the home page
- **Detailed Job Pages** - View complete job descriptions, requirements, and benefits
- **Easy Applications** - Submit applications with resume links and cover notes
- **Responsive Design** - Seamless experience across all devices

### For Administrators
- **Analytics Dashboard** - Track jobs, applications, and key metrics at a glance
- **Job Management** - Create, edit, activate/deactivate, and remove job listings
- **Application Tracking** - Monitor and manage candidate applications
- **Visual Statistics** - Interactive charts showing job views and application trends
- **Secure Access** - Protected routes with authentication

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| Next.js 16 | React framework with App Router |
| TypeScript | Type-safe development |
| Tailwind CSS v4 | Utility-first styling |
| React Hooks | State and lifecycle management |
| Fetch API | HTTP client for API requests |

### Backend
| Technology | Purpose |
|------------|---------|
| Laravel 12 | PHP framework for API |
| MySQL | Relational database |
| Laravel Sanctum | API authentication |
| Eloquent ORM | Database abstraction |
| Form Requests | Input validation |

### Deployment
- **Frontend:** Vercel
- **Backend:** Custom VPS (Intelsofts)
- **Version Control:** GitHub

## 📁 Project Structure
```
quickhire-job-board/
├── client/                    # Next.js frontend
│   ├── app/
│   │   ├── admin/            # Admin dashboard
│   │   ├── jobs/             # Job listings & details
│   │   ├── login/            # Authentication
│   │   ├── signup/           # User registration
│   │   └── page.tsx          # Homepage
│   ├── components/
│   │   ├── admin/            # Dashboard components
│   │   ├── home/             # Landing page sections
│   │   ├── jobs/             # Job cards & lists
│   │   ├── layout/           # Header, Footer, Logo
│   │   └── ui/               # Reusable UI elements
│   ├── lib/
│   │   ├── api.ts            # API service layer
│   │   ├── auth.ts           # Auth helpers
│   │   └── types.ts          # TypeScript definitions
│   └── public/               # Static assets
│
└── server/                   # Laravel backend
    ├── app/
    │   ├── Http/
    │   │   ├── Controllers/  # API controllers
    │   │   ├── Requests/     # Validation rules
    │   │   └── Resources/    # JSON transformers
    │   └── Models/           # Database models
    ├── database/
    │   ├── migrations/       # Schema definitions
    │   └── seeders/          # Sample data
    └── routes/
        └── api.php           # API endpoints
```

## 🚀 Local Development Setup

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ and npm
- PHP 8.2 or higher
- Composer
- MySQL 8.0+
- Git

### Frontend Installation

1. Clone the repository and navigate to the client folder:
```bash
git clone https://github.com/Mozammel-Haq/quickhire-job-board.git
cd quickhire-job-board/client
```

2. Install the required dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the client directory:
```bash
cp .env.example .env.local
```

5. Add your backend URL to `.env.local`. The frontend uses a **Next.js Rewrite Proxy** (`/api-proxy` and `/storage-proxy`) to safely communicate with the backend and resolve Mixed Content issues:
```env
NEXT_PUBLIC_API_URL=http://your-backend-url.com/api
```

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and visit:
```
http://localhost:3000
```

### Backend Installation

1. Navigate to the server directory:
```bash
cd ../server
```

2. Install PHP dependencies:
```bash
composer install
```

3. Create your environment file:
```bash
cp .env.example .env
```

4. Configure your database in `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=quick_hire
DB_USERNAME=root
DB_PASSWORD=your_password
DB_PREFIX=qh_ (update in config/database.php)

FRONTEND_URL=http://localhost:3000
```

5. Generate the application key:
```bash
php artisan key:generate
```

6. Create the database:
```sql
CREATE DATABASE quickhire_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

7. Run database migrations:
```bash
php artisan migrate
```

8. (Optional) Seed the database with sample data:
```bash
php artisan db:seed
```
This will create sample jobs and a default admin account.

9. Start the Laravel development server:
```bash
php artisan serve
```

The API will be available at `http://localhost:8000/api`

## 🔐 Test Credentials

### Admin Account
```
Email: admin@gmail.com
Password: 12345678
```

Use these credentials to access the admin dashboard and test job management features.

## 📡 API Documentation

### Authentication

**Register New User**
```http
POST /api/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

**Login**
```http
POST /api/login
Content-Type: application/json

{
  "email": "admin@gmail.com",
  "password": "12345678"
}

Response:
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@gmail.com",
    "is_admin": true
  },
  "token": "1|randomtoken..."
}
```

**Logout**
```http
POST /api/logout
Authorization: Bearer {your-token}
```

### Jobs

**Get All Jobs (with filtering)**
```http
GET /api/jobs
GET /api/jobs?search=developer
GET /api/jobs?category=Technology
GET /api/jobs?location=USA
GET /api/jobs?employment_type=Full Time
GET /api/jobs?page=2

**Get Dynamic Filter Options**
```http
GET /api/jobs/filters
```
Returns distinct categories (with job counts), locations, and employment types directly from the database to ensure UI scalability.
```

**Get Single Job**
```http
GET /api/jobs/{id}

Response:
{
  "data": {
    "id": 1,
    "title": "Senior Frontend Developer",
    "company": "Google",
    "location": "San Francisco, USA",
    "category": "Technology",
    "employment_type": "Full Time",
    "salary": "$120k - $150k/year",
    "description": "...",
    "responsibilities": [...],
    "requirements": [...],
    "benefits": [...],
    "created_at": "2024-03-07T10:00:00.000000Z"
  }
}
```

**Create Job (Admin Only)**
```http
POST /api/admin/jobs
Authorization: Bearer {admin-token}
Content-Type: application/json

{
  "title": "Backend Developer",
  "company": "Tech Corp",
  "location": "Remote",
  "category": "Technology",
  "employment_type": "Full Time",
  "salary": "$90k - $110k",
  "description": "We are looking for...",
  "responsibilities": [
    "Build RESTful APIs",
    "Write clean code"
  ],
  "requirements": [
    "3+ years experience",
    "PHP/Laravel expertise"
  ],
  "benefits": [
    "Health insurance",
    "Remote work"
  ]
}
```

**Update Job (Admin Only)**
```http
PUT /api/admin/jobs/{id}
Authorization: Bearer {admin-token}
```

**Delete Job (Admin Only)**
```http
DELETE /api/admin/jobs/{id}
Authorization: Bearer {admin-token}
```

**Get Job Statistics (Admin Only)**
```http
GET /api/admin/jobs/statistics
Authorization: Bearer {admin-token}

Response:
{
  "total_jobs": 12,
  "active_jobs": 10,
  "total_applications": 45,
  "pending_applications": 23
}
```

### Applications

**Submit Application**
```http
POST /api/applications
Content-Type: application/json

{
  "job_id": 1,
  "name": "Jane Smith",
  "email": "jane@example.com",
  "resume_url": "https://drive.google.com/file/d/your-resume-id",
  "cover_note": "I am excited about this opportunity because..."
}
```

**Get All Applications (Admin Only)**
```http
GET /api/admin/applications
GET /api/admin/applications?job_id=1
GET /api/admin/applications?status=pending
Authorization: Bearer {admin-token}
```

**Update Application Status (Admin Only)**
```http
PATCH /api/admin/applications/{id}/status
Authorization: Bearer {admin-token}
Content-Type: application/json

{
  "status": "reviewed"
}
```

**Delete Application (Admin Only)**
```http
DELETE /api/admin/applications/{id}
Authorization: Bearer {admin-token}
```

## 🎨 Design System

The application follows a carefully crafted design system based on the provided Figma template.

### Color Palette
```
Primary Purple:   #4640DE
Dark Blue:        #25324B
Body Gray:        #515B6F
Light Gray:       #7C8493
Background:       #FFFFFF
Secondary BG:     #F8F8FD
Success Green:    #56CDAD
Warning Orange:   #FFB836
Error Red:        #FF6550
Info Blue:        #26A4FF
```

### Typography
- **Display Font:** Clash Display (headings)
- **Body Font:** Epilogue (paragraphs, UI text)
- **Font Weights:** Regular (400), Medium (500), SemiBold (600), Bold (700)

### Spacing
The design uses a consistent 8px grid system for spacing and layout.

## 🗄️ Database Schema

### Users
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### Jobs (qhjobs)
```sql
CREATE TABLE qhjobs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    employment_type VARCHAR(255) DEFAULT 'Full Time',
    salary VARCHAR(255) NULL,
    description TEXT NOT NULL,
    responsibilities JSON NULL,
    requirements JSON NULL,
    benefits JSON NULL,
    logo VARCHAR(255) NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_location (location),
    INDEX idx_employment_type (employment_type),
    INDEX idx_is_active (is_active)
);
```

### Applications
```sql
CREATE TABLE applications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    job_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    resume_url VARCHAR(500) NOT NULL,
    cover_note TEXT NOT NULL,
    status ENUM('pending', 'reviewed', 'accepted', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES qhjobs(id) ON DELETE CASCADE,
    INDEX idx_job_id (job_id),
    INDEX idx_email (email),
    INDEX idx_status (status)
);
```

## 🔒 Security Measures

- **CORS Protection** - Configured to allow requests only from the frontend domain
- **Authentication** - Laravel Sanctum token-based auth for secure API access
- **CSRF Protection** - Built-in Laravel CSRF middleware
- **Input Validation** - Comprehensive validation using Form Request classes
- **SQL Injection Prevention** - Eloquent ORM with parameter binding
- **XSS Protection** - Auto-escaping in React and Laravel Blade
- **Password Security** - Bcrypt hashing with salt
- **Mixed Content Proxy** - Custom `/storage-proxy` and `/api-proxy` to serve backend assets and data over secure HTTPS in production
- **Environment Variables** - Sensitive data stored in .env files

## ✅ Requirements Checklist

### Core Requirements (100% Complete)

**Frontend**
- [x] Job listings page with pagination
- [x] Search functionality
- [x] Filter by category and location
- [x] Responsive layout
- [x] Job detail page with full description
- [x] Application form (name, email, resume URL, cover note)
- [x] Admin panel for job management
- [x] Reusable components
- [x] Clean folder structure
- [x] Tailwind CSS styling

**Backend**
- [x] RESTful API
- [x] GET /api/jobs - List all jobs
- [x] GET /api/jobs/{id} - Single job
- [x] POST /api/jobs - Create job (admin)
- [x] DELETE /api/jobs/{id} - Delete job (admin)
- [x] POST /api/applications - Submit application
- [x] MySQL database
- [x] Proper relationships (Job → Applications)
- [x] Input validation on all endpoints
- [x] Clean API structure

### Bonus Features (100% Complete)

- [x] Deployed frontend (Vercel)
- [x] Deployed backend (Custom VPS)
- [x] Enhanced admin UI with dashboard
- [x] Advanced filtering (category, location, type)
- [x] Loading states throughout
- [x] Environment configuration
- [x] Professional API responses
- [x] Authentication system
- [x] TypeScript for type safety
- [x] Interactive charts and statistics

## 🚀 Deployment

### Frontend (Vercel)
The Next.js application is deployed on Vercel with automatic deployments from the main branch.

Configuration:
- Root Directory: `client`
- Build Command: `npm run build`
- Output Directory: `.next`
- Environment Variables: `NEXT_PUBLIC_API_URL`

### Backend (VPS)
The Laravel API is hosted on a custom VPS with Apache/Nginx configuration.

Server setup includes:
- PHP 8.2 with required extensions
- MySQL 8.0 database
- Composer for dependency management
- SSL certificate for secure connections
- Proper file permissions and ownership

## 🎓 Learning Outcomes

This project demonstrates proficiency in:
- Modern React patterns with Next.js 15 App Router
- Type-safe development with TypeScript
- RESTful API design and implementation
- Database design and relationships
- Authentication and authorization
- Responsive UI/UX design
- Git workflow and version control
- Full-stack application deployment
- Clean code principles and best practices

## 🐛 Known Limitations

- Resume uploads currently require a URL rather than direct file upload
- Email notifications are not implemented
- Advanced search features like salary range filtering not included
- Company profile pages not yet built

These features are planned for future iterations.

## 🔮 Future Enhancements

- Email notifications for application status updates
- Direct resume file upload with cloud storage
- Advanced search with salary ranges
- Job recommendations based on user preferences
- Saved jobs functionality
- Company profiles and reviews
- Application tracking for job seekers
- Analytics dashboard for employers
- Integration with LinkedIn and other platforms

## 👨‍💻 Developer

**Mozammel Haq**  
Full Stack Developer

- 🌐 Postfolio: [mozammel.intelsofts.com](http://mozammel.intelsofts.com/)
- 💼 LinkedIn: [linkedin.com/in/mozammel29](https://www.linkedin.com/in/mozammel29/)
- 🐙 GitHub: [github.com/Mozammel-Haq](https://github.com/Mozammel-Haq)
- 📧 Email: hmojammel29@gmail.com

## 📄 License

This project was created as part of a technical assessment for Qtec Solution Limited.

## 🙏 Acknowledgments

Special thanks to Qtec Solution Limited for providing the opportunity to work on this project. The Figma design template and project requirements helped create a focused and professional application.
