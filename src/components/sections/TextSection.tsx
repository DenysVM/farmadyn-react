import { useState } from "react";
import {
  Button,
  Heading,
  HStack,
  Image,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure
} from "@chakra-ui/react";
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
};

type SectionAction = LinkAction | ModalImageAction;

interface TextSectionProps {
  title?: string;
  paragraphs?: string[];
  list?: string[];
  actions?: SectionAction[];
}

const TextSection = ({ title, paragraphs = [], list, actions = [] }: TextSectionProps) => {
  const [activeModal, setActiveModal] = useState<ModalImageAction | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openModal = (action: ModalImageAction) => {
    setActiveModal(action);
    onOpen();
  };

  const closeModal = () => {
    onClose();
    setActiveModal(null);
  };

  const hasModalAction = actions.some((action) => action.type === "modalImage");
  const isModalVisible = Boolean(activeModal && isOpen);
  const resolvedModalSrc = activeModal ? resolveAssetPath(activeModal.imageSrc) : undefined;

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

        {Array.isArray(list) && list.length > 0 && (
          <List spacing={3} styleType="disc" pl={5} color="gray.700">
            {list.map((item, index) => (
              <ListItem key={`${item}-${index}`}>{item}</ListItem>
            ))}
          </List>
        )}

        {actions.length > 0 && (
          <HStack
            spacing={3}
            pt={1}
            flexWrap="wrap"
            justifyContent="flex-end"
            w="100%"
          >
            {actions.map((action, index) => {
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
                  onClick={() => openModal(action)}
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

      {hasModalAction && (
        <Modal isOpen={isModalVisible} onClose={closeModal} size="4xl" isCentered>
          <ModalOverlay />
          <ModalContent bg="gray.900">
            <ModalCloseButton color="white" />
            <ModalBody p={0}>
              {activeModal && resolvedModalSrc && (
                <Image src={resolvedModalSrc} alt={activeModal.imageAlt} w="100%" h="auto" />
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default TextSection;
