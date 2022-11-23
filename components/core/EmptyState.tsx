import Link from "next/link";
import { IconMoodEmpty } from "@tabler/icons";
import { Stack, Title, Paper, Text, Button } from "@mantine/core";

const EmptyState = (props: Props) => {
  const { title, description, buttonText, onClick, href } = props;

  return (
    <Paper shadow="md" p="lg">
      <Stack align="center" justify="center" h={250}>
        <IconMoodEmpty size={80} />
        <Title order={5} weight={400}>
          {title}
        </Title>
        {description && <Text>{description}</Text>}
        {href && <Link href={href}>{buttonText}</Link>}
        {onClick && <Button onClick={onClick}>{buttonText}</Button>}
      </Stack>
    </Paper>
  );
};

export default EmptyState;

type Props = {
  title: string;
  description?: string;
  buttonText?: string;
  href?: string;
  onClick?: () => void;
};
