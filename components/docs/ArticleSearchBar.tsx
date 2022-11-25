import { Title, TextInput } from "@mantine/core";
import { Article } from "@prisma/client";
import { IconSearch } from "@tabler/icons";
import { useEffect, useState } from "react";

type SearchResults = Pick<Article, "title" | "slug">[];

const ArticleSearchBar = ({
  workspaceSlug,
  q,
}: {
  workspaceSlug: string;
  q?: string;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResults>([]);

  useEffect(() => {
    const autocompleteArticles = async () => {
      const response = await fetch(
        `/api/workspaces/${workspaceSlug}/articles/autocomplete?${new URLSearchParams(
          { searchTerm }
        )}`
      );

      const { data }: { data: SearchResults } = await response.json();

      setSearchResults(data);
    };

    if (searchTerm.length > 2) {
      autocompleteArticles();
    }
  }, [searchTerm, workspaceSlug]);

  const handleSelect = (slug: string) => {
    setSearchTerm("");
    setSearchResults([]);

    window.location.href = `/docs/${workspaceSlug}/articles/${slug}`;
  };

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
                size="lg"
                placeholder="Search for articles"
                rightSectionWidth={42}
                className="w-full rounded-md"
                required
                name="q"
                defaultValue={q}
                onChange={(event) => setSearchTerm(event.currentTarget.value)}
                value={searchTerm}
              />
              {searchResults.length > 0 && (
                <ul className="flex flex-col bg-white rounded-md mt-2 divide-y px-6 py-3 z-50">
                  {searchResults.map((article) => (
                    <li
                      key={article.slug}
                      className="py-3 cursor-pointer"
                      onClick={() => {
                        handleSelect(article.slug);
                      }}
                    >
                      {article.title}
                    </li>
                  ))}
                </ul>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleSearchBar;
