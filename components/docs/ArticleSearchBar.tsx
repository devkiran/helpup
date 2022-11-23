import { Title, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";

const ArticleSearchBar = ({
  workspaceSlug,
  q,
}: {
  workspaceSlug: string;
  q?: string;
}) => {
  return (
    <section className="bg-blue-600">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-center h-80 space-y-6 px-3">
          <Title order={1} color="white" align="center">
            Advice and answers from the HelpKit Team
          </Title>
          <div className="flex w-full md:w-1/2">
            <form
              className="w-full"
              method="GET"
              action={`/docs/${workspaceSlug}/search`}
            >
              <TextInput
                icon={<IconSearch size={18} stroke={1.5} />}
                radius="md"
                size="lg"
                placeholder="Search for articles"
                rightSectionWidth={42}
                className="w-full"
                required
                name="q"
                defaultValue={q}
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleSearchBar;
