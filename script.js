// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    // Hide scroll indicator when not in home section
    function updateScrollIndicator() {
        const homeSection = document.querySelector('#home');
        const homeSectionBottom = homeSection.offsetTop + homeSection.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight;
        
        if (scrollPosition > homeSectionBottom) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.visibility = 'hidden';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.visibility = 'visible';
        }
    }

    window.addEventListener('scroll', updateScrollIndicator);
    updateScrollIndicator(); // Call once on page load

    menuToggle.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-nav .nav-link').forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active nav link on scroll
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Call once on page load

    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            projectCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    
        card.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For now, we'll just show an alert
            alert(`This functionality is not available yet. Reach out via email.`);
            
            // Reset form
            contactForm.reset();
        });
    }

    // Skill items hover effect
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });
    
        item.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });

    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.section');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.75) {
                element.classList.add('animate');
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Call once on page load

    // CV download fallback for browsers that don't support the download attribute
    document.querySelectorAll('a[download]').forEach(link => {
        link.addEventListener('click', function(e) {
            const isDownloadSupported = 'download' in document.createElement('a');
            
            if (!isDownloadSupported) {
                e.preventDefault();
                window.open(this.href, '_blank');
            }
        });
    });
});