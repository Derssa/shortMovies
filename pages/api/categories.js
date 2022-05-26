export default async function categories(req, res) {
  try {
    const client = (await import("../../sanity")).client;
    const { page, category } = req.query;
    const query = `*[_type == "movies" && categories[] match $category] | order(_createdAt desc)[${
      30 * page
    }..${30 * page + 29}]{
        _id,
        title,
        author,
        categories,
        slug,
        videoLink
      }`;

    const movies = await client.fetch(query, {
      category,
    });
    res.status(200).json({ movies: movies.sort(() => Math.random() - 0.5) });
  } catch (err) {
    return res.status(500).json({ msg: "Couldn't submit movies", err });
  }
}
