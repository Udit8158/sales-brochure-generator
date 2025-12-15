"use client";
import salesBrochureGenerator from "@/lib/utils/salesBrochureGenerator";
// import { websiteData } from "@/lib/scraper/web_scraper";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);
  const [brochure, setBrochure] = useState<string>("");

  async function onclickGenerateHandler() {
    setLoading(true);
    const result: string = await salesBrochureGenerator(url);
    setBrochure(result);
    setLoading(false);
  }

  async function onclickDownloadHandler() {
    const data = await fetch("/api/download-pdf");

    const blob = await data.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    console.log(a);
    a.download = "sales-brochure.md";
    document.body.appendChild(a);

    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }
  return (
    <div className="flex flex-col gap-8 my-32 mx-12">
      <input
        type="text"
        placeholder="Enter url of company landing page"
        className="w-full md:w-6/12 border-2 border-gray-500 rounded-lg p-2 outline-none justify-center items-center mx-auto"
        onChange={(e) => setUrl(e.target.value)}
        value={url}
      />
      <button
        className="w-6/12 md:w-2/12 border-2 border-gray-500 rounded-lg p-2 outline-none justify-center items-center mx-auto cursor-pointer hover:bg-gray-500 hover:text-white transition-all duration-300"
        onClick={onclickGenerateHandler}
      >
        {loading ? "Generating..." : "Generate"}
      </button>
      <div className="md:w-[70%] border-2 border-gray-500 rounded-lg p-2 outline-none justify-center items-center mx-auto overflow-y-auto h-70">
        <ReactMarkdown>{brochure}</ReactMarkdown>
      </div>
      <button
        className="w-6/12 md:w-2/12 border-2 border-gray-500 rounded-lg p-2 outline-none justify-center items-center mx-auto cursor-pointer hover:bg-gray-500 hover:text-white transition-all duration-300"
        onClick={onclickDownloadHandler}
      >
        Download File
      </button>
    </div>
  );
}
