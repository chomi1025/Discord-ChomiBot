const fetch = require("node-fetch");

async function fetchCatImage() {
  try {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await response.json();
    if (data[0] && data[0].url) {
      return data[0].url;
    }
    return null;
  } catch (error) {
    console.error("😿 고양이 API 오류:", error);
    return null;
  }
}

module.exports = { fetchCatImage };
