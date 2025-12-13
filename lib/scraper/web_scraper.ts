import { chromium } from "playwright";

async function scrape(url: string): Promise<{ text: string; links: string[] }> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle" });

  const text = await page.innerText("body");

  const links = await page.evaluate(() =>
    [...document.querySelectorAll("a")].map((a) => a.href)
  );

  // filtering for valid links
  const filteredLinks = links.filter((l) => l.startsWith("http"));

  await browser.close();

  return { text, links: filteredLinks };
}

export async function scrapeData(url: string): Promise<string> {
  const data = await scrape(url);
  return data.text;
}
export async function scrapeLinks(url: string): Promise<string[]> {
  const data = await scrape(url);
  return data.links;
}

// scrape("https://huggingface.co").then(console.log);
