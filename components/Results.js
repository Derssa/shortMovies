import Link from "next/link";
import dynamic from "next/dynamic";
const Thumbnail = dynamic(() => import("./Thumbnail"));

const Results = ({ results }) => {
  return (
    <div
      dir="rtl"
      className="px-4 sm:grid sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3
    2xl:grid-cols-5"
    >
      {results.map((result) => (
        <Link key={result._id} href={`/aflam/${result.slug.current}`}>
          <a>
            <Thumbnail result={result} />
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Results;
