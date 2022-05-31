import "../styles/globals.css";
import Script from "next/script";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((RP) => {
        RP.init(`${process.env.NEXT_PUBLIC_FB_PIXEL}`);
        RP.pageView();

        router.events.on("routeChangeComplete", () => {
          RP.pageView();
        });
      });
    return () => {
      router.events.off("routeChangeComplete", () => {
        RP.pageView();
      });
    };
  }, [router.events]);

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script id="gtag" strategy="lazyOnload">{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
  `}</Script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
