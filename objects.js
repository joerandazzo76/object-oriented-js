const puppeteer = require("puppeteer");

class Site {
  constructor(name, uri, wait, size) {
    this.name = name;
    this.uri = uri;
    this.wait = wait;
    this.size = size;
  }

  async launch() {
    console.log("Launch");

    (async () => {
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
      await this.page.setDefaultNavigationTimeout(0);
      // Configure the navigation timeout
      await this.page.setUserAgent(
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
      );

      await this.page.goto(this.uri);
      console.log("Page Loading");

      //Wait for Modal and close it 
      await this.closeModal();
      await this.selectSize(this.size);
    })();
  }
  async killPopups() {}
  async selectSize(size) {
    console.log("selectSize" + this.size);

  }
  async closeModal() {
    const modal = await this.page.waitForSelector("button.bluecoreCloseButton");
    await modal.click();
    console.log("Closed Modal");
  }
  async checkOut() {
    console.log("checkOut");
  }
  async fillBillingInfo() {
    console.log("fillBillingInfo");
  }
  async wait() {
    var d = new Date();
    var d2 = null;
    do {
      d2 = new Date();
    } while (d2 - d < ms);
  }
  async() {
    console.log("test");
  }
}

var kick = new Site(
  "footlocker",
  "https://www.footlocker.com/product/nike-air-force-1-07-le-low-womens/D8959100.html",
  0,
  "11"
);

(async () => {
  await kick.launch();
  //await kick.selectSize();
})();

//document.querySelector("#bluecoreActionScreen > div.close_button-23307-position.close_button-23307-position-d0")
