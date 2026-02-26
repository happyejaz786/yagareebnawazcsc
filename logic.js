/**
 * logic.js - GAREEBNAWAZ CSC OFFICIAL
 * Project: CSC Digital Seva Portal
 * Date: 26 Feb 2026
 * Final Update: Fixed WhatsApp Link & Navigation Logic
 */

// 1. Inject Header (Navbar) - Poori tarah se clean aur functional navigation
function injectHeader() {
    const headerContainer = document.getElementById('main-header');
    if (headerContainer) {
        headerContainer.innerHTML = `
        <nav class="navbar" style="display: flex; justify-content: space-between; align-items: center; padding: 15px 8%; background: white; border-bottom: 2px solid #003366; position: sticky; top: 0; z-index: 1000; box-shadow: 0 4px 10px rgba(0,0,0,0.05); font-family: 'Poppins', sans-serif;">
            
            <div class="logo-wrapper" onclick="window.location.href='index.html'" style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
                <img src="images/logo.jpg" alt="CSC Logo" class="main-logo" style="width: 55px; height: 55px; border-radius: 50%; border: 2px solid #003366; transition: 0.3s; object-fit: cover;">
                <div class="logo-text" style="line-height: 1.1; text-align: left;">
                    <span style="font-weight: 900; font-size: 1.4rem; color: #003366; display: block; letter-spacing: 1px;">GAREEBNAWAZ</span>
                    <span style="font-size: 0.75rem; color: #666; font-weight: bold; text-transform: uppercase;">Digital Seva Center</span>
                </div>
            </div>
            
            <ul class="nav-links" style="display: flex; list-style: none; gap: 25px; margin: 0; padding: 0;">
                <li><a href="index.html" class="nav-item">Home</a></li>
                <li><a href="services.html" class="nav-item">Services</a></li>
                <li><a href="status.html" class="nav-item">Track Status</a></li>
                <li><a href="contact.html" class="nav-item">Contact Us</a></li>
            </ul>

            <div class="nav-cta">
                <button type="button" 
                        onclick="event.stopPropagation(); window.open('https://wa.me/917007420882?text=Hello%20Gareebnawaz%20CSC', '_blank');" 
                        style="background: #25D366; color: white; padding: 12px 22px; border-radius: 50px; border: none; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 10px rgba(37,211,102,0.3); font-size: 0.9rem;">
                    <i class="fab fa-whatsapp" style="font-size: 1.2rem;"></i> Chat Now
                </button>
            </div>
        </nav>
        `;
    }
}

// 2. Slider Logic for Home Page (CSC Banners)
function initSlider() {
    // TotalImages ko aapne 10 rakha tha, agar poster ek hi hai to ise 1 kar dein.
    const totalImages = 1; 
    const speed = 4000;    
    let currentImage = 1;
    const slider = document.getElementById('frostySlider');

    if (slider) {
        setInterval(() => {
            slider.style.opacity = 0; // Fade out effect
            
            setTimeout(() => {
                currentImage++;
                if (currentImage > totalImages) {
                    currentImage = 1;
                }
                slider.src = `images/n/${currentImage}.jpg`;
                
                slider.onload = () => {
                    slider.style.opacity = 1; // Fade in
                };
            }, 500);
        }, speed);
    }
}

// 3. Page Initialization & Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    injectHeader();
    initSlider();
    
    // Smooth Scroll Fix: Sirf '#' se shuru hone wale internal links ko handle karein
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== "#") {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// CSS Styling through JS for Animations
const customStyles = document.createElement('style');
customStyles.innerHTML = `
    .nav-item {
        text-decoration: none;
        color: #003366;
        font-weight: 600;
        font-size: 1rem;
        position: relative;
        transition: 0.3s;
    }
    .nav-item::after {
        content: '';
        position: absolute;
        width: 0; height: 2px;
        bottom: -5px; left: 0;
        background-color: #007bff;
        transition: 0.3s;
    }
    .nav-item:hover { color: #007bff; }
    .nav-item:hover::after { width: 100%; }
    .main-logo:hover { transform: scale(1.05); }
    .nav-cta button:hover { transform: translateY(-2px); background: #128C7E !important; transition: 0.2s; }
`;
document.head.appendChild(customStyles);