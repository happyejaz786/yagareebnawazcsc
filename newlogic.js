// ==========================================
// NEWLOGIC.JS - CHECKOUT, CART RECEIPT & WHATSAPP LOGIC (FINAL VERSION)
// ==========================================

// 1. Date Format ko DD/MMM/YYYY me convert karne ka function
function formatToDDMMMYYYY(dateStr) {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr; 
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = String(d.getDate()).padStart(2, '0');
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day}/${month}/${year}`; // Fixed format to dd/mmm/yyyy
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
    const bill = JSON.parse(localStorage.getItem('cscFinalBill')) || { grandTotal: 0, manual: 0 };
    const cart = JSON.parse(localStorage.getItem('cscCart')) || []; 

    // Remove any discount entries from the cart so they don't get saved to the sheet
    const cleanCart = cart.filter(item => !item.name.toLowerCase().includes('discount'));

    // Extract service names for the WhatsApp message
    const servicesList = cleanCart.map(item => `${item.name} (x${item.qty || item.quantity || 1})`).join('%0A- ');

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
    
    // Save cleanCart to Google Sheets without "Discount Applied"
    urlParams.append('OrderDetails', JSON.stringify(cleanCart));

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
        
        // WhatsApp ke liye Customer ka mobile number ensure karein ki 91 prefix ho
        let custPhone = customer.mobile;
        if(custPhone && custPhone !== 'N/A') {
            if(!custPhone.startsWith('91') && custPhone.length === 10) {
                custPhone = '91' + custPhone;
            }
        } else {
            alert("Customer mobile number not found! Message will not be sent.");
            return;
        }

        // Order complete hone par memory saaf karna
        localStorage.removeItem('cscCart');
        localStorage.removeItem('cscFinalBill');
        localStorage.removeItem('cscCustomer');

        // Customer ko bheja jane wala dynamic message jisme service list shamil hai
        let waMsg = `*YA GAREEBNAWAZ CSC*%0A%0AHello ${customer.name},%0AThank you for using our services.%0A%0A*Services Availed:*%0A- ${servicesList}%0A%0A*Total Bill:* ₹${bill.grandTotal}%0A*Date:* ${sheetDate}%0A%0A*Review Us on Google:* ⭐%0Ahttps://g.page/r/CaSbnIdP3_saEBE/review%0A%0AWe look forward to serving you again!`;
        
        // Customer ke number par redirect
        window.open(`https://wa.me/${custPhone}?text=${waMsg}`, '_blank');
    }).catch((err) => {
        console.error("Fetch Error:", err);
        alert("Data save hone mein error aayi, please internet check karein.");
    }).finally(() => {
        if(btn) {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    });
}
