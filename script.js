// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const projectsGrid = document.getElementById('projects-grid');
const contactForm = document.getElementById('contact-form');

// GitHub API Configuration
const GITHUB_USERNAME = 'khyatip19';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    loadProjects();
    initializeContactForm();
    initializeScrollEffects();
    initializeAnimations();
});

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active navigation link based on scroll position
    window.addEventListener('scroll', updateActiveNavLink);
}

// Update active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });

    // Add scrolled class to navbar
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Load projects from GitHub API
async function loadProjects() {
    try {
        const response = await fetch(GITHUB_API_URL + '?sort=updated&per_page=100');
        const repos = await response.json();
        
        // Filter out forked repositories and select interesting projects
        const filteredRepos = repos.filter(repo => !repo.fork && repo.name !== GITHUB_USERNAME)
                                  .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                                  .slice(0, 6); // Show top 6 projects

        displayProjects(filteredRepos);
    } catch (error) {
        console.error('Error loading projects:', error);
        displayProjectsError();
    }
}

// Display projects in the grid
function displayProjects(repos) {
    if (repos.length === 0) {
        projectsGrid.innerHTML = `
            <div class="no-projects">
                <p>No projects found. Check back soon!</p>
            </div>
        `;
        return;
    }

    const projectsHTML = repos.map(repo => createProjectCard(repo)).join('');
    projectsGrid.innerHTML = projectsHTML;

    // Add animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
}

// Create individual project card
function createProjectCard(repo) {
    const description = repo.description || 'No description available';
    const language = repo.language || 'Unknown';
    const stars = repo.stargazers_count;
    const forks = repo.forks_count;
    const updatedDate = new Date(repo.updated_at).toLocaleDateString();

    // Get language color
    const languageColor = getLanguageColor(language);

    return `
        <div class="project-card">
            <div class="project-header">
                <div>
                    <h3 class="project-title">${repo.name}</h3>
                    <div class="project-language" style="background-color: ${languageColor}20; color: ${languageColor}; border-color: ${languageColor}40;">
                        ${language}
                    </div>
                </div>
            </div>
            <p class="project-description">${description}</p>
            <div class="project-stats">
                <span><i class="fas fa-star"></i> ${stars}</span>
                <span><i class="fas fa-code-branch"></i> ${forks}</span>
                <span><i class="fas fa-calendar"></i> Updated ${updatedDate}</span>
            </div>
            <div class="project-links">
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="project-link">
                    <i class="fab fa-github"></i> View Code
                </a>
                ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" class="project-link">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>` : ''}
            </div>
        </div>
    `;
}

// Get color for programming language
function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f7df1e',
        'Python': '#3776ab',
        'Java': '#ed8b00',
        'HTML': '#e34c26',
        'CSS': '#1572b6',
        'TypeScript': '#3178c6',
        'React': '#61dafb',
        'Node.js': '#339933',
        'PHP': '#777bb4',
        'C++': '#00599c',
        'C': '#a8b9cc',
        'Go': '#00add8',
        'Rust': '#000000',
        'Swift': '#fa7343',
        'Kotlin': '#7f52ff'
    };
    return colors[language] || '#6c757d';
}

// Display error message for projects
function displayProjectsError() {
    projectsGrid.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Unable to load projects</h3>
            <p>Please check your internet connection and try again.</p>
            <button onclick="loadProjects()" class="btn btn-primary">Retry</button>
        </div>
    `;
}

// Initialize contact form
function initializeContactForm() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Simple form validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission (replace with actual form handling)
        simulateFormSubmission(name, email, message);
    });
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Simulate form submission
function simulateFormSubmission(name, email, message) {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Simulate API call delay
    setTimeout(() => {
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    document.body.appendChild(notification);

    // Add styles for notification
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: var(--border-radius);
                padding: 1rem;
                box-shadow: var(--shadow-medium);
                z-index: 10000;
                transform: translateX(100%);
                transition: var(--transition);
                max-width: 400px;
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification-success {
                border-left: 4px solid #10b981;
            }
            .notification-error {
                border-left: 4px solid #ef4444;
            }
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
            }
            .notification-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .notification-close:hover {
                color: var(--text-primary);
            }
        `;
        document.head.appendChild(styles);
    }

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Close notification
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });

    // Auto-close after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Initialize scroll effects
function initializeScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.section-header, .about-text, .skills-grid, .contact-item');
    animateElements.forEach(el => observer.observe(el));
}

// Initialize animations
function initializeAnimations() {
    // Add CSS for animations
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .fade-in {
            animation: fadeInUp 0.6s ease-out forwards;
            opacity: 0;
            transform: translateY(30px);
        }
        
        .animate-in {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .section-header,
        .about-text,
        .skills-grid,
        .contact-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease-out;
        }
        
        .section-header.animate-in,
        .about-text.animate-in,
        .skills-grid.animate-in,
        .contact-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .error-message {
            text-align: center;
            padding: 3rem;
            grid-column: 1 / -1;
        }
        
        .error-message i {
            font-size: 3rem;
            color: var(--accent-color);
            margin-bottom: 1rem;
        }
        
        .error-message h3 {
            margin-bottom: 1rem;
            color: var(--text-primary);
        }
        
        .error-message p {
            color: var(--text-secondary);
            margin-bottom: 2rem;
        }
        
        .no-projects {
            text-align: center;
            padding: 3rem;
            grid-column: 1 / -1;
            color: var(--text-secondary);
        }
    `;
    document.head.appendChild(animationStyles);
}

// Utility function to debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(updateActiveNavLink, 10);
window.addEventListener('scroll', debouncedScrollHandler);

// Handle keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Preload critical resources
function preloadResources() {
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    ];

    criticalResources.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = url;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment if you want to add PWA capabilities
        // navigator.serviceWorker.register('/sw.js');
    });
}
