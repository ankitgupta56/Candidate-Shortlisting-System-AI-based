# Quick Start Guide

## 🚀 5-Minute Setup

### Prerequisites
- Node.js installed
- MongoDB installed or cloud instance (MongoDB Atlas)
- OpenRouter API key (optional for AI features)

### Step 1: Backend Setup (3 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file with your settings
# Edit .env with MongoDB and OpenRouter keys

# Start the server
npm start
```

✅ Backend running at: `http://localhost:5000`

### Step 2: Frontend Setup (2 minutes)

```bash
# Open new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the application
npm start
```

✅ Frontend running at: `http://localhost:3000`

---

## 🧪 Test the System

### Test Data
Use these credentials to add test candidates:

**Candidate 1: Senior Full-Stack Developer**
- Name: Priya Desai
- Email: priya@example.com
- Skills: React, Node.js, MongoDB, AWS, Docker
- Experience: 3
- Bio: Senior full-stack developer with microservices expertise

**Candidate 2: Junior Frontend Developer**
- Name: Ankit Patel
- Email: ankit@example.com
- Skills: React, HTML, CSS, JavaScript
- Experience: 1
- Bio: Enthusiastic junior frontend developer

**Candidate 3: Backend Developer**
- Name: Bhavna Verma
- Email: bhavna@example.com
- Skills: Node.js, MongoDB, PostgreSQL, AWS
- Experience: 2
- Bio: Backend developer with database optimization skills

### Test Workflow

1. **Add Candidates**
   - Go to "Candidates" tab
   - Add the test candidates above

2. **Test Basic Matching**
   - Go to "Shortlisting" tab
   - Enter Required Skills: `React, Node.js`
   - Enter Minimum Experience: `2`
   - Select "Basic Skill Matching"
   - View the results

3. **Test AI Features** (requires API key)
   - Use same job requirements
   - Select "AI-Based Shortlisting"
   - View AI analysis and recommendations

---

## 🔑 Getting OpenRouter API Key

1. Visit https://openrouter.ai
2. Sign up with Google or email
3. Go to Dashboard → Keys
4. Create new API key
5. Copy and paste into `.env` file:
   ```
   OPENROUTER_API_KEY=your_key_here
   ```

---

## 📚 API Testing

### Using Postman or cURL

**Add Candidate (POST)**
```bash
curl -X POST http://localhost:5000/api/candidates \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "skills": ["React", "Node.js"],
    "experience": 2,
    "bio": "Test candidate"
  }'
```

**Get All Candidates (GET)**
```bash
curl http://localhost:5000/api/candidates
```

**Basic Matching (POST)**
```bash
curl -X POST http://localhost:5000/api/match \
  -H "Content-Type: application/json" \
  -d '{
    "requiredSkills": ["React", "Node.js"],
    "minExperience": 1,
    "preferredSkills": ["AWS"]
  }'
```

---

## ⚠️ Common Issues & Solutions

### Issue: MongoDB Connection Error
**Solution:**
- Start MongoDB: `mongod`
- Or use MongoDB Atlas (cloud)
- Update `MONGODB_URI` in `.env`

### Issue: Port 5000 in Use
**Solution:**
```bash
# Kill process on port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :5000
kill -9 <PID>
```

### Issue: CORS Error
**Solution:**
- Make sure backend runs on port 5000
- Make sure frontend runs on port 3000
- Check CORS settings in `server.js`

### Issue: AI Features Not Working
**Solution:**
- Get OpenRouter API key from https://openrouter.ai
- Add to `.env`: `OPENROUTER_API_KEY=your_key`
- Restart backend server

---

## 📖 File Structure Reference

```
backend/
├── server.js                    # Main server
├── models/Candidate.js          # Database schema
├── controllers/                 # Request handlers
├── routes/                      # API routes
├── utils/                       # Helper functions
└── .env                         # Environment variables

frontend/
├── src/
│   ├── components/              # React components
│   ├── services/api.js          # API calls
│   ├── styles/                  # CSS styles
│   └── App.js                   # Main component
└── public/index.html            # HTML template
```

---

## 💡 Usage Tips

1. **Search Feature**: In Candidates tab, use the search bar to find candidates by name

2. **Select Multiple**: Check boxes next to candidates to select multiple for bulk operations

3. **Match Score**: Higher percentage = better fit. 70%+ is excellent match.

4. **AI Analysis**: Provides detailed reasons why candidates are suitable (requires API key)

5. **Interview Questions**: Generated based on both candidate skills and job requirements

---

## 📞 Need Help?

1. Check the main README.md for detailed documentation
2. Review API endpoints documentation
3. Check browser console for error messages
4. Check server logs for API issues

---

**Happy Recruiting! 🎉**
