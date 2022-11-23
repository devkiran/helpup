import dayjs from "dayjs";
import Link from "next/link";
import { Loader, Button, Paper, Table } from "@mantine/core";

import EmptyState from "@components/core/EmptyState";
import useCollections from "@lib/hooks/useCollections";

const ListCollection = ({ workspaceId }: { workspaceId: string }) => {
  const { collections, isLoading } = useCollections(workspaceId);

  if (isLoading || !collections) {
    return <Loader />;
  }

  if (collections.length === 0) {
    return <EmptyState title="No collections found." />;
  }

  return (
    <Paper>
      <Table verticalSpacing="sm" withBorder>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {collections.map((collection) => (
            <tr key={collection.id}>
              <td>{collection.title}</td>
              <td>{collection.description}</td>
              <td>{dayjs(collection.updatedAt).format("MMM DD, YYYY")}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
};

export default ListCollection;
