# Candidate Profile Shortlisting System

A comprehensive web application for filtering and ranking candidates based on required skill sets, with AI-powered intelligent matching using OpenRouter API.

## Features

### ✨ Core Features
- **Candidate Management**: Add, view, update, and delete candidate profiles with skills, experience, and project details
- **Job Requirement Input**: Define required skills, minimum experience, and preferred qualifications
- **Basic Skill Matching**: Filter and rank candidates using skill overlap and experience matching
- **AI-Based Shortlisting**: Intelligent candidate suggestions using OpenRouter API (GPT models)
- **Interview Question Generation**: Auto-generate technical interview questions based on candidate profile and job requirements

### 📊 Bonus Features
- **Search & Filter**: Search candidates by name, skills, and experience level
- **Match Score Visualization**: Charts showing match distributions and rankings
- **Candidate Ranking System**: Categorize candidates as High/Medium/Low match
- **Save Shortlisted Candidates**: Select and manage multiple candidates
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Project Structure

```
ESE_sample/
├── backend/
│   ├── models/
│   │   └── Candidate.js          # MongoDB candidate schema
│   ├── controllers/
│   │   ├── candidateController.js # CRUD operations
│   │   ├── matchingController.js   # Basic matching logic
│   │   └── aiController.js         # AI integration
│   ├── routes/
│   │   ├── candidates.js           # Candidate endpoints
│   │   ├── matching.js             # Matching endpoints
│   │   └── aiSuggestions.js        # AI endpoints
│   ├── utils/
│   │   ├── matchingLogic.js        # Matching algorithms
│   │   └── openRouterAPI.js        # OpenRouter integration
│   ├── server.js                   # Express server
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CandidateForm.js
│   │   │   ├── JobRequirementForm.js
│   │   │   ├── CandidateList.js
│   │   │   └── ShortlistedResults.js
│   │   ├── services/
│   │   │   └── api.js              # API calls
│   │   ├── styles/
│   │   │   ├── form.css
│   │   │   ├── list.css
│   │   │   └── shortlist.css
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- OpenRouter API key (for AI features)

## Setup Instructions

### Backend Setup

1. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment Variables**
   - Copy the `.env` file and update with your settings:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/candidate-shortlisting
   OPENROUTER_API_KEY=your_api_key_here
   NODE_ENV=development
   ```

3. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

4. **Run the Backend Server**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure Environment Variables**
   - Create a `.env` file from `.env.example`:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. **Start the Frontend Development Server**
   ```bash
   npm start
   ```
   App will open at `http://localhost:3000`

## API Endpoints

### Candidate Management

**POST** `/api/candidates` - Add a new candidate
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@gmail.com",
  "skills": ["React", "Node.js", "MongoDB"],
  "experience": 2,
  "bio": "Full-stack developer",
  "projects": ["E-commerce Platform", "CRM System"]
}
```

**GET** `/api/candidates` - Get all candidates

**GET** `/api/candidates/:id` - Get candidate by ID

**GET** `/api/candidates/search?name=Rahul` - Search candidates

**PUT** `/api/candidates/:id` - Update candidate

**DELETE** `/api/candidates/:id` - Delete candidate

### Matching & AI

**POST** `/api/match` - Basic skill matching
```json
{
  "requiredSkills": ["React", "Node.js"],
  "minExperience": 1,
  "preferredSkills": ["AWS", "Docker"]
}
```

**POST** `/api/ai/shortlist` - AI-based shortlisting
```json
{
  "requiredSkills": ["React", "Node.js"],
  "minExperience": 2,
  "preferredSkills": ["AWS"]
}
```

**POST** `/api/ai/questions` - Generate interview questions
```json
{
  "candidateId": "candidate_id_here",
  "requiredSkills": ["React", "Node.js"],
  "minExperience": 2
}
```

## Matching Algorithm

### Basic Matching
1. **Skill Match Score** = (Matched Skills / Required Skills) × 100
2. **Experience Bonus** = +10 points if experience meets requirement
3. **Preferred Skills Bonus** = (Matched Preferred / Total Preferred) × 10

### Ranking Categories
- **High Match** (70%+): Strong fit for the position
- **Medium Match** (40-69%): Potential fit with some gaps
- **Low Match** (<40%): Insufficient match

## OpenRouter API Integration

The system uses OpenRouter API for:
- **Intelligent candidate ranking** beyond simple keyword matching
- **Detailed candidate analysis** and fit explanations
- **Automated interview question generation** tailored to job requirements

### Getting OpenRouter API Key
1. Visit [OpenRouter.ai](https://openrouter.ai)
2. Sign up and create an account
3. Generate an API key from the dashboard
4. Add it to your `.env` file

## Usage

### Adding Candidates
1. Navigate to **Candidates** tab
2. Fill in candidate details (name, email, skills, experience)
3. Click **Add Candidate**

### Basic Shortlisting
1. Go to **Shortlisting** tab
2. Enter job requirements (required skills, minimum experience)
3. Select **Basic Skill Matching**
4. View results with match scores and rankings

### AI-Based Shortlisting
1. Go to **Shortlisting** tab
2. Enter job requirements
3. Select **AI-Based Shortlisting**
4. View AI analysis with detailed recommendations

### Generate Interview Questions
1. In **Candidates** tab, check candidates
2. Click **Generate Interview Questions**
3. Select a candidate and enter job requirements
4. AI will generate 5 targeted interview questions

## Sample Data

To test the system, you can add these sample candidates:

```
1. Name: Priya Desai
   Email: priya@example.com
   Skills: React, TypeScript, Node.js, GraphQL, Docker
   Experience: 3 years
   Bio: Senior full-stack developer with microservices experience

2. Name: Ankit Patel
   Email: ankit@example.com
   Skills: React, Vue.js, HTML, CSS
   Experience: 1 year
   Bio: Junior frontend developer

3. Name: Bhavna Verma
   Email: bhavna@example.com
   Skills: Node.js, MongoDB, PostgreSQL, AWS, Redis
   Experience: 2.5 years
   Bio: Backend developer with cloud expertise
```

## Technologies Used

### Backend
- **Express.js** - Web framework
- **MongoDB & Mongoose** - Database
- **Axios** - HTTP client
- **OpenRouter API** - AI integration

### Frontend
- **React 18** - UI library
- **React Router** - Routing
- **Chart.js** - Data visualization
- **Axios** - API calls

## Error Handling

The system includes comprehensive error handling for:
- Missing required fields
- Invalid data formats
- Database connection issues
- API rate limiting
- Network errors

## Future Enhancements

- [ ] Resume parsing and extraction
- [ ] Skill similarity matching (fuzzy search)
- [ ] Bulk candidate import (CSV)
- [ ] Email notifications
- [ ] Interview scheduling
- [ ] Candidate feedback system
- [ ] Advanced analytics dashboard
- [ ] User authentication & authorization

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env`

### CORS Error
- Make sure frontend and backend are on correct ports
- Check `CORS` configuration in `server.js`

### OpenRouter API Error
- Verify API key is correct
- Check API rate limits
- Ensure internet connection is active

### Port Already in Use
- Change `PORT` in `.env` (backend)
- Kill process using the port or restart computer

## License

MIT License - Feel free to use this project for educational and commercial purposes.

## Support

For issues, questions, or suggestions, please create an issue in the repository or contact the development team.

---

**Built with ❤️ using modern web technologies and AI**
