document.addEventListener('DOMContentLoaded', () => {
    // 1. Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile navigation toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 3. Menu Category Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            menuCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'flex';
                    // Trigger fade in animation
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transition = 'opacity 0.4s ease';
                    }, 50);
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === filterValue) {
                        card.style.display = 'flex';
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transition = 'opacity 0.4s ease';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // 4. Lightbox Modal for Gallery & Menu Images
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    // Select all trigger elements (vibe gallery items and menu image boxes)
    const galleryItems = document.querySelectorAll('.gallery-item');
    const menuImgBoxes = document.querySelectorAll('.menu-img-box');

    function openLightbox(imgSrc, captionText) {
        if (lightbox && lightboxImg && lightboxCaption) {
            lightboxImg.src = imgSrc;
            lightboxImg.alt = captionText;
            lightboxCaption.textContent = captionText;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent page scrolling
        }
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    }

    // Attach click events to Vibe Gallery Items
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-title') ? item.querySelector('.gallery-title').textContent : 'บรรยากาศร้าน MJmilk';
            if (img) {
                openLightbox(img.getAttribute('src'), caption);
            }
        });
    });

    // Attach click events to Menu Images
    menuImgBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const img = box.querySelector('.menu-img');
            const parentCard = box.closest('.menu-card');
            const name = parentCard.querySelector('.menu-name') ? parentCard.querySelector('.menu-name').textContent : 'เมนูแนะนำ';
            const price = parentCard.querySelector('.menu-price') ? parentCard.querySelector('.menu-price').textContent : '';
            if (img) {
                openLightbox(img.getAttribute('src'), `${name} - ${price}`);
            }
        });
    });

    // Close lightbox on button click
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close lightbox when clicking outside the content area
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Close lightbox on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    // 5. Active Link Highlight on Scroll
    const sections = document.querySelectorAll('section[id], footer[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            
            // Adjust condition for the footer section
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);

    // 6. Language Switcher Logic
    const langButtons = document.querySelectorAll('.lang-btn');
    
    function setLanguage(lang) {
        if (lang === 'en') {
            document.body.classList.add('lang-en');
        } else {
            document.body.classList.remove('lang-en');
        }
        
        // Update active class on buttons
        langButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Save to LocalStorage
        localStorage.setItem('mjmilk_lang', lang);
    }
    
    // Initialize Language from LocalStorage or default to TH
    const savedLang = localStorage.getItem('mjmilk_lang') || 'th';
    setLanguage(savedLang);
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedLang = btn.getAttribute('data-lang');
            setLanguage(selectedLang);
        });
    });
});
