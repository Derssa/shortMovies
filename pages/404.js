import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../components/Header"));

export default function Custom404() {
  return (
    <div>
      <Head>
        <title>خطأ 404</title>
        <meta name="description" content="خطأ 404 على موقع افلام قصيرة" />
        <meta name="robots" content="noindex,nofollow" key="noindexnofollow" />
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
      <div className="w-full flex items-center justify-center">
        <Image
          className="object-contain"
          src="/404.png"
          alt="logo"
          width={700}
          height={500}
          loading="eager"
          priority
        />
      </div>
    </div>
  );
}
