import { useState } from "react";
import { Group, Stack, Title, Text } from "@mantine/core";

import { Article } from "@prisma/client";

type FeedbackState = "none" | "positive" | "negative";

const Feedback = ({ article }: { article: Article }) => {
  const [value, setValue] = useState<FeedbackState | null>(null);

  const recordFeedback = async (value: FeedbackState) => {
    await fetch(
      `/api/workspaces/${article.workspaceId}/articles/${article.id}/feedback`,
      {
        method: "PUT",
        body: JSON.stringify({ value }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setValue(value);
  };

  return (
    <>
      <Stack mt="lg" align="center" py="lg">
        {value === null ? (
          <>
            <Title order={5} color="dimmed" weight="normal">
              Was this article helpful?
            </Title>
            <Group spacing={5}>
              <button
                onClick={() => {
                  recordFeedback("positive");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-mood-smile"
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#00abfb"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="12" cy="12" r="9" />
                  <line x1="9" y1="10" x2="9.01" y2="10" />
                  <line x1="15" y1="10" x2="15.01" y2="10" />
                  <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
                </svg>
              </button>
              <button
                onClick={() => {
                  recordFeedback("negative");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-mood-sad"
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#00abfb"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="12" cy="12" r="9" />
                  <line x1="9" y1="10" x2="9.01" y2="10" />
                  <line x1="15" y1="10" x2="15.01" y2="10" />
                  <path d="M9.5 15.25a3.5 3.5 0 0 1 5 0" />
                </svg>
              </button>
            </Group>
          </>
        ) : (
          <Text color="dimmed">Thanks for the feedback</Text>
        )}
      </Stack>
    </>
  );
};

export default Feedback;
