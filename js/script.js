// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Mobile Hamburger Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = mobileNav.classList.toggle('open');
            const icon = mobileToggle.querySelector('i');
            icon.classList.toggle('fa-bars', !isOpen);
            icon.classList.toggle('fa-xmark', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu when a nav link is clicked
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
                const icon = mobileToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
                document.body.style.overflow = '';
            });
        });
    }

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Stats Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 50;

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = Math.max(1, Math.ceil(target / speed));

                if (count < target) {
                    counter.innerText = count + inc;
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target;
                }
            };

            const rect = counter.getBoundingClientRect();
            if(rect.top < window.innerHeight && counter.innerText === '0') {
               updateCount();
            }
        });
    }

    window.addEventListener('scroll', animateCounters);
    setTimeout(animateCounters, 500); // initial check

    // Custom Cursor tracking (Minimal Dot)
    if (!document.querySelector('.cursor-dot')) {
        const dot = document.createElement('div');
        dot.classList.add('cursor-dot');
        // Start off-screen to avoid appearing at 0,0 before first mouse move
        dot.style.left = '-100px';
        dot.style.top = '-100px';
        document.body.appendChild(dot);

        document.addEventListener('mousemove', (e) => {
            dot.style.left = e.clientX + 'px';
            dot.style.top = e.clientY + 'px';
        });

        const hoverElements = document.querySelectorAll('a, button, .service-card, .project-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => dot.classList.add('hover'));
            el.addEventListener('mouseleave', () => dot.classList.remove('hover'));
        });
    }

    // Preloader Logic
    const initPreloader = () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => preloader.style.display = 'none', 600);
            }, 500); // Wait 0.5s before fading
        }
    };
    
    if (document.readyState === 'complete') {
        initPreloader();
    } else {
        window.addEventListener('load', initPreloader);
    }
});

// Know More hover panels — expand on button hover, stay open while over panel
document.querySelectorAll('.service-card').forEach(card => {
    const btn = card.querySelector('.know-more-btn');
    const panel = card.querySelector('.service-panel');
    if (!btn || !panel) return;

    let leaveTimer;

    const open = () => {
        clearTimeout(leaveTimer);
        btn.classList.add('active');
        panel.classList.add('active');
    };
    const close = () => {
        leaveTimer = setTimeout(() => {
            btn.classList.remove('active');
            panel.classList.remove('active');
        }, 80); // tiny delay prevents flicker when moving from btn to panel
    };

    btn.addEventListener('mouseenter', open);
    btn.addEventListener('mouseleave', close);
    panel.addEventListener('mouseenter', open);
    panel.addEventListener('mouseleave', close);
});
