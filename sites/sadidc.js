const { ofetch } = require("ofetch")
const cheerio = require('cheerio')


async function getProducts() {
  throw new Error("getProducts must be implemented");
}

async function getStock(productId) {
  throw new Error("getStock must be implemented");
}

async function getCategories() {
debugger
  const a = await ofetch("https://sadidc.com/cart", {
    "credentials": "include",
    "headers": {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
      "Upgrade-Insecure-Requests": "1",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-User": "?1",
      "Priority": "u=0, i"
    },
    "method": "GET",
    "mode": "cors"
  });

  const $ = cheerio.load(a);

  const d = $('div.section-wrapper:nth-child(3) > div.row:nth-child(2)').find('a.check-card')

  console.log(d.length)

  d.map((i, z)  => {
    // $(z).href()
    console.log($(z).find(' .card-title').text().trim())
  })


}

module.exports = {
  getProducts,
  getStock,
  getCategories
};
