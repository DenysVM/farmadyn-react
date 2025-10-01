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
  useDisclosure,
} from "@chakra-ui/react";
import InstagramContactCard from "../InstagramContactCard";
import BookingArrayWidget from "../BookingArrayWidget";
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

type BookingWidgetAction = {
  type: "bookingWidget";
  label: string;
  calendarId: string;
};

type InstagramCardAction = {
  type: "instagramCard";
  title: string;
  href: string;
  username?: string;
  linkLabel: string;
  qrImageSrc: string;
  qrImageAlt: string;
  modalTitle: string;
  modalSubtitle?: string;
};

type SectionAction =
  | LinkAction
  | ModalImageAction
  | ModalVideoAction
  | BookingWidgetAction
  | InstagramCardAction;

interface TextSectionProps {
  title?: string;
  paragraphs?: string[];
  list?: string[];
  actions?: SectionAction[];
}

const TextSection = ({
  title,
  paragraphs = [],
  list = [],
  actions = [],
}: TextSectionProps) => {
  const [activeImageAction, setActiveImageAction] =
    useState<ModalImageAction | null>(null);
  const [activeVideoAction, setActiveVideoAction] =
    useState<ModalVideoAction | null>(null);

  const {
    isOpen: isImageOpen,
    onOpen: onImageOpen,
    onClose: onImageClose,
  } = useDisclosure();
  const {
    isOpen: isVideoOpen,
    onOpen: onVideoOpen,
    onClose: onVideoClose,
  } = useDisclosure();

  // helpers (вернули корректный вызов open/close)
  const openImage = (a: ModalImageAction) => {
    setActiveImageAction(a);
    onImageOpen();
  };
  const closeImage = () => {
    onImageClose();
    setActiveImageAction(null);
  };
  const openVideo = (a: ModalVideoAction) => {
    setActiveVideoAction(a);
    onVideoOpen();
  };
  const closeVideo = () => {
    onVideoClose();
    setActiveVideoAction(null);
  };

  const modalImageActions = actions.filter(
    (a): a is ModalImageAction => a.type === "modalImage"
  );
  const videoActions = actions.filter(
    (a): a is ModalVideoAction => a.type === "videoPreview"
  );
  const bookingActions = actions.filter(
    (a): a is BookingWidgetAction => a.type === "bookingWidget"
  );
  const instagramActions = actions.filter(
    (a): a is InstagramCardAction => a.type === "instagramCard"
  );
  const standardActions = actions.filter(
    (a): a is LinkAction | ModalImageAction =>
      a.type === "link" || a.type === "modalImage"
  );

  const hasModalImageAction = modalImageActions.length > 0;
  const hasVideoAction = videoActions.length > 0;
  const isImageModalVisible = !!(activeImageAction && isImageOpen);
  const isVideoModalVisible = !!(activeVideoAction && isVideoOpen);

  const resolvedModalSrc = activeImageAction
    ? resolveAssetPath(activeImageAction.imageSrc)
    : undefined;

  const videoSrc = activeVideoAction
    ? `${activeVideoAction.videoUrl}${
        activeVideoAction.videoUrl.includes("?") ? "&" : "?"
      }autoplay=1`
    : undefined;

  const imageModalTheme = activeImageAction?.modalTheme ?? "dark";
  const imageModalBg = imageModalTheme === "dark" ? "gray.900" : "white";
  const imageCloseColor = imageModalTheme === "dark" ? "white" : "gray.600";
  const imageBodyBg = imageModalTheme === "dark" ? undefined : "white";
  const imageBodyPadding = imageModalTheme === "dark" ? 0 : 6;

  const focusRingStyles = {
    boxShadow: "0 0 0 3px rgba(237, 137, 54, 0.35)",
    outline: "none",
  } as const;

  const emailRegex = /([\w.+-]+@[\w-]+\.[\w.-]+)/;
  const phoneRegex = /(\+?\d[\d\s-]{4,}\d)/;

  const renderContactItem = (item: string) => {
    const emailMatch = item.match(emailRegex);
    if (emailMatch) {
      const email = emailMatch[0];
      const [prefix, suffix = ""] = item.split(email);
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
      const [prefix, suffix = ""] = item.split(phone);
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

  const hasList = list.length > 0 || instagramActions.length > 0;

  return (
    <>
      <Stack
        spacing={2}
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

        {paragraphs.map((t, i) => (
          <Text key={i} color="gray.700" fontSize={{ base: "sm", md: "md" }}>
            {t}
          </Text>
        ))}

        {hasList && (
          <List spacing={2} styleType="disc" pl={5} color="gray.700">
            {list.map((item, i) => (
              <ListItem key={i}>{renderContactItem(item)}</ListItem>
            ))}
            {instagramActions.map((action, i) => (
              <InstagramContactCard key={i} {...action} />
            ))}
          </List>
        )}

        {hasVideoAction && (
          <Stack spacing={3} pt={hasList ? 2 : 0}>
            {videoActions.map((action, i) => {
              const previewSrc = resolveAssetPath(action.previewImage);
              return (
                <Button
                  key={i}
                  variant="pill"
                  w={{ base: "100%", md: "70%" }}
                  mx="auto"
                  p={0}
                  position="relative"
                  overflow="hidden"
                  bgImage={`url(${previewSrc})`}
                  bgSize="cover"
                  bgPos="center"
                  aria-label={action.label}
                  role="group"
                  onClick={(e) => {
                    openVideo(action);
                    (e.currentTarget as HTMLButtonElement).blur(); // опционально: вернуть цвет текста после клика
                  }}
                >
                  <Box
                    position="absolute"
                    inset={0}
                    bg="rgba(0,0,0,0.35)"
                    transition="opacity 0.2s ease"
                    _groupHover={{ opacity: 0 }}
                  />
                  <Box
                    position="relative"
                    zIndex={1}
                    fontWeight="semibold"
                    color="brand.100"
                    transition="color 0.2s ease"
                    _groupHover={{ color: "brand.600" }}
                  >
                    {action.label}
                  </Box>
                </Button>
              );
            })}
          </Stack>
        )}

        {(standardActions.length > 0 || bookingActions.length > 0) && (
          <HStack
            spacing={3}
            pt={1}
            flexWrap="wrap"
            justifyContent="flex-end"
            w="100%"
          >
            {standardActions.map((action, i) =>
              action.type === "link" ? (
                <Button
                  key={`standard-link-${i}`}
                  as="a"
                  href={action.href}
                  target={action.isExternal ? "_blank" : undefined}
                  rel={action.isExternal ? "noopener noreferrer" : undefined}
                  variant="pill"
                  w={{ base: "full", md: "auto" }}
                  justifyContent="center"
                >
                  {action.label}
                </Button>
              ) : (
                <Button
                  key={`standard-image-${i}`}
                  onClick={() => openImage(action)}
                  variant="pill"
                  w={{ base: "full", md: "auto" }}
                  justifyContent="center"
                >
                  {action.label}
                </Button>
              )
            )}
            {bookingActions.map((action, i) => (
              <BookingArrayWidget
                key={`booking-${i}`}
                calendarId={action.calendarId}
                buttonText={action.label}
              />
            ))}
          </HStack>
        )}
      </Stack>

      {hasModalImageAction && (
        <Modal
          isOpen={isImageModalVisible}
          onClose={closeImage}
          size="4xl"
          isCentered
        >
          <ModalOverlay />
          <ModalContent bg={imageModalBg} borderRadius="3xl" boxShadow="3xl">
            <ModalCloseButton color={imageCloseColor} />
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
        <Modal
          isOpen={isVideoModalVisible}
          onClose={closeVideo}
          size="5xl"
          isCentered
        >
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
