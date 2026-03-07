// ==========================================
// LOGIC.JS - HEADER, FOOTER & CART CONTROLS
// ==========================================

console.log("Bismillah - Interface Logic Loaded");

function loadHeader() {
    const header = document.getElementById("main-header");
    if (header) {
        header.innerHTML = `
        <style>
            /* Dropdown CSS */
            .dropdown { position: relative; display: inline-block; }
            .dropdown-content {
                display: none;
                position: absolute;
                background-color: #fff;
                min-width: 200px;
                box-shadow: 0px 8px 20px 0px rgba(0,0,0,0.15);
                z-index: 1001;
                border-top: 3px solid #007bff;
                border-radius: 0 0 8px 8px;
                overflow: hidden;
            }
            .dropdown-content a {
                color: #333;
                padding: 12px 16px;
                text-decoration: none;
                display: block;
                font-weight: 600;
                font-size: 0.95rem;
                border-bottom: 1px solid #eee;
                transition: 0.2s ease-in-out;
            }
            .dropdown-content a i { width: 20px; color: #003366; }
            .dropdown-content a:hover { background-color: #fdfaf2; color: #d63384; padding-left: 20px; }
            .dropdown:hover .dropdown-content { display: block; }
            
            /* HEADER CSC ANIMATION */
            @keyframes headerCscAnim {
                0%, 100% { color: #003366; }
                50% { color: #d63384; text-shadow: 0px 0px 8px rgba(214,51,132,0.5); }
            }
            .header-animated-csc {
                animation: headerCscAnim 1.5s infinite alternate;
            }
        </style>
        
        <nav class="main-header-nav">
            <div class="hamburger" onclick="toggleMenu()">
                <i class="fas fa-bars"></i>
            </div>

            <div class="logo-wrapper" onclick="location.href='index.html'">
                <img src="images/logo.jpg" alt="Logo" onerror="this.src='https://via.placeholder.com/60?text=Logo'">
                <div class="logo-text">
                    <h2>YA GAREEBNAWAZ <span class="header-animated-csc">CSC</span></h2>
                    <h3>AADHAAR DEMOGRAPHIC UPDATE CENTER</h3>
                </div>
            </div>

            <ul class="nav-links" id="navLinks">
                <li><a href="index.html">Home</a></li>
                
                <li class="dropdown">
                    <a href="Services.html">Services ▼</a>
                    <div class="dropdown-content">
                        <a href="voter.html"><i class="fas fa-id-card"></i> Voter Services</a>
                        <a href="pan.html"><i class="fas fa-credit-card"></i> Pan Services</a>
                        <a href="aadhaar.html"><i class="fas fa-fingerprint"></i> Aadhaar Update</a>
                        <a href="Services.html"><i class="fas fa-list"></i> All Services</a>
                    </div>
                </li>
                
                <li><a href="contact.html">Contact</a></li>
            </ul>

            <div class="cart-btn-container">
                <a href="cart.html">🛒 <span id="cart-count">0</span> ITEMS</a>
            </div>
        </nav>`;
        updateUI(); 
    }
}

function loadFooter() {
    const oldFooter = document.querySelector('footer');
    if (oldFooter) oldFooter.remove();

    const footerHTML = `
        <footer class="main-footer">
            <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto; padding: 0 20px; flex-wrap: wrap; gap: 15px;">
                <p style="margin: 0; font-weight: bold; font-size: 0.95rem;">&copy; 2026 YA GAREEBNAWAZ CSC. All Rights Reserved.</p>
                <div style="display: flex; align-items: center; gap: 20px;">
                    <div style="display: flex; gap: 15px; font-size: 20px;">
                        <a href="https://facebook.com/Nationalcscdigitalsevakendra" target="_blank" style="color: #1877F2;"><i class="fab fa-facebook"></i></a>
                        <a href="https://wa.me/917007420882" target="_blank" style="color: #25D366;"><i class="fab fa-whatsapp"></i></a>
                    </div>
                </div>
            </div>
            <div style="text-align: center; font-size: 0.9rem; margin-top: 15px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px;">
                Designed & Developed by: <span style="font-family: 'Cambria', serif; font-weight: bold; color: #007bff; font-size: 1.2rem;">MOHAMMAD EJAZ KHAN</span>
            </div>
        </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

function toggleMenu() {
    const nav = document.getElementById("navLinks");
    if (nav) nav.classList.toggle("active");
}

function updateUI() {
    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem('cscCart')) || [];
    } catch (e) {
        cart = []; 
    }
    const countBadge = document.getElementById('cart-count');
    if (countBadge) countBadge.innerText = cart.length;
}

function addToCart(serviceName, price, qtyId) {
    let qtyInput = document.getElementById(qtyId);
    let qty = qtyInput ? parseInt(qtyInput.value) : 1;
    
    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem('cscCart')) || [];
    } catch (e) {
        cart = [];
    }

    cart = cart.filter(item => item.basePrice || item.price || item.Price || item.amount);

    let existingItemIndex = cart.findIndex(item => item.name === serviceName);
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].qty += qty;
    } else {
        cart.push({
            name: serviceName,
            basePrice: parseFloat(price), 
            qty: qty
        });
    }

    localStorage.setItem('cscCart', JSON.stringify(cart));
    updateUI();
    showToast(`${serviceName} Cart me add ho gaya!`);
}

function showToast(message) {
    let toast = document.getElementById("toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.style.cssText = "position:fixed; bottom:20px; right:20px; background:#003366; color:white; padding:15px 25px; border-radius:30px; font-weight:600; z-index:2000; box-shadow:0 5px 15px rgba(0,0,0,0.2); transition: opacity 0.3s; opacity: 0;";
        document.body.appendChild(toast);
    }
    toast.innerText = message;
    toast.style.display = "block";
    setTimeout(() => toast.style.opacity = "1", 10);
    
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.style.display = "none", 300);
    }, 2500);
}

window.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
    updateUI();
});