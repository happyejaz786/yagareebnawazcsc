// ==========================================
// NEWLOGIC.JS - CHECKOUT, CART RECEIPT & WHATSAPP LOGIC (FINAL VERSION)
// ==========================================

// 1. Date Format ko DD-MMM-YYYY me convert karne ka function
function formatToDDMMMYYYY(dateStr) {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr; 
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = String(d.getDate()).padStart(2, '0');
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
}

// 2. Page load hote hi Receipt generate karne ka kaam
window.addEventListener('DOMContentLoaded', () => {
    const customer = JSON.parse(localStorage.getItem('cscCustomer')) || {};
    const cart = JSON.parse(localStorage.getItem('cscCart')) || [];
    const bill = JSON.parse(localStorage.getItem('cscFinalBill')) || {};
    
    const rawDate = customer.date || new Date().toISOString();
    const formattedDate = formatToDDMMMYYYY(rawDate);

    // Customer details set karna (Mobile Left, Name Right)
    const custLeft = document.getElementById('cust-left');
    const custRight = document.getElementById('cust-right');
    
    if (custLeft && custRight) {
        custLeft.innerHTML = `<strong>Mobile:</strong> +91 ${customer.mobile || 'N/A'}<br><strong>Date:</strong> ${formattedDate}`;
        custRight.innerHTML = `<strong>Name:</strong> ${customer.name || 'Guest'}<br><strong>ID:</strong> #CSC${Date.now().toString().slice(-5)}`;
    }

    // Cart items ko table mein dikhana
    const receiptItems = document.getElementById('receipt-items');
    let itemsHtml = "";
    
    if (cart.length === 0) {
        itemsHtml = `<tr><td colspan="3" class="text-center">No items in cart</td></tr>`;
    } else {
        cart.forEach(item => {
            let rate = parseFloat(item.basePrice || item.price || item.Price || item.rate || item.amount) || 0;
            let q = parseInt(item.qty || item.quantity) || 1;
            
            itemsHtml += `
                <tr>
                    <td>${item.name || 'Service'}</td>
                    <td class="text-center">${q}</td>
                    <td class="text-right">₹${rate * q}</td>
                </tr>`;
        });
    }
    
    if (receiptItems) receiptItems.innerHTML = itemsHtml;

    // Bill ka total calculate karke dikhana
    let subtotal = parseFloat(bill.base) || 0;
    let grandTotal = parseFloat(bill.grandTotal) || 0;
    let totalSavings = subtotal - grandTotal;

    const subTotalEl = document.getElementById('sub-total');
    const saveTotalEl = document.getElementById('save-total');
    const grandTotalEl = document.getElementById('grand-total');

    if (subTotalEl) subTotalEl.innerText = "₹" + subtotal;
    if (saveTotalEl) saveTotalEl.innerText = "-₹" + (totalSavings < 0 ? 0 : totalSavings);
    if (grandTotalEl) grandTotalEl.innerText = "₹" + grandTotal;
});

// 3. JPG Image Download karne ka Function
function downloadJPG() {
    window.scrollTo(0, 0); 
    
    const btn = document.getElementById('btn-jpg');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    btn.disabled = true;

    const printArea = document.getElementById('print-area');
    
    html2canvas(printArea, { 
        scale: 2, 
        useCORS: true, 
        allowTaint: true, 
        backgroundColor: "#ffffff" 
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `CSC_Receipt_${Date.now()}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 0.9);
        link.click();
    }).catch(err => {
        console.error("html2canvas Error:", err);
        alert("Receipt generate nahi ho payi, kripya check karein.");
    }).finally(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
    });
}

// 4. Data Google Sheets me Save karne aur WhatsApp kholne ka Function
function processWhatsAppOrder() {
    const customer = JSON.parse(localStorage.getItem('cscCustomer')) || { name: 'Guest', mobile: 'N/A', date: new Date().toISOString() };
    const bill = JSON.parse(localStorage.getItem('cscFinalBill')) || { grandTotal: 0 };
    const cart = JSON.parse(localStorage.getItem('cscCart')) || []; 

    const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbx9u4vLw1LdJIauzSteyqgzPP7NikQJ1r_7v9ngXvzSz1OPpCXhP5zfxV4LEJrgMqpouQ/exec"; 

    const btn = document.getElementById('btn-wa');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    btn.disabled = true;

    const urlParams = new URLSearchParams();
    urlParams.append('Name', customer.name);
    urlParams.append('Mobile', customer.mobile);
    
    const sheetDate = typeof formatToDDMMMYYYY === 'function' ? formatToDDMMMYYYY(customer.date || new Date()) : customer.date;
    urlParams.append('Date', sheetDate);
    urlParams.append('OrderDetails', JSON.stringify(cart));

    fetch(GOOGLE_SHEET_URL, { 
        method: 'POST', 
        body: urlParams, 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        mode: 'no-cors' 
    })
    .then(() => {
        alert("✅ Data Google Sheet Par Save Ho Gaya!");
        
        // Order complete hone par memory saaf karna
        localStorage.removeItem('cscCart');
        localStorage.removeItem('cscFinalBill');
        localStorage.removeItem('cscCustomer');

        // Yahan WhatsApp Message me Google Page aur WhatsApp Link add kiya gaya hai
        let waMsg = `*YA GAREEBNAWAZ CSC*%0A*Customer:* ${customer.name}%0A*Total Bill:* ₹${bill.grandTotal}%0A*Date:* ${sheetDate}%0A%0A*Review Us on Google:* ⭐%0Ahttps://g.page/r/CaSbnIdP3_saEBE/review%0A%0A*Chat with us on WhatsApp:* 💬%0Ahttps://wa.me/917007420882`;
        
        window.open(`https://wa.me/917007420882?text=${waMsg}`, '_blank');
    }).catch((err) => {
        console.error("Fetch Error:", err);
        alert("Data save hone mein error aayi, please internet check karein.");
    }).finally(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
    });
}
