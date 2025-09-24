import { useEffect, useMemo, useState } from "react";
import {
  AspectRatio,
  Box,
  HStack,
  Icon,
  IconButton,
  Image,
  Stack,
  Text,
  useToken
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

export interface HeroSlide {
  image: string;
  alt: string;
  heading: string;
  subheading: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
  playLabel: string;
  pauseLabel: string;
  previousLabel: string;
  nextLabel: string;
  interval?: number;
}

const SLIDE_INTERVAL = 7000;

const PauseIcon = (props: React.ComponentProps<typeof Icon>) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
    <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
  </Icon>
);

const PlayIcon = (props: React.ComponentProps<typeof Icon>) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M8 5.5c0-.83.88-1.34 1.6-.93l9.1 5.2c.72.41.72 1.44 0 1.85l-9.1 5.2c-.72.41-1.6-.1-1.6-.93z"
    />
  </Icon>
);

const HeroSlider = ({
  slides,
  playLabel,
  pauseLabel,
  previousLabel,
  nextLabel,
  interval = SLIDE_INTERVAL
}: HeroSliderProps) => {
  const slideList = useMemo(() => slides.filter(Boolean), [slides]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [shadowColor] = useToken("colors", ["blackAlpha.600"]);

  useEffect(() => {
    if (!slideList.length || isPaused) {
      return;
    }

    const id = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideList.length);
    }, interval);

    return () => {
      window.clearInterval(id);
    };
  }, [slideList.length, isPaused, interval]);

  useEffect(() => {
    if (currentIndex >= slideList.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, slideList.length]);

  if (!slideList.length) {
    return null;
  }

  const goToSlide = (index: number) => {
    const nextIndex = (index + slideList.length) % slideList.length;
    setCurrentIndex(nextIndex);
  };

  const activeSlide = slideList[currentIndex];

  return (
    <Box position="relative" borderRadius="2xl" overflow="hidden" boxShadow="2xl" mb={{ base: 8, md: 12 }}>
      <AspectRatio ratio={{ base: 4 / 5, md: 16 / 9 }}>
        <Image
          src={activeSlide.image}
          alt={activeSlide.alt}
          objectFit="cover"
          w="100%"
          h="100%"
          loading="lazy"
        />
      </AspectRatio>

      <Box position="absolute" inset={0} bgGradient="linear(to-t, rgba(0,0,0,0.65), rgba(0,0,0,0.2))" />

      <Stack
        position="absolute"
        bottom={{ base: 6, md: 10 }}
        left={{ base: 5, md: 12 }}
        right={{ base: 5, md: 12 }}
        spacing={4}
        color="white"
        maxW="3xl"
      >
        <Stack spacing={2}>
          <Text fontSize={{ base: "sm", md: "md" }} textTransform="uppercase" letterSpacing="widest">
            {`0${currentIndex + 1}`.slice(-2)} / {`0${slideList.length}`.slice(-2)}
          </Text>
          <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold" lineHeight={1.1}>
            {activeSlide.heading}
          </Text>
          <Text fontSize={{ base: "md", md: "xl" }} maxW="2xl">
            {activeSlide.subheading}
          </Text>
        </Stack>

        <HStack spacing={2} align="center">
          <IconButton
            aria-label={previousLabel}
            icon={<ChevronLeftIcon boxSize={4} />}
            onClick={() => goToSlide(currentIndex - 1)}
            size="sm"
            variant="ghost"
            color="white"
            _hover={{ bg: "whiteAlpha.200" }}
            _active={{ bg: "whiteAlpha.300" }}
          />
          <IconButton
            aria-label={nextLabel}
            icon={<ChevronRightIcon boxSize={4} />}
            onClick={() => goToSlide(currentIndex + 1)}
            size="sm"
            variant="ghost"
            color="white"
            _hover={{ bg: "whiteAlpha.200" }}
            _active={{ bg: "whiteAlpha.300" }}
          />
          <IconButton
            aria-label={isPaused ? playLabel : pauseLabel}
            icon={isPaused ? <PlayIcon boxSize={4} /> : <PauseIcon boxSize={4} />}
            onClick={() => setIsPaused((prev) => !prev)}
            size="sm"
            variant="ghost"
            color="white"
            _hover={{ bg: "whiteAlpha.200" }}
            _active={{ bg: "whiteAlpha.300" }}
          />
        </HStack>

        <HStack spacing={2}>
          {slideList.map((slide, index) => (
            <Box
              key={`${slide.image}-${index}`}
              as="button"
              onClick={() => goToSlide(index)}
              w={{ base: 8, md: 10 }}
              h={0.5}
              borderRadius="full"
              bg={index === currentIndex ? "white" : shadowColor}
              opacity={index === currentIndex ? 1 : 0.6}
              aria-label={`${index + 1}. ${slide.heading}`}
            />
          ))}
        </HStack>
      </Stack>
    </Box>
  );
};

export default HeroSlider;
