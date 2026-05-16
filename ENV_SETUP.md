# Environment Setup Guide

## Backend Environment Variables

Create a `.env` file in the `backend` directory with the following:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/candidate-shortlisting
# For MongoDB Atlas (cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority

# OpenRouter API (for AI features)
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

### MongoDB Setup Options

**Option 1: Local MongoDB**
1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB: `mongod`
3. Use: `MONGODB_URI=mongodb://localhost:27017/candidate-shortlisting`

**Option 2: MongoDB Atlas (Cloud)**
1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string from Atlas dashboard
4. Replace username, password, and cluster in connection string

## Frontend Environment Variables

Create a `.env` file in the `frontend` directory with:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api
```

## OpenRouter API Setup

### Getting the API Key

1. Visit https://openrouter.ai
2. Click "Sign Up" or "Log In"
3. Complete authentication
4. Navigate to: Settings → API Keys
5. Click "Create New Key"
6. Copy the key
7. Add to backend `.env`:
   ```env
   OPENROUTER_API_KEY=sk-or-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

### Testing the API Key

```bash
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

## Troubleshooting Environment Setup

### MongoDB Connection Failed
- **Windows**: Run `mongod` in Command Prompt
- **Mac**: Use Homebrew: `brew services start mongodb-community`
- **Linux**: `sudo systemctl start mongod`
- Or use MongoDB Atlas (recommended for beginners)

### OpenRouter API Key Not Working
- Verify key format starts with `sk-or-`
- Check if key is active in OpenRouter dashboard
- Ensure `.env` file is in the correct directory
- Restart backend server after adding key

### Cannot Connect to MongoDB Atlas
- Check IP Whitelist (allow 0.0.0.0/0 for development)
- Verify username/password are URL-encoded
- Check database name matches
- Ensure cluster is not paused

## Development vs Production

### Development (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/candidate-shortlisting
OPENROUTER_API_KEY=your_dev_key
```

### Production
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/prod-db
OPENROUTER_API_KEY=your_prod_key
```

**Never commit `.env` files to version control!**

---

For more help, see README.md or QUICKSTART.md
