// Bismillah - YA GAREEBNAWAZ CSC Global Logic

function loadHeader() {
    const header = document.getElementById("main-header");
    if (header) {
        header.innerHTML = `
        <nav style="display:flex; justify-content:space-between; align-items:center; padding:12px 8%; background: white; position:sticky; top:0; z-index:1000; border-bottom:1px solid #ddd; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="display:flex; align-items:center; gap:10px; cursor:pointer;" onclick="window.location.href='index.html'">
                <img src="images/logo.jpg" alt="Logo" style="height:50px; border-radius:50%;">
                <div style="font-weight:900; font-size:1.2rem; color:#003366;">YA GAREEBNAWAZ CSC</div>
            </div>
            <ul style="display:flex; list-style:none; gap:20px; margin:0;">
                <li><a href="index.html" style="text-decoration:none; color:#333; font-weight:700;">Home</a></li>
                <li><a href="services.html" style="text-decoration:none; color:#333; font-weight:700;">Services</a></li>
            </ul>
            <div style="background: #003366; padding: 8px 15px; border-radius: 20px;">
                <a href="cart.html" style="text-decoration: none; color: white; font-weight: bold;">
                    🛒 CART (<span id="cart-count">0</span>)
                </a>
            </div>
        </nav>`;
    }
}

function loadFooter() {
    const footer = document.getElementById("main-footer");
    if (footer) {
        footer.innerHTML = `
        <div style="padding: 20px; text-align: center; background: #f8f9fa; border-top: 1px solid #ddd; margin-top: 50px;">
            <p>© 2026 YA GAREEBNAWAZ CSC Shahjahanpur</p>
        </div>`;
    }
}

function updateUI() {
    let cart = JSON.parse(localStorage.getItem('cscCart')) || [];
    let count = cart.reduce((total, item) => total + item.qty, 0);
    let display = document.getElementById('cart-count');
    if (display) display.innerText = count;
}

function addToCart(name, price, qtyId) {
    let qtyInput = document.getElementById(qtyId);
    let qty = qtyInput ? parseInt(qtyInput.value) : 1;
    let cart = JSON.parse(localStorage.getItem('cscCart')) || [];

    let index = cart.findIndex(item => item.name === name);
    if (index > -1) {
        cart[index].qty += qty;
    } else {
        cart.push({ name: name, price: price, qty: qty });
    }

    localStorage.setItem('cscCart', JSON.stringify(cart));
    updateUI();
    alert(name + " add ho gaya hai!");
}

// Ye line header/footer ko har page par load karegi
window.onload = function() {
    loadHeader();
    loadFooter();
    updateUI();
    if (typeof renderCartPage === 'function') renderCartPage();
    if (typeof generateReceipt === 'function') generateReceipt();
};
