import { TextInput, Button } from "@mantine/core";

import AppLayout from "@components/layouts/AppLayout";
import Panel from "@components/core/Panel";
import TeamLayout from "@components/layouts/TeamLayout";

const TeamInfo = () => {
  const team = {
    id: 1,
    name: "Team 1",
    logo: "https://i.pravatar.cc/150?img=1",
    slug: "team-1",
  };

  return (
    <AppLayout title={team.name}>
      <TeamLayout team={team}>
        <Panel title="Team Information" description="">
          <form className="space-y-4">
            <TextInput
              withAsterisk
              label="Name"
              placeholder="Name"
              className="md:w-1/2 w-full"
            />
            <TextInput
              withAsterisk
              label="Slug"
              placeholder="Slug"
              className="md:w-1/2 w-full"
            />
            <TextInput
              withAsterisk
              label="Avatar URL"
              placeholder="Avatar URL"
              className="md:w-1/2 w-full"
            />
            <Button type="submit">Save Changes</Button>
          </form>
        </Panel>
        <Panel
          title="Delete Team"
          description="Permanently remove your account and all of its contents from our platform. This action is not reversible, so please continue with caution."
        >
          <form className="space-y-4">
            <Button type="submit" color="red">
              Delete Team
            </Button>
          </form>
        </Panel>
      </TeamLayout>
    </AppLayout>
  );
};

export default TeamInfo;
