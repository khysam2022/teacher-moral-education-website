document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Mobile Menu Navigation
    // ==========================================
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileNav.classList.toggle('open');
        });

        // Close mobile nav when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
            });
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileNav.contains(e.target) && e.target !== menuToggle) {
                mobileNav.classList.remove('open');
            }
        });
    }

    // ==========================================
    // 2. Carousel / Slideshow
    // ==========================================
    const slidesContainer = document.getElementById('carousel-slides');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dots = document.querySelectorAll('.carousel-dot');
    
    let currentIndex = 0;
    const slideCount = slides.length;
    let autoPlayInterval;

    if (slidesContainer && slideCount > 0) {
        const updateCarousel = (index) => {
            // Constrain index
            if (index < 0) {
                currentIndex = slideCount - 1;
            } else if (index >= slideCount) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }

            // Move slides container
            slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

            // Update dots
            dots.forEach((dot, idx) => {
                if (idx === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        const nextSlide = () => updateCarousel(currentIndex + 1);
        const prevSlide = () => updateCarousel(currentIndex - 1);

        // Buttons click listeners
        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });

        // Dots click listeners
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const targetIndex = parseInt(e.target.getAttribute('data-index'), 10);
                updateCarousel(targetIndex);
                resetAutoPlay();
            });
        });

        // Auto play function
        const startAutoPlay = () => {
            autoPlayInterval = setInterval(nextSlide, 5000);
        };

        const resetAutoPlay = () => {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        };

        // Initialize autoplay
        startAutoPlay();

        // Pause autoplay on mouse enter
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
            carouselContainer.addEventListener('mouseleave', startAutoPlay);
        }
    }

    // ==========================================
    // 3. FAQ Accordion
    // ==========================================
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const faqItem = btn.parentElement;
            const isOpen = faqItem.classList.contains('open');

            // Close all items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('open');
            });

            // Toggle current item
            if (!isOpen) {
                faqItem.classList.add('open');
            }
        });
    });

    // ==========================================
    // 4. Contact Form Submission
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('btn-submit-form');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = '傳送中...';
            }

            // Simulate server network latency
            setTimeout(() => {
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                
                if (name && email) {
                    formStatus.className = 'form-status success';
                    formStatus.textContent = `感謝您的聯絡，${name}！我們已收到您的表單，將在 1-2 個工作天內回覆至 ${email}。`;
                    contactForm.reset();
                } else {
                    formStatus.className = 'form-status error';
                    formStatus.textContent = '請填寫所有必要欄位。';
                }

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = '送出表單';
                }

                // Clear success message after 8 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = 'form-status';
                }, 8000);

            }, 1200);
        });
    }

    // ==========================================
    // 5. Scroll Active Link Highlight
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const handleScroll = () => {
        const scrollY = window.pageYOffset + 100; // offset for sticky header

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
});
