import Link from "next/link";
import dynamic from "next/dynamic";
const LiteYouTubeEmbed = dynamic(() => import("react-lite-youtube-embed"));

function LastMovie({ result }) {
  return (
    <div
      dir="rtl"
      className="hidden sm:block sm:mb-6 sm:w-full sm:flex sm:justify-start sm:items-center"
    >
      <div className="relative overflow-hidden min-w-[50%] ml-14">
        <Link href={`/aflam/${result.slug.current}`}>
          <a>
            <div
              className="absolute bg-contain w-6/12 left-0 z-40 h-full
            bg-gradient-to-r from-[#e6e6e6]"
            ></div>
            <div className="absolute w-full h-full bg-yellow-500 z-50 opacity-0 inset-0"></div>
            <LiteYouTubeEmbed id={result.videoLink} title={result.title} />
          </a>
        </Link>
      </div>

      <div className="pl-4">
        <p
          dir="rtl"
          className="truncate drop-shadow-md text-sm text-red-800 max-w-md transition-all
        lg:text-lg 2xl:text-2xl duration-100 ease-in-out font-bold"
        >
          {result.author}
        </p>
        <h2
          dir="rtl"
          className="my-2 drop-shadow-lg text-gray-700 transition-all
        text-md md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl
        duration-100 ease-in-out font-bold"
        >
          {result.title}
        </h2>
        <p
          dir="rtl"
          className="flex drop-shadow-lg items-center text-sm 
          lg:text-lg 2xl:text-2xl"
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
        <div className="mt-4">
          <Link href={`/aflam/${result.slug.current}`}>
            <a
              className="bg-red-700 px-4 py-2 text-white text-sm font-bold transition-all
              xl:text-lg duration-100 ease-in-out drop-shadow-xl hover:bg-red-900 hover:rounded-lg"
            >
              شاهد الأن
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LastMovie;
