#!/usr/bin/env python3
"""
Simple test script to validate the portfolio website structure
"""

import os
import re
from pathlib import Path

def test_file_exists(filename):
    """Test if a file exists"""
    path = Path(filename)
    if path.exists():
        print(f"✅ {filename} exists")
        return True
    else:
        print(f"❌ {filename} missing")
        return False

def test_html_structure():
    """Test HTML structure and content"""
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    tests = [
        ('Title tag', '<title>'),
        ('Meta description', 'meta name="description"'),
        ('Navigation', 'class="navbar"'),
        ('Hero section', 'id="home"'),
        ('About section', 'id="about"'),
        ('Projects section', 'id="projects"'),
        ('Gallery section', 'id="gallery"'),
        ('Contact section', 'id="contact"'),
        ('Footer', 'class="footer"'),
        ('CSS link', 'href="styles.css"'),
        ('JS script', 'src="script.js"'),
        ('Font Awesome', 'font-awesome'),
        ('Google Fonts', 'fonts.googleapis.com'),
    ]
    
    print("\n🔍 Testing HTML structure:")
    for test_name, pattern in tests:
        if pattern in content:
            print(f"✅ {test_name} found")
        else:
            print(f"❌ {test_name} missing")

def test_css_structure():
    """Test CSS structure"""
    with open('styles.css', 'r', encoding='utf-8') as f:
        content = f.read()
    
    tests = [
        ('CSS Variables', ':root'),
        ('Responsive design', '@media'),
        ('Navigation styles', '.navbar'),
        ('Hero styles', '.hero'),
        ('Button styles', '.btn'),
        ('Project card styles', '.project-card'),
        ('Accessibility focus', ':focus'),
        ('Animations', '@keyframes'),
    ]
    
    print("\n🎨 Testing CSS structure:")
    for test_name, pattern in tests:
        if pattern in content:
            print(f"✅ {test_name} found")
        else:
            print(f"❌ {test_name} missing")

def test_js_structure():
    """Test JavaScript structure"""
    with open('script.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    tests = [
        ('GitHub API integration', 'GITHUB_USERNAME'),
        ('Navigation functionality', 'initializeNavigation'),
        ('Project loading', 'loadProjects'),
        ('Contact form', 'initializeContactForm'),
        ('Scroll effects', 'initializeScrollEffects'),
        ('Event listeners', 'addEventListener'),
        ('Responsive menu', 'nav-toggle'),
        ('Form validation', 'isValidEmail'),
    ]
    
    print("\n⚡ Testing JavaScript structure:")
    for test_name, pattern in tests:
        if pattern in content:
            print(f"✅ {test_name} found")
        else:
            print(f"❌ {test_name} missing")

def main():
    """Run all tests"""
    print("🧪 Portfolio Website Test Suite")
    print("=" * 40)
    
    # Test file existence
    print("\n📁 Testing file structure:")
    required_files = [
        'index.html',
        'styles.css',
        'script.js',
        'README.md',
        'DEPLOYMENT.md',
        'sitemap.xml',
        'robots.txt'
    ]
    
    all_files_exist = True
    for file in required_files:
        if not test_file_exists(file):
            all_files_exist = False
    
    if all_files_exist:
        # Test content structure
        test_html_structure()
        test_css_structure()
        test_js_structure()
        
        print("\n🎉 All tests completed!")
        print("\n📋 Next steps:")
        print("1. Update personal information in index.html")
        print("2. Change GitHub username in script.js")
        print("3. Test the website locally: python3 -m http.server 8000")
        print("4. Open http://localhost:8000 in your browser")
        print("5. Deploy to your preferred hosting platform")
    else:
        print("\n❌ Some files are missing. Please check the file structure.")

if __name__ == "__main__":
    main()
