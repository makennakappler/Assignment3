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

    //show executive leaders page - non admin, or not signed in
    await page.click("body > nav > div.navbar-brand > a");
    await page.click("#executiveLeadersLink");
    await page.click("body > nav > div.navbar-brand > a");
    await new Promise((r) => setTimeout(r, 3000));

    //   click the sign-in button
    await page.click("body > nav > div.navbar-brand > a");
    await page.click("#logIn");

    //   log in as admin
    await page.type("#email_", "ardadmin@gmail.com");
    await page.type("#password_", "ardadmin123");
    await page.click("#LoginButton");
    await new Promise((r) => setTimeout(r, 3000));

    //Show executive leaders form that only shows up for admin
    await page.click("#executiveLeadersLink");
    await page.click("body > nav > div.navbar-brand > a");
    await page.click("#showExecFormButton");
    await new Promise((r) => setTimeout(r, 3000));

    // go to voting page
    await page.click("body > nav > div.navbar-brand > a");
    await page.click("#votingLink");
    await page.click("body > nav > div.navbar-brand > a");
    await new Promise((r) => setTimeout(r, 1000));

    //Show admin voting title change
    await page.type("#d_b_box", "New Disease title");
    await page.click("#titleChange");
    await new Promise((r) => setTimeout(r, 2000));

    //log out
    await page.click("body > nav > div.navbar-brand > a");
    await page.click("#logOut");
    await page.click("body > nav > div.navbar-brand > a");
    await new Promise((r) => setTimeout(r, 3000));

    //   close the browser
    browser.close();
}

// call go()
go();