import { useMemo } from "react";
import {
  AspectRatio,
  Box,
  Link,
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
import { QRCodeCanvas } from "qrcode.react";
import { useToken } from "@chakra-ui/react";
import { resolveAssetPath } from "../utils/assetPath";

interface InstagramContactCardProps {
  title: string;
  href: string;
  username?: string;
  linkLabel: string;
  modalTitle: string;
  modalSubtitle?: string;
}

const InstagramContactCard = ({
  title,
  href,
  username,
  linkLabel,
  modalTitle,
  modalSubtitle,
}: InstagramContactCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const focusRingStyles = {
    boxShadow: "0 0 0 3px rgba(237, 137, 54, 0.45)",
    outline: "none",
  } as const;
  const brand50 = useToken("colors", "brand.50");
  const qrLogoSrc = useMemo(() => resolveAssetPath("images/pumpkin.png"), []);
  if (!href) return null;

  return (
    <>
      <ListItem fontSize="md" color="gray.700">
        <Text as="span">
          {title}{" "}
          <Link
            onClick={onOpen}
            color="brand.600"
            fontWeight="medium"
            _hover={{ textDecoration: "underline" }}
            _focusVisible={focusRingStyles}
            cursor="pointer"
          >
            @{username}
          </Link>
        </Text>
      </ListItem>

      <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
        <ModalOverlay backdropFilter="blur(4px)" bg="blackAlpha.200" />
        <ModalContent
          bg="brand.50"
          color="gray.800"
          borderRadius="2xl"
          px={{ base: 5, sm: 6 }}
          py={{ base: 6, sm: 7 }}
          boxShadow="xl"
        >
          <ModalCloseButton color="gray.500" _focusVisible={focusRingStyles} />
          <ModalHeader
            textAlign="center"
            fontSize="lg"
            fontWeight="semibold"
            pb={2}
          >
            {modalTitle}
          </ModalHeader>
          <ModalBody pt={2}>
            <Stack spacing={4} align="center">
              <AspectRatio ratio={1} w="full" maxW="260px">
                <Box
                  as="button"
                  type="button"
                  onClick={() => {
                    window.open(href, "_blank", "noopener,noreferrer");
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
                  <QRCodeCanvas
                    value={href}
                    size={260}
                    bgColor={brand50}
                    fgColor="#000000"
                    level="H"
                    includeMargin={false}
                    imageSettings={{
                      src: qrLogoSrc,
                      x: undefined,
                      y: undefined,
                      height: 80,
                      width: 80,
                      excavate: true,
                    }}
                  />
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
