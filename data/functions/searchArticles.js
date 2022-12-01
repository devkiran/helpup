exports = function ({ query, headers, body }, response) {
  const { searchTerm, workspaceId } = query;

  const docs = context.services
    .get("mongodb-atlas")
    .db("myFirstDatabase")
    .collection("Article")
    .aggregate([
      {
        $search: {
          index: "searchArticles",
          compound: {
            must: [
              {
                text: {
                  query: searchTerm,
                  path: ["title", "contentText"],
                },
              },
            ],
            filter: [
              {
                equals: {
                  value: new BSON.ObjectId(workspaceId),
                  path: "workspaceId",
                },
              },
            ],
          },
        },
      },
      {
        $project: {
          _id: 0,
          title: 1,
          slug: 1,
          contentText: 1,
          updatedAt: 1,
        },
      },
    ]);

  return docs;
};
