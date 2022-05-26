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
        <link rel="icon" href="/a9-logo-png.png" />
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
