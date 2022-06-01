import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../components/Header"));
const Results = dynamic(() => import("../components/Results"));

const Category = ({ results }) => {
  const router = useRouter();
  const { category } = router.query;

  const [movies, setMovies] = useState([]);
  const [more, setMore] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setMovies(results);
    setMore(results.length > 0 && results.length % 30 === 0);
    setPage(1);
    return () => {
      setMovies([]);
    };
  }, [results]);

  async function loadMore() {
    fetch(`/api/categories?page=${page}&category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies([...movies, ...data.movies]);
        setPage(page + 1);
        setMore(data.length === 0);
      })
      .catch((err) => {
        setMore(false);
      });
  }

  return (
    <div>
      <Head>
        <title>
          افلام قصيرة | {category === "drama" ? "الدراما" : ""}
          {category === "ro3b" ? "الرعب" : ""}
          {category === "action" ? "الاكشن" : ""}
          {category === "moghamara" ? "المغامرة" : ""}
        </title>
        <meta
          name="description"
          content={` شاهد افلام ${category === "drama" ? "الدراما" : ""}${
            category === "ro3b" ? "الرعب" : ""
          }${category === "action" ? "الاكشن" : ""}${
            category === "moghamara" ? "المغامرة" : ""
          } القصيرة المغربية الاخيرة`}
        />
        <meta name="google" content="nositelinkssearchbox" key="sitelinks" />
        <meta name="google" content="notranslate" key="notranslate" />
        <meta name="theme-color" content="#991b1b" />
        <meta name="msapplication-TileColor" content="#f1f1f1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="144x144"
          href="/favicon-144x144.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#8c0b0b" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9851108953188478"
          crossorigin="anonymous"
        ></script>
      </Head>

      {/* header */}
      <Header />
      {/* nav */}
      <Results results={movies} />
      {more && (
        <div className="w-full flex justify-center">
          <button
            onClick={() => loadMore()}
            className="bg-red-700 mt-6 mb-10 px-6 py-2 text-white font-bold transition-all
        duration-100 ease-in-out drop-shadow-xl hover:bg-red-900 hover:rounded-lg"
          >
            المزيد
          </button>
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { category } = context.query;
  const client = (await import("../sanity")).client;

  const query = `*[_type=="movies" && categories[] match $category] | order(_createdAt desc)[0..29]{
    _id,
    title,
    author,
    categories,
    slug,
    videoLink
  }`;

  const res = await client.fetch(query, {
    category,
  });

  return {
    props: {
      results: res.sort(() => Math.random() - 0.5),
    },
  };
}

export default Category;
