// Dedicated Islamic / Hijri Date Converter Engine
// Traditional Full Month Names Mapping
const ISLAMIC_MONTHS = [
    "Muharram-ul-Haram",
    "Safar-ul-Muzaffar",
    "Rabi-un-Noor",
    "Rabi-us-Saani",
    "Jamadi-ul-Awwal",
    "Jamadi-us-Saani",
    "Rajab-ul-Murajjab",
    "Shaban-ul-Muazzam",
    "Ramazan-ul-Mubarak",
    "Shawwal-ul-Mukarram",
    "Zil-Qadah",
    "Zil-Hajjah"
];

// Helper: Convert Day Number to Roman Ordinal Suffix (1st, 2nd, 3rd, 16th, etc.)
function getDayOrdinal(day) {
    let j = day % 10,
        k = day % 100;
    if (j === 1 && k !== 11) {
        return day + "st";
    }
    if (j === 2 && k !== 12) {
        return day + "nd";
    }
    if (j === 3 && k !== 13) {
        return day + "rd";
    }
    return day + "th";
}

// Main Hijri Conversion Function
function convertHijriDate(dateString) {
    if (!dateString) return;
    try {
        const dateObj = new Date(dateString);
        if (isNaN(dateObj.getTime())) return;

        // Use Intl Islamic Calendar API to fetch raw Islamic day, month index, and year
        const formatter = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        });

        const parts = formatter.formatToParts(dateObj);
        let dayNum = 0, monthIndex = 0, yearNum = '';

        parts.forEach(part => {
            if (part.type === 'day') dayNum = parseInt(part.value, 10);
            if (part.type === 'month') monthIndex = parseInt(part.value, 10) - 1; // 0-indexed
            if (part.type === 'year') yearNum = part.value;
        });
        // Format day with ordinal, select exact month name from array
        const ordinalDay = getDayOrdinal(dayNum);
        const monthName = ISLAMIC_MONTHS[monthIndex] || "Hijri Month";

        const hijriElem = document.getElementById('hijri_date');
        if (hijriElem) {
            hijriElem.value = `${ordinalDay} ${monthName} ${yearNum} AH`;
        }
    } catch (e) {
        console.log("Hijri conversion fallback triggered: ", e);
    }
}
