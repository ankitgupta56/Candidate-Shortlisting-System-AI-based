# Deployment Checklist

## Pre-Deployment Checklist

### ✅ Code Preparation
- [ ] All code is committed to GitHub
- [ ] `.env` file is in `.gitignore` (never commit secrets)
- [ ] Backend `server.js` uses `process.env.PORT` and `process.env.MONGODB_URI`
- [ ] Frontend `api.js` uses `process.env.REACT_APP_API_URL`
- [ ] No hardcoded URLs or API keys in code
- [ ] All dependencies are in `package.json`
- [ ] Application works locally

### ✅ Environment Variables Collected
Backend needs:
- [ ] MongoDB Atlas connection string (`MONGODB_URI`)
- [ ] OpenRouter API key (`OPENROUTER_API_KEY`)

Frontend needs:
- [ ] Backend API URL (`REACT_APP_API_URL`) - will be Render URL
- [ ] (Optional) Any other API endpoints

### ✅ Accounts Created
- [ ] GitHub account with repository
- [ ] Render account (render.com)
- [ ] Vercel account (vercel.com)
- [ ] MongoDB Atlas account
- [ ] OpenRouter account

---

## Backend Deployment (Render) - Step by Step

### 1. Push Code to GitHub
```bash
git push origin main
```

### 2. Go to render.com
- Sign in / Create account
- Click "New +"
- Select "Web Service"

### 3. Connect GitHub Repository
- Select your `candidate-shortlisting` repository
- Click "Connect"

### 4. Configure Service
| Setting | Value |
|---------|-------|
| Name | `candidate-shortlisting-backend` |
| Environment | `Node` |
| Build Command | `cd backend && npm install` |
| Start Command | `cd backend && npm start` |
| Plan | Free (or paid for better performance) |

### 5. Add Environment Variables
Click "Advanced" → "Add Environment Variable"

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `OPENROUTER_API_KEY` | Your OpenRouter API key |
| `NODE_ENV` | `production` |

### 6. Deploy
- Click "Create Web Service"
- Wait for deployment (usually 2-5 minutes)
- Note the URL: `https://YOUR-SERVICE-NAME.onrender.com`

### 7. Verify Backend
```
GET https://YOUR-SERVICE-NAME.onrender.com/api/health
Expected: {"status":"Server is running"}
```

---

## Frontend Deployment (Vercel) - Step by Step

### 1. Go to vercel.com
- Sign in / Create account
- Click "Add New"
- Select "Project"

### 2. Import GitHub Repository
- Click "Import Git Repository"
- Select your `candidate-shortlisting` repository
- Click "Import"

### 3. Configure Project
| Setting | Value |
|---------|-------|
| Framework Preset | React |
| Root Directory | `frontend` |
| Build Command | `npm run build` (default) |
| Output Directory | `build` (default) |

### 4. Add Environment Variables
- Expand "Environment Variables" section
- Add new variable:

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `https://YOUR-BACKEND-URL/api` |

(Replace `YOUR-BACKEND-URL` with your Render backend URL)

### 5. Deploy
- Click "Deploy"
- Wait for deployment (usually 1-2 minutes)
- Note the URL: `https://your-project.vercel.app`

### 6. Verify Frontend
- Open your Vercel URL in browser
- Navigate to "Candidates" tab
- Try adding a candidate
- Check browser console for errors

---

## Post-Deployment Checklist

### ✅ Backend Verification
- [ ] Health check endpoint responds: `GET /api/health`
- [ ] Can add candidate: `POST /api/candidates`
- [ ] Can retrieve candidates: `GET /api/candidates`
- [ ] MongoDB connection is stable
- [ ] API keys are working

### ✅ Frontend Verification
- [ ] Application loads without errors
- [ ] Can navigate between tabs
- [ ] Can view candidates list
- [ ] Can add new candidate
- [ ] Can use shortlisting feature
- [ ] AI features work correctly
- [ ] No CORS errors in console

### ✅ End-to-End Testing
1. [ ] Add candidate on frontend
2. [ ] Data appears in backend database
3. [ ] Can update candidate
4. [ ] Can delete candidate
5. [ ] Shortlisting algorithm works
6. [ ] AI analysis generates correctly

---

## Troubleshooting Guide

### Backend Won't Deploy
**Problem:** Build fails on Render
- [ ] Check that `backend/package.json` exists
- [ ] Verify `backend/server.js` exists
- [ ] Check Render build logs for specific error
- [ ] Ensure all dependencies are in `backend/package.json`

### API Connection Failed
**Problem:** Frontend shows "Cannot connect to API"
- [ ] Verify `REACT_APP_API_URL` in Vercel is correct
- [ ] Check that Render backend is running
- [ ] Test backend health: `curl https://YOUR-BACKEND-URL/api/health`
- [ ] Check browser console for CORS errors

### Database Connection Error
**Problem:** Backend logs "MongoDB connection error"
- [ ] Verify `MONGODB_URI` is correct in Render environment
- [ ] Check MongoDB Atlas network access (allow 0.0.0.0/0)
- [ ] Verify credentials in connection string
- [ ] Test connection string locally first

### OpenRouter API Errors
**Problem:** AI features don't work
- [ ] Verify `OPENROUTER_API_KEY` is set in Render
- [ ] Check API key is valid and not expired
- [ ] Check OpenRouter account has credits
- [ ] Review OpenRouter error logs

---

## Important Security Notes

🔒 **Never:**
- [ ] Commit `.env` file to GitHub
- [ ] Share API keys in chat or emails
- [ ] Hardcode credentials in code
- [ ] Use development API keys in production

🛡️ **Always:**
- [ ] Use Render/Vercel environment variable management
- [ ] Keep API keys private and rotate regularly
- [ ] Monitor API usage and costs
- [ ] Restrict database access by IP if possible
- [ ] Enable 2FA on all accounts

---

## Quick Links

- **Render Dashboard:** https://dashboard.render.com
- **Vercel Dashboard:** https://vercel.com/dashboard
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas
- **OpenRouter:** https://openrouter.ai
- **GitHub:** https://github.com

---

## Need Help?

Check the main `DEPLOYMENT_GUIDE.md` for more detailed information.
