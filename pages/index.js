import { useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../components/Header"));
const LastMovie = dynamic(() => import("../components/LastMovie"));
const Results = dynamic(() => import("../components/Results"));

export default function Home({ results, result }) {
  const [movies, setMovies] = useState(results);
  const [more, setMore] = useState(
    results.length > 0 && results.length % 30 === 0
  );
  const [page, setPage] = useState(1);

  async function loadMore() {
    fetch(`/api/movies?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies([...movies, ...data.movies]);
        setPage(page + 1);
        setMore(data.length === 0);
      })
      .catch((error) => {
        setMore(false);
      });
  }

  return (
    <div>
      <Head>
        <title>افلام قصيرة</title>
        <meta
          name="description"
          content="شاهد جميع الافلام القصيرة و استمتع بأفضل الإخراجات المغربية الاخيرة على موقع افلام قصيرة"
        />
        <meta
          name="facebook-domain-verification"
          content="kdng0p48jxi87q7at7vyier7abjfwc"
        />
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
      </Head>

      {/* header */}
      <Header />
      {/* nav */}
      <LastMovie result={result} />
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
}

export async function getServerSideProps() {
  const client = (await import("../sanity")).client;

  const query = `*[_type == "movies"] | order(_createdAt desc)[0..29]{
    _id,
    title,
    author,
    categories,
    slug,
    videoLink
  }`;

  const results = await client.fetch(query);

  let i = Math.floor(Math.random() * 30 + 1) % results.length;
  const result = results[i];

  return {
    props: {
      results: results.sort(() => Math.random() - 0.5),
      result,
    },
  };
}
