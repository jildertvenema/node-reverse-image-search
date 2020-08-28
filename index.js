const puppeteer = require('puppeteer');

module.exports = (async (imageUrl, callback) => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://www.google.com/searchbyimage?image_url=' + encodeURIComponent(imageUrl));

  const images = await page.evaluate(() => {
    return Array.from(document.body.querySelectorAll('div div a h3')).slice(2).map(e => e.parentNode).map(el => ({ url: el.href, title: el.querySelector('h3').innerHTML }))
  })
  callback(images);
  await browser.close();
});