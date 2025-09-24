import { Heading, List, ListItem, Stack, Text } from "@chakra-ui/react";

interface TextSectionProps {
  title?: string;
  paragraphs?: string[];
  list?: string[];
}

const TextSection = ({ title, paragraphs = [], list }: TextSectionProps) => {
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

      {paragraphs.map((text) => (
        <Text key={text} color="gray.700" fontSize={{ base: "sm", md: "md" }}>
          {text}
        </Text>
      ))}

      {Array.isArray(list) && list.length > 0 && (
        <List spacing={3} styleType="disc" pl={5} color="gray.700">
          {list.map((item) => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        </List>
      )}
    </Stack>
  );
};

export default TextSection;
