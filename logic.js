// Bismillah - Centralized Logic
function loadHeader() {
    const header = document.getElementById("main-header");
    if (header) {
        header.innerHTML = `
        <nav style="display:flex; justify-content:space-between; align-items:center; padding:12px 8%; background: rgba(255,255,255,0.85); backdrop-filter: blur(15px); position:sticky; top:0; z-index:1000; border-bottom:1px solid #ddd; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            <div class="logo-wrapper" style="display:flex; align-items:center; gap:15px; cursor: pointer;" onclick="window.location.href='index.html'">
                <img src="images/logo.jpg" alt="Logo" style="height:60px; width:60px; border-radius:50%; border: 2px solid #003366;">
                <div>
                    <div style="font-family: 'Playfair Display', serif; font-weight:900; font-size:1.5rem; color:#003366;">YA GAREEBNAWAZ CSC</div>
                </div>
            </div>
            <ul style="display:flex; list-style:none; gap:25px; margin:0; font-weight:700;">
                <li><a href="index.html" style="text-decoration:none; color:#333;">Home</a></li>
                <li><a href="services.html" style="text-decoration:none; color:#333;">Services</a></li>
            </ul>
            <div style="background: #003366; padding: 10px 20px; border-radius: 50px;">
                <a href="cart.html" style="text-decoration: none; color: white; font-weight: 800;">
                    🛒 <span id="cart-count">0</span> ITEMS
                </a>
            </div>
        </nav>`;
        updateUI();
    }
}

function loadFooter() {
    const footer = document.getElementById("main-footer");
    if (footer) {
        footer.innerHTML = `<footer style="text-align:center; padding:20px; background:#f8f9fa; margin-top:40px;">© 2026 YA GAREEBNAWAZ CSC</footer>`;
    }
}

function addToCart(serviceName, price, qtyId) {
    let qtyInput = document.getElementById(qtyId);
    let qty = qtyInput ? parseInt(qtyInput.value) : 1;
    let cart = JSON.parse(localStorage.getItem('cscCart')) || [];

    let existingItemIndex = cart.findIndex(item => item.name === serviceName);
    if (existingItemIndex > -1) {
        cart[existingItemIndex].qty += qty;
    } else {
        cart.push({ name: serviceName, price: price, qty: qty });
    }

    localStorage.setItem('cscCart', JSON.stringify(cart));
    updateUI();
    alert(serviceName + " Cart mein add ho gaya hai!");
}

function updateUI() {
    let cart = JSON.parse(localStorage.getItem('cscCart')) || [];
    let countDisplay = document.getElementById('cart-count');
    if (countDisplay) {
        countDisplay.innerText = cart.reduce((acc, item) => acc + item.qty, 0);
    }
}

// Initialize on every page
document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    loadFooter();
    updateUI();
});
