import {
  generateBrochure,
  getReleventLinks,
} from "@/lib/openai/openai_functions";
import { scrapeData, scrapeLinks } from "@/lib/scraper/web_scraper";

export async function POST(req: Request) {
  const body = await req.json();
  const url = body.url;

  let allDataForModel = "";

  // scrape all the link from main website
  const allLinksInMainWebsite = await scrapeLinks(url);

  // scrape the content of main website
  const mainWebsiteContent = await scrapeData(url);
  allDataForModel += mainWebsiteContent.slice(0, 3000);
  allDataForModel += "\n ----------------------- \n";

  // scrape the content of all the relevent links
  const releventLinksRaw = await getReleventLinks(allLinksInMainWebsite);
  const releventLinks = JSON.parse(releventLinksRaw);

  for (const url of releventLinks) {
    console.log(url);
    console.log(allDataForModel.length);
    const content = await scrapeData(url);
    allDataForModel += content;
    allDataForModel += "\n ----------------------- \n";
  }

  const brochure = await generateBrochure(allDataForModel.slice(0, 5000));

  return new Response(JSON.stringify({ data: brochure }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
