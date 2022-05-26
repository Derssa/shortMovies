const EXTERNAL_DATA_URL = "https://aflam9asira.com/aflam";

function generateSiteMap(movies) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://aflam9asira.com</loc>
     </url>
     <url>
       <loc>https://aflam9asira.com/drama</loc>
     </url>
     <url>
       <loc>https://aflam9asira.com/ro3b</loc>
     </url>
     <url>
       <loc>https://aflam9asira.com/action</loc>
     </url>
     <url>
       <loc>https://aflam9asira.com/moghamara</loc>
     </url>
     ${movies
       .map((movie) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${movie.slug.current}`}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const client = (await import("../sanity")).client;

  // We make an API call to gather the URLs for our site
  const query = `*[_type == "movies"]{
        _id,
        slug {
            current
        }
      }`;

  const movies = await client.fetch(query);

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(movies);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
