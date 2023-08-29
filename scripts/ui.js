export const authEle = {
  loginForm: document.querySelector("#login"),
  nameInp: document.querySelector("#name"),
  passInp: document.querySelector("#pass"),
  nameArea: document.querySelector(".name-warning"),
  passArea: document.querySelector(".pass-warning"),
};

export const mainEle = {
  pics: document.querySelectorAll("#profile-pic"),
  userName: document.querySelector(".user-info #user-name"),
  userTag: document.querySelector(".user-info #user-tag"),
  logoutBtn: document.querySelector("#logout-btn"),
  tweetsArea: document.querySelector(".tweets-area"),
  main: document.querySelector("main"),
  searchForm: document.querySelector(".news form"),
};

// kullanıcı bilgilerini ekrana basar
export const renderUserInfo = (user) => {
  // kullanıcı resimlerini ekrana basar
  mainEle.pics.forEach((img) => (img.src = user.avatar));

  // kullanıcı ismini ekran basar
  mainEle.userName.innerText = user.name;

  mainEle.userTag.innerText = "@" + user.profile;
};

// media içeriğine göre html döndürür
const getMedia = (media) => {
  if (media.photo) {
    return `<img src=${media.photo[0].media_url_https} />`;
  }

  if (media.video) {
    // diziden sadece mpre4'leri al
    const filter = media.video[0].variants.filter(
      (item) => item.content_type === "video/mp4"
    );

    // diziyi bitrate değerine göre yüksten aza sıralar
    const sorted = filter.sort((a, b) => b.bitrate - a.bitrate);

    console.log(sorted);

    return `
    <video controls>
     <source src="${sorted[0].url}" />
    </video>`;
  }

  return "";
};

// kullanıcının tweet'lerini ekrana basma
export const renderTimeline = (user, tweets, outlet) => {
  console.log(user, tweets, outlet);
  let timelineHTML = tweets
    .map(
      (tweet, i) => `
       <div class="tweet">
          <img
            id="user-img"
            src="${user ? user.avatar : `https://picsum.photos/20${i}`}"
          />
          <div class="body">
            <div class="user">
              <a href="?user#${
                user ? user.profile : tweet.screen_name
              }" class="info">

                <h6>${user ? user.name : tweet.screen_name}</h6>
                <p>@${user ? user.profile : tweet.screen_name}</p>
                <p>${moment(tweet.created_at).fromNow()}</p>
              </a>
              <i class="bi bi-three-dots"></i>
            </div>
            <a href="?status/${user ? user.profile : tweet.screen_name}#${
        tweet.tweet_id
      }" class="content">
              <p>${tweet.text}</p>
               ${getMedia(tweet.media)}
            </a>
            <div class="buttons">
              <button>
                <i class="bi bi-chat"></i>
                <span>${tweet.replies}</span>
              </button>
              <button>
                <i class="bi bi-recycle"></i>
                <span>${tweet.retweets + tweet.quotes}</span>
              </button>
              <button>
                <i class="bi bi-heart"></i>
                <span>${tweet.favorites}</span>
              </button>
              <button>
                <i class="bi bi-bookmark"></i>
                <span>${tweet.bookmarks}</span>
              </button>
            </div>
          </div>
        </div>
  `
    )
    .join("");

  // oluştuduğumuz tweetleri html'e gönderme
  outlet.innerHTML = timelineHTML;
};

// parametre olarak gelen alana loading basar
export const renderLoader = (outlet) => {
  outlet.innerHTML = `
  <div class="d-flex justify-content-center my-5">
   <div class="spinner-grow" role="status">
     <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  `;
};

// apiden cevap gelene kadar gözükecek yer
export const renderEmptyInfo = () => {
  mainEle.main.innerHTML = `
   <div class="top loading-top">
    
      <i class="bi bi-arrow-left"></i>
   
     <h3>Gönderi</h3>
    </div>

  <div class="d-flex justify-content-center my-5">
   <div class="spinner-grow" role="status">
     <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  `;
};

// tweet'ddetayını ekran basar
export const renderInfo = (info, userName) => {
  const html = `
  <div class="info-area">
    <div class="top">
  
     <i class="bi bi-arrow-left"></i>
   
     <h3>Gönderi</h3>
    </div>

    <div class="tweet-info">

      <div class="user">
              <div class="info">
                <img src="/images/default.png" />
                <h6>${userName}</h6>
                <p>@${userName}</p>
              </div>
              <button>Abone Ol</button>
       </div>

       <div class="content">
       <p>${info.text}</p>
       </div>

       <div class="data">
         <p>
            <span class="count">${info.retweets}</span>
            <span>Yeniden Gönderi</span>
         </p>
         <p>
            <span class="count">${info.quotes}</span>
            <span>Alıntılar</span>
         </p>
         <p>
            <span class="count">${info.likes}</span>
            <span>Beğeni</span>
         </p>
         <p>
            <span class="count">${info.bookmarks}</span>
            <span>Yer İşareti</span>
         </p>
       
       </div>

       <div class="buttons">
              <button>
                <i class="bi bi-chat"></i>
              </button>
              <button>
                <i class="bi bi-recycle"></i>
              </button>
              <button>
                <i class="bi bi-heart"></i>
              </button>
              <button>
                <i class="bi bi-bookmark"></i>
              </button>
       </div>
    </div>
  </div>

  `;

  mainEle.main.innerHTML = html;
};

// kullanıcı hakkında bilgileri ekrana basar
export const renderUserPage = (user) => {
  mainEle.main.innerHTML = `
  <div class="user-page">
    <div class="top">
  
        <i class="bi bi-arrow-left"></i>
   
    <h3>${user.name}</h3>
   </div>

   <div class="banner">
     <img src="https://picsum.photos/900/200"/> 
     <img class="user-pp" src="${user.avatar}">
   </div>

   <div class="buttons">
     <div class="icon">
      <i class="bi bi-three-dots"></i>
     </div>
    <div class="icon">
      <i class="bi bi-envelope"></i>
     </div>
    <button>Takip Et</button>
   </div>

   <div class="user-page-info">
    <h4>${user.name}</h4>
    <p>@${user.profile}</p>

    <p>${user.desc}</p>

    <div>
     <p>
      <span> ${user.friends} </span>
      <span>Takip Edilen</span>
     </p>
     <p>
      <span> ${user.sub_count} </span>
      <span>Takipçi</span>
     </p>
    
    </div>
   </div>

   
   <div class="user-tweets">
   
   </div>
   

  </div>
  `;
};
