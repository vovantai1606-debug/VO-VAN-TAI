// ========== Typing Effect ==========
const names = ['Nguyễn Văn A', 'Web Developer', 'UI/UX Designer'];
let nameIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typedName');

function typeEffect() {
    const current = names[nameIndex];
    if (isDeleting) {
        typedEl.textContent = current.substring(0, charIndex--);
        if (charIndex < 0) { isDeleting = false; nameIndex = (nameIndex + 1) % names.length; setTimeout(typeEffect, 500); return; }
    } else {
        typedEl.textContent = current.substring(0, ++charIndex);
        if (charIndex === current.length) { isDeleting = true; setTimeout(typeEffect, 2000); return; }
    }
    setTimeout(typeEffect, isDeleting ? 50 : 100);
}
typeEffect();

// ========== Navbar Scroll ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ========== Mobile Menu ==========
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ========== Active Nav Link ==========
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 200;
    sections.forEach(sec => {
        const top = sec.offsetTop, h = sec.offsetHeight, id = sec.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + h);
    });
});

// ========== Cursor Glow ==========
const glow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

// ========== Particles ==========
const particlesEl = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 6 + 2;
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*6}s;animation-duration:${Math.random()*4+4}s;`;
    particlesEl.appendChild(p);
}

// ========== Counter Animation ==========
const counters = document.querySelectorAll('.stat-number');
let counterDone = false;
function animateCounters() {
    if (counterDone) return;
    counters.forEach(c => {
        const target = +c.dataset.target, duration = 1500;
        let start = 0;
        const step = ts => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            c.textContent = Math.floor(progress * target);
            if (progress < 1) requestAnimationFrame(step);
            else c.textContent = target;
        };
        requestAnimationFrame(step);
    });
    counterDone = true;
}

// ========== Scroll Reveal ==========
const revealEls = document.querySelectorAll('.skill-card, .project-card, .about-grid, .contact-grid');
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 100);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));

// Counter observer
const statsEl = document.querySelector('.hero-stats');
if (statsEl) {
    new IntersectionObserver(([e]) => { if (e.isIntersecting) animateCounters(); }, { threshold: 0.5 }).observe(statsEl);
}

// ========== Contact Form ==========
document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.innerHTML = '<span>Đã gửi thành công!</span> <i class="fas fa-check"></i>';
    btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
    setTimeout(() => {
        btn.innerHTML = '<span>Gửi tin nhắn</span> <i class="fas fa-paper-plane"></i>';
        btn.style.background = '';
        e.target.reset();
    }, 3000);
});

// ========== Smooth scroll for all anchor links ==========
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});
