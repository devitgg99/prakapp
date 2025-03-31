$(document).ready(function() {
    
    // Cache DOM elements
    const $header = $('header');
    const $scrollBtn = $('.scroll-up-btn');
    const $menuBtn = $('#sidebarToggle'); // Updated selector
    const $nav = $('nav ul');
    const $sidebar = $('#sidebar');
    const $dropdownToggle = $('.dropdown-toggle');

    // Initialize ScrollReveal
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: true
    });

    // ScrollReveal Animations
    sr.reveal('.hero-text h2', { origin: 'left' });
    sr.reveal('.hero-text #prak', { delay: 300 });
    sr.reveal('.hero-text h1', { delay: 400 });
    sr.reveal('.hero-text p', { delay: 500 });
    sr.reveal('.hero-buttons', { delay: 600 });
    sr.reveal('.hero-media', { origin: 'right', delay: 700 });
    sr.reveal('.grid-item', { interval: 200 });
    sr.reveal('.about .title', { origin: 'left' });
    sr.reveal('.about .subtitle', { delay: 200 });
    sr.reveal('.services .title', { origin: 'right' });
    sr.reveal('.services .subtitle', { delay: 200 });
    sr.reveal('.contact .title', { origin: 'left' });
    sr.reveal('.contact form', { delay: 200 });

    // Initial animations on page load
    $('.hero-text').addClass('animate__animated animate__fadeInLeft');
    $('.hero-media').addClass('animate__animated animate__fadeInRight');
    $('.hero-buttons').addClass('animate__animated animate__fadeInUp animate__delay-1s');
    
    // Window scroll handler with animations
    $(window).on('scroll', function() {
        // Sticky header animation
        if (window.scrollY > 20) {
            $header.addClass('sticky animate__animated animate__fadeInDown');
        } else {
            $header.removeClass('sticky animate__animated animate__fadeInDown');
        }

        // Scroll button animation
        if (window.scrollY > 500) {
            $scrollBtn.addClass('show animate__animated animate__fadeIn');
        } else {
            $scrollBtn.removeClass('show animate__animated animate__fadeIn');
        }

        // Parallax effect
        $('.parallax').each(function() {
            const scrolled = $(window).scrollTop();
            $(this).css('background-position-y', -(scrolled * 0.3) + 'px');
        });

        // Animate elements when they come into view
        animateOnScroll();
    });

    // Sidebar toggle button
    $menuBtn.on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $sidebar.toggleClass('open');
    });

    // Close sidebar when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('#sidebar, #sidebarToggle').length) {
            $sidebar.removeClass('open');
        }
    });

    // Close button in sidebar
    $('#closeSidebar').on('click', function() {
        $sidebar.removeClass('open');
    });

    // Dropdown toggles within sidebar
    $('.sidebar .dropdown-toggle').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const $parentLi = $(this).parent();
        const $dropdown = $parentLi.find('.dropdown');

        // Close other dropdowns
        $('.sidebar ul li').not($parentLi).removeClass('active')
            .find('.dropdown').slideUp(300);

        // Toggle current dropdown
        $parentLi.toggleClass('active');
        $dropdown.slideToggle(300);
    });

    // Function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to animate elements on scroll
    function animateOnScroll() {
        $('.animate-on-scroll').each(function() {
            if (isElementInViewport(this) && !$(this).hasClass('animated')) {
                $(this).addClass('animated ' + $(this).data('animation'));
            }
        });
    }

    // Smooth scroll to top with animation
    $scrollBtn.on('click', function() {
        $('html').animate({ scrollTop: 0 }, {
            duration: 800,
            easing: 'easeInOutQuart',
            complete: function() {
                $scrollBtn.addClass('animate__animated animate__bounceOut');
                setTimeout(() => {
                    $scrollBtn.removeClass('animate__animated animate__bounceOut');
                }, 1000);
            }
        });
    });

    // Typing animation
    if ($('.typing').length) {
        new Typed('.typing', {
            strings: [
                'Innovative Solutions',
                'Seamless Transactions',
                'Creative Ideas',
                'Digital Excellence'
            ],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true,
            smartBackspace: true
        });
    }

    // Initialize and configure carousel
    function initCarousel() {
        if ($('.carousel').length) {
            $('.carousel').owlCarousel({
                margin: 20,
                loop: true,
                autoplay: true,
                autoplayTimeout: 3000,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 1,
                        nav: false,
                        margin: 10
                    },
                    480: {
                        items: 2,
                        nav: false,
                        margin: 15
                    },
                    768: {
                        items: 3,
                        nav: false
                    },
                    1024: {
                        items: 3,
                        nav: true
                    }
                },
                navText: [
                    '<i class="fas fa-chevron-left"></i>',
                    '<i class="fas fa-chevron-right"></i>'
                ]
            });
        }
    }

    // Initialize carousel
    initCarousel();
    
    // Handle window resize
    let resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Reset mobile menu state on resize
            if (window.innerWidth > 768) {
                $nav.removeClass('active');
                $sidebar.removeClass('open');
            }
            
            // Reinitialize carousel on resize
            if ($('.carousel').length) {
                $('.carousel').trigger('destroy.owl.carousel');
                initCarousel();
            }
        }, 250);
    });

    // Form validation with animation
    $('form').on('submit', function(e) {
        e.preventDefault();
        const $form = $(this);
        const $submitBtn = $form.find('button[type="submit"]');
        
        $submitBtn.prop('disabled', true);

        let isValid = true;
        $form.find('input[required], textarea[required]').each(function() {
            if (!$(this).val().trim()) {
                isValid = false;
                $(this).addClass('error animate__animated animate__shakeX');
                setTimeout(() => {
                    $(this).removeClass('animate__animated animate__shakeX');
                }, 1000);
            } else {
                $(this).removeClass('error');
            }
        });

        const emailInput = $form.find('input[type="email"]');
        if (emailInput.length && emailInput.val()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.val())) {
                isValid = false;
                emailInput.addClass('error animate__animated animate__shakeX');
                setTimeout(() => {
                    emailInput.removeClass('animate__animated animate__shakeX');
                }, 1000);
            }
        }

        if (isValid) {
            $form.addClass('animate__animated animate__fadeOutUp');
            setTimeout(() => {
                console.log('Form submitted successfully');
                $form[0].reset();
                $form.removeClass('animate__animated animate__fadeOutUp')
                    .addClass('animate__animated animate__fadeInDown');
            }, 1000);
        }

        $submitBtn.prop('disabled', false);
    });

    // Remove error class on input focus
    $('form input, form textarea').on('focus', function() {
        $(this).removeClass('error');
    });

    // Add hover animations to buttons
    $('.btn-primary, .btn-secondary').hover(
        function() { $(this).addClass('animate__animated animate__pulse'); },
        function() { $(this).removeClass('animate__animated animate__pulse'); }
    );
    
    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
});