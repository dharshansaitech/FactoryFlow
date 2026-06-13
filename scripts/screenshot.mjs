import puppeteer from "puppeteer-core";
import path from "node:path";

const CHROME_PATH = process.env.CHROME_PATH ?? "";
const OUT_DIR = process.env.SCREENSHOT_DIR ?? "./.screenshots";

const pages = [
  { url: "http://localhost:3070/racks", name: "racks" },
  { url: "http://localhost:3070/alerts", name: "alerts" },
];

const browser = await puppeteer.launch({
  executablePath: CHROME_PATH,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});

for (const { url, name } of pages) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1000 });
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1200));

  // Top viewport
  await page.screenshot({ path: path.join(OUT_DIR, `${name}-top.png`) });

  // Scroll the inner <main> container down and capture bottom
  await page.evaluate(() => {
    const main = document.querySelector("main");
    if (main) main.scrollTo(0, main.scrollHeight);
  });
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(OUT_DIR, `${name}-bottom.png`) });

  await page.close();
  console.log(`saved ${name}-top.png, ${name}-bottom.png`);
}

await browser.close();
