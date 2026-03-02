# Career Compass Assessment Platform

A production-ready full-stack web application for career aptitude and psychometric assessment. Students can take a personality test and receive personalized career recommendations based on their responses.

## 🚀 Features

- **Professional Landing Page**: Modern introduction with assessment overview and call-to-action
- **Smart Student Form**: Advanced form validation with age restrictions (18+) and name requirements
- **Dynamic Assessment System**: API-driven questions with Likert scale responses and real-time progress tracking
- **Intelligent Scoring Algorithm**: 5-category personality analysis with backend processing
- **Personalized Career Recommendations**: AI-driven career suggestions based on personality profiling
- **Interactive Results Dashboard**: Visual personality dimensions with dynamic progress bars
- **Responsive Design**: Mobile-first UI built with React 19 and TailwindCSS
- **Environment Configuration**: Complete .env setup for development, staging, and production
- **Type Safety**: Full TypeScript implementation with shared type definitions
- **Database Integration**: PostgreSQL with Sequelize ORM for persistent data storage

## 🛠 Tech Stack

### Frontend
- **React 19** with Vite for fast development
- **TypeScript** for type safety and better development experience
- **TailwindCSS** for modern, responsive styling
- **React Router** for client-side navigation
- **Lucide React** for beautiful icons
- **Environment Variables** for flexible API configuration

### Backend
- **Node.js** with Express.js
- **Sequelize ORM** with PostgreSQL
- **CORS** for cross-origin requests
- **dotenv** for environment management
- **UUID** for unique identifier generation

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd career-assessment-platform
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure environment variables (see .env.example for details)
```

#### Environment Variables (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=career_assessment
DB_USER=postgres
DB_PASS=post123

# API Configuration
API_BASE_URL=http://localhost:5000
```

#### Database Setup

```bash
# Create PostgreSQL database
createdb career_assessment

# Start the backend server
npm start
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure API base URL
```

#### Frontend Environment Variables (.env)

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000
```

#### Start Development Server

```bash
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🎯 Key Features & Implementation

### 🔐 Advanced Form Validation
- **Age Restriction**: Only users 18 years or older can take the assessment
- **Name Validation**: Minimum 3 characters (excluding spaces)
- **Real-time Error Handling**: Immediate feedback with clear error messages
- **Input Sanitization**: Proper validation and error clearing on user input

### 📊 Dynamic Assessment System
- **API-Driven Questions**: Questions fetched from backend API (`/api/questions`)
- **Likert Scale Responses**: 5-point agreement scale for accurate personality profiling
- **Progress Tracking**: Visual progress bar with question navigation
- **Answer Persistence**: Real-time answer saving with navigation support

### 🧠 Intelligent Scoring Algorithm
- **Backend Processing**: All scoring logic handled by the backend API
- **Personality Categories**: Analytical, Creative, Social, Practical, Business
- **Dynamic Scoring**: Relative score calculation with proper normalization
- **Career Mapping**: Personality-based career recommendations

### 📈 Interactive Results Dashboard
- **Dynamic Progress Bars**: Relative score visualization with overflow protection
- **Personality Insights**: Detailed analysis based on assessment results
- **Career Recommendations**: Personalized career suggestions with descriptions
- **Responsive Design**: Mobile-friendly results display

## 📊 Database Schema

### Students Table
- `id` (UUID, Primary Key)
- `name` (String, Required)
- `age` (Integer, Required)
- `education` (String, Required)
- `preferredSubjects` (Text, Optional)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

### Results Table
- `id` (UUID, Primary Key)
- `studentId` (UUID, Foreign Key)
- `analytical` (Integer)
- `creative` (Integer)
- `social` (Integer)
- `practical` (Integer)
- `business` (Integer)
- `personality` (String)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

## 🔧 API Endpoints

### Session Management
- `POST /api/session` - Create student session and store student information

### Assessment
- `GET /api/questions` - Fetch all assessment questions from backend
- `POST /api/submit` - Submit assessment answers for processing

### Results
- `GET /api/result/:id` - Fetch saved assessment results

## 🎯 Assessment Logic

### Scoring System
- **Strongly Agree**: +2 points to category
- **Agree**: +1 point to category
- **Neutral**: 0 points
- **Disagree**: +1 point to opposite category
- **Strongly Disagree**: +2 points to opposite category

### Personality Categories
1. **Analytical**: Logical, systematic, data-driven thinking
2. **Creative**: Innovative, artistic, imaginative problem-solving
3. **Social**: Interpersonal, helpful, empathetic approach
4. **Practical**: Hands-on, technical, mechanical skills
5. **Business**: Leadership, strategic, organizational abilities

### Career Mappings

#### Analytical Personality
- Software Developer
- Data Analyst
- Engineer
- Scientist
- Research Analyst
- Financial Analyst

#### Creative Personality
- UI/UX Designer
- Animator
- Writer
- Graphic Designer
- Content Creator
- Art Director

#### Social Personality
- Teacher
- Psychologist
- HR Manager
- Counselor
- Social Worker
- Healthcare Professional

#### Practical Personality
- Mechanical Technician
- Electrician
- Civil Supervisor
- Field Engineer
- Construction Manager
- Maintenance Technician

#### Business Personality
- Entrepreneur
- Marketing Manager
- Sales Manager
- Business Analyst
- Product Manager
- Management Consultant

## 🏗 Project Structure

```
career-assessment-platform/
├── backend/
│   ├── config/
│   │   ├── database.js          # Database configuration with env vars
│   │   └── config.json          # Database configuration file
│   ├── models/
│   │   ├── Student.js           # Student model
│   │   ├── Result.js            # Result model
│   │   └── index.js             # Model exports
│   ├── routes/
│   │   ├── session.js           # Session management API
│   │   ├── questions.js         # Assessment questions API
│   │   ├── submit.js            # Answer submission API
│   │   └── result.js            # Result retrieval API
│   ├── .env.example             # Environment variables template
│   ├── .gitignore               # Git ignore file
│   ├── package.json
│   └── server.js                # Express server
├── frontend/
│   ├── src/
│   │   ├── types/
│   │   │   └── index.ts         # Shared TypeScript definitions
│   │   ├── pages/
│   │   │   ├── Landing.tsx      # Landing page component
│   │   │   ├── StudentForm.tsx  # Student form with validation
│   │   │   ├── Assessment.tsx   # Assessment with API integration
│   │   │   └── Results.tsx      # Results display component
│   │   ├── App.tsx              # Main application with routing
│   │   └── index.css            # Global styles
│   ├── .env.example             # Environment variables template
│   ├── .gitignore               # Git ignore file
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🎨 UI Components & Features

### Form Validation System
- **Real-time Validation**: Immediate feedback on user input
- **Age Verification**: Strict 18+ age requirement
- **Name Requirements**: Minimum 3 characters excluding spaces
- **Error Display**: Clear, contextual error messages
- **Visual Feedback**: Red borders and error text for invalid fields

### Assessment Interface
- **Progress Tracking**: Visual progress bar with percentage
- **Question Navigation**: Previous/Next buttons with validation
- **Likert Scale**: 5-point agreement scale for responses
- **Loading States**: Proper loading indicators during API calls
- **Error Handling**: Graceful error handling with user feedback

### Results Dashboard
- **Dynamic Progress Bars**: Relative score visualization
- **Personality Analysis**: Detailed breakdown of personality traits
- **Career Recommendations**: Personalized career suggestions
- **Responsive Design**: Mobile-friendly layout
- **Interactive Elements**: Tabbed interface for different views

## 🔧 Configuration & Environment

### Environment Variables
The application uses environment variables for flexible configuration:

#### Backend (.env)
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment mode (development/test/production)
- `DB_HOST`: Database host
- `DB_PORT`: Database port
- `DB_NAME`: Database name
- `DB_USER`: Database username
- `DB_PASS`: Database password
- `API_BASE_URL`: Base URL for internal API calls

#### Frontend (.env)
- `VITE_API_BASE_URL`: Base URL for backend API

### Git Ignore Configuration
Both frontend and backend include comprehensive `.gitignore` files:
- Environment variables (.env files)
- Node modules and dependencies
- Build outputs and dist folders
- IDE configuration files
- Log files and temporary files

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Configure PostgreSQL database connection
3. Build and deploy to your preferred hosting platform
4. Ensure all environment variables are properly set

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Update `VITE_API_BASE_URL` for production environment
4. Ensure CORS is properly configured for production domains

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following the existing code style
4. Add proper TypeScript types for new features
5. Test thoroughly including form validation
6. Submit a pull request with clear description

## 📝 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify PostgreSQL is running
   - Check database credentials in .env
   - Ensure database exists: `createdb career_assessment`

2. **Form Validation Issues**
   - Check browser console for validation errors
   - Ensure age is 18 or above
   - Verify name has at least 3 characters (excluding spaces)

3. **API Connection Issues**
   - Verify backend server is running on port 5000
   - Check environment variables in both frontend and backend
   - Ensure CORS is properly configured

4. **Environment Variable Issues**
   - Copy .env.example to .env in both folders
   - Update database credentials to match your setup
   - Restart servers after changing environment variables

5. **Assessment Not Loading**
   - Check browser console for API errors
   - Verify `/api/questions` endpoint is accessible
   - Ensure frontend can reach backend API

## 📞 Support

For support and questions:
1. Check the troubleshooting section above
2. Open an issue in the repository with detailed description
3. Include browser console errors if applicable
4. Provide steps to reproduce the issue

---

**Built with ❤️ using React, Node.js, PostgreSQL, and TypeScript**
