const axios = require("axios");

const BASE_URL = "https://api.meaningcloud.com/sentiment-2.1";

const analyzeURL = async (url, key) => {
  await axios
    .get(`${BASE_URL}?key=${key}&url=${url}&lang=en`)
    .then((response) => {
      const { code } = response.data.status;
      let responseBody = {};
      if (code != 0) {
        if (code == 100) {
          responseBody = { error: "Provided URL is invalid" };
        } else {
          responseBody = { error: response.data.status.msg };
        }
      } else {
        responseBody = {
          score_tag,
          agreement,
          subjectivity,
          confidence,
          irony,
        };
      }
      console.log(responseBody);
      return responseBody;
    })
    .catch((error) => {
      console.log(error);
      return { error: error };
    });
};

module.exports = { analyzeURL };
