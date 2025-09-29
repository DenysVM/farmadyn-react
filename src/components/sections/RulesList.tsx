import { useState } from "react";
import { Button, Heading, List, ListIcon, ListItem, Stack } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

interface RulesListProps {
  title?: string;
  items: string[];
  showAllLabel: string;
  collapseLabel: string;
}

const RulesList = ({ title, items, showAllLabel, collapseLabel }: RulesListProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  const visibleItems = isExpanded ? items : items.slice(0, 1);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

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
        {visibleItems.map((item) => (
          <ListItem key={item} display="flex" alignItems="flex-start" gap={3}>
            <ListIcon as={CheckCircleIcon} color="brand.400" mt={1} />
            {item}
          </ListItem>
        ))}
      </List>
      {items.length > 1 && (
        <Button
          onClick={handleToggle}
          variant="outline"
          colorScheme="orange"
          alignSelf="flex-start"
          _focusVisible={{ boxShadow: "0 0 0 3px rgba(237, 137, 54, 0.35)", outline: "none" }}
        >
          {isExpanded ? collapseLabel : showAllLabel}
        </Button>
      )}
    </Stack>
  );
};

export default RulesList;
