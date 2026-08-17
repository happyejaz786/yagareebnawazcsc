const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzV2Edf9RyFvF3P3mGAGfjPpwXP579LsRMvfAckH51ntlMMhLbEvPOXL6Lc9mDjaMPfBg/exec';

// 1. Dynamic Serial Number & Auto Date Generation (Bulletproof Default 0001)
window.addEventListener('DOMContentLoaded', () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    // Default Serial Fallback (AUF/MM/YYYY/0001) always assigned first
    const nikahElem = document.getElementById('nikah_no');
    if (nikahElem) {
        nikahElem.value = `AUF/${month}/${year}/0001`;
    }

    const dateElem = document.getElementById('indian_date');
    if (dateElem) {
        const todayStr = now.toISOString().split('T')[0];
        dateElem.value = todayStr;
        
        // Safe check so script never freezes if Hijri function fails
        try {
            if (typeof convertHijriDate === 'function') {
                convertHijriDate(todayStr);
            }
        } catch (e) {
            console.log("Hijri date loading skipped:", e);
        }
    }

    // Fetch total rows from Google Sheet
    fetch(`${SCRIPT_URL}?action=getRegCount`)
        .then(res => res.json())
        .then(data => {
            // Checks if count is defined (even if count === 0)
            if (data && typeof data.count !== 'undefined') {
                const nextCount = Number(data.count) + 1;
                const paddedSerial = String(nextCount).padStart(4, '0');
                if (nikahElem) {
                    nikahElem.value = `AUF/${month}/${year}/${paddedSerial}`;
                }
            }
        })
        .catch(err => {
            console.log("Using default fallback serial number (0001):", err);
        });
});

// 2. Realtime Combine Details (Vakeel & Witness Name + Father's Name)
function combineDetails(prefix) {
    const hiddenMap = {
        'vk': { en: 'vakeel_name_father_en', hi: 'vakeel_name_father_hi', ur: 'vakeel_name_father_ur' },
        'w1': { en: 'witness_1_details_en', hi: 'witness_1_details_hi', ur: 'witness_1_details_ur' },
        'w2': { en: 'witness_2_details_en', hi: 'witness_2_details_hi', ur: 'witness_2_details_ur' }
    };

    if (!hiddenMap[prefix]) return;

    // English Combination (Son of)
    let nameEn = document.getElementById(`${prefix}_name_en`) ? document.getElementById(`${prefix}_name_en`).value.trim() : '';
    let fatherEn = document.getElementById(`${prefix}_father_en`) ? document.getElementById(`${prefix}_father_en`).value.trim() : '';
    let resEn = (nameEn || fatherEn) ? (nameEn + (fatherEn ? ' Son of ' + fatherEn : '')) : '';
    
    if (document.getElementById(`${prefix}_preview_en`)) document.getElementById(`${prefix}_preview_en`).value = resEn;
    if (document.getElementById(hiddenMap[prefix].en)) document.getElementById(hiddenMap[prefix].en).value = resEn;

    // Hindi Combination (पुत्र श्री)
    let nameHi = document.getElementById(`${prefix}_name_hi`) ? document.getElementById(`${prefix}_name_hi`).value.trim() : '';
    let fatherHi = document.getElementById(`${prefix}_father_hi`) ? document.getElementById(`${prefix}_father_hi`).value.trim() : '';
    let resHi = (nameHi || fatherHi) ? (nameHi + (fatherHi ? ' पुत्र श्री ' + fatherHi : '')) : '';
    
    if (document.getElementById(`${prefix}_preview_hi`)) document.getElementById(`${prefix}_preview_hi`).value = resHi;
    if (document.getElementById(hiddenMap[prefix].hi)) document.getElementById(hiddenMap[prefix].hi).value = resHi;

    // Urdu Combination (ولد)
    let nameUr = document.getElementById(`${prefix}_name_ur`) ? document.getElementById(`${prefix}_name_ur`).value.trim() : '';
    let fatherUr = document.getElementById(`${prefix}_father_ur`) ? document.getElementById(`${prefix}_father_ur`).value.trim() : '';
    let resUr = (nameUr || fatherUr) ? (nameUr + (fatherUr ? ' ولد ' + fatherUr : '')) : '';
    
    if (document.getElementById(`${prefix}_preview_ur`)) document.getElementById(`${prefix}_preview_ur`).value = resUr;
    if (document.getElementById(hiddenMap[prefix].ur)) document.getElementById(hiddenMap[prefix].ur).value = resUr;
}

// 3. Auto City Suffix Engine (Shahjahanpur)
function applyCitySuffix(elem) {
    if (!elem || !elem.value.trim()) return;
    const defaultCity = "Shahjahanpur";
    if (!elem.value.toLowerCase().includes(defaultCity.toLowerCase())) {
        elem.value = elem.value.trim() + " " + defaultCity;
    }
}

// 4. Multi-Step Navigation Engine (Bulletproof Step Forwarding)
function nextStep(current) {
    let currentStepElem = document.getElementById(`step-${current}`);
    let currentDotElem = document.getElementById(`dot-${current}`);
    
    let next = current + 1;
    let nextStepElem = document.getElementById(`step-${next}`);
    let nextDotElem = document.getElementById(`dot-${next}`);

    if (currentStepElem && nextStepElem) {
        currentStepElem.classList.remove('active-step');
        if (currentDotElem) {
            currentDotElem.classList.remove('active');
            currentDotElem.classList.add('completed');
        }

        nextStepElem.classList.add('active-step');
        if (nextDotElem) {
            nextDotElem.classList.add('active');
        }
        window.scrollTo({top: 0, behavior: 'smooth'});
    } else {
        console.error(`Step ${next} not found in DOM!`);
    }
}

function prevStep(current) {
    let currentStepElem = document.getElementById(`step-${current}`);
    let currentDotElem = document.getElementById(`dot-${current}`);
    
    let prev = current - 1;
    let prevStepElem = document.getElementById(`step-${prev}`);
    let prevDotElem = document.getElementById(`dot-${prev}`);

    if (currentStepElem && prevStepElem) {
        currentStepElem.classList.remove('active-step');
        if (currentDotElem) {
            currentDotElem.classList.remove('active');
        }

        prevStepElem.classList.add('active-step');
        if (prevDotElem) {
            prevDotElem.classList.add('active');
            prevDotElem.classList.remove('completed');
        }
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
}

// 5. Universal Auto-Transliteration Engine (Hindi & Urdu)
function autoTranslate(text, targetIds) {
    if (!text || !text.trim()) {
        targetIds.forEach(id => {
            let el = document.getElementById(id);
            if(el) el.value = "";
        });
        return;
    }

    targetIds.forEach(targetId => {
        let langCode = targetId.endsWith('_hi') ? 'hi' : 'ur';
        let url = `https://inputtools.google.com/request?text=${encodeURIComponent(text)}&itc=${langCode}-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8`;
        
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data[1] && data[1][0] && data[1][0][1] && data[1][0][1][0]) {
                    let el = document.getElementById(targetId);
                    if(el) {
                        el.value = data[1][0][1][0];
                        if (targetId.startsWith('vk_') || targetId.startsWith('w1_') || targetId.startsWith('w2_')) {
                            let prefix = targetId.split('_')[0];
                            combineDetails(prefix);
                        }
                    }
                }
            })
            .catch(err => console.log("Translation error: ", err));
    });
}

// Helper: Number to Words
function numberToWordsFull(num) {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 
                  'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    
    if (num < 20) return ones[num];
    let digit = num % 10;
    return tens[Math.floor(num / 10)] + (digit ? ' ' + ones[digit] : '');
}

function dayToWordsFull(day) {
    const ordinals = {
        1: 'First', 2: 'Second', 3: 'Third', 4: 'Fourth', 5: 'Fifth', 6: 'Sixth', 7: 'Seventh', 8: 'Eighth', 9: 'Ninth', 10: 'Tenth',
        11: 'Eleventh', 12: 'Twelfth', 13: 'Thirteenth', 14: 'Fourteenth', 15: 'Fifteenth', 16: 'Sixteenth', 17: 'Seventeenth', 18: 'Eighteenth', 19: 'Nineteenth', 20: 'Twentieth',
        30: 'Thirtieth', 31: 'Thirty First'
    };
    if (ordinals[day]) return ordinals[day];
    if (day > 20 && day < 30) {
        return 'Twenty ' + ordinals[day - 20];
    }
    return numberToWordsFull(day);
}

function yearToWordsFull(year) {
    let yearStr = year.toString();
    if (yearStr.length === 4) {
        let firstTwo = parseInt(yearStr.substring(0, 2), 10);
        let lastTwo = parseInt(yearStr.substring(2, 4), 10);
        
        let firstPart = numberToWordsFull(firstTwo);
        let secondPart = lastTwo === 0 ? 'Hundred' : numberToWordsFull(lastTwo);
        return `${firstPart} ${secondPart}`;
    }
    return numberToWordsFull(year);
}

// 6. DOB to FULL Words Conversion
function convertDobToWords(dateString, targetFieldId) {
    if (!dateString) return;
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) return;

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let dayWords = dayToWordsFull(dateObj.getDate());
    let monthWords = months[dateObj.getMonth()];
    let yearWords = yearToWordsFull(dateObj.getFullYear());

    let targetElem = document.getElementById(targetFieldId);
    if(targetElem) {
        targetElem.value = `${dayWords} ${monthWords} ${yearWords}`;
    }
}

// 7. Mehar to Words Conversion
function convertMeharToWords(amount, targetId) {
    let num = parseInt(amount.toString().replace(/[^0-9]/g, ''), 10);
    let targetElem = document.getElementById(targetId);
    if (!targetElem) return;

    if (isNaN(num) || num === 0) {
        targetElem.value = "";
        return;
    }

    const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    function inWords(n) {
        if ((n = n.toString()).length > 9) return 'Overflow';
        let n_array = ('000000000' + n).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n_array) return '';
        let str = '';
        str += (n_array[1] != 0) ? (a[Number(n_array[1])] || b[n_array[1][0]] + ' ' + a[n_array[1][1]]) + 'Crore ' : '';
        str += (n_array[2] != 0) ? (a[Number(n_array[2])] || b[n_array[2][0]] + ' ' + a[n_array[2][1]]) + 'Lakh ' : '';
        str += (n_array[3] != 0) ? (a[Number(n_array[3])] || b[n_array[3][0]] + ' ' + a[n_array[3][1]]) + 'Thousand ' : '';
        str += (n_array[4] != 0) ? (a[Number(n_array[4])] || b[n_array[4][0]] + ' ' + a[n_array[4][1]]) + 'Hundred ' : '';
        str += (n_array[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n_array[5])] || b[n_array[5][0]] + ' ' + a[n_array[5][1]]) : '';
        return str;
    }

    let words = inWords(num);
    targetElem.value = words.trim() + " Rupees Only";
}

// 8. Google Sheets Submission Handler
const form = document.getElementById('nikahForm');
const submitBtn = document.getElementById('submit-btn');
const loadingMsg = document.getElementById('loading-msg');

if(form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        
        combineDetails('vk');
        combineDetails('w1');
        combineDetails('w2');

        const formData = new FormData(form);
        const nikahElem = document.getElementById('nikah_no');
        if (nikahElem && nikahElem.value) {
            formData.set('Nikah_no', nikahElem.value);
            formData.set('nikah_no', nikahElem.value);
        }

        const fallbackFields = [
            'mobile_groom', 'mobile_bride', 
            'groom_aadhaar_number', 'bride_aadhaar_number', 
            'vakeel_aadhaar_number', 'witness_1_aadhaar_number', 'witness_2_aadhaar_number'
        ];

        fallbackFields.forEach(fieldName => {
            let input = form.querySelector(`[name="${fieldName}"]`);
            if(input && !input.value.trim()) {
                input.value = "-";
                formData.set(fieldName, "-");
            }
        });

        if(submitBtn) submitBtn.style.display = 'none';
        if(loadingMsg) loadingMsg.style.display = 'block';

        fetch(SCRIPT_URL, { method: 'POST', body: formData })
            .then(response => {
                alert('Nikah Nama Data Successfully Saved to Google Sheet!');
                form.reset();
                location.reload();
            })
            .catch(error => {
                alert('Error! Data save nahi ho saka.');
                if(submitBtn) submitBtn.style.display = 'block';
                if(loadingMsg) loadingMsg.style.display = 'none';
                console.error('Error!', error.message);
            });
    });
}