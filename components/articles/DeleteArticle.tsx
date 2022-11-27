import { Button } from "@mantine/core";
import { useRouter } from "next/router";

import { showError, showSuccess } from "@lib/client/notification";

const DeleteArticle = ({
  workspaceId,
  articleId,
}: {
  workspaceId: string;
  articleId: string;
}) => {
  const router = useRouter();

  const deleteArticle = async () => {
    const response = await fetch(
      `/api/workspaces/${workspaceId}/articles/${articleId}`,
      {
        method: "DELETE",
      }
    );

    const { error } = await response.json();

    if (!response.ok) {
      showError(error.message);
    } else {
      showSuccess("Article deleted");
      router.push(`/workspaces/${workspaceId}/articles`);
    }
  };

  return (
    <Button color="red" onClick={deleteArticle}>
      Delete
    </Button>
  );
};

export default DeleteArticle;
