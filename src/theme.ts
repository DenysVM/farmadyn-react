import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: "#fffaf3",
      100: "#feebc8",
      200: "#fbd38d",
      300: "#f6ad55",
      400: "#ed8936",
      500: "#dd6b20",
      600: "#c05621",
      700: "#9c4221",
      800: "#7b341e",
      900: "#652b19"
    }
  },
  styles: {
    global: {
      body: {
        bg: "brand.50",
        color: "gray.800"
      }
    }
  },
  fonts: {
    heading: "'DM Sans', 'Segoe UI', sans-serif",
    body: "'DM Sans', 'Segoe UI', sans-serif"
  },
  components: {
    Container: {
      baseStyle: {
        maxW: "container.xl",
        px: { base: 4, md: 6 }
      }
    }
  }
});

export default theme;
