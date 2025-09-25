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
    },
    Button: {
      baseStyle: {
        borderRadius: "full",
        fontWeight: "semibold",
        letterSpacing: "wider"
      },
      sizes: {
        md: {
          minH: "48px",
          fontSize: "sm",
          px: 6
        },
        sm: {
          minH: "40px",
          fontSize: "sm",
          px: 5
        }
      },
      variants: {
        primary: {
          bg: "brand.500",
          color: "white",
          boxShadow: "sm",
          _hover: {
            bg: "brand.400",
            _disabled: { bg: "brand.500" }
          },
          _active: {
            bg: "brand.600"
          }
        },
        secondary: {
          bg: "white",
          color: "brand.500",
          borderWidth: "1px",
          borderColor: "brand.500",
          _hover: {
            bg: "brand.50"
          },
          _active: {
            bg: "brand.100"
          }
        },
        ghost: {
          color: "gray.700",
          _hover: {
            bg: "blackAlpha.50"
          },
          _active: {
            bg: "blackAlpha.100"
          }
        }
      }
    }
  }
});

export default theme;
