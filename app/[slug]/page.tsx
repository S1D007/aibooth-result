"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function Slug({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<any | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://roop.gokapturehub.com/check/${params.slug}`
      );
      setData(result.data.result.replace("https://gkh-images.s3.amazonaws.com/", "https://d3n1vk7xba6ap0.cloudfront.net/"));
    };
    fetchData();  
  }, []);

  if (!data) {
    return <div>Please Wait Your Image is in Process...</div>;
  }

  const downloadImage = async () => {
    // open in data url in new tab
    // window.open(data, "_blank");
    const response = await axios.get(data, {
      responseType: "blob",
    });
    const blob = new Blob([response.data], { type: "image/jpeg" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = data;
    link.click();
    URL.revokeObjectURL(url);
  }

  // console.log(data.data)
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col space-y-4">
      <img alt="" src={data} style={{
        width: '500px',
        height: 'auto',
        borderRadius: "1rem"
      }} />
      <button onClick={downloadImage} style={{
        padding: "1rem",
        backgroundColor: "blue",
        color: "white",
        borderRadius: "1rem",
        fontSize: "1.5rem",
        cursor: "pointer"
      }} >Download</button>
    </div>
  );
}
