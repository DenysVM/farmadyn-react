import { useState } from "react";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  List,
  ListItem,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import InstagramContactCard from "../InstagramContactCard";
import { resolveAssetPath } from "../../utils/assetPath";

type LinkAction = {
  type: "link";
  label: string;
  href: string;
  isExternal?: boolean;
};

type ModalImageAction = {
  type: "modalImage";
  label: string;
  imageSrc: string;
  imageAlt: string;
  modalTheme?: "dark" | "light";
  imageBorderRadius?: string;
  imageMaxWidth?: string;
};

type ModalVideoAction = {
  type: "videoPreview";
  label: string;
  videoUrl: string;
  previewImage: string;
  previewAlt: string;
};

type InstagramCardAction = {
  type: "instagramCard";
  title: string;
  description?: string;
  href: string;
  username?: string;
  linkLabel: string;
  qrImageSrc: string;
  qrImageAlt: string;
  modalTitle: string;
  modalSubtitle?: string;
};

type SectionAction = LinkAction | ModalImageAction | ModalVideoAction | InstagramCardAction;

interface TextSectionProps {
  title?: string;
  paragraphs?: string[];
  list?: string[];
  actions?: SectionAction[];
}

const TextSection = ({ title, paragraphs = [], list, actions = [] }: TextSectionProps) => {
  const [activeImageAction, setActiveImageAction] = useState<ModalImageAction | null>(null);
  const [activeVideoAction, setActiveVideoAction] = useState<ModalVideoAction | null>(null);
  const {
    isOpen: isImageOpen,
    onOpen: onImageOpen,
    onClose: onImageClose
  } = useDisclosure();
  const {
    isOpen: isVideoOpen,
    onOpen: onVideoOpen,
    onClose: onVideoClose
  } = useDisclosure();

  const openImageModal = (action: ModalImageAction) => {
    setActiveImageAction(action);
    onImageOpen();
  };

  const closeImageModal = () => {
    onImageClose();
    setActiveImageAction(null);
  };

  const openVideoModal = (action: ModalVideoAction) => {
    setActiveVideoAction(action);
    onVideoOpen();
  };

  const closeVideoModal = () => {
    onVideoClose();
    setActiveVideoAction(null);
  };

  const modalImageActions = actions.filter(
    (action): action is ModalImageAction => action.type === "modalImage"
  );
  const videoActions = actions.filter(
    (action): action is ModalVideoAction => action.type === "videoPreview"
  );
  const instagramActions = actions.filter(
    (action): action is InstagramCardAction => action.type === "instagramCard"
  );
  const standardActions = actions.filter(
    (action): action is LinkAction | ModalImageAction =>
      action.type === "link" || action.type === "modalImage"
  );

  const hasModalImageAction = modalImageActions.length > 0;
  const hasVideoAction = videoActions.length > 0;
  const isImageModalVisible = Boolean(activeImageAction && isImageOpen);
  const isVideoModalVisible = Boolean(activeVideoAction && isVideoOpen);
  const resolvedModalSrc = activeImageAction ? resolveAssetPath(activeImageAction.imageSrc) : undefined;
  const videoSrc = activeVideoAction
    ? `${activeVideoAction.videoUrl}${activeVideoAction.videoUrl.includes("?") ? "&" : "?"}autoplay=1`
    : undefined;

  const imageModalTheme = activeImageAction?.modalTheme ?? "dark";
  const imageModalBg = imageModalTheme === "dark" ? "gray.900" : "white";
  const imageCloseColor = imageModalTheme === "dark" ? "white" : "gray.600";
  const imageBodyBg = imageModalTheme === "dark" ? undefined : "white";
  const imageBodyPadding = imageModalTheme === "dark" ? 0 : 6;

  const focusRingStyles = { boxShadow: "0 0 0 3px rgba(237, 137, 54, 0.35)", outline: "none" } as const;
  const emailRegex = /[\w.+-]+@[\w-]+\.[\w.-]+/;
  const phoneRegex = /\+?[\d][\d\s-]{4,}[\d]/;

  const renderContactItem = (item: string) => {
    const emailMatch = item.match(emailRegex);
    if (emailMatch) {
      const email = emailMatch[0];
      const [prefix = "", suffix = ""] = item.split(email);
      return (
        <>
          {prefix}
          <Link
            href={`mailto:${email}`}
            color="brand.600"
            fontWeight="medium"
            _hover={{ textDecoration: "underline" }}
            _focusVisible={focusRingStyles}
          >
            {email}
          </Link>
          {suffix}
        </>
      );
    }

    const phoneMatch = item.match(phoneRegex);
    if (phoneMatch) {
      const phone = phoneMatch[0];
      const sanitized = phone.replace(/[^+\d]/g, "");
      const [prefix = "", suffix = ""] = item.split(phone);
      return (
        <>
          {prefix}
          <Link
            href={`tel:${sanitized}`}
            color="brand.600"
            fontWeight="medium"
            _hover={{ textDecoration: "underline" }}
            _focusVisible={focusRingStyles}
          >
            {phone.trim()}
          </Link>
          {suffix}
        </>
      );
    }

    return item;
  };

  const hasListItems = Array.isArray(list) && list.length > 0;
  const shouldRenderList = hasListItems || instagramActions.length > 0;

  return (
    <>
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

        {paragraphs.map((text, index) => (
          <Text key={`${text}-${index}`} color="gray.700" fontSize={{ base: "sm", md: "md" }}>
            {text}
          </Text>
        ))}

        {shouldRenderList && (
          <List spacing={3} styleType="disc" pl={5} color="gray.700">
            {hasListItems &&
              list?.map((item, index) => (
                <ListItem key={`${item}-${index}`}>{renderContactItem(item)}</ListItem>
              ))}

            {instagramActions.map((action, index) => (
              <InstagramContactCard
                key={`${action.type}-${action.href}-${index}`}
                title={action.title}
                href={action.href}
                username={action.username}
                linkLabel={action.linkLabel}
                qrImageSrc={action.qrImageSrc}
                qrImageAlt={action.qrImageAlt}
                modalTitle={action.modalTitle}
                modalSubtitle={action.modalSubtitle}
              />
            ))}
          </List>
        )}

        {videoActions.length > 0 && (
          <Stack spacing={3} pt={shouldRenderList ? 2 : 0}>
            {videoActions.map((action, index) => {
              const previewSrc = resolveAssetPath(action.previewImage);

              return (
                <Button
                  key={`${action.type}-${action.label}-${index}`}
                  variant="unstyled"
                  onClick={() => openVideoModal(action)}
                  position="relative"
                  w="full"
                  borderRadius="2xl"
                  overflow="hidden"
                  boxShadow="2xl"
                  cursor="pointer"
                  _focusVisible={{ boxShadow: "0 0 0 3px rgba(237, 137, 54, 0.5)" }}
                  aria-label={action.label}
                >
                  <Image
                    src={previewSrc}
                    alt={action.previewAlt}
                    w="full"
                    h={{ base: "220px", md: "260px" }}
                    objectFit="cover"
                  />
                  <Box
                    position="absolute"
                    inset={0}
                    bgGradient="linear(to-t, rgba(0,0,0,0.65), rgba(0,0,0,0.2))"
                  />
                  <Center position="absolute" inset={0}>
                    <Center
                      w={{ base: "56px", md: "64px" }}
                      h={{ base: "56px", md: "64px" }}
                      borderRadius="full"
                      bg="whiteAlpha.900"
                      color="brand.500"
                      boxShadow="lg"
                    >
                      <Icon viewBox="0 0 24 24" boxSize={{ base: 6, md: 7 }}>
                        <path fill="currentColor" d="M8 5v14l11-7z" />
                      </Icon>
                    </Center>
                  </Center>
                  <Box
                    position="absolute"
                    bottom={0}
                    left={0}
                    right={0}
                    p={{ base: 4, md: 5 }}
                    bgGradient="linear(to-t, rgba(0,0,0,0.75), transparent)"
                  >
                    <Text color="white" fontWeight="semibold" fontSize={{ base: "md", md: "lg" }}>
                      {action.label}
                    </Text>
                  </Box>
                </Button>
              );
            })}
          </Stack>
        )}

        {standardActions.length > 0 && (
          <HStack
            spacing={3}
            pt={1}
            flexWrap="wrap"
            justifyContent="flex-end"
            w="100%"
          >
            {standardActions.map((action, index) => {
              if (action.type === "link") {
                return (
                  <Button
                    key={`${action.type}-${action.label}-${index}`}
                    as="a"
                    href={action.href}
                    target={action.isExternal ? "_blank" : undefined}
                    rel={action.isExternal ? "noopener noreferrer" : undefined}
                    variant="primary"
                    w={{ base: "full", md: "auto" }}
                    justifyContent="center"
                  >
                    {action.label}
                  </Button>
                );
              }

              return (
                <Button
                  key={`${action.type}-${action.label}-${index}`}
                  onClick={() => openImageModal(action)}
                  variant="secondary"
                  w={{ base: "full", md: "auto" }}
                  justifyContent="center"
                >
                  {action.label}
                </Button>
              );
            })}
          </HStack>
        )}
      </Stack>

      {hasModalImageAction && (
        <Modal isOpen={isImageModalVisible} onClose={closeImageModal} size="4xl" isCentered>
          <ModalOverlay />
          <ModalContent bg={imageModalBg} borderRadius="3xl" boxShadow="3xl">
            <ModalCloseButton color={imageCloseColor} _focusVisible={{ boxShadow: "0 0 0 3px rgba(237, 137, 54, 0.35)" }} />
            <ModalBody
              p={imageBodyPadding}
              bg={imageBodyBg}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {activeImageAction && resolvedModalSrc && (
                <Image
                  src={resolvedModalSrc}
                  alt={activeImageAction.imageAlt}
                  w="100%"
                  h="auto"
                  maxW={activeImageAction.imageMaxWidth ?? "100%"}
                  borderRadius={activeImageAction.imageBorderRadius}
                  boxShadow={imageModalTheme === "light" ? "2xl" : undefined}
                />
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      {hasVideoAction && (
        <Modal isOpen={isVideoModalVisible} onClose={closeVideoModal} size="5xl" isCentered>
          <ModalOverlay />
          <ModalContent bg="black">
            <ModalCloseButton color="white" />
            <ModalBody p={0}>
              {activeVideoAction && videoSrc && (
                <AspectRatio ratio={16 / 9} w="100%">
                  <iframe
                    src={videoSrc}
                    title={activeVideoAction.label}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ border: 0 }}
                  />
                </AspectRatio>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default TextSection;
