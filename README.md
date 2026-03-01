# BDU Tələbə Hesablayıcı

## 📱 Progressive Web App

BDU (Bakı Dövlət Universiteti) tələbələri üçün hazırlanmış tam funksional hesablama sistemi. Offline işləyir və mobil cihazlara quraşdırıla bilər.

## ✨ Əsas Xüsusiyyətlər

### 1. 📊 Semestr Balı Hesablama
- Seminar balları (maks. 9 ədəd, hər biri 0-10 arası)
- Kollekvium balları (maks. 4 ədəd, hər biri 0-10 arası)
- Sərbəst iş balı (0-10 arası)
- Davamiyyət balı (saat və qayıb sayına görə avtomatik hesablama)
- Düstur: `(seminar_avg × 0.4 + kollekvium_avg × 0.6) × 3 + davamiyyət + sərbəst_iş`
- Maksimum: 50 bal

### 2. 📈 ÜOMG Hesablama
- İstənilən sayda fənn əlavə etmək
- Hər fənn üçün bal (0-100) və kredit
- Düstur: `(bal1 × kredit1 + ... + baln × kreditn) / (kredit1 + ... + kreditn)`

### 3. 💰 25% İmtahan (Kəsr Pulu)
- İllik ödəniş və kredit sayına əsasən hesablama
- Düstur: `[((illik_ödəniş / 60) × kredit) / 4] + 1`

### 4. 🎂 Yaş Hesablayıcı
- Dəqiq yaş hesablaması
- Yaşadığınız gün sayı
- Növbəti ad gününə qalan gün sayı

### 5. 📖 Lüğət
- Akademik terminlərin izahı

### 6. ℹ️ Məlumat
- BDU ilə bağlı faydalı məlumatlar

### 7. 🔗 Sürətli Linklər
- BDU rəsmi web saytı
- SemsLogin akademik portal
- BDU sosial media hesabları
- Tələbə qrupları

## 🚀 Texnologiyalar

- **HTML5** - Struktur
- **CSS3** - Dizayn və animasiyalar
- **JavaScript (Vanilla)** - Funksionallıq
- **Service Worker** - Offline dəstəyi
- **Web App Manifest** - PWA funksiyası

## 📦 Quraşdırma

### Sandbox Development
```bash
# Build və start
npm run build
pm2 start ecosystem.config.cjs

# Test
curl http://localhost:3000
```

### Production Deployment (Cloudflare Pages)
```bash
# Deploy
npm run deploy
```

## 🌐 URLs

- **Demo**: https://3000-i778t64yl23dd1ey6kkzs-de59bda9.sandbox.novita.ai
- **GitHub**: https://github.com/guyu6821-gif/huyhuy
- **Production**: Render.com və ya digər static hosting platformasında deploy edilə bilər

## 📱 PWA Quraşdırma

1. Saytı brauzerinizdə açın
2. "Quraşdır" düyməsinə basın (və ya brauzer menyusundan "Ana ekrana əlavə et")
3. Tətbiq sizin cihazınıza quraşdırılacaq
4. Offline rejimində tam işləyir

## 🎯 İstifadə

1. Ana səhifədə istədiyiniz bölməni seçin
2. Tələb olunan məlumatları daxil edin
3. "Hesabla" düyməsinə basın
4. Nəticənizi dərhal görün

## 📊 Qiymətləndirmə Sistemi

- **50+** - 🎉 MÜVƏFFƏQİYYƏTLƏ KEÇDİNİZ! ✅
- **45-49** - 🔥 ÇOX YAXŞI 📊
- **41-44** - 💣 YAXŞI 📈
- **36-40** - 🫂 KAFİ 📉
- **26-35** - 🎭 ZƏİF 📴
- **0-25** - 🗿 YAXŞI OLACAQ 🆒

## 🔒 Xüsusiyyətlər

- ✅ Tam offline işləyir
- ✅ Mobil və desktop responsive
- ✅ Sürətli və yüngül (< 100KB)
- ✅ Backend tələb etmir
- ✅ Məlumatlar local saxlanılır
- ✅ PWA kimi quraşdırıla bilər

## 📞 Əlaqə

- **WhatsApp**: +994559406018 (Sərbəst iş hazırlanması)
- **Instagram**: [@desespere_etoile](https://www.instagram.com/desespere_etoile)

## 📝 Lisenziya

Bu layihə təhsil məqsədləri üçün hazırlanmışdır.

---

**"O, boşluq yaradır."** ℹ️
