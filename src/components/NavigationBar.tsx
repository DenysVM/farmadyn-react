import { CheckIcon, ChevronDownIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Slide,
  Stack,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  availableLocales,
  type Locale,
  type NavLinkKey
} from "../i18n/translations";
import { useLocale } from "../i18n/LocaleContext";

const navLinkOrder: NavLinkKey[] = ["home", "contact", "privacy"];

const localeIcon: Record<Locale, string> = {
  pl: "PL",
  en: "EN"
};

const NavigationBar = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const location = useLocation();
  const { locale, setLocale, messages } = useLocale();
  const { navigation } = messages;

  const navLinks = useMemo(
    () =>
      navLinkOrder.map((key) => ({
        key,
        to: key === "home" ? "/" : key === "privacy" ? "/privacy-policy" : "/contact",
        label: navigation.links[key].label,
        description: navigation.links[key].description
      })),
    [navigation.links]
  );

  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const renderLinks = (orientation: "row" | "column") => (
    <Stack
      direction={orientation}
      spacing={orientation === "row" ? 6 : 6}
      align={orientation === "row" ? "center" : "stretch"}
      w="full"
    >
      {navLinks.map((link) => (
        <ChakraLink
          key={link.key}
          as={NavLink}
          to={link.to}
          end={link.key === "home"}
          display="flex"
          flexDir="column"
          gap={orientation === "row" ? 1 : 1.5}
          px={orientation === "row" ? 0 : 4}
          py={orientation === "row" ? 0 : 4}
          borderRadius={orientation === "row" ? undefined : "xl"}
          fontSize={orientation === "row" ? "sm" : "lg"}
          fontWeight={orientation === "row" ? "medium" : "semibold"}
          textTransform="uppercase"
          letterSpacing="widest"
          _hover={{
            color: "brand.600",
            bg: orientation === "row" ? "transparent" : "orange.50"
          }}
          _activeLink={{
            color: "brand.500",
            bg: orientation === "row" ? "transparent" : "orange.100"
          }}
        >
          {link.label}
          {link.description && (
            <Text fontSize={orientation === "row" ? "xs" : "sm"} color="gray.500">
              {link.description}
            </Text>
          )}
        </ChakraLink>
      ))}
    </Stack>
  );

  const languageOptions = useMemo(
    () =>
      availableLocales.map((code) => ({
        code,
        label: navigation.languages[code]
      })),
    [navigation.languages]
  );

  const LanguageSwitcher = ({ variant }: { variant: "desktop" | "mobile" }) => {
    const isDesktop = variant === "desktop";

    return (
      <Menu placement="bottom-end" isLazy>
        <MenuButton
          as={Button}
          variant={isDesktop ? "ghost" : "primary"}
          size="sm"
          px={isDesktop ? 3 : 4}
          w={isDesktop ? undefined : "full"}
          rightIcon={<ChevronDownIcon boxSize={3} />}
          fontWeight="semibold"
          letterSpacing="wider"
          boxShadow={isDesktop ? undefined : "md"}
          aria-label={navigation.languageLabel}
        >
          <Text fontWeight="semibold" letterSpacing="widest">
            {localeIcon[locale]}
          </Text>
        </MenuButton>
        <MenuList bg="white" borderColor="orange.200" boxShadow="xl" py={1}>
          {languageOptions.map(({ code }) => (
            <MenuItem
              key={code}
              onClick={() => {
                if (locale !== code) {
                  setLocale(code as Locale);
                }
              }}
              display="flex"
              alignItems="center"
              gap={3}
              fontWeight={locale === code ? "semibold" : "medium"}
              bg={locale === code ? "orange.50" : "transparent"}
              _hover={{ bg: "orange.50" }}
              _focus={{ bg: "orange.100" }}
            >
              <HStack w="full" justify="space-between">
                <Text fontWeight="semibold" letterSpacing="widest">
                  {localeIcon[code as Locale]}
                </Text>
                {locale === code && <CheckIcon boxSize={3} color="brand.500" />}
              </HStack>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    );
  };

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex="sticky"
      bg="whiteAlpha.900"
      backdropFilter="blur(12px)"
      borderBottomWidth="1px"
      borderColor="blackAlpha.100"
    >
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        maxW="container.xl"
        mx="auto"
        py={3}
        px={{ base: 4, md: 6 }}
      >
        <ChakraLink
          as={NavLink}
          to="/"
          end
          fontWeight="bold"
          letterSpacing="widest"
          textTransform="uppercase"
          color="brand.600"
          _hover={{ textDecoration: "none", color: "brand.500" }}
        >
          Magic Pumpkin Farm
        </ChakraLink>

        <Box display={{ base: "none", md: "block" }}>{renderLinks("row")}</Box>

        <Box display={{ base: "none", md: "block" }}>
          <LanguageSwitcher variant="desktop" />
        </Box>

        <Button
          display={{ base: "inline-flex", md: "none" }}
          onClick={onToggle}
          variant="ghost"
          size="sm"
          px={4}
          py={2}
          borderRadius="full"
          gap={2}
          aria-label={isOpen ? navigation.closeMenuLabel : navigation.openMenuLabel}
        >
          {isOpen ? <CloseIcon boxSize={3} /> : <HamburgerIcon boxSize={4} />}
          <Text fontSize="xs" fontWeight="bold" letterSpacing="widest">
            {isOpen ? navigation.close : navigation.menu}
          </Text>
        </Button>
      </Flex>

      <Slide direction="top" in={isOpen} style={{ zIndex: 1400, top: "64px" }} unmountOnExit>
        <Box
          pt={8}
          pb={16}
          px={6}
          bg="white"
          minH="calc(100vh - 64px)"
          display={{ base: "block", md: "none" }}
        >
          <Stack spacing={10}
>
            {renderLinks("column")}
            <Box>
              <LanguageSwitcher variant="mobile" />
            </Box>
          </Stack>
        </Box>
      </Slide>
    </Box>
  );
};

export default NavigationBar;
