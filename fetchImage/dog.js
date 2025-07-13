const fetch = require("node-fetch");

async function fetchDogImage() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    if (data.status === "success" && data.message) {
      return data.message;
    }
    return null;
  } catch (error) {
    console.error("🐶 강아지 API 오류:", error);
    return null;
  }
}

module.exports = { fetchDogImage };
