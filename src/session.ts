
const SESSION_TOKEN_KEY = "oturum_guvenligi_demo_token";

/**
 * Eğitim amaçlı örnek belirteci tarayıcı depolamasına kaydeder.
 * Bu değer gerçek bir erişim belirteci değildir.
 */
export function saveDemoToken(): void {
  localStorage.setItem(
    SESSION_TOKEN_KEY,
    "demo-access-token-not-for-production",
  );
}

/**
 * Oturum belirtecinin mevcut olup olmadığını kontrol eder.
 * Belirtecin kendisini dışarıya döndürmez.
 */
export function hasSession(): boolean {
  return localStorage.getItem(SESSION_TOKEN_KEY) !== null;
}

/**
 * Oturumu kapatırken örnek belirteci depolamadan siler.
 */
export function clearSession(): void {
  localStorage.removeItem(SESSION_TOKEN_KEY);
}
