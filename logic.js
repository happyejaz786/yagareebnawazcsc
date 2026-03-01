// ========================================
// FINAL LOGIC.JS (With Dropdown Submenu)
// ========================================

function loadHeader() {
    const header = document.getElementById("main-header");

    if (header) {
        header.innerHTML = `
        <style>
            @keyframes floatSphere { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
            .logo-wrapper:hover .main-logo { transform: rotate(360deg); }
            .main-logo { transition: transform 0.6s ease-in-out; }
            .nav-link-bold { font-weight: 700 !important; text-decoration: none; color: #333; text-transform: uppercase; font-size: 17px; transition: 0.3s; }
            .nav-link-bold:hover { color: #007bff; }
            
            /* Submenu CSS */
            .dropdown:hover .dropdown-content { display: block !important; }
            .dropdown-content::-webkit-scrollbar { width: 6px; }
            .dropdown-content::-webkit-scrollbar-thumb { background: #007bff; border-radius: 10px; }
            .menu-columns a { padding: 10px 15px; text-decoration: none; color: #555; font-weight: 700; font-size: 15px; transition: 0.3s; border-bottom: 1px solid #f9f9f9; display: block; white-space: nowrap; }
            .menu-columns a:last-child { border-bottom: none; }
            .menu-columns a:hover { background: #f0f8ff; color: #007bff; padding-left: 20px; }
        </style>

        <nav style="display:flex; justify-content:space-between; align-items:center; padding:12px 8%; background: rgba(255,255,255,0.85); backdrop-filter: blur(15px); position:sticky; top:0; z-index:1000; border-bottom:1px solid #ddd; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            
            <div class="logo-wrapper" style="display:flex; align-items:center; gap:15px; cursor: pointer;">
                <img src="images/logo.jpg" alt="CSC Logo" class="main-logo" style="height:80px; width:80px; border-radius:50%; object-fit: cover; border: 3px solid #003366; box-shadow: 0 4px 15px rgba(0,0,0,0.15);">
                <div style="display: flex; flex-direction: column; justify-content: center;">
                    <div style="font-family: 'Playfair Display', serif; font-weight:900; font-size:2.2rem; color:#003366; line-height: 1.1;">
                        YA GAREEBNAWAZ <span class="moving-sphere" style="color:#007bff; display: inline-block; animation: floatSphere 3s ease-in-out infinite;">CSC</span>
                    </div>
                    <h3 style="font-family: 'Cambria', serif; font-size: 1.1rem; font-weight: 700; color: #d63384; letter-spacing: 1px; margin-top: 5px; margin-bottom: 0;">
                        AADHAAR DEMOGRAPHIC UPDATE CENTER
                    </h3>
                </div>
            </div>

            <ul style="display:flex; list-style:none; gap:30px; margin:0; align-items: center;">
                <li><a href="index.html" class="nav-link-bold">Home</a></li>
                
                <li class="dropdown" style="position: relative; padding: 10px 0;">
                    <a href="Services.html" class="nav-link-bold">Services ▼</a>
                    <div class="dropdown-content" style="display: none; position: absolute; background: white; min-width: 200px; box-shadow: 0 15px 35px rgba(0,0,0,0.15); border-radius: 12px; padding: 10px; left: 0; top: 100%; border-top: 4px solid #007bff; z-index: 1000;">
                        <div class="menu-columns">
                            <a href="aadhaar.html">Aadhaar Update</a>
                            <a href="Services.html">PVC Card Print</a>
                            <a href="Services.html">PAN Card Service</a>
                            <a href="Services.html">Scholarship Form</a>
                            <a href="Services.html">Voter ID & More</a>
                        </div>
                    </div>
                </li>
                <li><a href="#" class="nav-link-bold">Contact</a></li>
            </ul>

            <div class="cart-box" style="background: #003366; padding: 10px 20px; border-radius: 50px; transition: background 0.3s;">
                <a href="checkout.html" style="font-weight: 800; text-decoration: none; color: white; display: flex; align-items: center; gap: 8px; font-size: 16px;">
                    🛒 <span id="cart-count">0</span> ITEMS
                </a>
            </div>
        </nav>
        `;
    }
}

function loadFooter() {
    const footer = document.getElementById("main-footer");
    if (footer) {
        footer.innerHTML = `
        <div style="padding: 30px 8%; text-align: center; background: #f8f9fa; border-top: 1px solid #ddd; margin-top: 40px;">
            <p style="color: #666; font-size: 1rem; font-weight: 500;">© 2026 YA GAREEBNAWAZ CSC Shahjahanpur. All Rights Reserved.</p>
        </div>`;
    }
}

function addToCart(name, price, qtyId) {
    const qtyInput = document.getElementById(qtyId);
    const qty = qtyInput ? parseInt(qtyInput.value) : 1;
    let cart = JSON.parse(localStorage.getItem('cscCart')) || [];
    cart.push({ name, price, qty });
    localStorage.setItem('cscCart', JSON.stringify(cart));
    updateUI();
    const toast = document.getElementById('toast');
    if (toast) {
        toast.style.display = 'block';
        toast.innerText = name + " added to cart!";
        setTimeout(() => { toast.style.display = 'none'; }, 2000);
    } else { alert(name + " added to list!"); }
}

function updateUI() {
    const cart = JSON.parse(localStorage.getItem('cscCart')) || [];
    const countDisplay = document.getElementById('cart-count');
    if (countDisplay) countDisplay.innerText = cart.length;
}

document.addEventListener("DOMContentLoaded", function () {
    loadHeader();
    loadFooter();
    updateUI(); 
});

