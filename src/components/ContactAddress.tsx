import { Box, HStack, Icon, Link, Stack, Text } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { useLocale } from "../i18n/LocaleContext";

const mapHref =
  "https://www.google.com/maps/place/Pumpkin+Farm+Pumpkin+Farm+Powsin/@52.1153199,21.1070551,19.85z/data=!4m6!3m5!1s0x47192c4e521dddad:0xd7c358be0e8416f2!8m2!3d52.1153178!4d21.1071395!16s%2Fg%2F11c59ptpvr?entry=ttu";

const contentByLocale = {
  pl: {
    label: "Adres:",
    mapLabel: "Pumpkin Farm Powsin",
    mapAriaLabel: "Otwórz lokalizację Pumpkin Farm Powsin w Mapach Google",
    mobileLines: [
      "Drewny 17, 02-968 Warszawa",
      "400 m za stacją Shell w kierunku Konstancina, po prawej stronie drogi"
    ],
    desktopLine:
      "Drewny 17, 02-968 Warszawa — 400 m za stacją Shell w kierunku Konstancina, po prawej stronie drogi"
  },
  en: {
    label: "Address:",
    mapLabel: "Pumpkin Farm Powsin",
    mapAriaLabel: "Open Pumpkin Farm Powsin in Google Maps",
    mobileLines: [
      "Drewny 17, 02-968 Warsaw",
      "400 m past the Shell station towards Konstancin, on the right-hand side"
    ],
    desktopLine:
      "Drewny 17, 02-968 Warsaw — 400 m past the Shell station towards Konstancin, on the right-hand side"
  }
} as const;

const ContactAddress = () => {
  const { locale } = useLocale();
  const copy = contentByLocale[locale] ?? contentByLocale.pl;

  return (
    <Stack spacing={2} align="flex-start">
      <HStack spacing={2} align="center" flexWrap="wrap">
        <Text
          fontSize="xs"
          fontWeight="semibold"
          color="gray.500"
          textTransform="uppercase"
          letterSpacing="widest"
        >
          {copy.label}
        </Text>

        <HStack spacing={2} align="center">
          <Link
            href={mapHref}
            isExternal
            fontWeight="semibold"
            color="brand.600"
            _hover={{ textDecoration: "underline" }}
            aria-label={copy.mapAriaLabel}
          >
            {copy.mapLabel}
          </Link>
          <Icon as={FaGoogle} boxSize={4} color="gray.400" />
        </HStack>
      </HStack>

      <Box lineHeight="tall" w="full">
        {copy.mobileLines.map((line, index) => (
          <Text
            key={`mobile-line-${index}`}
            fontSize="sm"
            color="gray.600"
            display={{ base: "block", md: "none" }}
          >
            {line}
          </Text>
        ))}
        <Text
          fontSize="sm"
          color="gray.600"
          display={{ base: "none", md: "block" }}
          whiteSpace="normal"
        >
          {copy.desktopLine}
        </Text>
      </Box>
    </Stack>
  );
};

export default ContactAddress;