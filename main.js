import { getLocal } from "./scripts/helpers.js";
import {
  mainEle,
  renderUserInfo,
  renderTimeline,
  renderLoader,
  renderInfo,
  renderEmptyInfo,
  renderUserPage,
} from "./scripts/ui.js";
import { API } from "./scripts/api.js";

const api = new API();

//! Olay İzleyicileri
// sayfanın yüklenmesi
document.addEventListener("DOMContentLoaded", async () => {
  // local'den kullanıcı bilgilerini alıp ekrana basma
  const user = getLocal("user");
  renderUserInfo(user);
});

// çıkış butonuna tıklanma
mainEle.logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location = "/auth.html";
});

// detay alanını ekrana bas
const controlURL = async () => {
  // kullanıcnın konumuna erişme
  const path = location.search.split("/")[0];
  const userName = location.search.split("/")[1];
  const id = location.hash.replace("#", "");
  const user = getLocal("user");

  // kullanıcı lokal'de yoksa çalışır
  if (!user) {
    // login sayfasına yönlendir
    location = "/auth.html";
  }

  // kullanıcı ana sayfadaysa çalışır
  if (!path) {
    // ekrana loading basar
    renderLoader(mainEle.tweetsArea);

    // anasayafa gösterileck tweet'leri alma
    const data = await api.fetchData(
      "/timeline.php",
      "screenname",
      user.profile
    );

    // tweetleri ekrana basma
    renderTimeline(user, data.timeline, mainEle.tweetsArea);
  }

  // status sayfasındaysa ve id bulunuysa
  // tweet detaylarını al ve ekrana bas
  if (path === "?status" && id) {
    // apiden cevabı beklemeden arayüzü hazırıla
    renderEmptyInfo();

    //  api'a istek atar
    const info = await api.fetchData("/tweet.php", "id", id);

    //  tweet detaylarını ekrana basar
    renderInfo(info, userName);
  }

  // arama kısmı
  if (path === "?search" && id) {
    // ekran loading bas
    renderLoader(mainEle.main);

    // aratılan kelimeyle alakalı tweetleri getir
    const data = await api.fetchData("/search.php", "query", id);

    // tweet'leri ekran basma
    renderTimeline(null, data.timeline, mainEle.main);
  }

  // hesap detay alanı
  if (path === "?user" && id) {
    // kullanıcı bilgilerini al ve render'la
    renderLoader(mainEle.main);

    const userInfo = await api.getUser(id);

    renderUserPage(userInfo);

    // tweetler'i göndericeğimiz yeri çağırma
    const outlet = document.querySelector(".user-tweets");

    // ekrana loader' basma
    renderLoader(outlet);
    // kulalnıcnın attığı tweet'lere erişme
    const userTweets = await api.fetchData("/timeline.php", "screenname", id);

    // tweet'leri elana basma
    renderTimeline(userInfo, userTweets.timeline, outlet);
  }
};

// hem sayfa yüklendiğinde hem hashtag kısmı değiştiğinde
["hashchange", "load"].forEach((event) => {
  window.addEventListener(event, controlURL);
});

// arama formnun gönderilmesi
mainEle.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // inputun verisine erişme
  const query = e.target[0].value;

  // arama sayfasına yönlendirme
  location = `?search#${query}`;
});

//ana sayfadaki tıklanma olayını izleme
mainEle.main.addEventListener("click", (e) => {
  // geri butonuna tıklandıysa:
  if (e.target.classList.contains("bi-arrow-left")) {
    // geçmişte bir adım geriye gitmasini sağlar
    history.back();
  }
});
