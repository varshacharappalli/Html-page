document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    initPageAnimations();
    setupResponsiveControls();
    setupCategoryFilters();
    setupMobileNavigation();
    setupBackToTopButton();
    addCookieConsent();
    enhanceHighlightBoxes();
    setupNewsletterForm();
}

function initPageAnimations() {
    const animatableElements = document.querySelectorAll('.slide-up, .fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 });
    
    animatableElements.forEach(element => {
        observer.observe(element);
    });
}

function setupResponsiveControls() {
    const desktopBtn = document.querySelector('.desktop-btn');
    const mobileBtn = document.querySelector('.mobile-btn');
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (!desktopBtn || !mobileBtn) return;
    
    desktopBtn.addEventListener('click', function() {
        document.body.classList.remove('mobile-view');
        toggleActiveClass(this, mobileBtn);
        localStorage.setItem('viewMode', 'desktop');
    });
    
    mobileBtn.addEventListener('click', function() {
        document.body.classList.add('mobile-view');
        toggleActiveClass(this, desktopBtn);
        localStorage.setItem('viewMode', 'mobile');
    });
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('show');
            document.body.classList.toggle('menu-open');
        });
        
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !navList.contains(event.target) && navList.classList.contains('show')) {
                menuToggle.classList.remove('active');
                navList.classList.remove('show');
                document.body.classList.remove('menu-open');
            }
        });
    }
    
    const savedViewMode = localStorage.getItem('viewMode');
    
    if (savedViewMode === 'mobile') {
        document.body.classList.add('mobile-view');
        toggleActiveClass(mobileBtn, desktopBtn);
    } else if (savedViewMode === 'desktop') {
        document.body.classList.remove('mobile-view');
        toggleActiveClass(desktopBtn, mobileBtn);
    } else {
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile-view');
            toggleActiveClass(mobileBtn, desktopBtn);
        }
    }
    window.addEventListener('resize', debounce(function() {
        if (window.innerWidth <= 768 && !document.body.classList.contains('mobile-view') && !localStorage.getItem('viewMode')) {
            document.body.classList.add('mobile-view');
            toggleActiveClass(mobileBtn, desktopBtn);
        } else if (window.innerWidth > 768 && document.body.classList.contains('mobile-view') && !localStorage.getItem('viewMode')) {
            document.body.classList.remove('mobile-view');
            toggleActiveClass(desktopBtn, mobileBtn);
        }
    }, 250));
}

function setupCategoryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const categoryCards = document.querySelectorAll('.category-card');
    
    if (!filterButtons.length || !categoryCards.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            categoryCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || filter === category) {
                    card.style.display = '';
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, 10);
                } else {
                    card.classList.remove('visible');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    categoryCards.forEach(card => {
        card.classList.add('visible');
    });
}

function setupMobileNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (!menuToggle || !navList) return;
    
    const navItems = navList.querySelectorAll('.nav-link');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
            
            if (document.body.classList.contains('mobile-view')) {
                menuToggle.classList.remove('active');
                navList.classList.remove('show');
                document.body.classList.remove('menu-open');
            }
        });
    });
}

function enhanceHighlightBoxes() {
    const highlightBoxes = document.querySelectorAll('.highlight-box');
    
    highlightBoxes.forEach(box => {
        const items = box.querySelectorAll('.highlight-item, .event-item, .resource-item');
        
        items.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.classList.add('highlight-hover');
            });
            
            item.addEventListener('mouseleave', function() {
                this.classList.remove('highlight-hover');
            });
            
            item.addEventListener('click', function() {
                const title = this.querySelector('h4').textContent;
                console.log(`Clicked on: ${title}`);
            });
        });
        
        const viewMoreLink = box.querySelector('.view-more');
        if (viewMoreLink) {
            viewMoreLink.addEventListener('click', function(e) {
                e.preventDefault();
                
                const originalText = this.innerHTML;
                this.innerHTML = 'Loading... <i class="fas fa-spinner fa-spin"></i>';
                this.classList.add('loading');
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.classList.remove('loading');
                }, 800);
            });
        }
    });
}

function setupNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!validateEmail(email)) {
            showFormMessage(this, 'Please enter a valid email address', 'error');
            emailInput.classList.add('error');
            return;
        }
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showFormMessage(this, 'Thank you for subscribing!', 'success');
            emailInput.value = '';
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
            
            setTimeout(() => {
                const message = this.querySelector('.form-message');
                if (message) message.remove();
            }, 5000);
        }, 1000);
    });
    
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            this.classList.remove('error');
            const message = newsletterForm.querySelector('.form-message');
            if (message) message.remove();
        });
    }
}

function setupBackToTopButton() {
    let backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(backToTopBtn);
    }
    
    const toggleBackToTopButton = () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    };
    
    toggleBackToTopButton();
    
    window.addEventListener('scroll', throttle(toggleBackToTopButton, 100));
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function addCookieConsent() {
    if (localStorage.getItem('cookieConsent')) return;
    
    let cookieBanner = document.querySelector('.cookie-banner');
    
    if (!cookieBanner) {
        cookieBanner = document.createElement('div');
        cookieBanner.className = 'cookie-banner';
        cookieBanner.innerHTML = `
            <div class="cookie-content">
                <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
                <div class="cookie-buttons">
                    <button class="accept-cookies btn btn-primary">Accept</button>
                    <button class="learn-more btn btn-secondary-outline">Learn more</button>
                </div>
            </div>
        `;
        document.body.appendChild(cookieBanner);
        
        setTimeout(() => {
            cookieBanner.classList.add('visible');
        }, 1000);
        const acceptButton = cookieBanner.querySelector('.accept-cookies');
        if (acceptButton) {
            acceptButton.addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'true');
                cookieBanner.classList.remove('visible');
                setTimeout(() => {
                    cookieBanner.remove();
                }, 500);
            });
        }
        
        const learnMoreButton = cookieBanner.querySelector('.learn-more');
        if (learnMoreButton) {
            learnMoreButton.addEventListener('click', function() {
                window.location.href = 'cookie-policy.html'; 
            });
        }
    }
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function showFormMessage(form, text, type) {
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) existingMessage.remove();
    
    const messageEl = document.createElement('div');
    messageEl.className = `form-message ${type}`;
    messageEl.textContent = text;
    
    form.appendChild(messageEl);
}

function toggleActiveClass(activeElement, inactiveElement) {
    activeElement.classList.add('active');
    inactiveElement.classList.remove('active');
}

function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function preloadImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const preloadLink = document.createElement('link');
            preloadLink.href = src;
            preloadLink.rel = 'preload';
            preloadLink.as = 'image';
            document.head.appendChild(preloadLink);
        }
    });
}

preloadImages();

document.addEventListener('click', function(e) {
    const target = e.target.closest('a');
    
    if (target && target.getAttribute('href') && target.getAttribute('href').startsWith('#')) {
        const id = target.getAttribute('href').substring(1);
        const element = document.getElementById(id);
        
        if (element) {
            e.preventDefault();
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }
});