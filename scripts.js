/* scripts.js */

/* Preloader Functionality */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    preloader.style.transition = 'opacity 0.5s ease-out';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

/* Responsive Navbar */
const hamburger = document.querySelector('.hamburger');
const navbarLinks = document.querySelector('.navbar-links');

hamburger.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
    const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
    hamburger.setAttribute('aria-expanded', !expanded);
});

/* Close Navbar on Link Click (Mobile) */
const navLinks = document.querySelectorAll('.navbar-links li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarLinks.classList.contains('active')) {
            navbarLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', false);
        }
    });
});

/* Navbar Animation & Active Link Highlighting */
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }

    // Active Link Highlighting
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 200; // Adjust as needed

    sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === section.getAttribute('id')) {
                    link.classList.add('active');
                }
            });
        }
    });
});

/* Set Current Year in Footer */
document.getElementById('year').textContent = new Date().getFullYear();

/* Smooth Scroll for CTA Button */
const ctaButton = document.getElementById('cta-button');
ctaButton.addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

/* Contact Form Submission */
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name === '' || email === '' || message === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Simple email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    alert('Thank you for your message! BallballKing will get back to you soon.');
    contactForm.reset();
});

/* Dark Mode Toggle */
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

/* GSAP Animations */
gsap.registerPlugin(ScrollTrigger);

/* Hero Content Animation */
gsap.from('.hero-content h1', {
    y: -50,
    opacity: 0,
    duration: 1
});

gsap.from('.hero-content p', {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.5
});

gsap.from('#cta-button', {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 1
});

/* Navbar Links Animation */
gsap.from('.navbar-links li', {
    y: -20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    delay: 0.5
});

/* About Section Animation */
gsap.from('.ability-card', {
    scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.3
});

/* Gallery Section Animation */
gsap.from('.gallery-grid a', {
    scrollTrigger: {
        trigger: '#gallery',
        start: 'top 80%',
    },
    scale: 0.8,
    opacity: 0,
    duration: 1,
    stagger: 0.2
});

/* News Section Animation */
gsap.from('.news-article', {
    scrollTrigger: {
        trigger: '#news',
        start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.3
});

/* Contact Section Animation */
gsap.from('#contact-form', {
    scrollTrigger: {
        trigger: '#contact',
        start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 1
});

/* Featured News Slider Animation */
gsap.from('.swiper-slide', {
    scrollTrigger: {
        trigger: '.featured-news',
        start: 'top 80%',
    },
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2
});

/* Three.js 3D Animation for Hero Section */
const heroCanvas = document.getElementById('hero-canvas');
const renderer = new THREE.WebGLRenderer({ canvas: heroCanvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();

// Camera
const camera3D = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera3D.position.z = 5;

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xff9800, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Geometry and Material for Sphere
const geometry = new THREE.SphereGeometry(1.5, 64, 64);
const material = new THREE.MeshStandardMaterial({
    color: 0xff9800,
    emissive: 0xff9800,
    emissiveIntensity: 0.5,
    metalness: 0.5,
    roughness: 0.1
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Glow Effect
const glowGeometry = new THREE.SphereGeometry(1.7, 64, 64);
const glowMaterial = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 1.0 },
        resolution: { value: new THREE.Vector2() }
    },
    vertexShader: `
        varying vec3 vNormal;
        void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float time;
        varying vec3 vNormal;
        void main() {
            float intensity = pow(0.5 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            gl_FragColor = vec4(vec3(1.0, 0.6, 0.0) * intensity, 1.0);
        }
    `,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true
});
const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
scene.add(glowMesh);

// Particle System
const particleCount = 500;
const particlesGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particlesMaterial = new THREE.PointsMaterial({
    color: 0xff9800,
    size: 0.05,
    transparent: true,
    opacity: 0.7
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Resize Handler
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera3D.aspect = width / height;
    camera3D.updateProjectionMatrix();
});

// Clock for Shader Animation
const clock = new THREE.Clock();

// Animation Loop
const animateHero = () => {
    requestAnimationFrame(animateHero);
    sphere.rotation.y += 0.001;
    glowMesh.rotation.y += 0.001;
    particles.rotation.y += 0.0005;
    glowMaterial.uniforms.time.value += clock.getDelta();
    renderer.render(scene, camera3D);
};

animateHero();

/* Three.js 3D Animation for About Section */
const aboutCanvas = document.getElementById('about-canvas');
const aboutRenderer = new THREE.WebGLRenderer({ canvas: aboutCanvas, alpha: true, antialias: true });
aboutRenderer.setSize(window.innerWidth, 400);
aboutRenderer.setPixelRatio(window.devicePixelRatio);

const aboutScene = new THREE.Scene();

// Camera
const aboutCamera = new THREE.PerspectiveCamera(45, window.innerWidth / 400, 0.1, 1000);
aboutCamera.position.z = 5;

// Lights
const aboutAmbientLight = new THREE.AmbientLight(0xffffff, 0.5);
aboutScene.add(aboutAmbientLight);

const aboutPointLight = new THREE.PointLight(0xff9800, 1);
aboutPointLight.position.set(10, 10, 10);
aboutScene.add(aboutPointLight);

// Geometry and Material for Cube (symbolizing strength)
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    emissive: 0x00ff00,
    emissiveIntensity: 0.5,
    metalness: 0.5,
    roughness: 0.1
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
aboutScene.add(cube);

// Glow Effect for Cube
const cubeGlowGeometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
const cubeGlowMaterial = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 1.0 },
        resolution: { value: new THREE.Vector2() }
    },
    vertexShader: `
        varying vec3 vNormal;
        void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float time;
        varying vec3 vNormal;
        void main() {
            float intensity = pow(0.5 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            gl_FragColor = vec4(vec3(0.0, 1.0, 0.0) * intensity, 1.0);
        }
    `,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true
});
const cubeGlowMesh = new THREE.Mesh(cubeGlowGeometry, cubeGlowMaterial);
aboutScene.add(cubeGlowMesh);

// Particle System for About Section
const aboutParticleCount = 300;
const aboutParticlesGeometry = new THREE.BufferGeometry();
const aboutPositions = new Float32Array(aboutParticleCount * 3);

for (let i = 0; i < aboutParticleCount; i++) {
    aboutPositions[i * 3] = (Math.random() - 0.5) * 10;
    aboutPositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    aboutPositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
}

aboutParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(aboutPositions, 3));

const aboutParticlesMaterial = new THREE.PointsMaterial({
    color: 0x00ff00,
    size: 0.05,
    transparent: true,
    opacity: 0.7
});

const aboutParticles = new THREE.Points(aboutParticlesGeometry, aboutParticlesMaterial);
aboutScene.add(aboutParticles);

// Resize Handler for About Section
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = 400;
    aboutRenderer.setSize(width, height);
    aboutCamera.aspect = width / height;
    aboutCamera.updateProjectionMatrix();
});

// Clock for Shader Animation in About Section
const aboutClock = new THREE.Clock();

// Animation Loop for About Section
const animateAbout = () => {
    requestAnimationFrame(animateAbout);
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.005;
    cubeGlowMesh.rotation.x += 0.005;
    cubeGlowMesh.rotation.y += 0.005;
    aboutParticles.rotation.y += 0.0005;
    cubeGlowMaterial.uniforms.time.value += aboutClock.getDelta();
    aboutRenderer.render(aboutScene, aboutCamera);
};

animateAbout();

/* Parallax Effect */
document.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth) - 0.5;
    const y = (event.clientY / window.innerHeight) - 0.5;
    sphere.position.x = x * 1;
    sphere.position.y = -y * 1;
    glowMesh.position.x = x * 1.2;
    glowMesh.position.y = -y * 1.2;
});

/* Dynamic News Loading from JSON with Pagination and Search */
fetch('news.json')
    .then(response => response.json())
    .then(data => {
        const newsContainer = document.getElementById('news-container');
        const loadMoreButton = document.getElementById('load-more');
        const searchInput = document.getElementById('news-search');
        const featuredContainer = document.getElementById('featured-news-container');
        const totalNews = data.news.length;
        const newsPerPage = 4;
        let currentNewsIndex = 0;
        let filteredNews = data.news;

        /* Load Featured News */
        function loadFeaturedNews() {
            const featuredNews = data.news.slice(0, 3); // First 3 articles as featured
            featuredNews.forEach(article => {
                const slide = document.createElement('div');
                slide.classList.add('swiper-slide');
                slide.innerHTML = `
                    <img src="${article.image}" alt="${article.title}">
                    <h3>${article.title}</h3>
                    <p>${truncateContent(article.content, 100)}</p>
                    <a href="#" class="read-more">Read More</a>
                `;
                featuredContainer.appendChild(slide);
            });

            /* Initialize Swiper */
            const swiper = new Swiper('.swiper-container', {
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
            });

            /* Add event listeners for "Read More" buttons in featured slider */
            const featuredReadMoreButtons = document.querySelectorAll('.featured-news .read-more');
            featuredReadMoreButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const slideElement = e.target.closest('.swiper-slide');
                    const title = slideElement.querySelector('h3').textContent;
                    const date = formatDate(getArticleByTitle(title).date);
                    const imageSrc = getArticleByTitle(title).image;
                    const content = getArticleByTitle(title).content;

                    openModal({ title, date, imageSrc, content });
                });
            });
        }

        /* Helper Function to Get Article by Title */
        function getArticleByTitle(title) {
            return data.news.find(article => article.title === title);
        }

        /* Function to Load News Articles */
        function loadNews() {
            const nextNews = filteredNews.slice(currentNewsIndex, currentNewsIndex + newsPerPage);
            nextNews.forEach(article => {
                const newsArticle = document.createElement('article');
                newsArticle.classList.add('news-article');
                newsArticle.innerHTML = `
                    <img src="${article.image}" alt="${article.title}" class="news-image">
                    <div class="news-content">
                        <h3>${article.title}</h3>
                        <p class="news-date">${formatDate(article.date)}</p>
                        <p>${truncateContent(article.content, 150)}</p>
                        <button class="read-more">Read More</button>
                    </div>
                `;
                newsContainer.appendChild(newsArticle);
            });
            currentNewsIndex += newsPerPage;

            /* Animate Newly Added Articles */
            gsap.from(nextNews.map((_, i) => newsContainer.children[newsContainer.children.length - nextNews.length + i]), {
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.2,
                ease: 'power2.out'
            });

            /* Add event listeners for new "Read More" buttons */
            const readMoreButtons = document.querySelectorAll('.news-article .read-more');
            readMoreButtons.forEach(button => {
                button.removeEventListener('click', openArticleModal); // Prevent duplicate listeners
                button.addEventListener('click', openArticleModal);
            });

            /* Hide Load More button if all news are loaded */
            if (currentNewsIndex >= filteredNews.length) {
                loadMoreButton.style.display = 'none';
            } else {
                loadMoreButton.style.display = 'block';
            }
        }

        /* Function to Open Modal with Article Details */
        function openModal({ title, date, imageSrc, content }) {
            const modal = document.getElementById('news-modal');
            const modalImage = modal.querySelector('.modal-image');
            const modalTitle = modal.querySelector('.modal-title');
            const modalDate = modal.querySelector('.modal-date');
            const modalText = modal.querySelector('.modal-text');
            const shareFacebook = modal.querySelector('.share-facebook');
            const shareTwitter = modal.querySelector('.share-twitter');
            const shareLinkedin = modal.querySelector('.share-linkedin');

            modalImage.src = imageSrc;
            modalImage.alt = title;
            modalTitle.textContent = title;
            modalDate.textContent = date;
            modalText.textContent = content;

            /* Update Share Links */
            const pageURL = window.location.href.split('#')[0] + '#news'; // Current page URL
            const encodedURL = encodeURIComponent(pageURL);
            const encodedTitle = encodeURIComponent(title);
            const encodedContent = encodeURIComponent(content);

            shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`;
            shareTwitter.href = `https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedTitle}`;
            shareLinkedin.href = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedURL}&title=${encodedTitle}&summary=${encodedContent}`;

            modal.style.display = 'block';
        }

        /* Function to Close Modal */
        function closeModal() {
            const modal = document.getElementById('news-modal');
            modal.style.display = 'none';
        }

        /* Event Listeners for Modal */
        const modal = document.getElementById('news-modal');
        const closeButton = modal.querySelector('.close-button');

        closeButton.addEventListener('click', closeModal);

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        /* Function to Format Date */
        function formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const dateObj = new Date(dateString);
            return dateObj.toLocaleDateString(undefined, options);
        }

        /* Function to Truncate Content */
        function truncateContent(content, maxLength) {
            if (content.length > maxLength) {
                return content.substring(0, maxLength) + '...';
            }
            return content;
        }

        /* Search Functionality */
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            filteredNews = data.news.filter(article => 
                article.title.toLowerCase().includes(query) ||
                article.content.toLowerCase().includes(query)
            );
            resetNews();
            loadNews();
        });

        /* Reset News Container */
        function resetNews() {
            newsContainer.innerHTML = '';
            currentNewsIndex = 0;
        }

        /* Load More Button Click */
        loadMoreButton.addEventListener('click', loadNews);

        /* Initial Load */
        loadFeaturedNews();
        loadNews();
    })
    .catch(error => console.error('Error loading news:', error));

/* GSAP ScrollTrigger Registration */
gsap.registerPlugin(ScrollTrigger);

/* GSAP Animations for Featured News Slider */
gsap.from('.swiper-slide', {
    scrollTrigger: {
        trigger: '.featured-news',
        start: 'top 80%',
    },
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2
});

/* Three.js 3D Animation for Hero Section */
/* (Same as above) */

/* Three.js 3D Animation for About Section */
/* (Same as above) */

/* Parallax Effect */
/* (Same as above) */
