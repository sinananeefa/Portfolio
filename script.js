// =========================================================================
// Muhammed Sinan Aneefa — Interactive Portfolio Logic
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // ---------------------------------------------------------------------
    // 1. Interactive Background Cyber Canvas (Hero Section)
    // ---------------------------------------------------------------------
    const canvas = document.getElementById('heroCanvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    let animationFrameId = null;
    let isReelPlaying = true;

    if (canvas && ctx) {
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        let resizeTimer;
        let lastWidth = window.innerWidth;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth !== lastWidth) {
                    lastWidth = window.innerWidth;
                    width = canvas.width = window.innerWidth;
                    height = canvas.height = window.innerHeight;
                    initParticles();
                } else {
                    height = canvas.height = window.innerHeight;
                }
            }, 150);
        });

        // Mouse & Touch interaction coordinates
        const mouse = {
            x: width / 2,
            y: height / 2,
            radius: 140
        };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        function handleTouch(e) {
            if (e.touches && e.touches.length > 0) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
            }
        }
        window.addEventListener('touchstart', handleTouch, { passive: true });
        window.addEventListener('touchmove', handleTouch, { passive: true });

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.baseX = x;
                this.baseY = y;
                this.size = Math.random() * 2 + 1;
                this.density = (Math.random() * 25) + 5;
                this.vx = (Math.random() - 0.5) * 0.8;
                this.vy = (Math.random() - 0.5) * 0.8;
                const rand = Math.random();
                if (rand > 0.75) {
                    this.color = 'rgba(255, 42, 81, 0.9)'; // Ruby Nova
                } else if (rand > 0.55) {
                    this.color = 'rgba(255, 107, 53, 0.85)'; // Solar Ember
                } else if (rand > 0.4) {
                    this.color = 'rgba(192, 38, 211, 0.75)'; // Electric Orchid
                } else {
                    this.color = 'rgba(241, 245, 249, 0.45)'; // Starlight Silver
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                // Move particle
                this.x += this.vx;
                this.y += this.vy;

                // Bounce at boundaries
                if (this.x < 0 || this.x > width) this.vx = -this.vx;
                if (this.y < 0 || this.y > height) this.vy = -this.vy;

                // Mouse proximity push
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    const directionX = forceDirectionX * force * this.density;
                    const directionY = forceDirectionY * force * this.density;
                    this.x -= directionX;
                    this.y -= directionY;
                }
            }
        }

        let particles = [];
        function initParticles() {
            particles = [];
            const calculatedCount = Math.floor((width * height) / 12000);
            const particleCount = Math.max(25, Math.min(calculatedCount, 75));
            for (let i = 0; i < particleCount; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                particles.push(new Particle(x, y));
            }
        }
        initParticles();

        function connectParticles() {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 115) {
                        const opacity = 1 - (distance / 115);
                        ctx.strokeStyle = `rgba(255, 55, 75, ${opacity * 0.22})`;
                        ctx.lineWidth = 0.85;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            if (!isReelPlaying) return;
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].draw();
                particles[i].update();
            }
            connectParticles();

            animationFrameId = requestAnimationFrame(animate);
        }
        animate();

        // Reel Control Toggle (Play/Pause)
        const reelControlBtn = document.getElementById('reelControlBtn');
        const playIcon = document.getElementById('playIcon');
        const pauseIcon = document.getElementById('pauseIcon');
        const reelLabel = document.getElementById('reelLabel');

        if (reelControlBtn) {
            reelControlBtn.addEventListener('click', () => {
                isReelPlaying = !isReelPlaying;

                if (isReelPlaying) {
                    playIcon.classList.remove('hidden');
                    pauseIcon.classList.add('hidden');
                    reelLabel.textContent = 'Live Matrix';
                    animate();
                } else {
                    cancelAnimationFrame(animationFrameId);
                    playIcon.classList.add('hidden');
                    pauseIcon.classList.remove('hidden');
                    reelLabel.textContent = 'Paused';
                }
            });
        }
    }

    // ---------------------------------------------------------------------
    // 2. Hanging ID Badge Interactive 3D Tilt Effect
    // ---------------------------------------------------------------------
    const badgeCard = document.querySelector('.badge-id-card');
    if (badgeCard && window.matchMedia('(hover: hover)').matches) {
        badgeCard.addEventListener('mousemove', (e) => {
            const rect = badgeCard.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const tiltX = (y / rect.height) * -20;
            const tiltY = (x / rect.width) * 20;

            badgeCard.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.04)`;
        });

        badgeCard.addEventListener('mouseleave', () => {
            badgeCard.style.transform = 'rotate(-2.5deg) scale(1)';
        });
    }

    // ---------------------------------------------------------------------
    // 3. Header Scroll Styling
    // ---------------------------------------------------------------------
    const headerNav = document.getElementById('headerNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            headerNav.classList.add('scrolled');
        } else {
            headerNav.classList.remove('scrolled');
        }
    }, { passive: true });

    // ---------------------------------------------------------------------
    // 4. Scroll Spy: Active Link Highlighting
    // ---------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

    function updateActiveNav() {
        const scrollPos = window.pageYOffset + 140;

        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ---------------------------------------------------------------------
    // 5. Mobile Drawer Toggle
    // ---------------------------------------------------------------------
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');

    if (menuToggleBtn && mobileDrawer) {
        function closeDrawer() {
            menuToggleBtn.classList.remove('active');
            mobileDrawer.classList.remove('active');
            document.body.classList.remove('drawer-open');
        }

        menuToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menuToggleBtn.classList.toggle('active');
            mobileDrawer.classList.toggle('active', isActive);
            document.body.classList.toggle('drawer-open', isActive);
        });

        // Close when clicking inside any drawer link or action
        document.querySelectorAll('.drawer-link, .drawer-cv-btn, .drawer-social-link').forEach(link => {
            link.addEventListener('click', closeDrawer);
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileDrawer.classList.contains('active') && !mobileDrawer.contains(e.target) && !menuToggleBtn.contains(e.target)) {
                closeDrawer();
            }
        });

        // Close on ESC key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileDrawer.classList.contains('active')) {
                closeDrawer();
            }
        });
    }

    // ---------------------------------------------------------------------
    // 6. Smooth Scroll Fallback
    // ---------------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const offset = 75;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = targetEl.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---------------------------------------------------------------------
    // 7. Skill Bar Progress Animation on Scroll
    // ---------------------------------------------------------------------
    const skillBars = document.querySelectorAll('.sb-fill');
    if ('IntersectionObserver' in window && skillBars.length > 0) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.width = entry.target.style.getPropertyValue('--level');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        skillBars.forEach(bar => {
            const targetWidth = bar.style.getPropertyValue('--level');
            bar.style.width = '0%';
            setTimeout(() => observer.observe(bar), 100);
        });
    }
});
