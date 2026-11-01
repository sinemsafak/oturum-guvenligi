
# Oturum Güvenliği: Tarayıcı Depolaması ve HttpOnly Çerezler

## 1. Amaç

Bu belge, tarayıcıda JavaScript tarafından erişilebilen
depolamada erişim belirteci tutmak ile sunucunun verdiği
HttpOnly oturum çerezini kullanmak arasındaki temel
güvenlik farklarını açıklar.

Bu proje eğitim amaçlıdır. İçinde kullanılan belirteç,
gerçek bir kullanıcı oturumu veya geçerli bir erişim
yetkisi sağlamaz.

## 2. Yaklaşım A: JavaScript erişimli tarayıcı depolaması

Örnek: `localStorage`

### Nasıl çalışır?

İstemci tarafındaki JavaScript bir değeri `localStorage`
içine kaydedebilir ve daha sonra okuyabilir. Değer, açıkça
silinmediği sürece sayfa yenilemelerinden sonra da kalabilir.

### Avantajları

- Kullanımı basittir.
- İstemci tarafındaki uygulamalar tarafından doğrudan
  okunabilir ve yönetilebilir.
- Eğitim ve prototip çalışmalarında depolama davranışını
  gözlemlemek kolaydır.

### Riskleri

- Aynı kaynağın JavaScript kodu depolanan değeri okuyabilir.
- Siteler arası betik çalıştırma (XSS) açığı, saldırganın
  depolamadaki belirteci okumasına yol açabilir.
- Belirteç çalınırsa geçerlilik süresi ve sunucudaki
  yetkilendirme kuralları doğrultusunda kötüye kullanılabilir.
- `localStorage` kendi başına oturum süresi, iptal veya
  sunucu taraflı kimlik doğrulaması sağlamaz.

### Güvenlik değerlendirmesi

XSS riskini azaltmak için bağlama duyarlı çıktı kodlama,
güvenli DOM kullanımı, uygun İçerik Güvenliği Politikası
(CSP) ve bağımlılıkların denetlenmesi gibi önlemler
değerlendirilmelidir.

Gerçek erişim belirteçlerini JavaScript tarafından
okunabilen depolamada tutmak ciddi bir güvenlik
değerlendirmesi gerektirir.

## 3. Yaklaşım B: HttpOnly oturum çerezi

Örnek: Sunucunun `Set-Cookie` başlığıyla verdiği oturum
çerezi.

### Nasıl çalışır?

Sunucu, başarılı kimlik doğrulamasından sonra bir oturum
çerezi oluşturur. Tarayıcı bu çerezi ilgili isteklerde
çerez kapsamı ve politikalarına göre gönderir.

Çerez aşağıdaki gibi uygun niteliklerle yapılandırılabilir:

- `HttpOnly`: JavaScript'in çerez değerini
  `document.cookie` üzerinden okumasını engeller.
- `Secure`: Çerezin yalnızca güvenli HTTPS bağlantıları
  üzerinden gönderilmesini sağlar.
- `SameSite`: Çerezin siteler arası isteklerde ne zaman
  gönderileceğini sınırlar.

Örnek bir sunucu yanıtı:

    Set-Cookie: __Host-session=SERVER_GENERATED_VALUE; Path=/; HttpOnly; Secure; SameSite=Lax

Bu yalnızca bir yapılandırma örneğidir. Üretim ortamında
çerez değeri sunucuda güvenli biçimde oluşturulmalı ve
sunucu tarafında doğrulanmalıdır.

`__Host-` öneki kullanıldığında `Secure` ve `Path=/`
gereklidir; ayrıca `Domain` niteliği kullanılmamalıdır.

### Avantajları

- `HttpOnly`, çerez değerinin JavaScript tarafından
  doğrudan okunmasını engeller.
- `Secure`, HTTPS üzerinden iletimi sınırlar.
- `SameSite`, bazı siteler arası çerez gönderimlerini
  kısıtlayarak CSRF riskini azaltmaya yardımcı olur.
- Sunucu, oturumun geçerliliğini ve iptalini merkezi
  olarak yönetebilir.

### Riskleri ve sınırlamaları

- `HttpOnly`, XSS saldırılarını tamamen engellemez.
  Kötü amaçlı JavaScript, kullanıcının tarayıcısından
  bazı istekleri yine de gönderebilir.
- `Secure`, tek başına sunucunun doğru yapılandırıldığını
  veya bütün bağlantıların güvenli olduğunu garanti etmez.
- `SameSite`, bütün CSRF senaryolarına karşı tek başına
  yeterli kabul edilmemelidir.
- Çerez kapsamı, oturum süresi, oturum yenileme,
  iptal ve sunucu taraflı doğrulama doğru tasarlanmalıdır.

## 4. CSRF koruması ve sunucu yapılandırması

Çerez tabanlı oturumlar kullanıldığında tarayıcı çerezi
uygun isteklerle otomatik gönderebildiğinden, Siteler
Arası İstek Sahteciliği (CSRF) riski ayrıca
değerlendirilmelidir.

Uygulamaya göre aşağıdaki önlemler gerekir:

- `SameSite` değerini uygulamanın ihtiyaçlarına göre
  seçmek.
- Durum değiştiren isteklerde CSRF belirteci kullanmak
  veya uygun bir eşdeğer koruma uygulamak.
- `Origin` ve gerektiğinde `Referer` başlıklarını
  sunucu tarafında doğrulamak.
- CORS politikasını doğru yapılandırmak.
- Oturum çerezini HTTPS üzerinde kullanmak.
- Oturum kimliğini güvenli oluşturmak, yenilemek ve
  oturum kapatıldığında sunucu tarafında geçersiz kılmak.
- Giriş sırasında ve yetki düzeyi değiştiğinde oturum
  kimliğini yenilemeyi değerlendirmek.

CSRF belirteci, oturum çerezi ve diğer korumalar birlikte
tasarlanmalıdır. CORS, tek başına genel bir CSRF koruması
değildir.

## 5. Karşılaştırma

| Özellik | `localStorage` | HttpOnly oturum çerezi |
|---|---|---|
| JavaScript değeri okuyabilir mi? | Evet | `HttpOnly` ile doğrudan okuyamaz |
| Tarayıcı isteklerine otomatik eklenir mi? | Hayır | Çerez kurallarına göre evet |
| XSS kaynaklı belirteç hırsızlığı | Belirteç okunabilir | Doğrudan çerez okuması engellenir |
| CSRF değerlendirmesi | İsteğe bağlı kimlik bilgisi gönderim modeline bağlı | Özellikle gereklidir |
| Sunucu taraflı oturum yönetimi | Uygulamanın ayrıca tasarlaması gerekir | Sunucu tarafından yönetilebilir |
| Güvenli yapılandırma gereksinimi | XSS ve belirteç yaşam döngüsü önemlidir | Çerez nitelikleri, CSRF ve sunucu yapılandırması önemlidir |

## 6. Sonuç

JavaScript'in erişebildiği `localStorage` içinde
belirteç tutmak, belirtecin XSS yoluyla okunabilmesi
nedeniyle risklidir.

Sunucunun uygun `HttpOnly`, `Secure` ve `SameSite`
nitelikleriyle verdiği oturum çerezi, çerez değerinin
JavaScript tarafından doğrudan okunmasını önleyerek
belirteç hırsızlığı riskini azaltabilir.

Ancak çerez yaklaşımı tek başına tam güvenlik sağlamaz.
CSRF koruması, XSS önlemleri, HTTPS, oturum yaşam
döngüsü ve doğru sunucu yapılandırması ayrıca
değerlendirilmelidir.

Bu projedeki `localStorage` kullanımı yalnızca eğitim
amaçlı bir demodur; üretim için güvenli oturum
mimarisi olarak değerlendirilmemelidir.
