import { getReleventLinks } from "../openai/openai_functions";

export default async function salesBrochureGenerator(url: string) {
  // scrape the main website
  //   const mainWebsiteData = await fetch("api/scrape-data");
  //   const mainWebsiteDataJson = await mainWebsiteData.json();

  // use gpt to gather relevent website links

  //   const fetchedReleventLinks = await fetch("api/get-relevent-links");
  //   const fetchedReleventLinksJson = await fetchedReleventLinks.json();

  //   console.log(fetchedReleventLinksJson);

  // scrape those websites

  // put all the data in gpt model to generate brochure
  const brochure = await fetch("api/generate-brochure", {
    method: "POST",
    body: JSON.stringify({ url }),
  });
  const brochureJson = await brochure.json();
  return brochureJson.data;
}
