// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const projectsList = document.getElementById('projects-list');
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

// GitHub API Configuration
const GITHUB_USERNAME = 'khyatip19';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCursor();
    initializeTabs();
    loadProjects();
    initializeScrollEffects();
    initializeAnimations();
});

// Tab functionality for experience section
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(`${targetTab}-content`).classList.add('active');
        });
    });
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
    try {
        const response = await fetch(GITHUB_API_URL + '?sort=updated&per_page=100');
        const repos = await response.json();
        
        // Filter out forked repositories and select interesting projects
        const filteredRepos = repos.filter(repo => !repo.fork && repo.name !== GITHUB_USERNAME)
                                  .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                                  .slice(0, 3); // Show top 3 featured projects

        displayProjects(filteredRepos);
    } catch (error) {
        console.error('Error loading projects:', error);
        displayProjectsError();
    }
}

// Display projects in the new layout
function displayProjects(repos) {
    if (repos.length === 0) {
        projectsList.innerHTML = `
            <div class="no-projects">
                <p>No projects found. Check back soon!</p>
            </div>
        `;
        return;
    }

    const projectsHTML = repos.map((repo, index) => createFeaturedProject(repo, index)).join('');
    projectsList.innerHTML = projectsHTML;

    // Add animation to project items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.classList.add('fade-in-up');
    });
}

// Create featured project card
function createFeaturedProject(repo, index) {
    const description = repo.description || 'A project showcasing modern development practices and clean code architecture.';
    const language = repo.language || 'JavaScript';
    
    // Get main technologies based on repo name and language
    const technologies = getTechnologies(repo.name, language);
    const techList = technologies.map(tech => `<li>${tech}</li>`).join('');
    
    // Alternate layout for visual interest
    const isEven = index % 2 === 0;
    
    return `
        <div class="project-item">
            <div class="project-content">
                <div>
                    <p class="project-overline">Featured Project</p>
                    <h3 class="project-title">
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                            ${formatProjectName(repo.name)}
                        </a>
                    </h3>
                    <div class="project-description">
                        <p>${description}</p>
                    </div>
                    <ul class="project-tech-list">
                        ${techList}
                    </ul>
                    <div class="project-links">
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" aria-label="GitHub Link">
                            <i class="fab fa-github"></i>
                        </a>
                        ${repo.homepage ? `
                            <a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" aria-label="External Link">
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
            <div class="project-image">
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                    <img src="https://via.placeholder.com/600x400/64ffda/0a192f?text=${encodeURIComponent(formatProjectName(repo.name))}" 
                         alt="${formatProjectName(repo.name)}" 
                         class="project-img">
                </a>
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
