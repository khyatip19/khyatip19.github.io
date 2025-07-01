# Deployment Guide

This guide will help you deploy your portfolio website to various hosting platforms.

## Quick Deployment Options

### 1. GitHub Pages (Recommended)

**Steps:**
1. Create a new repository on GitHub named `your-username.github.io`
2. Upload all portfolio files to the repository
3. Go to repository Settings → Pages
4. Select source: Deploy from a branch → main
5. Your site will be available at `https://your-username.github.io`

**Pros:**
- Free hosting
- Automatic HTTPS
- Easy to update via Git
- Custom domain support

### 2. Netlify

**Steps:**
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub account
3. Click "New site from Git"
4. Select your repository
5. Deploy settings:
   - Build command: (leave empty)
   - Publish directory: `/`
6. Click "Deploy site"

**Pros:**
- Free tier available
- Automatic deployments
- Form handling
- Custom domains
- CDN included

### 3. Vercel

**Steps:**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub account
3. Click "New Project"
4. Import your repository
5. Deploy with default settings

**Pros:**
- Free tier available
- Excellent performance
- Automatic deployments
- Custom domains

### 4. Traditional Web Hosting

**Steps:**
1. Purchase web hosting (shared hosting is sufficient)
2. Upload files via FTP/cPanel File Manager
3. Ensure `index.html` is in the public_html directory
4. Access via your domain

**Required Files:**
- `index.html`
- `styles.css`
- `script.js`
- `README.md` (optional)

## Pre-Deployment Checklist

- [ ] Update personal information in `index.html`
- [ ] Change GitHub username in `script.js`
- [ ] Test all links and functionality
- [ ] Optimize images (if any added)
- [ ] Test on mobile devices
- [ ] Validate HTML and CSS
- [ ] Check accessibility with screen reader

## Custom Domain Setup

### GitHub Pages
1. Add CNAME file with your domain
2. Update DNS records:
   - Type: CNAME
   - Name: www
   - Value: your-username.github.io

### Netlify/Vercel
1. Go to domain settings in dashboard
2. Add your custom domain
3. Update DNS records as instructed

## Performance Optimization

### Before Deployment
- Minify CSS and JavaScript (optional)
- Optimize images
- Enable compression
- Test loading speed

### After Deployment
- Set up CDN (if not included)
- Enable caching headers
- Monitor performance with tools like:
  - Google PageSpeed Insights
  - GTmetrix
  - WebPageTest

## SEO Setup

### Google Search Console
1. Verify your website
2. Submit sitemap (create one if needed)
3. Monitor search performance

### Analytics (Optional)
- Google Analytics
- Plausible Analytics
- Simple Analytics

## Maintenance

### Regular Updates
- Keep dependencies updated
- Update project information
- Add new projects
- Refresh content

### Monitoring
- Check for broken links
- Monitor loading speed
- Update contact information
- Review and update skills

## Troubleshooting

### Common Issues

**Site not loading:**
- Check file paths are correct
- Ensure index.html is in root directory
- Verify DNS settings for custom domains

**Projects not loading:**
- Check GitHub API rate limits
- Verify GitHub username in script.js
- Check browser console for errors

**Mobile display issues:**
- Test responsive design
- Check viewport meta tag
- Validate CSS media queries

**Contact form not working:**
- Implement proper form handling
- Consider using Netlify Forms or Formspree
- Add form validation

## Security Considerations

- Use HTTPS (enabled by default on most platforms)
- Validate all user inputs
- Keep dependencies updated
- Don't expose sensitive information
- Use Content Security Policy headers

## Backup Strategy

- Keep source code in version control (Git)
- Regular backups of any dynamic content
- Document deployment process
- Keep local copies of all files

---

Need help? Check the main README.md or create an issue on GitHub.
