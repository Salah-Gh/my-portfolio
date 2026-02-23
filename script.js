// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
});

function animateFollower() {
    const dx = mouseX - followerX;
    const dy = mouseY - followerY;
    followerX += dx * 0.1;
    followerY += dy * 0.1;
    cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
    requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor hover effect on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .btn, .btn-show-more');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px) scale(1.5)`;
        cursor.style.borderColor = 'var(--secondary)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px) scale(1)`;
        cursor.style.borderColor = 'var(--primary)';
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate sections on scroll
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Parallax effect for background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const bgGradient = document.querySelector('.bg-gradient');
    if (bgGradient) {
        bgGradient.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animated numbers for stats
const animateNumbers = () => {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const originalText = stat.textContent;
        const target = parseInt(originalText);
        let current = 0;
        const increment = target / 25;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = originalText;
                clearInterval(timer);
            } else {
                const suffix = originalText.includes('+') ? '+' : (originalText.includes('%') ? '%' : '');
                stat.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    });
};

// Trigger number animation when about section is visible
const aboutSection = document.querySelector('#about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateNumbers();
            aboutObserver.disconnect();
        }
    }, { threshold: 0.5 });
    aboutObserver.observe(aboutSection);
}

// ============================================
// PROJECT "SHOW MORE" FUNCTIONALITY
// ============================================

// Get all "Show More" buttons
const showMoreButtons = document.querySelectorAll('.btn-show-more');

showMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Find the parent project card
        const projectCard = this.closest('.project-card');
        
        // Find the project details within this card
        const projectDetails = projectCard.querySelector('.project-details');
        
        // Toggle the active class
        projectDetails.classList.toggle('active');
        this.classList.toggle('active');
        
        // Update button text and icon
        const buttonText = this.querySelector('span');
        if (projectDetails.classList.contains('active')) {
            buttonText.textContent = 'Voir Moins';
        } else {
            buttonText.textContent = 'Voir Plus';
        }
        
        // Smooth scroll to show the expanded content
        if (projectDetails.classList.contains('active')) {
            setTimeout(() => {
                const cardTop = projectCard.getBoundingClientRect().top + window.pageYOffset;
                const offset = 100; // Offset from top
                window.scrollTo({
                    top: cardTop - offset,
                    behavior: 'smooth'
                });
            }, 300);
        }
    });
});

// ============================================
// ENHANCED PROJECT CARD ANIMATIONS
// ============================================

// Add staggered animation to project cards
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
        }
    });
}, { threshold: 0.1 });

projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    projectObserver.observe(card);
});

// ============================================
// ACTIVE NAVIGATION HIGHLIGHT
// ============================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function highlightNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = 'var(--primary)';
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNav);

// ============================================
// SKILLS ANIMATION ON HOVER
// ============================================

const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 5px 15px rgba(0, 255, 255, 0.4)';
    });
    tag.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// ============================================
// LOADING ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================

const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(10, 10, 15, 0.95)';
        nav.style.boxShadow = '0 5px 20px rgba(0, 255, 255, 0.1)';
    } else {
        nav.style.background = 'rgba(10, 10, 15, 0.8)';
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// CONSOLE EASTER EGG
// ============================================

console.log(`
%c
 ███████╗ █████╗ ██╗      █████╗ ██╗  ██╗
 ██╔════╝██╔══██╗██║     ██╔══██╗██║  ██║
 ███████╗███████║██║     ███████║███████║
 ╚════██║██╔══██║██║     ██╔══██║██╔══██║
 ███████║██║  ██║███████╗██║  ██║██║  ██║
 ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝
                                          
`, 'color: #00ffff; font-weight: bold;');

console.log('%cDéveloppeur Full-Stack 🚀', 'color: #ff00ff; font-size: 16px; font-weight: bold;');
console.log('%cSi vous lisez ceci, on devrait probablement travailler ensemble! 😎', 'color: #00ffff; font-size: 14px;');
console.log('%c📧 gharsalah140@gmail.com', 'color: #ffff00; font-size: 12px;');
