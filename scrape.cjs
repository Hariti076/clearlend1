const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Auth Page or Dashboard depending on token
    await page.goto('https://federal-amaranth-7fp-draft.caffeine.xyz/#caffeineAdminToken=7267ea0b7de33bfca0d4e8409546e8f0b3975cbb624f8fc840a935fdd7ec9c15', { waitUntil: 'networkidle2' });

    // Give it a second to render
    await new Promise(r => setTimeout(r, 2000));

    const html = await page.evaluate(() => document.documentElement.outerHTML);
    fs.writeFileSync('C:/Users/parak/OneDrive/Desktop/clearlend1/scraped_dashboard.html', html);

    // Clear token to get auth page
    await page.evaluate(() => localStorage.clear());
    await page.goto('https://federal-amaranth-7fp-draft.caffeine.xyz/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    const authHtml = await page.evaluate(() => document.documentElement.outerHTML);
    fs.writeFileSync('C:/Users/parak/OneDrive/Desktop/clearlend1/scraped_auth.html', authHtml);

    console.log("Scraping completed.");
    await browser.close();
})();
