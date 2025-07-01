# Quick Start Guide

Get your portfolio website up and running in 5 minutes!

## 🚀 Immediate Setup

### 1. Test Locally (2 minutes)
```bash
# Navigate to portfolio directory
cd portfolio

# Start local server
python3 -m http.server 8000

# Open in browser
# Go to: http://localhost:8000
```

### 2. Customize Content (3 minutes)

**Essential Changes:**

1. **Update GitHub Username** (script.js, line 13):
   ```javascript
   const GITHUB_USERNAME = 'your-github-username';
   ```

2. **Update Personal Info** (index.html):
   - Line 45: Your name
   - Line 47: Your title/role
   - Line 49-53: Your description
   - Line 82-95: About section content
   - Line 245-255: Contact links

3. **Update Meta Tags** (index.html, lines 6-20):
   - Update URLs to your domain
   - Update social media image URL

## 🌐 Deploy in 1 Minute

### GitHub Pages (Recommended)
1. Create repository: `your-username.github.io`
2. Upload all files
3. Enable Pages in Settings
4. Done! Visit: `https://your-username.github.io`

### Netlify
1. Drag & drop the `portfolio` folder to [netlify.com/drop](https://app.netlify.com/drop)
2. Get instant URL
3. Done!

## ✅ Pre-Launch Checklist

- [ ] Updated GitHub username in script.js
- [ ] Updated personal information
- [ ] Updated contact links
- [ ] Tested locally
- [ ] All links work
- [ ] Mobile responsive
- [ ] Projects loading correctly

## 🔧 Common Customizations

### Change Colors
Edit `styles.css` (lines 15-25):
```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    --accent-color: #your-color;
}
```

### Add Skills
Edit `index.html` (lines 96-125):
```html
<span class="skill-tag">Your Skill</span>
```

### Modify Projects Display
Edit `script.js` (line 85):
```javascript
.slice(0, 6); // Change number of projects
```

## 🆘 Troubleshooting

**Projects not loading?**
- Check GitHub username in script.js
- Ensure repositories are public
- Check browser console for errors

**Styling issues?**
- Clear browser cache
- Check CSS file path
- Validate CSS syntax

**Mobile not responsive?**
- Check viewport meta tag
- Test CSS media queries
- Validate HTML structure

## 📞 Need Help?

- Check the full [README.md](README.md)
- Review [DEPLOYMENT.md](DEPLOYMENT.md)
- Create an issue on GitHub
- Contact via LinkedIn

---

**Time to launch: ~5 minutes** ⏱️

Happy coding! 🎉
