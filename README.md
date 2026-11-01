
# Oturum Güvenliği

React ve TypeScript kullanılarak geliştirilmiş, tarayıcı tabanlı oturum yönetimi ve web güvenliği eğitim projesidir.

Bu projede kullanıcıların oturum açma ve kapatma işlemleri, `localStorage` kullanımı, tarayıcı geliştirici araçları ve güvenli oturum çerezleri arasındaki farklar incelenmektedir.

## Projenin Amacı

Projenin temel amacı, web uygulamalarında oturum yönetiminin nasıl çalıştığını uygulamalı olarak öğrenmek ve farklı oturum saklama yöntemlerinin güvenlik açısından değerlendirmesini yapmaktır.

## Kullanılan Teknolojiler

- React
- TypeScript
- Vite
- HTML5
- CSS3
- LocalStorage
- Vitest
- jsdom
- Git ve GitHub

## Proje Özellikleri

- React ile oturum açma arayüzü.
- Oturum kapatma işlemi.
- Örnek erişim belirtecinin localStorage içerisine kaydedilmesi.
- Sayfa yenilendiğinde oturum durumunun korunması.
- Oturum kapatıldığında belirtecin silinmesi.
- Tarayıcı geliştirici araçlarından depolama değerinin incelenmesi.
- Belirtecin console.log() ile yazdırılmaması.
- Oturum depolama işlemleri için otomatik testler.
- localStorage ve HttpOnly çerezlerinin güvenlik karşılaştırması.
- CSRF koruması ve sunucu yapılandırması hakkında teknik açıklamalar.

##  Proje Dosya Yapısı

```text
oturum-guvenligi/
│
├── notes/
│   └── session-security.md
│
├── src/
│   ├── App.tsx
│   ├── App.css
│   ├── session.ts
│   ├── session.test.ts
│   ├── index.css
│   └── main.tsx
│
├── public/
│
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
├── index.html
├── .gitignore
└── README.md
```

##  Kurulum

### 1. Gerekli yazılımlar

Projeyi çalıştırmak için aşağıdaki araçların kurulu olması gerekir:

- Node.js (Vite ile uyumlu sürüm)
- npm
- Visual Studio Code
- Git

Node.js indirme adresi:

https://nodejs.org/

Visual Studio Code indirme adresi:

https://code.visualstudio.com/

### 2. Projeyi bilgisayara indirme

Terminal üzerinden:

```bash
git clone https://github.com/KULLANICI_ADIN/oturum-guvenligi.git
```

Proje klasörüne gir:

```bash
cd oturum-guvenligi
```

### 3. Paketleri yükleme

```bash
npm install
```

### 4. Projeyi çalıştırma

```bash
npm run dev
```

Terminalde gösterilen yerel adresi tarayıcıda aç.

Örnek:

```text
http://localhost:5173/
```

##  Oturum Yönetimi

Uygulamada iki temel işlem bulunmaktadır.

### Oturum açma

1. E-posta alanını doldur.
2. Parola alanını doldur.
3. Oturum aç düğmesine tıkla.
4. Eğitim amaçlı örnek belirteç localStorage içerisine kaydedilir.
5. Uygulama oturum durumunu açık olarak gösterir.

### Oturum kapatma

1. Oturumu kapat düğmesine tıkla.
2. localStorage içerisindeki örnek belirteç silinir.
3. Uygulama oturum durumunu kapalı olarak günceller.

**Not:** Bu uygulama gerçek bir sunucuya bağlanmaz ve gerçek kimlik doğrulaması yapmaz. E-posta ve parola alanları yalnızca eğitim amaçlıdır.

##  Otomatik Testler

Oturum depolama işlemlerini test etmek için Vitest ve jsdom kullanılmıştır.

Testleri çalıştırmak için:

```bash
npm run test
```

Test edilen işlemler:

1. Örnek belirtecin localStorage içerisine kaydedilmesi.
2. Belirteç bulunmadığında oturumun kapalı olması.
3. Belirteç kaydedildiğinde oturumun açık olması.
4. Oturum kapatıldığında belirtecin silinmesi.

##  Tarayıcı Depolamasını İnceleme

Belirtecin tarayıcıda saklandığını doğrulamak için:

1. Uygulamayı tarayıcıda aç.
2. Oturum açma işlemini gerçekleştir.
3. F12 tuşuna basarak geliştirici araçlarını aç.
4. Application sekmesine gir.
5. Storage bölümünden Local Storage seçeneğini aç.
6. Uygulamanın yerel adresini seç.
7. `oturum_guvenligi_demo_token` anahtarını incele.

Belirtecin içeriği console.log() kullanılarak yazdırılmaz.

## Güvenlik Karşılaştırması

Projede iki farklı oturum saklama yaklaşımı incelenmektedir.

### 1. LocalStorage

- JavaScript tarafından okunabilir.
- XSS saldırılarında belirteç çalınabilir.
- Tarayıcıda sayfa yenilendiğinde değer korunabilir.
- Tek başına sunucu taraflı oturum doğrulaması sağlamaz.

### 2. HttpOnly Oturum Çerezi

Sunucu tarafından uygun niteliklerle oluşturulur:

- HttpOnly
- Secure
- SameSite

Avantajları:

- JavaScript'in çerez değerini doğrudan okumasını engeller.
- HTTPS üzerinden güvenli çerez iletimini destekler.
- SameSite ile bazı CSRF risklerini azaltmaya yardımcı olur.
- Sunucu tarafında oturum yönetimine olanak tanır.

### CSRF Güvenliği

HttpOnly çerez kullanımı tek başına yeterli değildir.

Ayrıca aşağıdaki güvenlik önlemleri değerlendirilmelidir:

- CSRF belirteci veya eşdeğer koruma.
- Origin ve gerektiğinde Referer kontrolü.
- Doğru CORS yapılandırması.
- HTTPS kullanımı.
- Güvenli oturum oluşturma ve iptal mekanizmaları.

Detaylı açıklama:

`notes/session-security.md`

##  Kod Kontrolleri

ESLint kontrolünü çalıştır:

```bash
npm run lint
```

Üretim derlemesini kontrol et:

```bash
npm run build
```

Otomatik testleri çalıştır:

```bash
npm run test
```

##  GitHub'a Gönderme

Değişiklikleri kaydetmek için:

```bash
git add .
git commit -m "Update project documentation"
git push origin main
```

##  Güvenlik Uyarısı

Bu proje yalnızca eğitim ve geliştirme amacıyla hazırlanmıştır.

Kullanılan örnek belirteç gerçek bir erişim belirteci değildir.

Üretim ortamında:

- Gerçek erişim belirteçleri JavaScript erişimli depolamada dikkatsizce tutulmamalıdır.
- Sunucu taraflı kimlik doğrulama uygulanmalıdır.
- HttpOnly, Secure ve SameSite çerez nitelikleri doğru yapılandırılmalıdır.
- CSRF ve XSS saldırılarına karşı koruma sağlanmalıdır.
- Oturum süresi, yenileme ve iptal işlemleri yönetilmelidir.

##  Lisans

Bu proje eğitim amaçlı geliştirilmiştir.

---

**Proje Adı:** Oturum Güvenliği

**Teknolojiler:** React, TypeScript, Vite

**Proje Türü:** Web Güvenliği ve Oturum Yönetimi Eğitimi
