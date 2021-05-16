const puppeteer = require('puppeteer');



async function initBrowser() {
    const client = await page.target().createCDPSession();
    const all_browser_cookies = (await client.send('Network.getAllCookies')).cookies;
    const current_url_cookies = await page.cookies();
    const third_party_cookies = all_browser_cookies.filter(cookie => cookie.domain !== current_url_cookies[0].domain);

    console.log(all_browser_cookies); // All Browser Cookies
    console.log(current_url_cookies); // Current URL Cookies
    console.log(third_party_cookies); // Third-Party Cookies



    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
    });
    const page = await browser.newPage();
    await page.goto('https://www.amazon.com/ASUS-Axial-tech-Auto-Extreme-DisplayPort-ROG-STRIX-RTX2060-O6G-EVO-GAMING/dp/B0892TD5XD/ref=dp_fod_1?pd_rd_i=B0892TD5XD&psc=1', {
        waitUntil: 'networkidle2'
    });




    // await browser.close();
    // Here we can get all of the cookies
    console.log(await page._client.send('Network.getAllCookies'));
    return page;
};

async function addToCart(page) {
    await page.$eval("add-to-cart-button", elem => elem.click())
}

async function checkout(page) {
    const page2 = await initBrowser();
    await addToCart(page)
}







checkout()