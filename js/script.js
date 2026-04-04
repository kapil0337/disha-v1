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
        const icon = mobileToggle.querySelector('i');

        const closeMobileMenu = () => {
            mobileNav.classList.remove('active', 'open');
            mobileToggle.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            }
            document.body.style.overflow = '';
        };

        mobileToggle.addEventListener('click', () => {
            const isOpen = mobileNav.classList.toggle('active');
            mobileNav.classList.toggle('open', isOpen); // backwards compatibility
            mobileToggle.classList.toggle('active', isOpen);
            mobileToggle.setAttribute('aria-expanded', String(isOpen));
            if (icon) {
                icon.classList.toggle('fa-bars', !isOpen);
                icon.classList.toggle('fa-xmark', isOpen);
            }
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        document.addEventListener('click', (event) => {
            const clickedInsideMenu = mobileNav.contains(event.target);
            const clickedToggle = mobileToggle.contains(event.target);
            if (!clickedInsideMenu && !clickedToggle && mobileNav.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Close menu when a nav link is clicked (works for touch/click)
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && mobileNav.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Close if viewport switches back to desktop size
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
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

    // Form Submission Logic (AJAX)
    const setupForm = (formId) => {
        const form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalBtnText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            try {
                const formData = new FormData(form);
                const response = await fetch('process_form.php', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (response.ok && result.status === 'success') {
                    showToast('Message sent successfully!', 'success');
                    form.reset();
                } else {
                    showToast(result.message || 'Error sending message.', 'error');
                }
            } catch (err) {
                showToast('A network error occurred. Please try again.', 'error');
                console.error(err);
            } finally {
                btn.innerHTML = originalBtnText;
                btn.disabled = false;
            }
        });
    };

    setupForm('quote-form');
    setupForm('contact-form');

    // Toast Notification System
    const createToastContainer = () => {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }
        return container;
    };

    const showToast = (message, type = 'success') => {
        const container = createToastContainer();
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
        toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
        
        container.appendChild(toast);
        
        // Trigger reflow & animate in
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Animate out and remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400); // Wait for transition
        }, 5000);
    };

});

// Know More panels — click/tap to toggle (mobile-safe)
document.querySelectorAll('.service-card').forEach(card => {
    const btn = card.querySelector('.know-more-btn');
    const panel = card.querySelector('.service-panel');
    if (!btn || !panel) return;

    const close = () => {
        btn.classList.remove('active');
        panel.classList.remove('active');
    };
    const open = () => {
        document.querySelectorAll('.know-more-btn.active').forEach(otherBtn => otherBtn.classList.remove('active'));
        document.querySelectorAll('.service-panel.active').forEach(otherPanel => otherPanel.classList.remove('active'));
        btn.classList.add('active');
        panel.classList.add('active');
    };

    btn.addEventListener('click', (event) => {
        event.preventDefault();
        if (panel.classList.contains('active')) {
            close();
        } else {
            open();
        }
    });

    btn.addEventListener('touchstart', (event) => {
        event.preventDefault();
        if (panel.classList.contains('active')) {
            close();
        } else {
            open();
        }
    }, { passive: false });
});
