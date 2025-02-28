# Matching App

A modern web application for connecting people based on shared interests, preferences, and compatibility.

## Technologies

This application is built with a powerful modern stack:

- [Next.js](https://nextjs.org) - React framework for production
- [NextAuth.js](https://next-auth.js.org) - Authentication for Next.js
- [Prisma](https://prisma.io) - Type-safe database client
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework

## Features

- User authentication with LinkedIn integration
- Comprehensive professional profile creation and customization
- Detailed skills and experience management
- Project portfolio showcase
- Professional preferences tracking
- Responsive design for all devices

### Planned Features
- Matching algorithm based on complementary skills and preferences
- Real-time messaging between matched users

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn
- A database (PostgreSQL recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/matching-app.git
   cd matching-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   # Authentication (NextAuth.js)
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000/"
   
   # Database (Neon PostgreSQL)
   DATABASE_URL="postgres://username:password@your-neon-db-host/dbname?sslmode=require"
   DIRECT_URL="postgres://username:password@your-neon-db-host/dbname?sslmode=require"
   
   # For Neon with Vercel deployment
   POSTGRES_PRISMA_URL="postgres://username:password@your-neon-db-host/dbname?sslmode=require&pgbouncer=true&connect_timeout=15"
   POSTGRES_URL="postgres://username:password@your-neon-db-host/dbname?sslmode=require"
   POSTGRES_URL_NON_POOLING="postgres://username:password@your-neon-db-host-non-pooling/dbname?sslmode=require"
   POSTGRES_USER="your-db-username"
   POSTGRES_HOST="your-neon-db-host"
   POSTGRES_PASSWORD="your-db-password"
   POSTGRES_DATABASE="your-db-name"
   
   # App URL
   NEXT_PUBLIC_APP_URL="http://localhost:3000/"
   
   # Email (Resend)
   RESEND_API_KEY="your-resend-api-key"
   ```

   And create a `.env.local` file for OAuth credentials:
   ```
   # OAuth providers
   AUTH_SECRET="your-auth-secret"
   AUTH_LINKEDIN_ID="your-linkedin-client-id"
   AUTH_LINKEDIN_SECRET="your-linkedin-client-secret"
   
   # Additional providers (optional)
   AUTH_GITHUB_ID="your-github-client-id"
   AUTH_GITHUB_SECRET="your-github-client-secret"
   AUTH_GOOGLE_ID="your-google-client-id"
   AUTH_GOOGLE_SECRET="your-google-client-secret"
   ```

4. Initialize the database:
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Create and apply migrations to development database
   npx prisma migrate dev
   
   # Apply migrations to production database
   npx prisma migrate deploy
   
   # Reset database (caution: deletes all data)
   npx prisma migrate reset
   
   # Open Prisma Studio to view/edit data
   npx prisma studio
   
   # Pull schema from existing database
   npx prisma db pull
   
   # Push schema to database without migrations
   npx prisma db push
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Database Schema

The application uses Prisma with PostgreSQL and includes the following models:

### Core Models
- `User`: Central user model with profile information, authentication data, and professional details
- `Account`: OAuth account connections (for NextAuth.js)
- `VerificationToken`: Email verification
- `PasswordResetToken`: Password reset functionality

### Profile & Skills
- `TechnicalSkills`: User's technical capabilities
- `SoftSkills`: User's interpersonal and non-technical skills
- `WorkExperience`: Professional history
- `Education`: Academic background

### Preferences & Projects
- `JobPreference`: Career preferences including roles, work arrangements, and industries
- `TandemPreference`: Matching preferences for finding complementary partners
- `Project`: Portfolio projects with descriptions and images
- `Reference`: Professional references
- `AdditionalInfo`: Supplementary user information including hobbies, languages, and work schedule

### Enumerated Types
The schema uses various enum types to standardize options:
- `EmploymentStatus`: Freelance, Full-Time, Part-Time, etc.
- `JobRoleFamily`: Software Development, Data, Design, etc.
- `WorkMode`: Remote, Hybrid, On-site
- `Industry`: IT, Finance, Health, etc.
- `Roles`: Frontend Developer, Data Scientist, Product Manager, etc.

## Authentication

This app uses NextAuth.js for authentication, supporting:

- Email/Password
- LinkedIn OAuth
- Other providers can be easily added

## Deployment

### Deploying to Vercel

The app is deployed on Vercel with continuous integration:

1. The production environment is automatically updated whenever changes are merged into the `main` branch
2. Each pull request generates a preview deployment
3. Environment variables are configured in the Vercel dashboard
4. No manual deployment steps are required - just merge your code to trigger a rebuild

### Other Hosting Options

The app can also be deployed to any hosting service that supports Node.js applications, such as:

- Railway
- Heroku
- DigitalOcean
- AWS

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to the creators of Next.js, NextAuth.js, Prisma, and Tailwind CSS for making such powerful tools
- Inspired by modern matching platforms
