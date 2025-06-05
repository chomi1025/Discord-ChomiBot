const axios = require("axios");

async function fetchMuleImage() {
  try {
    const response = await axios.get("https://pixabay.com/api/", {
      params: {
        key: "50696051-43f69b20d3c9bb30032b97d27",
        q: "mule",
        image_type: "photo",
        safesearch: true,
      },
    });

    const hits = response.data.hits;
    if (hits.length > 0) {
      const randomImage = hits[Math.floor(Math.random() * hits.length)];
      return randomImage.webformatURL;
    } else {
      return null;
    }
  } catch (err) {
    console.error("이미지 가져오기 실패:", err);
    return null;
  }
}

module.exports = { fetchMuleImage };
