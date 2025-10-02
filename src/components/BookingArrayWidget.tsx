import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useBreakpointValue,
  useDisclosure
} from "@chakra-ui/react";

interface BookingArrayWidgetProps {
  calendarId: string;
  buttonText?: string;
}

const BOOKING_BASE_URL = "https://system.bookingarray.com/kalendarz";

const createSessionId = () => {
  let dt = new Date().getTime();
  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (char === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

const BookingArrayWidget: React.FC<BookingArrayWidgetProps> = ({ calendarId, buttonText = "Rezerwacja" }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sessionId, setSessionId] = useState(() => createSessionId());
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;

  const iframeSrc = useMemo(
    () => `${BOOKING_BASE_URL}/${calendarId}/${sessionId}`,
    [calendarId, sessionId]
  );

  useEffect(() => {
    if (!isOpen || typeof document === "undefined") {
      return;
    }

    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = documentElement.style.overflow;

    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";

    return () => {
      body.style.overflow = previousBodyOverflow;
      documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isOpen]);

  const handleOpen = useCallback(() => {
    setSessionId(createSessionId());
    onOpen();
  }, [onOpen]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Box
      className="booking-array-widget"
      display="inline-flex"
      flexDirection="column"
      w={{ base: "full", md: "auto" }}
    >
      <Button
        onClick={handleOpen}
        variant="pill"
        w={{ base: "full", md: "auto" }}
        justifyContent="center"
      >
        {buttonText}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        isCentered={!isMobile}
        size="3xl"
        blockScrollOnMount
        closeOnOverlayClick
        motionPreset="scale"
      >
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(8px)" />
        <ModalContent
          mt={!isMobile ? undefined : "88px"}
          mx={{ base: 4, md: 0 }}
          w="full"
          maxW="720px"
          borderRadius="2xl"
          overflow="hidden"
          boxShadow="3xl"
        >
          <ModalCloseButton
            top={3}
            right={3}
            color="gray.600"
            _hover={{ color: "gray.800" }}
            _focus={{ boxShadow: "outline" }}
          />
          <ModalBody p={0}>
            <Box
              as="iframe"
              src={iframeSrc}
              title={buttonText}
              w="100%"
              h={{ base: "calc(100vh - 200px)", md: "560px" }}
              border="0"
              referrerPolicy="origin"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BookingArrayWidget;
