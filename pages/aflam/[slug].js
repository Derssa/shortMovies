import Head from "next/head";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../../components/Header"));
const LiteYouTubeEmbed = dynamic(() => import("react-lite-youtube-embed"));

const Slug = ({ movie }) => {
  function addProductJsonLd() {
    return {
      __html: `{
        "@context": "https://schema.org/",
        "@type": "Movie",
        "name": "${movie.title}",
        "image": "https://i.ytimg.com/vi/${movie.videoLink}/hqdefault.jpg",
        "genre": "${movie.categories.map((category) => {
          if (category === "drama") {
            return " دراما";
          } else if (category === "ro3b") {
            return " رعب";
          } else if (category === "action") {
            return " اكشن";
          } else {
            return " مغامرة";
          }
        })}",
        "director": {
            "@type": "Person",
            "name": "${movie.author}"
          },
        "actor": {
            "@type": "Person",
            "name": "${movie.author}"
          }
  }
  `,
    };
  }

  return (
    <div>
      <Head>
        <title>{movie.title}</title>
        <meta name="description" content={movie.author + ": " + movie.title} />
        <meta name="google" content="nositelinkssearchbox" key="sitelinks" />
        <meta name="google" content="notranslate" key="notranslate" />
        <meta property="og:title" content={movie.title} />
        <meta
          property="og:description"
          content={movie.author + ": " + movie.title}
        />
        <meta
          property="og:image"
          content={`https://i.ytimg.com/vi/${movie.videoLink}/hqdefault.jpg`}
        />
        <link rel="icon" href="/a9-logo-png.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addProductJsonLd()}
          key="product-jsonld"
        />
      </Head>

      <Header />

      <div
        dir="rtl"
        className="w-full flex flex-col justify-center items-center px-8 mb-10"
      >
        <div className="max-w-[70%]">
          <p
            dir="rtl"
            className="truncate drop-shadow-md text-md text-red-800 max-w-md
            lg:text-lg  2xl:text-xl my-4 font-bold"
          >
            {movie.author}
          </p>
        </div>
        <div
          className="relative overflow-hidden w-[100%] sm:w-[80%] md:w-[65%]
        lg:w-[50%] xl:w-[45%] 2xl:w-[35%]"
        >
          <LiteYouTubeEmbed id={movie.videoLink} title={movie.title} />
        </div>
        <div
          className="w-[100%] sm:w-[80%] md:w-[65%]
          lg:w-[50%] xl:w-[45%] 2xl:w-[35%]"
        >
          <h2
            dir="rtl"
            className="my-2 drop-shadow-lg text-xl text-gray-700
        lg:text-2xl 4xl:text-3xl font-bold"
          >
            {movie.title}
          </h2>
          <p
            dir="rtl"
            className="flex drop-shadow-lg items-center text-md lg:text-lg
             2xl:text-xl 4xl:text-2xl"
          >
            {movie.categories.map((category) => {
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
    </div>
  );
};

export default Slug;

export const getStaticPaths = async () => {
  const client = (await import("../../sanity")).client;
  const query = `*[_type == "movies"]{
        _id,
        slug {
            current
        }
      }`;

  const movies = await client.fetch(query);

  const paths = movies.map((movie) => ({
    params: {
      slug: movie.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const client = (await import("../../sanity")).client;
  const query = `*[_type=="movies" && slug.current==$slug][0]{
        _id,
    title,
    author,
    categories,
    slug,
    videoLink
      }`;

  const movie = await client.fetch(query, {
    slug: params?.slug,
  });

  if (!movie) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movie,
    },
  };
};
