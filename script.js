// Mobile menu toggle
const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const navbar = document.getElementById('navbar');

menuButton.addEventListener('click', () => {
    menuButton.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuButton.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[data-section]');

function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Typing effect for hero section
const roles = ['Software Engineer', 'Backend Developer', 'Integration Specialist'];
const typedElement = document.getElementById('typed-role');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typedElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
    } else {
        typedElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingDelay = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingDelay = 500; // Pause before typing next
    }
    
    setTimeout(typeRole, typingDelay);
}

// Start typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (typedElement) {
        setTimeout(typeRole, 1000);
    }
});

// Smooth scrolling for anchor links
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

            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                menuButton.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        }
    });
});

// Enhanced parallax effect
window.addEventListener('scroll', () => {
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    const blobs = document.querySelectorAll('.blob');

    parallaxBgs.forEach(bg => {
        const scrollPosition = window.pageYOffset;
        const parentOffset = bg.parentElement.offsetTop;
        const distance = scrollPosition - parentOffset;

        if (distance > -window.innerHeight && distance < window.innerHeight) {
            bg.style.transform = `translateY(${distance * 0.3}px)`;
        }
    });

    blobs.forEach((blob, index) => {
        const scrollPosition = window.pageYOffset;
        const speed = index % 2 === 0 ? 0.2 : -0.2;
        blob.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
});

// Animate skill bars on scroll
const skillSection = document.getElementById('skills');
const skillBars = document.querySelectorAll('.skill-progress');
let animated = false;

function animateSkills() {
    if (!animated && isInViewport(skillSection)) {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        });
        animated = true;
    }
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Initial check for elements in viewport
window.addEventListener('DOMContentLoaded', () => {
    animateSkills();
});

// Check on scroll
window.addEventListener('scroll', () => {
    animateSkills();
});


// 3D tilt effect for project cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const angleY = (x - centerX) / 20;
        const angleX = (centerY - y) / 20;

        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)';
    });
});


// Bubble animation

document.addEventListener('DOMContentLoaded', function() {
    // Get bubble elements
    const bubbleElements = [
        document.getElementById('bubble1'),
        document.getElementById('bubble2'),
        document.getElementById('bubble3'),
        document.getElementById('bubble4'),
        document.getElementById('bubble5'),
        document.getElementById('bubble6'),
        document.getElementById('bubble7')
    ];
    
    // Bubble positions and velocities
    const bubbleData = [
        { x: window.innerWidth / 1 - 200, y: window.innerHeight / 2 - 60, vx: 0, vy: 0, bias: { x: 1.0, y: 0.5 }, strength: 1.2 }, //H
        { x: window.innerWidth / 1 - 300, y: window.innerHeight / 2 - 60, vx: 0, vy: 0, bias: { x: -0.5, y: 1.0 }, strength: 1.0 }, //S
        { x: window.innerWidth / 1 - 400, y: window.innerHeight / 2 - 60, vx: 0, vy: 0, bias: { x: -0.8, y: -0.8 }, strength: 0.9 }, //S
        { x: window.innerWidth / 1 - 500, y: window.innerHeight / 2 - 60, vx: 0, vy: 0, bias: { x: 0.8, y: -0.8 }, strength: 1.1 }, //E
        { x: window.innerWidth / 1 - 600, y: window.innerHeight / 2 - 60, vx: 0, vy: 0, bias: { x: 0.3, y: -1.0 }, strength: 0.8 }, //D
        { x: window.innerWidth / 1 - 700, y: window.innerHeight / 2 - 60, vx: 0, vy: 0, bias: { x: -1.0, y: 0.2 }, strength: 1.3 }, //N
        { x: window.innerWidth / 1 - 800, y: window.innerHeight / 2 - 60, vx: 0, vy: 0, bias: { x: 0.0, y: 1.0 }, strength: 1.0 } //A
        
    ];
    
    // Mouse position
    let mouseX = -100;
    let mouseY = -100;
    
    // Constants
    const REPEL_DISTANCE = 250;
    const FRICTION = 0.95;
    const BOUNCE = 0.8;
    const BUBBLE_SIZE = 120;
    
    // Update mouse position
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animation loop
    function update() {
        // Update each bubble
        for (let i = 0; i < bubbleElements.length; i++) {
            const data = bubbleData[i];
            const bubble = bubbleElements[i];
            
            // Calculate distance from mouse to bubble center
            const dx = mouseX - (data.x + BUBBLE_SIZE/2);
            const dy = mouseY - (data.y + BUBBLE_SIZE/2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // If mouse is close enough, apply repelling force
            if (distance < REPEL_DISTANCE) {
                // Calculate normalized direction vector away from mouse
                const dirX = -dx / distance;
                const dirY = -dy / distance;
                
                // Apply force (stronger when closer) with directional bias
                const force = (REPEL_DISTANCE - distance) / REPEL_DISTANCE;
                data.vx += (dirX * force * data.strength) * data.bias.x;
                data.vy += (dirY * force * data.strength) * data.bias.y;
            }
            
            // Apply friction
            data.vx *= FRICTION;
            data.vy *= FRICTION;
            
            // Update position
            data.x += data.vx;
            data.y += data.vy;
            
            // Boundary checking
            if (data.x < 0) {
                data.x = 0;
                data.vx *= -BOUNCE;
            } else if (data.x > window.innerWidth - BUBBLE_SIZE) {
                data.x = window.innerWidth - BUBBLE_SIZE;
                data.vx *= -BOUNCE;
            }
            
            if (data.y < 0) {
                data.y = 0;
                data.vy *= -BOUNCE;
            } else if (data.y > window.innerHeight - BUBBLE_SIZE) {
                data.y = window.innerHeight - BUBBLE_SIZE;
                data.vy *= -BOUNCE;
            }
            
            // Update bubble position while preserving the float animation
            bubble.style.left = data.x + 'px';
            bubble.style.top = data.y + 'px';
        }
        
        // Continue animation
        requestAnimationFrame(update);
    }
    
    // Start animation
    update();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const centerX = window.innerWidth / 2 - BUBBLE_SIZE/2;
        const centerY = window.innerHeight / 2 - BUBBLE_SIZE/2;
        
        // Reset all bubbles to center
        for (let i = 0; i < bubbleData.length; i++) {
            bubbleData[i].x = centerX;
            bubbleData[i].y = centerY;
            bubbleData[i].vx = 0;
            bubbleData[i].vy = 0;
        }
    });
});

// Initialize EmailJS
window.addEventListener('DOMContentLoaded', (event) => {
    emailjs.init("8xu-YCPStoDnyGH1w");

    // Form submission with rate limiting
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        let isSubmitting = false; // Rate limiting flag

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Prevent rapid submissions (5 second cooldown)
            if (isSubmitting) {
                alert("Please wait before sending another message.");
                return;
            }

            // Basic validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                alert("Please fill in all required fields.");
                return;
            }

            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            isSubmitting = true;
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            // Collect form data - keys must match your EmailJS template variables
            const formData = {
                name: name,
                email: email,
                subject: document.getElementById('subject').value.trim() || "No subject",
                message: message,
            };

            // Send email using EmailJS
            emailjs.send("service_v9f3hht", "template_bs2aaty", formData)
                .then((response) => {
                    console.log('Email sent successfully:', response);
                    alert("Message sent successfully! I'll get back to you soon.");
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error("EmailJS Error:", error);
                    alert("Failed to send message. Please try again later.");
                })
                .finally(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    isSubmitting = false;

                    // Re-enable button after 5 seconds if there was an error
                    setTimeout(() => {
                        isSubmitting = false;
                    }, 5000);
                });
        });
    }
});

// ===========================
// CHAT WIDGET FUNCTIONALITY
// ===========================

const chatButton = document.getElementById('chatButton');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');
const chatSend = document.querySelector('.chat-send');

// Configuration
const API_BASE_URL = window.PORTFOLIO_API_BASE_URL || '/api';
const SESSION_ID = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

// Toggle chat window
chatButton.addEventListener('click', () => {
    chatWindow.classList.toggle('open');
    if (chatWindow.classList.contains('open')) {
        chatInput.focus();
    }
});

chatClose.addEventListener('click', () => {
    chatWindow.classList.remove('open');
});

// Close chat when clicking outside
document.addEventListener('click', (e) => {
    const chatWidget = document.getElementById('chatWidget');
    if (!chatWidget.contains(e.target) && chatWindow.classList.contains('open')) {
        chatWindow.classList.remove('open');
    }
});

// Handle chat form submission
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message to chat
    addChatMessage(message, 'user');
    chatInput.value = '';
    chatSend.disabled = true;
    
    // Show loading indicator
    showLoadingIndicator();
    
    try {
        const url = `${API_BASE_URL}/chat`;
        console.log('Fetching:', url);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session_id: SESSION_ID,
                message: message
            })
        });
        
        console.log('Response status:', response.status, response.ok);
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API response:', data);
        removeLoadingIndicator();
        addChatMessage(data.response, 'bot');
        
    } catch (error) {
        console.error('Chat error:', error);
        removeLoadingIndicator();
        addChatMessage(
            "Sorry, I couldn't reach the AI right now. Try again later!",
            'bot'
        );
    }
    
    chatSend.disabled = false;
});

// Allow Enter to send (Shift+Enter for new line)
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatForm.dispatchEvent(new Event('submit'));
    }
});

function addChatMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender === 'user' ? 'user-message' : 'bot-message'}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // Auto-scroll to bottom
    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 0);
}

function showLoadingIndicator() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message bot-message';
    messageDiv.id = 'loading-message';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content message-loading';
    contentDiv.innerHTML = '<span></span><span></span><span></span>';
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // Auto-scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeLoadingIndicator() {
    const loadingMessage = document.getElementById('loading-message');
    if (loadingMessage) {
        loadingMessage.remove();
    }
}
