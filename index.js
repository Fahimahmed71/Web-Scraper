const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

axios("https://www.bbc.com/news")
  .then((res) => {
    const html = res.data;

    const $ = cheerio.load(html);
    const data = [];

    $(".gs-c-promo", html).each(function () {
      const title = $(this).text();
      const url = $(this).find("a").attr("href");
      data.push({ title, url });
    });
    console.log(data);
  })
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Working ${port}`);
});
