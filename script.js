// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const projectsList = document.getElementById('projects-list');
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// GitHub API Configuration
const GITHUB_USERNAME = 'khyatip19';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCursor();
    initializeTheme();
    loadProjects();
    initializeScrollEffects();
    initializeAnimations();
});

// Theme toggle functionality
function initializeTheme() {
    // Check for saved theme preference or default to 'dark'
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    // Add click event listener to theme toggle button
    themeToggle.addEventListener('click', toggleTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update icon based on theme
    if (theme === 'light') {
        themeIcon.className = 'fas fa-moon';
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    } else {
        themeIcon.className = 'fas fa-sun';
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

// Custom cursor functionality
function initializeCursor() {
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-item, .achievement-item, .tab-button');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.5)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }
}

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active navigation link based on scroll position
    window.addEventListener('scroll', debounce(updateActiveNavLink, 10));
}

// Update active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 150;

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
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Load projects from GitHub API
async function loadProjects() {
    const githubProjectsContainer = document.getElementById('projects-list');
    if (!githubProjectsContainer) return;
    
    try {
        const response = await fetch(GITHUB_API_URL + '?sort=updated&per_page=100');
        const repos = await response.json();
        
        // Filter out forked repositories and select interesting projects
        const filteredRepos = repos.filter(repo => 
            !repo.fork && 
            repo.name !== GITHUB_USERNAME &&
            repo.name !== 'khyatip19.github.io' && // Exclude portfolio repo
            repo.description // Only include repos with descriptions
        ).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
         .slice(0, 6); // Show top 6 other projects

        displayGitHubProjects(filteredRepos);
    } catch (error) {
        console.error('Error loading projects:', error);
        displayProjectsError();
    }
}

// Display GitHub projects in grid layout
function displayGitHubProjects(repos) {
    const githubProjectsContainer = document.getElementById('projects-list');
    
    if (repos.length === 0) {
        githubProjectsContainer.innerHTML = `
            <div class="no-projects">
                <p>More projects coming soon! Check out my GitHub for the latest updates.</p>
                <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
                    View GitHub Profile
                </a>
            </div>
        `;
        return;
    }

    const projectsHTML = repos.map(repo => createProjectCard(repo)).join('');
    githubProjectsContainer.innerHTML = `
        <div class="projects-grid">
            ${projectsHTML}
        </div>
    `;

    // Add animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });
}

// Create project card for GitHub projects
function createProjectCard(repo) {
    const description = repo.description || 'A project showcasing modern development practices.';
    const language = repo.language || 'JavaScript';
    
    // Get main technologies based on repo name and language
    const technologies = getTechnologies(repo.name, language);
    const techList = technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
    
    return `
        <div class="project-card">
            <div class="project-card-header">
                <div class="project-card-icon">
                    <i class="fas fa-folder"></i>
                </div>
                <div class="project-card-links">
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <i class="fab fa-github"></i>
                    </a>
                    ${repo.homepage ? `
                        <a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" aria-label="External Link">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    ` : ''}
                </div>
            </div>
            <div class="project-card-body">
                <h3 class="project-card-title">
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                        ${formatProjectName(repo.name)}
                    </a>
                </h3>
                <p class="project-card-description">${description}</p>
            </div>
            <div class="project-card-footer">
                <div class="project-tech-tags">
                    ${techList}
                </div>
                <div class="project-stats">
                    ${repo.stargazers_count > 0 ? `<span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>` : ''}
                    ${repo.forks_count > 0 ? `<span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>` : ''}
                </div>
            </div>
        </div>
    `;
}

// Format project name for display
function formatProjectName(name) {
    return name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Get technologies based on project name and language
function getTechnologies(projectName, language) {
    const name = projectName.toLowerCase();
    let technologies = [];
    
    // Add primary language
    if (language) {
        technologies.push(language);
    }
    
    // Infer technologies from project name
    if (name.includes('react') || name.includes('portfolio')) {
        technologies.push('React', 'CSS3', 'JavaScript');
    } else if (name.includes('node') || name.includes('api')) {
        technologies.push('Node.js', 'Express', 'MongoDB');
    } else if (name.includes('python') || name.includes('ml') || name.includes('ai')) {
        technologies.push('Python', 'TensorFlow', 'NumPy');
    } else if (name.includes('mobile') || name.includes('app')) {
        technologies.push('React Native', 'Firebase');
    } else if (name.includes('web') || name.includes('site')) {
        technologies.push('HTML5', 'CSS3', 'JavaScript');
    } else if (name.includes('cloud') || name.includes('aws') || name.includes('docker')) {
        technologies.push('AWS', 'Docker', 'Kubernetes');
    } else {
        // Default technologies for a full-stack developer
        technologies.push('JavaScript', 'CSS3', 'HTML5');
    }
    
    // Remove duplicates and limit to 4 technologies
    return [...new Set(technologies)].slice(0, 4);
}

// Display error message for projects
function displayProjectsError() {
    projectsList.innerHTML = `
        <div class="error-message">
            <p>Unable to load projects. Please check your connection and try again.</p>
            <button onclick="loadProjects()" class="btn btn-outline">Retry</button>
        </div>
    `;
}

// Initialize scroll effects and animations
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
    const animateElements = document.querySelectorAll('.hero-intro, .about-content, .section-title, .achievement-item, .experience-content');
    animateElements.forEach(el => observer.observe(el));
}

// Initialize animations
function initializeAnimations() {
    // Add CSS for animations
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .fade-in-up {
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
        
        .hero-intro,
        .about-content,
        .section-title,
        .achievement-item,
        .experience-content {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease-out;
        }
        
        .hero-intro.animate-in,
        .about-content.animate-in,
        .section-title.animate-in,
        .achievement-item.animate-in,
        .experience-content.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .error-message {
            text-align: center;
            padding: 3rem;
            color: var(--slate);
        }
        
        .error-message p {
            margin-bottom: 2rem;
        }
        
        .no-projects {
            text-align: center;
            padding: 3rem;
            color: var(--slate);
        }
        
        /* Stagger animation for hero elements */
        .hero-greeting {
            animation: fadeInUp 0.6s ease-out 0.1s both;
        }
        
        .hero-name {
            animation: fadeInUp 0.6s ease-out 0.2s both;
        }
        
        .hero-title {
            animation: fadeInUp 0.6s ease-out 0.3s both;
        }
        
        .hero-description {
            animation: fadeInUp 0.6s ease-out 0.4s both;
        }
        
        .hero-cta {
            animation: fadeInUp 0.6s ease-out 0.5s both;
        }
        
        /* Achievement items stagger */
        .achievement-item:nth-child(1) {
            animation-delay: 0.1s;
        }
        
        .achievement-item:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .achievement-item:nth-child(3) {
            animation-delay: 0.3s;
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

// Handle keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Reinitialize cursor on resize
    if (window.innerWidth <= 768) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    } else {
        cursor.style.display = 'block';
        cursorFollower.style.display = 'block';
    }
}, 250));

// Preload critical resources
function preloadResources() {
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
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

// Email link functionality
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // You can add analytics tracking here if needed
        console.log('Email link clicked');
    });
});

// Smooth reveal animations on scroll
window.addEventListener('scroll', debounce(() => {
    const reveals = document.querySelectorAll('.project-item, .about-content, .achievement-item');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('animate-in');
        }
    });
}, 10));

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Initialize theme toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', initThemeToggle);

// Toggle Experience Section
function toggleExperiences() {
    const hiddenSection = document.getElementById('hidden-experiences');
    const toggleBtn = document.getElementById('experience-toggle');
    const btnText = toggleBtn.querySelector('.btn-text');
    const btnIcon = toggleBtn.querySelector('.btn-icon');
    
    if (hiddenSection.style.display === 'none' || hiddenSection.style.display === '') {
        hiddenSection.style.display = 'block';
        btnText.textContent = 'View Less Experiences';
        toggleBtn.classList.add('expanded');
    } else {
        hiddenSection.style.display = 'none';
        btnText.textContent = 'View More Experiences';
        toggleBtn.classList.remove('expanded');
    }
}

// Toggle Education Section
function toggleEducation() {
    const hiddenSection = document.getElementById('hidden-education');
    const toggleBtn = document.getElementById('education-toggle');
    const btnText = toggleBtn.querySelector('.btn-text');
    const btnIcon = toggleBtn.querySelector('.btn-icon');
    
    if (hiddenSection.style.display === 'none' || hiddenSection.style.display === '') {
        hiddenSection.style.display = 'block';
        btnText.textContent = 'Hide Earlier Education';
        toggleBtn.classList.add('expanded');
    } else {
        hiddenSection.style.display = 'none';
        btnText.textContent = 'View Earlier Education';
        toggleBtn.classList.remove('expanded');
    }
}
