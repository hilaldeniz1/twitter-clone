import { getLocal } from "./scripts/helpers.js";
import {
  mainEle,
  renderUserInfo,
  renderTimeline,
  renderLoader,
  renderInfo,
  renderEmptyInfo,
} from "./scripts/ui.js";
import { API } from "./scripts/api.js";

const api = new API();

//! Olay İzleyicileri
// sayfanın yüklenmesi
document.addEventListener("DOMContentLoaded", async () => {
  // local'den kullanıcı bilgilerini alıp ekrana basma
  const user = getLocal("user");
  renderUserInfo(user);

  // ekrana loading basar
  renderLoader(mainEle.tweetsArea);

  // anasayafa gösterileck tweet'leri alma
  const data = await api.fetchData("/timeline.php", "screenname", user.profile);

  // tweetleri ekrana basma
  renderTimeline(user, data.timeline);
});

// çıkış butonuna tıklanma
mainEle.logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location = "/auth.html";
});

// detay alanını ekrana bas
const controlURL = async () => {
  // kullanıcnın konumuna erişme
  // const path = location.search;
  const id = location.hash.replace("#", "");

  // status sayfasındaysa ve id bulunuysa
  // tweet detaylarını al ve ekrana bas
  if (id) {
    // apiden cevabı beklemeden arayüzü hazırıla
    renderEmptyInfo();

    //  api'a istek atar
    const info = await api.fetchData("/tweet.php", "id", id);

    //  tweet detaylarını ekrana basar
    renderInfo(info);
  }
};

// hem sayfa yüklendiğinde hem hashtag kısmı değiştiğinde
["hashchange", "load"].forEach((event) => {
  window.addEventListener(event, controlURL);
});
