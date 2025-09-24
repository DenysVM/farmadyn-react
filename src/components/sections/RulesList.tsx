import { Heading, List, ListIcon, ListItem, Stack } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

interface RulesListProps {
  title?: string;
  items: string[];
}

const RulesList = ({ title, items }: RulesListProps) => {
  return (
    <Stack
      spacing={4}
      bg="white"
      borderRadius="2xl"
      boxShadow="lg"
      p={{ base: 5, md: 6 }}
    >
      {title && (
        <Heading as="h2" size="md" color="brand.600">
          {title}
        </Heading>
      )}
      <List spacing={3} color="gray.700">
        {items.map((item) => (
          <ListItem key={item} display="flex" alignItems="flex-start" gap={3}>
            <ListIcon as={CheckCircleIcon} color="brand.400" mt={1} />
            {item}
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default RulesList;
