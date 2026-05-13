document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger ? hamburger.querySelector('i') : null;
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Keep active state in sync for the home page Reviews anchor.
    const reviewsAnchor = document.querySelector('.nav-links a[href="#reviews"]');
    const reviewsSection = document.getElementById('reviews');

    const setActiveNav = (target) => {
        links.forEach(item => item.classList.remove('active'));
        if (target) {
            target.classList.add('active');
        }
    };

    if (reviewsAnchor && reviewsSection) {
        if (window.location.hash === '#reviews') {
            setActiveNav(reviewsAnchor);
        }

        reviewsAnchor.addEventListener('click', () => {
            setActiveNav(reviewsAnchor);
        });

        window.addEventListener('hashchange', () => {
            if (window.location.hash === '#reviews') {
                setActiveNav(reviewsAnchor);
            }
        });
    }

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Testimonials Carousel Auto-Scroll
    const carousel = document.querySelector('[data-testimonials-carousel]');
    if (carousel) {
        const track = carousel.querySelector('.testimonials-track');
        const cards = track ? Array.from(track.children) : [];
        if (track && cards.length && !track.dataset.cloned) {
            cards.forEach(card => track.appendChild(card.cloneNode(true)));
            track.dataset.cloned = 'true';
        }

        let resumeTimer;
        const pauseCarousel = () => {
            carousel.classList.add('is-paused');
            if (resumeTimer) {
                clearTimeout(resumeTimer);
            }
        };

        const scheduleResume = () => {
            if (resumeTimer) {
                clearTimeout(resumeTimer);
            }
            resumeTimer = setTimeout(() => {
                carousel.classList.remove('is-paused');
            }, 700);
        };

        carousel.addEventListener('mouseenter', pauseCarousel);
        carousel.addEventListener('mouseleave', scheduleResume);
        carousel.addEventListener('focusin', pauseCarousel);
        carousel.addEventListener('focusout', scheduleResume);
        carousel.addEventListener('pointerdown', pauseCarousel);
        carousel.addEventListener('pointerup', scheduleResume);
        carousel.addEventListener('touchstart', pauseCarousel, { passive: true });
        carousel.addEventListener('touchend', scheduleResume, { passive: true });
        carousel.addEventListener('wheel', pauseCarousel, { passive: true });
    }
});
