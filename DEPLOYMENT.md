# Render.com-da Deploy Etmək Üçün Təlimat

## 📋 Tələblər
- Render.com hesabı
- GitHub repository (https://github.com/guyu6821-gif/huyhuy)

## 🚀 Deploy Addımları

### 1. Render.com-a Daxil Olun
- [https://render.com](https://render.com) saytına daxil olun
- "Get Started for Free" və ya "Sign In" düyməsinə basın

### 2. Yeni Static Site Yaradın
- Dashboard-da **"New +"** düyməsinə basın
- **"Static Site"** seçin

### 3. GitHub Repository-ni Bağlayın
- **"Connect a repository"** bölməsində GitHub-ı seçin
- Repository axtarın: `guyu6821-gif/huyhuy`
- **"Connect"** düyməsinə basın

### 4. Konfiqurasiya Parametrləri

```
Name: bdu-hesablayici (və ya istədiyiniz ad)
Branch: main
Root Directory: (boş buraxın)
Build Command: (boş buraxın və ya "echo 'No build required'")
Publish Directory: public
```

### 5. Advanced Settings (Opsional)
- **Auto-Deploy**: Yes (hər push-da avtomatik deploy)

### 6. Deploy Edin
- **"Create Static Site"** düyməsinə basın
- Deploy prosesi başlayacaq (1-2 dəqiqə)

### 7. Domain
Deploy tamamlandıqdan sonra sizə belə URL veriləcək:
```
https://bdu-hesablayici.onrender.com
```

## 🔧 Custom Domain Əlavə Etmək (Opsional)

1. Site settings-ə gedin
2. **"Custom Domains"** bölməsinə basın
3. Öz domain-nizi əlavə edin
4. DNS ayarlarını tətbiq edin

## 📱 PWA Test

Deploy-dan sonra:
1. Saytı mobil brauzerdə açın
2. "Ana ekrana əlavə et" seçimini tapın
3. PWA kimi quraşdırın
4. Offline rejimini test edin

## 🐛 Problem Həlli

### Əgər fayl tapılmırsa (404)
- `Publish Directory` düzgün qeyd edildiyinə əmin olun: `public`
- Repository-də `public` qovluğunun olduğunu yoxlayın

### Əgər CSS/JS yüklənmirsə
- Browser console-u yoxlayın
- Fayl yollarının düzgün olduğunu yoxlayın (`/static/app.js`, `/static/styles.css`)

### Əgər PWA quraşdırılmırsa
- HTTPS üzərində olduğunuzdan əmin olun (Render avtomatik HTTPS verir)
- `manifest.json` və `sw.js` fayllarının düzgün yükləndiğini yoxlayın

## ✅ Deploy Uğurlu Oldu!

Saytınız artıq canlıdır və istifadəyə hazırdır! 🎉

**Əsas Xüsusiyyətlər:**
- ✅ HTTPS (təhlükəsiz)
- ✅ Global CDN (sürətli)
- ✅ Auto-deploy (GitHub push-da avtomatik)
- ✅ PWA dəstəyi
- ✅ Offline işləyir
- ✅ Pulsuz hosting
