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
    return `
    <video controls>
    <source src="${media.video[0].variants[1].url}" />
    </video>`;
  }

  return "";
};

// kullanıcının tweet'lerini ekrana basma
export const renderTimeline = (user, tweets) => {
  let timelineHTML = tweets
    .map(
      (tweet) => `
       <div class="tweet">
          <img
            id="user-img"
            src="${user.avatar}"
          />
          <div class="body">
            <div class="user">
              <div class="info">
                <h6>${user.name}</h6>
                <p>@${user.profile}</p>
                <p>${moment(tweet.created_at).fromNow()}</p>
              </div>
              <i class="bi bi-three-dots"></i>
            </div>
            <a href="#${tweet.tweet_id}" class="content">
              <p>${tweet.text}</p>
               ${getMedia(tweet.media)}
            </a>
            <div class="buttons">
              <button>
                <i class="bi bi-chat"></i>
                <span>91</span>
              </button>
              <button>
                <i class="bi bi-recycle"></i>
                <span>11</span>
              </button>
              <button>
                <i class="bi bi-heart"></i>
                <span>499</span>
              </button>
              <button>
                <i class="bi bi-bookmark"></i>
                <span>11</span>
              </button>
            </div>
          </div>
        </div>
  `
    )
    .join("");

  // oluştuduğumuz tweetleri html'e gönderme
  mainEle.tweetsArea.innerHTML = timelineHTML;
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
   <div class="top">
     <a href="/">Geri</a>
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
export const renderInfo = (info) => {
  console.log(info);

  const html = `
  <div class="info-area">
    <div class="top">
     <a href="/">Geri</a>
     <h3>Gönderi</h3>
    </div>
    <div class="tweet-info">
      <div class="user">
              <div class="info">
                <h6>Elon Musk</h6>
                <p>@elonmusk</p>
              </div>
              <button>Abone Ol</button>
       </div>
       <div class="content">
       <p>${info.text}</p>
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
