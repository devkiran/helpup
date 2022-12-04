import { IconSearch } from "@tabler/icons";
import { useEffect, useState } from "react";
import { Title, TextInput } from "@mantine/core";

import { Article, Workspace } from "@prisma/client";

type SearchResults = Pick<Article, "title" | "slug">[];

type ArticleSearchBarProps = {
  workspace: Workspace;
  q?: string;
};

type SearchResultItemsProps = {
  searchResults: SearchResults;
  onItemClick: (slug: string) => void;
};

const ArticleSearchBar = (props: ArticleSearchBarProps) => {
  const { workspace, q } = props;

  const [searchQuery, setSearchQuery] = useState(q || ""); // Search query
  const [searchTerm, setSearchTerm] = useState(""); // Autocomplete search term
  const [searchResults, setSearchResults] = useState<SearchResults>([]);

  useEffect(() => {
    const autocompleteArticles = async () => {
      if (searchTerm.length === 0) {
        setSearchResults([]);
        return;
      }

      const response = await fetch(
        `/api/workspaces/${
          workspace.slug
        }/articles/autocomplete?${new URLSearchParams({ searchTerm })}`
      );

      const { data }: { data: SearchResults } = await response.json();

      setSearchResults(data);
    };

    autocompleteArticles();
  }, [searchTerm]);

  const onItemClick = (slug: string) => {
    setSearchTerm("");
    setSearchResults([]);

    window.location.href = `/docs/${workspace.slug}/articles/${slug}`;
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery("");
    setSearchTerm(event.currentTarget.value);
  };

  return (
    <section style={{ backgroundColor: workspace.headerColor }}>
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-center h-80 space-y-6 px-3">
          <Title order={1} color="white" align="center">
            {workspace.heading}
          </Title>
          <div className="flex w-full md:w-1/2 static">
            <form
              className="w-full"
              method="GET"
              action={`/docs/${workspace.slug}/search`}
            >
              <TextInput
                icon={<IconSearch size={18} stroke={1.5} />}
                size="lg"
                placeholder="Search for articles"
                rightSectionWidth={42}
                className="w-full rounded-md"
                required
                name="q"
                value={searchQuery || searchTerm}
                onChange={onChange}
              />
            </form>
            {searchResults.length > 0 && (
              <SearchResultItems
                searchResults={searchResults}
                onItemClick={onItemClick}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const SearchResultItems = (props: SearchResultItemsProps) => {
  const { searchResults, onItemClick } = props;

  return (
    <ul className="flex flex-col bg-white rounded-md mt-16 divide-y px-4 py-3 z-[100] absolute w-[35rem] top-50 border">
      {searchResults.map((article) => (
        <li
          key={article.slug}
          className="py-3 cursor-pointer"
          onClick={() => {
            onItemClick(article.slug);
          }}
        >
          {article.title}
        </li>
      ))}
    </ul>
  );
};

export default ArticleSearchBar;
