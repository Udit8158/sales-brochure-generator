import OpenAI from "openai";

export async function getReleventLinks(links: string[]) {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.responses.create({
    model: "gpt-4.1-nano",
    input: [
      {
        role: "user",
        content: `Give me 5 relevent links from this array of links from ${links}
        
        Your response format should be:
     [
                "link1",
                "link2",
                "link3",
                "link4",
                "link5"
            ]
        `,
      },
    ],
  });

  return response.output_text;
}

export async function generateBrochure(data: string) {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.responses.create({
    model: "gpt-4.1-nano",
    input: [
      {
        role: "user",
        content: `You're a sales brochure writer. You're give all the data about company ${data}.
        Now you have to generate a brochure which will be focused towards customers and investors.
        Keep the brochure short and to the point.
        Overall structure should be clearn and easy to consume. Add bold text in the relevent points.
        Add some sperator to show the difference between different sections.       

        Add some formatting to make it look good. I am gonna use this in my website with React Markdown. Add some more spaces, line break to looks visually pleasing.

        Note: Don't include anything esle outside the sales brochure text data. Like don't mention: "Here is the sales brochure" or "This is the sales brochure" or anything else. Just give me the sales brochure text data."
        `,
      },
    ],
  });
  console.log(response);
  return response.output_text;
}
