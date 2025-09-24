import { Container, Heading, Stack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface PageProps {
  title: string;
  lead?: string;
  children: ReactNode;
}

const Page = ({ title, lead, children }: PageProps) => {
  return (
    <Container as="section" py={{ base: 10, md: 16 }}>
      <Stack spacing={{ base: 8, md: 10 }}>
        <Stack spacing={3}>
          <Heading as="h1" size="2xl" color="brand.600">
            {title}
          </Heading>
          {lead && (
            <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
              {lead}
            </Text>
          )}
        </Stack>
        <Stack spacing={{ base: 6, md: 8 }}>{children}</Stack>
      </Stack>
    </Container>
  );
};

export default Page;
