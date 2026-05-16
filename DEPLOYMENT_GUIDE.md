# Deployment Guide: Render & Vercel

This guide explains how to deploy the Candidate Shortlisting System on **Render** (backend) and **Vercel** (frontend).

## Prerequisites
- GitHub account with the project repository
- Render account (render.com)
- Vercel account (vercel.com)
- MongoDB Atlas account with connection string
- OpenRouter API key

---

## Part 1: Backend Deployment on Render

### Step 1: Prepare GitHub Repository
1. Push your project to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/candidate-shortlisting.git
git push -u origin main
```

### Step 2: Create Render Service
1. Go to [render.com](https://render.com)
2. Sign in and click **New +**
3. Select **Web Service**
4. Connect your GitHub repository
5. Configure the service:
   - **Name**: `candidate-shortlisting-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`

### Step 3: Set Environment Variables on Render
In the Render dashboard, go to **Environment** and add:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `OPENROUTER_API_KEY` | Your OpenRouter API key |
| `NODE_ENV` | `production` |
| `PORT` | `5000` (auto-assigned, can leave default) |

### Step 4: Deploy
- Click **Deploy**
- Wait for deployment to complete
- Your backend URL will be: `https://candidate-shortlisting-backend.onrender.com`

---

## Part 2: Frontend Deployment on Vercel

### Step 1: Vercel CLI Setup (Optional but Recommended)
```bash
npm install -g vercel
```

### Step 2: Deploy from GitHub (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure the project:
   - **Framework**: React
   - **Root Directory**: `frontend`

### Step 3: Environment Variables on Vercel
Set the environment variable in project settings:

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `https://candidate-shortlisting-backend.onrender.com/api` |

### Step 4: Deploy
- Vercel will automatically deploy
- Your frontend URL will be: `https://candidate-shortlisting.vercel.app` (or your custom domain)

---

## Part 3: Update Configuration Files

### Backend .env (for Render)
```
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/candidate-shortlisting
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxx
NODE_ENV=production
PORT=5000
```

### Frontend .env (for local development)
```
REACT_APP_API_URL=https://candidate-shortlisting-backend.onrender.com/api
```

### Frontend .env.production (optional, for production builds)
```
REACT_APP_API_URL=https://candidate-shortlisting-backend.onrender.com/api
```

---

## Part 4: Verify Deployment

### Test Backend
```bash
curl https://candidate-shortlisting-backend.onrender.com/api/health
```
Expected response:
```json
{"status":"Server is running"}
```

### Test Frontend
1. Open your Vercel URL in browser
2. Navigate to the **Candidates** tab
3. Try adding a candidate to verify API connection

---

## Troubleshooting

### Backend Issues

**500 Error on API calls:**
- Check MongoDB connection string in Render environment variables
- Verify OPENROUTER_API_KEY is set correctly
- Check Render logs for error messages

**Connection timeout:**
- Ensure MongoDB Atlas allows connections from Render's IP
- Go to MongoDB Atlas → Network Access → Add IP Address → Allow from anywhere (0.0.0.0/0)

### Frontend Issues

**API endpoint not found:**
- Verify `REACT_APP_API_URL` is set in Vercel environment variables
- Make sure backend is running on Render
- Check browser console for CORS errors

**Build fails on Vercel:**
- Ensure `frontend/package.json` exists with correct scripts
- Check that all dependencies are listed in package.json
- Verify Node version compatibility

---

## Important Notes

⚠️ **Security Considerations:**
- Never commit `.env` files to GitHub
- Use Render and Vercel environment variable management for secrets
- Keep API keys private and rotate them regularly
- MongoDB Atlas: Restrict IP access to known addresses in production

⏱️ **Cold Start:** 
- Render free tier may have cold starts (takes longer to respond after inactivity)
- Consider upgrading to paid tier for production use

🔄 **Auto-Deployment:**
- Both Render and Vercel auto-deploy on GitHub push
- Configure webhook in repository settings if needed

---

## Useful Commands

### Local Testing (Before Deployment)
```bash
# Backend
cd backend
npm install
npm start

# Frontend (in another terminal)
cd frontend
npm install
REACT_APP_API_URL=http://localhost:5000/api npm start
```

### Vercel CLI Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project root
cd frontend
vercel
```

---

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [OpenRouter API Docs](https://openrouter.ai/docs)

---

**Deployment Summary:**
- ✅ Backend running on Render
- ✅ Frontend deployed on Vercel
- ✅ Environment variables configured
- ✅ API communication verified
- ✅ Ready for production use
