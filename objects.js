const puppeteer = require("puppeteer");
const wait = require("wait");
const math = require("mathjs");

class Site {
  constructor(name, uri, wait, size, pause) {
    this.name = name;
    this.uri = uri;
    this.wait = wait;
    this.size = size;
    this.pause = pause;
  }

  async loadPage() {
    const browser = await puppeteer.launch({
      headless: false,
      ignoreHTTPSErrors: true,
      slowMo: 50,
      args: [`--window-size=1920,1080`],
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
    });
    this.page = await browser.newPage();
    //await this.page.setDefaultNavigationTimeout(0); //Configure the navigation timeout
    await this.page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
    );

    await this.page.goto(this.uri);
    console.log("Page Loading");
    await wait(this.randomNumber());
  }
  async closeModal() {
    console.log("Waiting for Modal");
    const modal = await this.page.waitForSelector("button.bluecoreCloseButton");
    await modal.click();
    console.log("Closed Modal");
    await wait(this.randomNumber());
  }
  async selectSize() {
    console.log("Selecting Size: " + this.size);
    const sizeButton = await this.page.waitForSelector(
      '[aria-label="Size: 0' + this.size + '"]'
    );
    sizeButton.click();
    await wait(this.randomNumber());
  }
  async addToCart() {
    console.log("Adding to Cart");

    await this.page.click("button[type=submit]");
    console.log("Add to Cart");
    await wait(this.randomNumber());
  }
  async checkOut() {
    console.log("checkOut");
  }
  async fillBillingInfo() {
    console.log("fillBillingInfo");
  }
  async randomNumber() {
    let randomNumer = math.random(3000, 6000);
    console.log(randomNumer);
    return randomNumer;
  } 
  async launch() {
    console.log("Launch");
    console.log(this.pause);
    (async () => {
      await this.loadPage();
      await this.closeModal();
      await this.selectSize();
      await this.addToCart();
    })();
  }
}

var kick = new Site(
  "footlocker",
  "https://www.footlocker.com/product/nike-air-force-1-07-le-low-womens/D8959100.html",
  0,
  "9.5",
  math.random(3000, 6000)
);

(async () => {
  await kick.launch();
  //await kick.selectSize();
})();

//document.querySelector("#bluecoreActionScreen > div.close_button-23307-position.close_button-23307-position-d0")
