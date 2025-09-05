# 🧠 MCQ-Genius  link - https://mcq-genius.vercel.app

A powerful web application that automatically generates Multiple Choice Questions (MCQs) from uploaded documents using AI. Built with React, Node.js, and integrated with various AI services for intelligent question generation.
## ✨ Features

### 🎯 Core Functionality
- **Document Upload**: Support for PDF, DOCX, TXT, PPT and image files
- **AI-Powered MCQ Generation**: Automatically creates questions from document content
- **Interactive Quiz Interface**: Beautiful, responsive quiz taking experience
- **Answer Review**: Detailed review of answers with explanations
- **User Authentication**: Secure login/signup with Clerk
- **Progress Tracking**: Visual progress indicators and statistics

### 🔧 Technical Features
- **Multi-format Document Processing**: PDF, Word, text, and image files
- **OCR Support**: Extract text from images using Tesseract.js
- **Multiple AI Providers**: OpenAI, Google Gemini, Cohere integration
- **Real-time Processing**: Live progress updates during document processing
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Modern UI**: Built with Radix UI and Tailwind CSS

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Clerk account for authentication
- AI API keys (OpenAI, Google Gemini, or Cohere)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mcq-genius.git
   cd mcq-genius
   ```

2. **Install dependencies**
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Environment Setup**
   
   **Client (.env.local)**
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key_here
   ```

   **Server (.env)**
   ```env
   # Database
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key

   # AI Services (choose one or more)
   OPENAI_API_KEY=your_openai_key
   GOOGLE_API_KEY=your_google_gemini_key
   COHERE_API_KEY=your_cohere_key

   # Server
   PORT=3001
   ```

4. **Start the application**
   ```bash
   # Start the server
   cd server
   npm start

   # Start the client (in a new terminal)
   cd client
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
mcq-genius/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/         # Base UI components (Radix UI)
│   │   │   ├── quiz-interface.jsx
│   │   │   ├── answer-review.jsx
│   │   │   └── ...
│   │   ├── pages/          # Page components
│   │   │   ├── Auth.jsx
│   │   │   ├── dashboard.jsx
│   │   │   ├── upload.jsx
│   │   │   └── quiz.jsx
│   │   ├── lib/            # Utilities and configurations
│   │   └── store/          # State management (Zustand)
│   ├── public/
│   └── package.json
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── services/       # Business logic
│   │   ├── middlewares/    # Custom middlewares
│   │   └── config/         # Database configuration
│   └── package.json
└── README.md
```

## 🎮 Usage

### 1. Authentication
- Sign up or log in using Clerk authentication
- Secure user management with social login options

### 2. Upload Document
- Navigate to the upload page
- Drag and drop or select your document
- Choose question count and difficulty level
- Supported formats: PDF, DOCX, TXT, images

### 3. Generate MCQs
- AI processes your document and generates questions
- Real-time progress updates
- Questions are automatically saved to your account

### 4. Take Quiz
- Interactive quiz interface with progress tracking
- Answer questions at your own pace
- Skip questions and navigate back and forth

### 5. Review Results
- View your score and performance statistics
- Review all answers with detailed explanations
- Retake quiz or create new ones

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Wouter** - Lightweight routing
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Zustand** - State management
- **React Query** - Data fetching and caching
- **Clerk** - Authentication and user management

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **Supabase** - Database and authentication
- **Multer** - File upload handling
- **PDF-parse** - PDF text extraction
- **Mammoth** - DOCX processing
- **Tesseract.js** - OCR for images
- **Sharp** - Image processing

### AI Services
- **OpenAI GPT** - Question generation
- **Google Gemini** - Alternative AI provider
- **Cohere** - Additional AI capabilities

## 🔧 Configuration

### AI Provider Setup

The application supports multiple AI providers. Configure your preferred one:

**OpenAI**
```env
OPENAI_API_KEY=your_openai_key
```

**Google Gemini**
```env
GOOGLE_API_KEY=your_google_gemini_key
```

**Cohere**
```env
COHERE_API_KEY=your_cohere_key
```

### Database Setup

1. Create a Supabase project
2. Set up the required tables:
   - `users` - User information
   - `note_sets` - Document collections
   - `mcq_questions` - Generated questions

## 📱 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Backend (Railway/Heroku)
1. Connect your repository
2. Set environment variables
3. Deploy with automatic builds

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Clerk](https://clerk.com/) for authentication
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [OpenAI](https://openai.com/) for AI capabilities
- [Supabase](https://supabase.com/) for backend services

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Contact the development team

---

**Made with ❤️ by the MCQ-Genius team**
