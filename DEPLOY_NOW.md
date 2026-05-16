# Quick Deployment Guide - Render & Vercel

## 🚀 Deploy Backend to Render (5 minutes)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Create Render Service
1. Go to [render.com](https://render.com) → Sign In
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Fill in the form:
   ```
   Name: candidate-shortlisting-backend
   Build Command: cd backend && npm install
   Start Command: cd backend && npm start
   ```

### Step 3: Add Environment Variables (in Render)
- Click **Advanced** → **Add Environment Variable**
- Add these variables:
  - `MONGODB_URI`: Your MongoDB Atlas connection string
  - `OPENROUTER_API_KEY`: Your OpenRouter API key
  - `NODE_ENV`: `production`

### Step 4: Deploy
- Click **Create Web Service**
- Wait for deployment ✅
- Copy your URL (e.g., `https://candidate-shortlisting-backend.onrender.com`)

### Step 5: Test Backend
```
https://YOUR-RENDER-URL/api/health
```
Should return: `{"status":"Server is running"}`

---

## 🎨 Deploy Frontend to Vercel (5 minutes)

### Step 1: Open Vercel
Go to [vercel.com](https://vercel.com) → Sign In

### Step 2: Import Project
1. Click **Add New** → **Project**
2. Click **Import Git Repository**
3. Select your `candidate-shortlisting` repo

### Step 3: Configure
- **Root Directory**: `frontend`
- Everything else is default

### Step 4: Add Environment Variable
- Expand **Environment Variables**
- Add:
  - Name: `REACT_APP_API_URL`
  - Value: `https://YOUR-RENDER-URL/api` (from Step 5 above)

### Step 5: Deploy
- Click **Deploy**
- Wait for deployment ✅
- Your URL: `https://your-project.vercel.app`

---

## ✅ Verify Everything Works

1. Open your Vercel URL in browser
2. Go to **Candidates** tab
3. Add a test candidate
4. Check if it appears on the list
5. All working? 🎉

---

## 📝 Important Notes

- **Environment Variables**: Use Render & Vercel dashboards, never in .env files
- **MongoDB Access**: Allow all IPs (0.0.0.0/0) in MongoDB Atlas Network Access
- **Cold Start**: Free tier may be slow after inactivity
- **Cost**: Check Render/Vercel pricing after deployment

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| API returns 404 | Check backend URL in frontend environment variable |
| "Cannot connect to API" | Verify MongoDB connection string is correct |
| AI features don't work | Check OpenRouter API key is set and valid |
| Frontend shows blank | Check browser console for error messages |

---

## 📚 More Info

- Full guide: See `DEPLOYMENT_GUIDE.md`
- Checklist: See `DEPLOYMENT_CHECKLIST.md`
- Local testing: See `QUICKSTART.md`
