document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page with animations
    initPageAnimations();
    
    // Setup responsive controls
    setupResponsiveControls();
    
    // Add interactive features to info boxes
    enhanceInfoBoxes();
    
    // Add navigation functionality
    setupNavigation();
    
    // Setup search functionality if needed
    setupSearch();
});

// Function to initialize page animations
function initPageAnimations() {
    // Add fade-in animation to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.classList.add('fade-in');
    }
    
    // Add slide-up animation to info boxes with delay
    const infoBoxes = document.querySelectorAll('.info-box');
    infoBoxes.forEach((box, index) => {
        setTimeout(() => {
            box.classList.add('slide-up');
        }, 200 * index);
    });
}

// Function to setup responsive controls
function setupResponsiveControls() {
    const desktopBtn = document.querySelector('.desktop-btn');
    const mobileBtn = document.querySelector('.mobile-btn');
    
    // Set desktop view as default
    desktopBtn.classList.add('active');
    
    desktopBtn.addEventListener('click', function() {
        document.body.classList.remove('mobile-view');
        desktopBtn.classList.add('active');
        mobileBtn.classList.remove('active');
    });
    
    mobileBtn.addEventListener('click', function() {
        document.body.classList.add('mobile-view');
        mobileBtn.classList.add('active');
        desktopBtn.classList.remove('active');
    });
    
    // Check viewport width on resize and adjust view accordingly
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile-view');
            mobileBtn.classList.add('active');
            desktopBtn.classList.remove('active');
        } else {
            document.body.classList.remove('mobile-view');
            desktopBtn.classList.add('active');
            mobileBtn.classList.remove('active');
        }
    });
    
    // Initial check for mobile
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile-view');
        mobileBtn.classList.add('active');
        desktopBtn.classList.remove('active');
    }
}

// Function to enhance info boxes with interactive features
function enhanceInfoBoxes() {
    const infoBoxes = document.querySelectorAll('.info-box');
    
    infoBoxes.forEach(box => {
        // Add hover effect for paragraphs
        const paragraphs = box.querySelectorAll('p:not(:last-child)');
        paragraphs.forEach(p => {
            p.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
                this.style.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
            });
            
            p.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
                this.style.color = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
            });
        });
        
        // Add click event for "View More" links
        const viewMoreLink = box.querySelector('a');
        if (viewMoreLink) {
            viewMoreLink.addEventListener('click', function(e) {
                // If you want to add a specific action instead of normal navigation
                // e.preventDefault();
                
                // For example, show a loading indicator
                this.innerHTML = 'Loading... <i class="fas fa-spinner fa-spin"></i>';
                
                // Simulate loading (remove in production)
                setTimeout(() => {
                    // Reset link text (remove in production)
                    this.innerHTML = 'View More →';
                }, 1500);
            });
        }
    });
}

// Function to setup navigation
function setupNavigation() {
    // Create a modern floating navigation menu
    const nav = document.createElement('nav');
    nav.className = 'main-nav';
    nav.innerHTML = `
        <div class="logo">
            <img src="https://via.placeholder.com/150x50?text=E2Expo" alt="E2Expo Logo">
        </div>
        <ul>
            <li><a href="#" class="active">Home</a></li>
            <li><a href="#">Events</a></li>
            <li><a href="#">Expo</a></li>
            <li><a href="#">Product Launches</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
        <button class="mobile-menu-toggle">
            <i class="fas fa-bars"></i>
        </button>
    `;
    
    // Insert navigation at the top of the header
    const header = document.querySelector('header');
    if (header) {
        header.prepend(nav);
        
        // Setup mobile menu toggle
        const menuToggle = nav.querySelector('.mobile-menu-toggle');
        const navMenu = nav.querySelector('ul');
        
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            this.innerHTML = navMenu.classList.contains('show') ? 
                '<i class="fas fa-times"></i>' : 
                '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!nav.contains(event.target) && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Add CSS for navigation
    const style = document.createElement('style');
    style.textContent = `
        .main-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-bottom: 15px;
        }
        
        .main-nav ul {
            display: flex;
            list-style: none;
        }
        
        .main-nav ul li {
            margin-left: 20px;
        }
        
        .main-nav ul li a {
            color: white;
            text-decoration: none;
            font-weight: 500;
            padding: 5px 10px;
            border-radius: 4px;
            transition: all 0.3s ease;
        }
        
        .main-nav ul li a:hover, .main-nav ul li a.active {
            background-color: rgba(255, 255, 255, 0.2);
        }
        
        .mobile-menu-toggle {
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
        }
        
        @media (max-width: 768px) {
            .main-nav ul {
                display: none;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background-color: var(--primary-color);
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                z-index: 100;
                padding: 1rem 0;
            }
            
            .main-nav ul.show {
                display: flex;
            }
            
            .main-nav ul li {
                margin: 0;
            }
            
            .main-nav ul li a {
                display: block;
                padding: 12px 20px;
                border-radius: 0;
            }
            
            .mobile-menu-toggle {
                display: block;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Function to setup search functionality
function setupSearch() {
    // Create a search bar
    const searchBar = document.createElement('div');
    searchBar.className = 'search-bar';
    searchBar.innerHTML = `
        <form>
            <input type="text" placeholder="Search E2Expo...">
            <button type="submit"><i class="fas fa-search"></i></button>
        </form>
    `;
    
    // Add it to the navigation
    const nav = document.querySelector('.main-nav');
    if (nav) {
        nav.appendChild(searchBar);
        
        // Add search bar styles
        const style = document.createElement('style');
        style.textContent = `
            .search-bar {
                position: relative;
                margin-left: 20px;
            }
            
            .search-bar form {
                display: flex;
                align-items: center;
            }
            
            .search-bar input {
                background-color: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 20px;
                padding: 8px 15px;
                color: white;
                width: 180px;
                transition: all 0.3s ease;
            }
            
            .search-bar input::placeholder {
                color: rgba(255, 255, 255, 0.7);
            }
            
            .search-bar input:focus {
                outline: none;
                background-color: rgba(255, 255, 255, 0.2);
                width: 220px;
            }
            
            .search-bar button {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
            }
            
            @media (max-width: 992px) {
                .search-bar {
                    display: none;
                }
            }
        `;
        
        document.head.appendChild(style);
        
        // Add search functionality
        const searchForm = searchBar.querySelector('form');
        const searchInput = searchBar.querySelector('input');
        
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                // For demonstration, just show an alert with the search term
                alert(`Searching for: ${searchTerm}`);
                
                // In a real application, you would implement actual search functionality
                searchInput.value = '';
            }
        });
    }
}

// Dynamically add a footer to the page
function addFooter() {
    const footer = document.createElement('footer');
    footer.innerHTML = `
        <div class="container">
            <div class="footer-content">
                <div class="footer-column">
                    <h4>About E2Expo</h4>
                    <p>E2Expo accelerates clean energy and environmental solutions by providing a powerful online showcase for sustainable businesses and initiatives.</p>
                </div>
                <div class="footer-column">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Events</a></li>
                        <li><a href="#">Expo</a></li>
                        <li><a href="#">Product Launches</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4>Contact Us</h4>
                    <p>Email: info@e2expo.com</p>
                    <p>Phone: +91 98765 43210</p>
                    <p>Address: Green Tech Park, Bangalore, India</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 E2Expo. All rights reserved.</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(footer);
}

// Call the footer function after the DOM is loaded
window.addEventListener('load', addFooter);

// Add a back-to-top button
function addBackToTopButton() {
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(button);
    
    // Add styles for the button
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .back-to-top.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .back-to-top:hover {
            background-color: var(--accent-color);
        }
    `;
    
    document.head.appendChild(style);
    
    // Show/hide the button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.classList.add('show');
        } else {
            button.classList.remove('show');
        }
    });
    
    // Scroll to top when clicked
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add the back-to-top button
addBackToTopButton();

// Add a simple cookie consent banner
function addCookieConsent() {
    // Check if consent was already given
    if (!localStorage.getItem('cookieConsent')) {
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
            <button class="accept-cookies">Accept</button>
            <button class="learn-more">Learn more</button>
        `;
        
        document.body.appendChild(banner);
        
        // Add styles for the banner
        const style = document.createElement('style');
        style.textContent = `
            .cookie-banner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background-color: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                z-index: 1001;
                font-size: 14px;
            }
            
            .cookie-banner p {
                margin: 0;
                flex: 1;
                min-width: 200px;
                margin-right: 20px;
            }
            
            .cookie-banner button {
                background-color: var(--accent-color);
                border: none;
                color: white;
                padding: 8px 15px;
                margin-left: 10px;
                border-radius: 4px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }
            
            .cookie-banner .learn-more {
                background-color: transparent;
                border: 1px solid white;
            }
            
            .cookie-banner button:hover {
                background-color: #e67e22;
            }
            
            .cookie-banner .learn-more:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
            
            @media (max-width: 576px) {
                .cookie-banner {
                    flex-direction: column;
                    align-items: flex-start;
                }
                
                .cookie-banner p {
                    margin-bottom: 10px;
                    margin-right: 0;
                }
                
                .cookie-banner button {
                    margin: 5px 10px 5px 0;
                }
            }
        `;
        
        document.head.appendChild(style);
        
        // Add event listeners to buttons
        const acceptButton = banner.querySelector('.accept-cookies');
        const learnMoreButton = banner.querySelector('.learn-more');
        
        acceptButton.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'true');
            banner.style.display = 'none';
        });
        
        learnMoreButton.addEventListener('click', function() {
            alert('This would take you to a detailed cookie policy page.');
        });
    }
}

// Add the cookie consent banner
addCookieConsent();