// Navigation
function navigateTo(page) {
    // Bütün səhifələri gizlət
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    
    // Seçilən səhifəni göstər
    const targetPage = document.getElementById(`${page}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Haqqında bölməsi toggle
function toggleAbout() {
    const aboutText = document.getElementById('about-text');
    aboutText.classList.toggle('hidden');
}

// Semestr Balı Hesablama
function createSeminarInputs() {
    const count = parseInt(document.getElementById('seminar-count').value) || 0;
    const container = document.getElementById('seminar-inputs');
    container.innerHTML = '';
    
    if (count > 9) {
        alert('Maksimum 9 seminar ola bilər!');
        document.getElementById('seminar-count').value = 9;
        return;
    }
    
    for (let i = 1; i <= count; i++) {
        const div = document.createElement('div');
        div.className = 'input-group';
        div.innerHTML = `
            <label>Seminar ${i} (0-10):</label>
            <input type="number" class="seminar-grade" min="0" max="10" step="0.1" value="0">
        `;
        container.appendChild(div);
    }
}

function createKollekviumInputs() {
    const count = parseInt(document.getElementById('kollekvium-count').value) || 0;
    const container = document.getElementById('kollekvium-inputs');
    container.innerHTML = '';
    
    if (count > 4) {
        alert('Maksimum 4 kollekvium ola bilər!');
        document.getElementById('kollekvium-count').value = 4;
        return;
    }
    
    for (let i = 1; i <= count; i++) {
        const div = document.createElement('div');
        div.className = 'input-group';
        div.innerHTML = `
            <label>Kollekvium ${i} (0-10):</label>
            <input type="number" class="kollekvium-grade" min="0" max="10" step="0.1" value="0">
        `;
        container.appendChild(div);
    }
}

function calculateAttendance(hours, absences) {
    const rules = {
        30: { 0: 10, 1: 9, 2: 9, 3: 8, default: 'kəsr' },
        45: { 0: 10, 1: 10, 2: 9, 3: 9, 4: 8, 5: 8, default: 'kəsr' },
        60: { 0: 10, 1: 10, 2: 9, 3: 9, 4: 9, 5: 8, 6: 8, 7: 8, default: 'kəsr' },
        75: { 0: 10, 1: 10, 2: 9, 3: 9, 4: 9, 5: 9, 6: 8, 7: 8, 8: 8, 9: 8, default: 'kəsr' },
        90: { 0: 10, 1: 10, 2: 10, 3: 9, 4: 9, 5: 9, 6: 9, 7: 8, 8: 8, 9: 8, 10: 8, 11: 8, default: 'kəsr' },
        105: { 0: 10, 1: 10, 2: 10, 3: 9, 4: 9, 5: 9, 6: 9, 7: 9, 8: 8, 9: 8, 10: 8, 11: 8, 12: 8, 13: 8, default: 'kəsr' }
    };
    
    const rule = rules[hours];
    if (!rule) return 0;
    
    if (rule[absences] !== undefined) {
        return rule[absences];
    }
    
    return rule.default;
}

function getGradeEmoji(score) {
    if (score === 0) return '0 BAL';
    if (score >= 50) return '🎉 MÜVƏFFƏQİYYƏTLƏ KEÇDİNİZ! ✅';
    if (score >= 45) return '🔥 ÇOX YAXŞI 📊';
    if (score >= 41) return '💣 YAXŞI 📈';
    if (score >= 36) return '🫂 KAFİ 📉';
    if (score >= 26) return '🎭 ZƏİF 📴';
    return '🗿 YAXŞI OLACAQ 🆒';
}

function calculateSemester() {
    // Seminar ballarını topla
    const seminarGrades = Array.from(document.querySelectorAll('.seminar-grade')).map(input => parseFloat(input.value) || 0);
    const seminarAvg = seminarGrades.length > 0 ? seminarGrades.reduce((a, b) => a + b, 0) / seminarGrades.length : 0;
    
    // Kollekvium ballarını topla
    const kollekviumGrades = Array.from(document.querySelectorAll('.kollekvium-grade')).map(input => parseFloat(input.value) || 0);
    const kollekviumAvg = kollekviumGrades.length > 0 ? kollekviumGrades.reduce((a, b) => a + b, 0) / kollekviumGrades.length : 0;
    
    // Sərbəst iş
    const serbestIs = parseFloat(document.getElementById('serbest-is').value) || 0;
    
    // Davamiyyət
    const hours = parseInt(document.getElementById('hours-select').value);
    const absences = parseInt(document.getElementById('absences').value) || 0;
    const attendanceScore = calculateAttendance(hours, absences);
    
    if (attendanceScore === 'kəsr') {
        const resultDiv = document.getElementById('semester-result');
        resultDiv.className = 'result-box fail';
        resultDiv.innerHTML = `
            <h3>❌ KƏSR</h3>
            <p>Qayıb sayınız çoxdur. Fənn kəsrə çevrildi.</p>
        `;
        return;
    }
    
    // Hesablama düsturu: (seminar_avg × 0.4 + kollekvium_avg × 0.6) × 3 + davamiyyət + sərbəst_iş
    const semesterScore = (seminarAvg * 0.4 + kollekviumAvg * 0.6) * 3 + attendanceScore + serbestIs;
    const finalScore = Math.min(semesterScore, 50); // Maksimum 50
    
    const emoji = getGradeEmoji(finalScore);
    
    const resultDiv = document.getElementById('semester-result');
    resultDiv.className = 'result-box success';
    resultDiv.innerHTML = `
        <h3>📊 Nəticə</h3>
        <div class="score-big">${finalScore.toFixed(2)} / 50</div>
        <div class="grade-emoji">${emoji}</div>
        <hr>
        <div class="breakdown">
            <p><strong>Seminar ortalaması:</strong> ${seminarAvg.toFixed(2)}</p>
            <p><strong>Kollekvium ortalaması:</strong> ${kollekviumAvg.toFixed(2)}</p>
            <p><strong>Sərbəst iş:</strong> ${serbestIs.toFixed(2)}</p>
            <p><strong>Davamiyyət:</strong> ${attendanceScore} (${absences} qayıb)</p>
        </div>
    `;
}

// ÜOMG Hesablama
function createCourseInputs() {
    const count = parseInt(document.getElementById('course-count').value) || 0;
    const container = document.getElementById('course-inputs');
    container.innerHTML = '';
    
    if (count < 1) {
        alert('Ən azı 1 fənn olmalıdır!');
        return;
    }
    
    for (let i = 1; i <= count; i++) {
        const div = document.createElement('div');
        div.className = 'course-item';
        div.innerHTML = `
            <h4>Fənn ${i}</h4>
            <div class="input-group">
                <label>Bal (0-100):</label>
                <input type="number" class="course-score" min="0" max="100" step="0.1" value="0">
            </div>
            <div class="input-group">
                <label>Kredit:</label>
                <input type="number" class="course-credit" min="1" value="1">
            </div>
        `;
        container.appendChild(div);
    }
}

function calculateUOMG() {
    const scores = Array.from(document.querySelectorAll('.course-score')).map(input => parseFloat(input.value) || 0);
    const credits = Array.from(document.querySelectorAll('.course-credit')).map(input => parseFloat(input.value) || 0);
    
    if (scores.length === 0 || credits.length === 0) {
        alert('Əvvəlcə fənn məlumatlarını daxil edin!');
        return;
    }
    
    let totalWeighted = 0;
    let totalCredits = 0;
    
    for (let i = 0; i < scores.length; i++) {
        totalWeighted += scores[i] * credits[i];
        totalCredits += credits[i];
    }
    
    const uomg = totalCredits > 0 ? totalWeighted / totalCredits : 0;
    const emoji = getGradeEmoji(uomg);
    
    const resultDiv = document.getElementById('uomg-result');
    resultDiv.className = 'result-box success';
    resultDiv.innerHTML = `
        <h3>📈 ÜOMG Nəticəsi</h3>
        <div class="score-big">${uomg.toFixed(2)} / 100</div>
        <div class="grade-emoji">${emoji}</div>
        <hr>
        <div class="breakdown">
            <p><strong>Ümumi kredit:</strong> ${totalCredits}</p>
        </div>
    `;
}

// 25% İmtahan Hesablama
function calculateExam25() {
    const yearlyPayment = parseFloat(document.getElementById('yearly-payment').value) || 0;
    const creditCount = parseFloat(document.getElementById('credit-count').value) || 1;
    
    // Düstur: [((illik_ödəniş / 60) × kredit) / 4] + 1
    const result = (((yearlyPayment / 60) * creditCount) / 4) + 1;
    
    const resultDiv = document.getElementById('exam25-result');
    resultDiv.className = 'result-box success';
    resultDiv.innerHTML = `
        <h3>💰 Kəsr Pulu</h3>
        <div class="score-big">${result.toFixed(2)} AZN</div>
        <hr>
        <div class="breakdown">
            <p><strong>İllik ödəniş:</strong> ${yearlyPayment.toFixed(2)} AZN</p>
            <p><strong>Kredit sayı:</strong> ${creditCount}</p>
        </div>
    `;
}

// Yaş Hesablayıcı
function calculateAge() {
    const birthdateInput = document.getElementById('birthdate').value;
    
    if (!birthdateInput) {
        alert('Doğum tarixini daxil edin!');
        return;
    }
    
    const birthDate = new Date(birthdateInput);
    const today = new Date();
    
    // Yaşı hesabla
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }
    
    // Neçə gün yaşadığını hesabla
    const timeDiff = today.getTime() - birthDate.getTime();
    const daysLived = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    // Növbəti ad gününə neçə gün qalıb
    let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    
    if (nextBirthday < today) {
        nextBirthday = new Date(today.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
    }
    
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    const resultDiv = document.getElementById('age-result');
    resultDiv.className = 'result-box success';
    resultDiv.innerHTML = `
        <h3>🎂 Yaş Məlumatı</h3>
        <div class="age-info">
            <div class="age-item">
                <div class="age-number">${age}</div>
                <div class="age-label">Yaş</div>
            </div>
            <div class="age-item">
                <div class="age-number">${daysLived.toLocaleString()}</div>
                <div class="age-label">Yaşadığınız Gün</div>
            </div>
            <div class="age-item">
                <div class="age-number">${daysUntilBirthday}</div>
                <div class="age-label">Ad Gününə Qalan Gün</div>
            </div>
        </div>
    `;
}

// PWA Install
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Install promptu göster
    const installPrompt = document.getElementById('install-prompt');
    installPrompt.classList.remove('hidden');
});

document.getElementById('install-btn').addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response: ${outcome}`);
        deferredPrompt = null;
        
        // Promptu gizlət
        document.getElementById('install-prompt').classList.add('hidden');
    }
});

document.getElementById('dismiss-btn').addEventListener('click', () => {
    document.getElementById('install-prompt').classList.add('hidden');
});

// Service Worker qeydiyyatı
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker qeydiyyatdan keçdi:', registration);
            })
            .catch(error => {
                console.log('Service Worker qeydiyyatı uğursuz:', error);
            });
    });
}

// İlkin yükləmə
window.addEventListener('DOMContentLoaded', () => {
    console.log('BDU Tələbə Hesablayıcı yükləndi');
});
