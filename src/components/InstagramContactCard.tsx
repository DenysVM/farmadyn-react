import { useMemo } from "react";
import {
  AspectRatio,
  Box,
  Button,
  Image,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { resolveAssetPath } from "../utils/assetPath";

interface InstagramContactCardProps {
  title: string;
  href: string;
  username?: string;
  linkLabel: string;
  qrImageSrc: string;
  qrImageAlt: string;
  modalTitle: string;
  modalSubtitle?: string;
}

const InstagramContactCard = ({
  title,
  href,
  username,
  linkLabel,
  qrImageSrc,
  qrImageAlt,
  modalTitle,
  modalSubtitle
}: InstagramContactCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const qrSrc = useMemo(() => resolveAssetPath(qrImageSrc), [qrImageSrc]);
  const focusRingStyles = { boxShadow: "0 0 0 3px rgba(237, 137, 54, 0.45)", outline: "none" } as const;

  if (!href || !qrImageSrc) {
    return null;
  }

  const openProfile = () => {
    if (typeof window === "undefined") {
      return;
    }

    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <ListItem fontSize={{ base: "sm", md: "md" }} color="gray.700" display="list-item">
        <Button
          variant="unstyled"
          onClick={onOpen}
          display="inline-flex"
          alignItems="center"
          gap={{ base: 2, sm: 3 }}
          px={0}
          py={0.5}
          color="inherit"
          _hover={{ color: "brand.600" }}
          _focusVisible={focusRingStyles}
        >
          <Text noOfLines={1}>
            {title}
            {username && (
              <Text as="span" ml={1.5} color="gray.500">
                @{username}
              </Text>
            )}
          </Text>
        </Button>
      </ListItem>

      <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
        <ModalOverlay backdropFilter="blur(4px)" bg="blackAlpha.200" />
        <ModalContent
          bg="white"
          color="gray.800"
          borderRadius="2xl"
          px={{ base: 5, sm: 6 }}
          py={{ base: 6, sm: 7 }}
          boxShadow="xl"
        >
          <ModalCloseButton color="gray.500" _focusVisible={focusRingStyles} />
          <ModalHeader textAlign="center" fontSize="lg" fontWeight="semibold" pb={2}>
            {modalTitle}
          </ModalHeader>
          <ModalBody pt={2}>
            <Stack spacing={4} align="center">
              <AspectRatio ratio={1} w="full" maxW="260px">
                <Box
                  as="button"
                  type="button"
                  onClick={() => {
                    openProfile();
                    onClose();
                  }}
                  borderRadius="2xl"
                  overflow="hidden"
                  boxShadow="lg"
                  borderWidth="1px"
                  borderColor="gray.100"
                  bg="white"
                  cursor="pointer"
                  aria-label={linkLabel}
                  _focusVisible={focusRingStyles}
                >
                  <Image src={qrSrc} alt={qrImageAlt} w="100%" h="100%" objectFit="cover" />
                </Box>
              </AspectRatio>

              {modalSubtitle && (
                <Text fontSize="sm" color="gray.600" textAlign="center">
                  {modalSubtitle}
                </Text>
              )}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InstagramContactCard;
