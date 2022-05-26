import dynamic from "next/dynamic";
const LiteYouTubeEmbed = dynamic(() => import("react-lite-youtube-embed"));

function Thumbnail({ result }) {
  return (
    <div
      className="group cursor-pointer p-2 transition duration-200 ease-in transform
    sm:hover:scale-105 hover:z-50"
    >
      <div className="relative overflow-hidden w-full pt-[56.25%]">
        <div className="absolute w-full h-full bg-yellow-500 z-50 opacity-0 inset-0"></div>
        <div className="absolute w-full h-full inset-0 z-0">
          <LiteYouTubeEmbed id={result.videoLink} title={result.title} />
        </div>
      </div>

      <div className="p-2">
        <p
          dir="rtl"
          className="truncate text-sm text-red-800 max-w-md transition-all
        duration-100 ease-in-out group-hover:font-bold"
        >
          {result.author}
        </p>
        <h2
          dir="rtl"
          className="truncate mt-1 text-xl text-gray-700 transition-all
        duration-100 ease-in-out group-hover:font-bold"
        >
          {result.title}
        </h2>
        <p
          dir="rtl"
          className="flex items-center opacity-0 group-hover:opacity-100"
        >
          {result.categories.map((category) => {
            if (category === "drama") {
              return " دراما";
            } else if (category === "ro3b") {
              return " رعب";
            } else if (category === "action") {
              return " اكشن";
            } else {
              return " مغامرة";
            }
          })}
        </p>
      </div>
    </div>
  );
}

export default Thumbnail;
