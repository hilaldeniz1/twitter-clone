const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "75dc092df0msh3c03138e5cc1ea2p19035ejsn916bcc592247",
    "X-RapidAPI-Host": "twitter-api45.p.rapidapi.com",
  },
};

const baseURL = "https://twitter-api45.p.rapidapi.com";

export class API {
  constructor() {}

  //kullanıcı detaylarını alma
  async getUser(username) {
    try {
      const res = await fetch(
        `https://twitter-api45.p.rapidapi.com/screenname.php?screenname=${username}`,
        options
      );
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  //diğer api istekler...
  async fetchData(endpoint, paramName, paramValue) {
    try {
      // paramtre olarak gelen linke
      // yeni paramtre oalrak gelen url parametresini ekleyip istek atma
      const res = await fetch(
        `${baseURL}${endpoint}?${paramName}=${paramValue}`,
        options
      );

      const data = await res.json();

      return data;
    } catch (err) {
      console.log(err);
    }
  }
}
