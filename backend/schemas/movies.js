export default {
  name: "movies",
  title: "Movies",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 100,
      },
    },
    {
      name: "author",
      title: "Author",
      type: "string",
    },
    {
      name: "videoLink",
      title: "Video Link",
      type: "string",
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          name: "category",
          title: "Category",
          type: "string",
        },
      ],
    },
  ],
};
