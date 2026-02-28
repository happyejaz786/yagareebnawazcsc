/**
 * logic.js - YA GAREEBNAWAZ CSC OFFICIAL
 */

function injectLayout() {
    const headerContainer = document.getElementById('main-header');
    const footerContainer = document.getElementById('main-footer');

    // 1. CSC Header with Logo Fix
    if (headerContainer) {
        headerContainer.innerHTML = `
        <nav class="navbar" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 8%; background: white; border-bottom: 2px solid #003366; position: sticky; top: 0; z-index: 1000; box-shadow: 0 4px 10px rgba(0,0,0,0.05); font-family: 'Poppins', sans-serif;">
            <div class="logo-wrapper" onclick="window.location.href='index.html'" style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                <img src="images/logo.jpg" alt="CSC Logo" style="width: 45px; height: 45px; border-radius: 50%; border: 2px solid #003366; object-fit: cover;">
                <div class="logo-text" style="line-height: 1.1;">
                    <span style="font-weight: 900; font-size: 1.2rem; color: #003366; display: block;">GAREEBNAWAZ</span>
                    <span style="font-size: 0.7rem; color: #666; font-weight: bold;">DIGITAL SEVA CENTER</span>
                </div>
            </div>
            <ul class="nav-links" style="display: flex; list-style: none; gap: 20px; margin: 0; padding: 0;">
                <li><a href="index.html" style="text-decoration:none; color:#003366; font-weight:700;">Home</a></li>
                <li><a href="services.html" style="text-decoration:none; color:#003366; font-weight:700;">Services</a></li>
                <li><a href="contact.html" style="text-decoration:none; color:#003366; font-weight:700;">Contact</a></li>
            </ul>
        </nav>`;
    }

    // 2. CSC Footer with Social Links & Counter
    if (footerContainer) {
        const uniqueTime = new Date().getTime(); 
        footerContainer.innerHTML = `
        <footer style="background: linear-gradient(to right, #001f3f, #003366); color: white; padding: 25px 8%; margin-top: 40px; border-top: 4px solid #007bff;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
                
                <div style="text-align: left;">
                    <h3 style="margin: 0; font-family: 'Cambria', serif; font-weight: bold; font-size: 1.3rem; color: #fff; letter-spacing: 0.5px;">
                        © 2026 Developed by Mohammad Ejaz Khan
                    </h3>
                    <div style="display: flex; gap: 18px; margin-top: 10px; font-size: 1.4rem;">
                        <a href="https://wa.me/917007420882" target="_blank" style="color: white; transition: 0.3s;"><i class="fab fa-whatsapp"></i></a>
                        <a href="#" style="color: white; transition: 0.3s;"><i class="fab fa-facebook"></i></a>
                        <a href="#" style="color: white; transition: 0.3s;"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>

                <div style="text-align: right;">
                    <div style="background: rgba(255,255,255,0.1); padding: 8px 15px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.2); display: inline-block;">
                        <span style="font-size: 0.65rem; text-transform: uppercase; display: block; margin-bottom: 4px; opacity: 0.9; font-weight: bold; letter-spacing: 1px;">Total Visitors</span>
                        <img src="https://hitwebcounter.com/counter/counter.php?page=happyejaz786_final&style=0005&nbdigits=5&type=page&initCount=0&nocache=${uniqueTime}" 
                             style="width: 100px; height: auto; display: block; margin: 0 auto;" alt="Visitor Counter">
                    </div>
                </div>
                
            </div>
        </footer>`;
    }
}

document.addEventListener('DOMContentLoaded', injectLayout);
