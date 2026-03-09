// ==========================================
// LOGIC.JS - HEADER, FOOTER & CART CONTROLS
// ==========================================

console.log("Bismillah - Interface Logic Loaded");

function loadHeader() {
    const header = document.getElementById("main-header");
    if (header) {
        header.innerHTML = `
        <style>
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
            
            /* YA GAREEBNAWAZ & CSC TEXT ANIMATION */
            @keyframes headerAnim {
                0%, 100% { color: #003366; text-shadow: none; }
                50% { color: #d63384; text-shadow: 0px 0px 10px rgba(214,51,132,0.8); }
            }
            .header-animated-text {
                animation: headerAnim 1.5s infinite alternate;
            }

            /* MAZAR SHAREEF LOGO GLOW ANIMATION */
            @keyframes logoGlowAnim {
                0%, 100% { box-shadow: 0 0 5px rgba(0,51,102,0.3); border-color: #003366; }
                50% { box-shadow: 0 0 20px rgba(214,51,132,0.9); border-color: #d63384; }
            }
            .logo-glowing {
                animation: logoGlowAnim 1.5s infinite alternate;
                height: 80px !important; 
                width: 80px !important;
                border-radius: 50%;
                border: 3px solid #003366;
                object-fit: cover;
            }

            /* CSC LOGO STATIC */
            .logo-static {
                height: 80px !important; 
                width: auto !important;
                max-width: 100px;
                border-radius: 8px;
                object-fit: contain;
            }

            /* HEADER LAYOUT */
            .main-header-nav {
                padding: 15px 5% !important; 
            }
            .logo-wrapper {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            .logo-text h2 {
                font-size: 1.8rem !important; 
            }
            
            @media (max-width: 900px) {
                .logo-wrapper { flex-wrap: wrap; justify-content: center; }
                .logo-text { text-align: center; }
                .logo-static { display: none; } 
            }
        </style>
        
        <nav class="main-header-nav">
            <div class="hamburger" onclick="toggleMenu()">
                <i class="fas fa-bars"></i>
            </div>

            <div class="logo-wrapper" onclick="location.href='index.html'">
                <img src="images/logo2.jpg" alt="Ya Gareebnawaz" class="logo-glowing" onerror="this.src='https://via.placeholder.com/80?text=Mazar'">
                <div class="logo-text">
                    <h2><span class="header-animated-text">YA GAREEBNAWAZ</span> <span class="header-animated-text">CSC</span></h2>
                    <h3>AADHAAR DEMOGRAPHIC UPDATE CENTER</h3>
                </div>
                <img src="images/logo1.jpg" alt="CSC" class="logo-static" onerror="this.src='https://via.placeholder.com/80?text=CSC'">
            </div>

            <ul class="nav-links" id="navLinks">
                <li><a href="index.html">Home</a></li>
                <li class="dropdown">
                    <a href="services.html">Services ▼</a>
                    <div class="dropdown-content">
                        <a href="voter.html"><i class="fas fa-id-card"></i> Voter Services</a>
                        <a href="pan.html"><i class="fas fa-credit-card"></i> Pan Services</a>
                        <a href="aadhaar.html"><i class="fas fa-fingerprint"></i> Aadhaar Update</a>
                        <a href="services.html"><i class="fas fa-list"></i> All Services</a>
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
            <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto; padding: 0 20px 20px; flex-wrap: wrap; gap: 15px;">
                <p style="margin: 0; font-weight: bold; font-size: 0.95rem;">&copy; 2026 YA GAREEBNAWAZ CSC. All Rights Reserved.</p>
                
                <div style="display: flex; align-items: center; gap: 20px;">
                    <div style="display: flex; gap: 20px; font-size: 28px;">
                        <a href="https://facebook.com/Nationalcscdigitalsevakendra" target="_blank" style="color: #1877F2; transition: 0.3s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'"><i class="fab fa-facebook"></i></a>
                        <a href="https://wa.me/917007420882" target="_blank" style="color: #25D366; transition: 0.3s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'"><i class="fab fa-whatsapp"></i></a>
                        <a href="#" target="_blank" style="color: #E1306C; transition: 0.3s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'"><i class="fab fa-instagram"></i></a>
                        <a href="#" target="_blank" style="color: #0077B5; transition: 0.3s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'"><i class="fab fa-linkedin"></i></a>
                    </div>
                </div>
            </div>
            
            <div style="max-width: 1200px; margin: 0 auto; padding: 15px 20px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
                
                <div style="text-align: left; font-size: 0.9rem;">
                    Designed & Developed by:<br>
                    <span style="font-family: 'Cambria', serif; font-weight: bold; color: #007bff; font-size: 1.5rem;">MOHAMMAD EJAZ KHAN</span>
                </div>
                
                <div style="background: #fff; padding: 5px 15px; border-radius: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.2); display: inline-flex; align-items: center; gap: 10px;">
                    <span style="color: #003366; font-weight: bold;">Total Visits:</span>
                    <a href="https://www.hitwebcounter.com/" target="_blank">
                        <img src="https://hitwebcounter.com/counter/counter.php?page=21480154&style=0010&nbdigits=5&type=page&initCount=0" title="Free Tools" Alt="Free Tools" border="0" style="width: auto !important; height: auto !important; display: inline-block !important; margin: 0 !important; vertical-align: middle;" />
                    </a>
                </div>

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
    
    showToast("Service added to cart");
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

