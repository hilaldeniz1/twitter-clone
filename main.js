import { getLocal } from "./scripts/helpers.js";
import { mainEle, renderUserInfo } from "./scripts/ui.js";

//! Olay İzleyicileri
// sayfanın yüklenmesi
document.addEventListener("DOMContentLoaded", () => {
  const user = getLocal("user");
  renderUserInfo(user);
});

// çıkış butonuna tıklanma
mainEle.logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location = "/auth.html";
});
