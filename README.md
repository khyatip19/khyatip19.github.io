# Khyati Prajapati - Portfolio Website

A modern, responsive portfolio website showcasing cloud/DevOps expertise, full stack development skills, and web accessibility focus.

## Features

- **Modern Design**: Sleek, tech-inspired design with dark theme
- **Responsive Layout**: Mobile-first design that works on all devices
- **Dynamic Projects**: Auto-populated from GitHub repositories
- **Smooth Animations**: Subtle animations and transitions
- **Accessibility**: WCAG compliant with proper focus management
- **Performance Optimized**: Fast loading with optimized assets

## Sections

1. **Home**: Hero section with introduction and call-to-action
2. **About**: Personal background and skills showcase
3. **Projects**: Dynamically loaded GitHub repositories
4. **Gallery**: Placeholder for future project screenshots
5. **Contact**: Contact form and social links

## Technologies Used

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern CSS with custom properties, Grid, and Flexbox
- **JavaScript**: Vanilla JS with modern ES6+ features
- **GitHub API**: Dynamic project loading
- **Font Awesome**: Icons and visual elements
- **Google Fonts**: Inter font family

## Setup Instructions

1. **Clone or Download**: Get the portfolio files
2. **Customize Content**: Update personal information in `index.html`
3. **Update GitHub Username**: Change `GITHUB_USERNAME` in `script.js`
4. **Add Your Photo**: Replace the GitHub avatar URL with your own
5. **Deploy**: Upload to your web hosting service

## Customization

### Personal Information
Update the following in `index.html`:
- Name and title in the hero section
- About section content
- Contact information
- Social media links

### GitHub Integration
In `script.js`, update:
```javascript
const GITHUB_USERNAME = 'your-github-username';
```

### Styling
Customize colors and styling in `styles.css`:
```css
:root {
    --primary-color: #00d4ff;
    --secondary-color: #0066cc;
    --accent-color: #ff6b35;
    /* Add your custom colors */
}
```

### Skills and Technologies
Update the skills section in `index.html` to reflect your expertise:
- Cloud & DevOps technologies
- Programming languages
- Frameworks and tools

## File Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Features

- Optimized CSS with custom properties
- Debounced scroll events
- Lazy loading for animations
- Minimal JavaScript bundle
- Preloaded critical resources

## Accessibility Features

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Focus management
- High contrast mode support
- Reduced motion support
- Screen reader friendly

## SEO Optimizations

- Meta tags for description and keywords
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images
- Clean URL structure

## Deployment Options

### GitHub Pages
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select source branch (usually `main`)

### Netlify
1. Connect GitHub repository
2. Set build command: (none needed)
3. Set publish directory: `/`

### Vercel
1. Import GitHub repository
2. Deploy with default settings

### Traditional Web Hosting
1. Upload files via FTP
2. Ensure `index.html` is in root directory

## Customization Tips

### Adding New Sections
1. Add section HTML in `index.html`
2. Add navigation link
3. Style in `styles.css`
4. Add scroll detection in `script.js`

### Modifying Project Display
- Filter projects by language or topic
- Change number of displayed projects
- Add custom project data
- Modify project card layout

### Contact Form Integration
Replace the simulated form submission with:
- Formspree
- Netlify Forms
- EmailJS
- Custom backend API

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or issues:
- Create an issue on GitHub
- Contact via LinkedIn: [linkedin.com/in/khyati-prajapati](https://www.linkedin.com/in/khyati-prajapati/)

## Credits

- Design inspiration from modern portfolio websites
- Icons by Font Awesome
- Fonts by Google Fonts
- GitHub API for project data

---

Built with ❤️ by Khyati Prajapati
