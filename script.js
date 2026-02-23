
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

const interactiveElements = document.querySelectorAll('a, button, .btn');
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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

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

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const bgGradient = document.querySelector('.bg-gradient');
    bgGradient.style.transform = `translateY(${scrolled * 0.5}px)`;
});

const animateNumbers = () => {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = stat.textContent.includes('+') ? target + '+' : target + '%';
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '%');
            }
        }, 30);
    });
};

const aboutSection = document.querySelector('#about');
const aboutObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateNumbers();
        aboutObserver.disconnect();
    }
}, { threshold: 0.5 });
aboutObserver.observe(aboutSection);