// Bismillah - Centralized Logic with Reset Feature
function addToCart(serviceName, price, qtyId) {
    let qtyInput = document.getElementById(qtyId);
    let qty = qtyInput ? parseInt(qtyInput.value) : 1;
    
    let cart = JSON.parse(localStorage.getItem('cscCart')) || [];

    // Purana bad data (undefined/NaN) remove karne ke liye check
    if (cart.length > 0 && (cart[0].basePrice === undefined || cart[0].basePrice === null)) {
        console.log("Old data detected, clearing cart...");
        cart = [];
    }

    let existingItemIndex = cart.findIndex(item => item.name === serviceName);
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].qty += qty;
    } else {
        cart.push({
            name: serviceName,
            basePrice: price, 
            qty: qty
        });
    }

    localStorage.setItem('cscCart', JSON.stringify(cart));
}

// Reset Function: Browser memory saaf karne ke liye
function resetCartMemory() {
    localStorage.removeItem('cscCart');
    localStorage.removeItem('cscFinalBill');
    alert("Bhai, purani memory saaf ho gayi hai! Ab naye sire se add karein.");
    location.reload();
}