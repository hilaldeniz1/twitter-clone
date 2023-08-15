import { authEle } from "./ui.js";
import { API } from "./api.js";
import { setLocal } from "./helpers.js";

const api = new API();

// şifre için kuralları içeren tanım
// min 1 küçük harf
// min 1 büyük harf
// min 1 sayı
// min 1 özel karakter
// min 8 karakter
const regex =
  "(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$";

// uyarıları ekrana basar
const renderWarns = (nameWarn, passWarn) => {
  // isim uyarısı varsa ekrna bas yoksa eski uyarıyı sil
  if (nameWarn) {
    authEle.nameArea.innerHTML = `<p class="warning">${nameWarn}</p>`;
  } else {
    authEle.nameArea.innerHTML = "";
  }

  // şifre uyarısı varsa ekrana bas yoksa eski uyarıyı sil
  if (passWarn) {
    authEle.passArea.innerHTML = `<p class="warning">${passWarn}</p>`;
  } else {
    authEle.passArea.innerHTML = "";
  }
};

// formun gönderilme olayını izler
authEle.loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  let nameWarn = null;
  let passWarn = null;

  // değerlere erişme
  const name = authEle.nameInp.value;
  const pass = authEle.passInp.value;

  // ismi kontrol etme
  if (!name) {
    nameWarn = "İsim alanı zorunludur";
  } else if (name.length <= 3) {
    nameWarn = "İsim 4 karakterden kısa olamaz";
  } else {
    nameWarn = null;
  }

  // şifre kontrol etme
  if (!pass) {
    passWarn = "Şifre alanı zorunludur";
  } else if (pass.length < 6) {
    passWarn = "Şifre 6 karakterden kısa olamaz";
  } else if (!pass.match(regex)) {
    passWarn = "Şifre yeterince güçlü değil";
  } else {
    passWarn = null;
  }

  // uyarıları ekran bas
  renderWarns(nameWarn, passWarn);

  // uyarı yoksa formu gönder
  if (!nameWarn && !passWarn) {
    const userData = await api.getUser(name);
    // kullanıcıyı lokal'e ekler
    setLocal("user", userData);
    // kullanıyı anasayfaya yönlendir
    window.location = "/";
  }
});
