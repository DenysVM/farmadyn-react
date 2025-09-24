import { ArrowUpIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocale } from "../i18n/LocaleContext";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { messages } = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <IconButton
      position="fixed"
      bottom={6}
      right={6}
      zIndex="tooltip"
      colorScheme="orange"
      aria-label={messages.common.scrollToTop}
      icon={<ArrowUpIcon />}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    />
  );
};

export default ScrollToTopButton;
