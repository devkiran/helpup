import { TextInput, Button, Select, Title, Avatar, Text } from "@mantine/core";

import AppLayout from "@components/layouts/AppLayout";
import TeamLayout from "@components/layouts/TeamLayout";

const members = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
  },
  {
    id: 2,
    name: "Kiran K",
    email: "kiran@example.com",
    role: "Member",
  },
];

const TeamMembers = () => {
  const team = {
    id: 1,
    name: "Team 1",
    logo: "https://i.pravatar.cc/150?img=1",
    slug: "team-1",
  };

  return (
    <AppLayout title={team.name}>
      <TeamLayout team={team}>
        <div className="flex flex-col space-y-3">
          <Title order={3}>Invite Team Member</Title>
          <form className="space-y-4">
            <div className="flex items-center justify-start gap-3">
              <TextInput
                withAsterisk
                placeholder="kiran@example.com"
                className="md:w-1/2 w-full"
              />
              <Select
                data={[
                  { value: "admin", label: "Admin" },
                  { value: "member", label: "Member" },
                ]}
                defaultValue="member"
              />
              <Button type="submit">Invite</Button>
            </div>
          </form>
        </div>

        <div className="flex flex-col space-y-3">
          <Title order={3}>Team Members</Title>
          <div className="flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden ring-1 ring-black ring-opacity-5 rounded">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Role
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {members.map((member) => (
                        <tr key={member.id}>
                          <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            <div className="flex items-center gap-3">
                              <div>
                                <Avatar color="blue" size="md">
                                  {`${
                                    member.name[0] + member.name[1]
                                  }`.toUpperCase()}
                                </Avatar>
                              </div>
                              <div className="flex flex-col">
                                <Text>{member.name}</Text>
                                <Text c="dimmed">{member.email}</Text>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                            {member.role}
                          </td>
                          <td className="relative whitespace-nowrap py-3 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <Button color="red" size="xs">
                              Remove
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TeamLayout>
    </AppLayout>
  );
};

export default TeamMembers;
