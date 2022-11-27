import Link from "next/link";
import { Loader, Table } from "@mantine/core";

import { formatDate } from "@lib/date";
import useArticles from "@lib/hooks/useArticles";

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
                    className="underline underline-offset-2"
                  >
                    {article.title}
                  </Link>
                </td>
                <td>{article.collection.title}</td>
                <td>{article.helpfulCount}</td>
                <td>{article.notHelpfulCount}</td>
                <td>{formatDate(article.updatedAt)}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default ListArticles;
