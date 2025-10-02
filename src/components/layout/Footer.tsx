import { Box, Container, Link, Stack, Text } from "@chakra-ui/react";
import { useLocale } from "../../i18n/LocaleContext";

const currentYear = new Date().getFullYear();

const footerCopy = {
  pl: {
    rights: `Copyright ${currentYear} 🎃 Magic Pumpkin Farm. Wszystkie prawa zastrzeżone.`,
    creditPrefix: "Projekt i development:",
    creditName: "Denys Muratov",
  },
  en: {
    rights: `Copyright ${currentYear} 🎃 Magic Pumpkin Farm. All rights reserved.`,
    creditPrefix: "Design & development:",
    creditName: "Denys Muratov",
  },
} as const;

const developerHref = "https://denysvm.github.io/bc/";

const Footer = () => {
  const { locale } = useLocale();
  const copy = footerCopy[locale] ?? footerCopy.en;

  return (
    <Box
      as="footer"
      bg="gray.50"
      borderTopWidth="1px"
      borderColor="blackAlpha.100"
      py={{ base: 6, md: 8 }}
    >
      <Container maxW="container.xl">
        <Stack
          direction={{ base: "column", sm: "row" }}
          spacing={{ base: 3, sm: 6 }}
          align={{ base: "flex-start", sm: "center" }}
          justify="space-between"
        >
          <Text fontSize="sm" color="gray.600">
            {copy.rights}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {copy.creditPrefix}{" "}
            <Link
              href={developerHref}
              isExternal
              color="brand.600"
              fontWeight="semibold"
              _hover={{ textDecoration: "underline" }}
            >
              {copy.creditName}
            </Link>
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
