# GitHub Pages Setup - Step by Step

## 🎯 Goal
Get your portfolio live at: `https://khyatip19.github.io`

## 📋 Prerequisites
- GitHub account (you have: khyatip19)
- Git installed on your computer
- Your portfolio files (✅ Ready in portfolio folder)

## 🚀 Step-by-Step Instructions

### Step 1: Create Repository
1. Go to [github.com](https://github.com)
2. Click "New repository" (green button)
3. Repository name: `khyatip19.github.io` (EXACTLY this name)
4. Make it Public
5. Don't initialize with README (we have files already)
6. Click "Create repository"

### Step 2: Prepare Your Files
```bash
# Navigate to your portfolio folder
cd /mnt/c/Users/khyat/portfolio

# Initialize git repository
git init

# Add all files
git add .

# Make first commit
git commit -m "Initial portfolio website"
```

### Step 3: Connect to GitHub
```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/khyatip19/khyatip19.github.io.git

# Push your files to GitHub
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll to "Pages" section
4. Source: "Deploy from a branch"
5. Branch: "main"
6. Folder: "/ (root)"
7. Click "Save"

### Step 5: Wait & Visit
- Wait 2-5 minutes for deployment
- Visit: `https://khyatip19.github.io`
- Your portfolio is LIVE! 🎉

## 🔧 Before You Push - Quick Customization

Edit these files first:

**1. script.js (line 13):**
```javascript
const GITHUB_USERNAME = 'khyatip19'; // ✅ Already correct!
```

**2. index.html - Update personal info:**
- Your name and description
- Contact information
- About section content

## 🆘 If You Get Stuck

**Git not installed?**
```bash
# Install git (if needed)
sudo apt update && sudo apt install git
```

**Authentication issues?**
- Use GitHub Desktop app, OR
- Set up SSH keys, OR  
- Use personal access token

**Repository already exists?**
- Delete the existing one, OR
- Use a different name like `portfolio` or `my-website`

## 🎯 Alternative: Quick Upload Method

If git seems complicated:

1. Create repository `khyatip19.github.io` on GitHub
2. Click "uploading an existing file"
3. Drag all files from your portfolio folder
4. Commit changes
5. Enable Pages in Settings

## ✅ Success Checklist

- [ ] Repository created: `khyatip19.github.io`
- [ ] Files uploaded to GitHub
- [ ] GitHub Pages enabled
- [ ] Website accessible at URL
- [ ] Projects loading from GitHub API
- [ ] All sections working
- [ ] Mobile responsive

Your website will be live at: **https://khyatip19.github.io**
