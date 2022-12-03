import { NativeSelect, Loader } from "@mantine/core";

import useWorkspaces from "@lib/hooks/useWorkspaces";

export const WorkspaceChooser = ({
  workspaceSelected,
  currentWorkspaceId,
}: {
  workspaceSelected: (workspaceId: string) => void;
  currentWorkspaceId: string;
}) => {
  const { workspaces, isLoading } = useWorkspaces();

  if (isLoading || !workspaces) {
    return <Loader color="gray" size="sm" variant="dots" />;
  }

  const data = workspaces.map((workspace) => ({
    label: workspace.name,
    value: workspace.id,
  }));

  const onChange = (event: any) => {
    workspaceSelected(event.target.value);
  };

  return (
    <NativeSelect
      data={data}
      mb={15}
      onChange={onChange}
      value={currentWorkspaceId}
    />
  );
};
