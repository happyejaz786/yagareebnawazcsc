console.log("Bismillah");

function loadHeader() {
    const header = document.getElementById("main-header");
    if (header) {
        header.innerHTML = `
        <style>
            @keyframes floatSphere { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
            .nav-link-bold { font-weight: 700 !important; text-decoration: none; color: #333; text-transform: uppercase; font-size: 16px; transition: 0.3s; }
            .nav-link-bold:hover { color: #007bff; }
            .dropdown:hover .dropdown-content { display: block !important; }
            .menu-columns a { padding: 10px 15px; text-decoration: none; color: #555; font-weight: 700; display: block; }
        </style>
        <nav style="display:flex; justify-content:space-between; align-items:center; padding:10px 5%; background: rgba(255,255,255,0.95); position:sticky; top:0; z-index:1000; border-bottom:1px solid #ddd; width:100%; box-sizing:border-box;">
            <div class="logo-wrapper" style="display:flex; align-items:center; gap:12px; cursor:pointer;" onclick="location.href='index.html'">
                <img src="images/logo.jpg" style="height:70px !important; width:70px !important; border-radius:50%; border:2px solid #003366; object-fit: cover;">
                <div>
                    <div style="font-family:'Playfair Display', serif; font-weight:900; font-size:1.8rem; color:#003366; line-height:1.1;">YA GAREEBNAWAZ <span style="color:#007bff; display:inline-block; animation:floatSphere 3s infinite;">CSC</span></div>
                    <h3 style="font-family:'Cambria', serif; font-size:0.9rem; color:#d63384; margin:0;">AADHAAR DEMOGRAPHIC UPDATE CENTER</h3>
                </div>
            </div>
            <ul style="display:flex; list-style:none; gap:25px; margin:0; padding:0; align-items:center;">
                <li><a href="index.html" class="nav-link-bold">Home</a></li>
                <li class="dropdown" style="position:relative;"><a href="Services.html" class="nav-link-bold">Services ▼</a>
                    <div class="dropdown-content" style="display:none; position:absolute; background:white; min-width:180px; box-shadow:0 8px 16px rgba(0,0,0,0.1); top:100%; left:0; z-index:1000; border-top:3px solid #007bff;">
                        <div class="menu-columns"><a href="aadhaar.html">Aadhaar Update</a><a href="Services.html">All Services</a></div>
                    </div>
                </li>
                <li><a href="contact.html" class="nav-link-bold">Contact</a></li>
            </ul>
            <div style="background:#003366; padding:8px 18px; border-radius:50px;"><a href="cart.html" style="color:white; text-decoration:none; font-weight:800;">🛒 <span id="cart-count">0</span> ITEMS</a></div>
        </nav>`;
    }
}

function loadFooter() {
    const oldFooter = document.querySelector('footer');
    if (oldFooter) {
        oldFooter.remove();
    }

    const footerHTML = `
        <footer class="main-footer" style="background-color: #001f3f; color: white; padding: 15px 0; margin-top: 50px; border-top: 4px solid #007bff;">
            <div class="footer-container" style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto; padding: 0 15px; flex-wrap: wrap; gap: 15px;">
                
                <p style="margin: 0; font-weight: bold; text-align: left; font-size: 0.95rem;">&copy; 2026 YA GAREEBNAWAZ CSC. All Rights Reserved.</p>
                
                <div style="display: flex; align-items: center; gap: 20px;">
                    <div style="display: flex; gap: 15px; font-size: 20px;">
                        <a href="#" style="color: #1877F2;"><i class="fab fa-facebook"></i></a>
                        <a href="#" style="color: #25D366;"><i class="fab fa-whatsapp"></i></a>
                    </div>
                    <div class="hit-counter" style="background: rgba(255,255,255,0.1); padding: 5px 10px; border-radius: 5px; display: flex; align-items: center; border: 1px solid #444;">
                        <span style="font-size: 0.85rem; margin-right: 10px; color: #ddd;">Visitors:</span>
                        <a href="https://www.hitwebcounter.com/" target="_blank">
                            <img src="https://hitwebcounter.com/counter/counter.php?page=21480154&style=0010&nbdigits=5&type=page&initCount=0" 
                                 title="Free Tools" Alt="Free Tools" border="0" style="width: auto !important; height: auto !important; display: inline-block !important; margin: 0 !important; vertical-align: middle;" />
                        </a>
                    </div>
                </div>

            </div>
            <div style="text-align: center; font-size: 0.9rem; margin-top: 15px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px;">
                Designed & Developed by: <span style="font-family: 'Cambria', serif; font-weight: bold; color: #007bff; font-size: 1.5rem;">MOHAMMAD EJAZ KHAN</span>
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
    const cart = JSON.parse(localStorage.getItem('cscCart')) || [];
    const count = document.getElementById('cart-count');
    if (count) count.innerText = cart.length;
}

window.onload = function() { 
    loadHeader(); 
    loadFooter(); 
    updateUI(); 
};