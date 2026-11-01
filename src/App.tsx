import { useState } from "react";
import type { FormEvent } from "react";
import "./App.css";
import {
  clearSession,
  hasSession,
  saveDemoToken,
} from "./session";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => hasSession(),
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password) {
      setMessage("Lütfen e-posta ve parola alanlarını doldurun.");
      return;
    }

    // Gerçek bir sunucuya istek gönderilmez.
    // Yalnızca eğitim amaçlı bir örnek belirteç kaydedilir.
    saveDemoToken();

    setIsAuthenticated(true);
    setPassword("");
    setMessage("Örnek oturum başarıyla açıldı.");
  }

  function handleLogout() {
    clearSession();
    setIsAuthenticated(false);
    setEmail("");
    setPassword("");
    setMessage("Oturum kapatıldı ve örnek belirteç silindi.");
  }

  return (
    <main className="page">
      <section className="session-card">
        <p className="eyebrow">WEB GÜVENLİĞİ LABORATUVARI</p>

        <h1>Oturum Güvenliği</h1>

        <p className="intro">
          React ile oturum açma, oturum kapatma ve tarayıcı
          depolamasını inceleme uygulaması.
        </p>

        <div
          className={`status ${
            isAuthenticated ? "status-active" : "status-inactive"
          }`}
          role="status"
          aria-live="polite"
        >
          <span className="status-dot" aria-hidden="true" />
          {isAuthenticated
            ? "Örnek oturum açık"
            : "Oturum kapalı"}
        </div>

        {isAuthenticated ? (
          <div className="session-panel">
            <h2>Oturum etkin</h2>

            <p>
              Eğitim amaçlı örnek belirteç tarayıcı depolamasına
              kaydedildi.
            </p>

            <p className="security-note">
              Belirtecin içeriği ekrana veya konsola yazdırılmaz.
              Geliştirici araçlarından Application / Storage
              bölümünü kullanarak kontrol edebilirsin.
            </p>

            <button
              className="primary-button"
              type="button"
              onClick={handleLogout}
            >
              Oturumu kapat
            </button>
          </div>
        ) : (
          <form className="login-form" onSubmit={handleLogin}>
            <h2>Oturum aç</h2>

            <label htmlFor="email">E-posta</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              placeholder="ornek@eposta.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <label htmlFor="password">Parola</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Eğitim amaçlı bir parola"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <button className="primary-button" type="submit">
              Oturum aç
            </button>

            <p className="helper-text">
              Bu demo gerçek kimlik doğrulaması yapmaz. Boş
              olmayan alanlarla örnek oturum başlatılır.
            </p>
          </form>
        )}

        {message && (
          <p className="message" role="status" aria-live="polite">
            {message}
          </p>
        )}

        <div className="security-footer">
          <strong>Güvenlik hatırlatması</strong>
          <p>
            Üretim uygulamalarında oturum yönetimi, sunucu tarafı
            doğrulama ve güvenli çerez yapılandırmasıyla
            tasarlanmalıdır.
          </p>
        </div>
      </section>
    </main>
  );
}

export default App;
