import dayjs from "dayjs";
import { Loader, Table } from "@mantine/core";

import useArticles from "@lib/hooks/useArticles";
import Link from "next/link";

const ListArticles = ({ workspaceId }: { workspaceId: string }) => {
  const { articles, isLoading } = useArticles(workspaceId);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Table verticalSpacing="xs" withBorder bg="white">
      <thead>
        <tr>
          <th>Title</th>
          <th>Collection</th>
          <th>Helpful</th>
          <th>Not Helpful</th>
          <th>Last Updated</th>
        </tr>
      </thead>
      <tbody>
        {articles &&
          articles.map((article) => {
            return (
              <tr key={article.id}>
                <td>
                  <Link
                    href={`/workspaces/${workspaceId}/articles/${article.id}`}
                    className="hover:underline"
                  >
                    {article.title}
                  </Link>
                </td>
                <td>{article.collection.title}</td>
                <td>1</td>
                <td>2</td>
                <td>{dayjs(article.updatedAt).format("MMM DD, YYYY")}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default ListArticles;
