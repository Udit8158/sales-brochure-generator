import fs from "fs/promises";

export async function GET(request: Request) {
  const blob = await fs.readFile("./sales-brochure.md");
  console.log(blob);

  return new Response(blob, {
    headers: {
      "Content-Type": "text/markdown",
      "Content-Disposition": "attachment; filename=sales-brochure.md",
    },
  });
}
