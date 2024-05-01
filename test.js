// import puppeteer

const puppeteer = require("puppeteer");

async function go() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 50,
    });

    const page = await browser.newPage();

    //   visit the site to be tested

    await page.goto("http://127.0.0.1:5502/index.html");

    //   click the sign-in button
    await page.click("body > nav > div.navbar-brand > a");
    await page.click("#logIn");

    //   user will provide email/pass for signing in
    await page.type("#email_", "ardadmin@gmail.com");
    await page.type("#password_", "ardadmin123");
    await page.click("#LoginButton");

    await new Promise((r) => setTimeout(r, 2000));



    await page.click("#votingLink");
    await page.click("body > nav > div.navbar-brand > a");
    await new Promise((r) => setTimeout(r, 2000));

    await page.type("#d_b_box", "Test B");
    await page.click("#titleChange");
    await new Promise((r) => setTimeout(r, 2000));

    await page.click("body > nav > div.navbar-brand > a");
    await page.click("#votingLink");
    await page.click("body > nav > div.navbar-brand > a");
    await new Promise((r) => setTimeout(r, 2000));



    //   close the browser
    browser.close();
}

// call go()
go();