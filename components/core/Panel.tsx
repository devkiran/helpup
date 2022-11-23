import { Text, Paper, Title } from "@mantine/core";

const Panel = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactElement;
}) => {
  return (
    <Paper withBorder p="lg" className="w-full">
      <div className="flex flex-col space-y-3">
        <Title order={4}>{title}</Title>
        {description && (
          <Text size="sm" weight={300}>
            {description}
          </Text>
        )}
        {children}
      </div>
    </Paper>
  );
};

export default Panel;
