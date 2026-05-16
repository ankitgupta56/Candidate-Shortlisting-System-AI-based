# Testing Guide

## Unit Testing Guide

### Backend API Testing with cURL

#### 1. Test Candidate CRUD Operations

**Add a Candidate**
```bash
curl -X POST http://localhost:5000/api/candidates \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Priya Desai",
    "email": "priya@example.com",
    "skills": ["React", "Node.js", "MongoDB", "AWS"],
    "experience": 3,
    "bio": "Senior full-stack developer",
    "projects": ["E-commerce Platform", "CRM System"]
  }'
```

**Get All Candidates**
```bash
curl http://localhost:5000/api/candidates
```

**Get Candidate by ID**
```bash
curl http://localhost:5000/api/candidates/{ID}
# Replace {ID} with actual candidate ID from previous response
```

**Search Candidates by Name**
```bash
curl "http://localhost:5000/api/candidates/search?name=Priya"
```

**Update Candidate**
```bash
curl -X PUT http://localhost:5000/api/candidates/{ID} \
  -H "Content-Type: application/json" \
  -d '{
    "experience": 4
  }'
```

**Delete Candidate**
```bash
curl -X DELETE http://localhost:5000/api/candidates/{ID}
```

---

#### 2. Test Matching Endpoints

**Basic Skill Matching**
```bash
curl -X POST http://localhost:5000/api/match \
  -H "Content-Type: application/json" \
  -d '{
    "requiredSkills": ["React", "Node.js"],
    "minExperience": 2,
    "preferredSkills": ["AWS", "Docker"]
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "jobRequirements": {
    "requiredSkills": ["React", "Node.js"],
    "minExperience": 2,
    "preferredSkills": ["AWS", "Docker"]
  },
  "results": {
    "high": [...],
    "medium": [...],
    "low": [...]
  },
  "allCandidates": [...]
}
```

---

#### 3. Test AI Features (Requires API Key)

**AI Shortlisting**
```bash
curl -X POST http://localhost:5000/api/ai/shortlist \
  -H "Content-Type: application/json" \
  -d '{
    "requiredSkills": ["React", "Node.js"],
    "minExperience": 2,
    "preferredSkills": ["AWS"]
  }'
```

**Generate Interview Questions**
```bash
# First, get a candidate ID
CANDIDATE_ID="<ID from candidate list>"

curl -X POST http://localhost:5000/api/ai/questions \
  -H "Content-Type: application/json" \
  -d '{
    "candidateId": "'$CANDIDATE_ID'",
    "requiredSkills": ["React", "Node.js"],
    "minExperience": 2
  }'
```

---

## Frontend Testing

### 1. Candidate Management Testing

**Test Steps:**
1. Navigate to "Candidates" tab
2. Fill the form with test data:
   - Name: "Test Candidate"
   - Email: "test@example.com" 
   - Skills: "React, Node.js, MongoDB"
   - Experience: 2
   - Bio: "Test bio"
3. Click "Add Candidate"
4. Verify success message appears
5. See candidate appears in the list below

**Validation Tests:**
- Try adding without name (should fail)
- Try duplicate email (should fail)
- Try non-email format (should fail)

---

### 2. Search & Filter Testing

**Test Steps:**
1. In Candidates tab, search for "Test"
2. Should show matching candidates
3. Click "Reset" to show all candidates again

---

### 3. Basic Shortlisting Testing

**Test Steps:**
1. Go to "Shortlisting" tab
2. Enter Job Requirements:
   - Required Skills: "React, Node.js"
   - Minimum Experience: 2
   - Preferred Skills: "AWS"
3. Select "Basic Skill Matching"
4. Click "Generate Shortlist"
5. Verify results show:
   - High match candidates at top
   - Match scores displayed
   - Chart visualization

---

### 4. AI Shortlisting Testing (With API Key)

**Prerequisites:**
- OpenRouter API key in `.env`
- Backend restarted

**Test Steps:**
1. Go to "Shortlisting" tab
2. Enter same job requirements
3. Select "AI-Based Shortlisting"
4. Click "Generate Shortlist"
5. Wait for AI analysis
6. Verify AI results show:
   - Top candidates with suitability scores
   - Fit explanation
   - Strengths and gaps
   - Recommendations

---

### 5. Interview Questions Testing

**Test Steps:**
1. In Candidates tab, check 2-3 candidates
2. Click "Generate Interview Questions"
3. Select a candidate from dropdown
4. Enter job requirements
5. Click "Generate Questions"
6. Verify alert shows question count

---

### 6. Responsive Design Testing

**Mobile (iPhone size: 375px)**
- Header should stack properly
- Navigation should be readable
- Forms should be single column
- Cards should be full width

**Tablet (iPad size: 768px)**
- Two-column layout should work
- Charts should resize
- Navigation should be visible

**Desktop (1024px+)**
- Full layout with charts
- Side-by-side sections
- All features visible

---

## Sample Test Data Set

### Candidates to Add

**1. Senior Developer**
```
Name: Priya Desai
Email: priya.desai@example.com
Skills: React, Node.js, MongoDB, AWS, Docker, GraphQL
Experience: 3
Bio: Senior full-stack developer with microservices experience
Projects: E-commerce Platform, Real-time Analytics Dashboard
```

**2. Junior Developer**
```
Name: Ankit Kumar
Email: ankit.kumar@example.com
Skills: React, HTML, CSS, JavaScript
Experience: 1
Bio: Enthusiastic junior developer
Projects: Personal Portfolio, Todo App
```

**3. Backend Specialist**
```
Name: Bhavna Sharma
Email: bhavna.sharma@example.com
Skills: Node.js, MongoDB, PostgreSQL, AWS, Redis
Experience: 2
Bio: Backend developer with database optimization skills
Projects: API Gateway, Data Pipeline
```

**4. Full-Stack Mid-Level**
```
Name: Rahul Patel
Email: rahul.patel@example.com
Skills: React, Node.js, MySQL, AWS, Docker
Experience: 2
Bio: Full-stack developer transitioning to microservices
Projects: CRM System, Inventory Management
```

**5. UI/UX Developer**
```
Name: Neha Singh
Email: neha.singh@example.com
Skills: React, Vue.js, CSS3, TypeScript, Figma
Experience: 1.5
Bio: Frontend developer with design background
Projects: Landing Page Builder, Design System
```

---

## Test Scenarios

### Scenario 1: Hire Senior React Developer

**Job Requirements:**
- Required Skills: React, Node.js, AWS
- Min Experience: 2 years
- Preferred: Docker, GraphQL

**Expected Results:**
- Priya Desai: High Match (all skills + experience + preferred)
- Rahul Patel: High Match (all required + experience)
- Ankit Kumar: Low Match (only React)
- Neha Singh: Low Match (React only, no backend)

---

### Scenario 2: Hire Junior Frontend Developer

**Job Requirements:**
- Required Skills: React, CSS, HTML
- Min Experience: 0 years
- Preferred: TypeScript, Vue.js

**Expected Results:**
- Ankit Kumar: High Match
- Priya Desai: High Match
- Neha Singh: High Match
- Bhavna Sharma: Low Match

---

### Scenario 3: Hire Backend Developer

**Job Requirements:**
- Required Skills: Node.js, Database, AWS
- Min Experience: 2 years
- Preferred: MongoDB, Redis

**Expected Results:**
- Bhavna Sharma: High Match
- Priya Desai: High Match
- Rahul Patel: Medium Match
- Ankit Kumar: Low Match

---

## API Response Validation

### Success Response Format
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* actual data */ }
}
```

### Error Response Format
```json
{
  "success": false,
  "message": "Error description"
}
```

### Common Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `404`: Not Found
- `500`: Server Error

---

## Performance Testing

### Load Testing Notes
- Test with 50+ candidates
- Test with 10+ simultaneous API calls
- Monitor response times
- Check memory usage

### Recommended Tools
- Postman (API testing)
- k6 (Load testing)
- Chrome DevTools (Frontend)

---

## Browser Compatibility

### Tested Browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Features to Test
- Chart rendering
- Form validation
- CSS animations
- Local storage
- Fetch/Axios calls

---

## Common Test Issues & Solutions

### Issue: API Returns 404
**Solution:** Check candidate ID exists
```bash
curl http://localhost:5000/api/candidates
# Copy valid ID and use in requests
```

### Issue: Chart Not Rendering
**Solution:** Check Chart.js is installed
```bash
cd frontend && npm list chart.js react-chartjs-2
```

### Issue: AI Questions Return Empty
**Solution:** Verify API key and internet connection
```bash
echo $OPENROUTER_API_KEY  # Check if set
```

### Issue: Database Connection Error
**Solution:** Start MongoDB
```bash
mongod  # Windows/Mac/Linux
```

---

## CI/CD Testing Setup

### Pre-deployment Checklist
- [ ] All CRUD operations work
- [ ] Basic matching returns correct rankings
- [ ] AI features work (if API key available)
- [ ] Frontend loads without errors
- [ ] Charts render correctly
- [ ] Search functionality works
- [ ] Responsive design tested
- [ ] Error handling tested

---

## Automated Test Example (Jest)

```javascript
// Example: candidateController.test.js
const request = require('supertest');
const app = require('../server');

describe('Candidate APIs', () => {
  it('should add a new candidate', async () => {
    const res = await request(app)
      .post('/api/candidates')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        skills: ['React'],
        experience: 1
      });
    
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('should get all candidates', async () => {
    const res = await request(app)
      .get('/api/candidates');
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
```

---

**Testing Status: Ready for QA**

All test cases documented and ready to execute.
