import { extendTheme } from "@chakra-ui/react";

const fonts = {
  heading: "Inter, sans-serif",
  body: "IBM Plex Mono, sans-serif",
  mono: "Inter, sans-serif",
};

const breakpoints = {
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  "2xl": "1366px",
  "3xl": "1440px",
};

const theme = extendTheme({
  styles: {
    global: (props: any) => ({
      body: {
        bg:
          //   props.colorMode === "dark"?
          "linear-gradient( to bottom, transparent, rgb(var(--background-end-rgb))) rgb(var(--background-start-rgb))",
        // : "#fff",
        color: "#fff",
      },
    }),
  },
  semanticTokens: {
    colors: {
      text: {
        default: "#16161D",
        _dark: "#ade3b8",
      },
      heroGradientStart: {
        default: "#7928CA",
        _dark: "#e3a7f9",
      },
      heroGradientEnd: {
        default: "#FF0080",
        _dark: "#fbec8f",
      },
    },
    radii: {
      button: "12px",
    },
  },
  colors: {
    black: "#000",
    lemon: "#C7FFAC",
    lightGrey: "#F5F5F5",
    darkGray: "#363740",
    slack: "#521753",
    xero: "#1AB4D7",
    blackAlpha: {
      30: "#02020208",
    },
    primary: {
      50: "#ffe5ef",
      100: "#f9bbcc",
      200: "#ef90a9",
      300: "#e76487",
      400: "#df3965",
      500: "#df3763",
      600: "#b91746",
      700: "#700f2a",
      800: "#450618",
      900: "#1e0007",
    },
    secondary: {
      30: "rgba(106, 48, 208, 0.12)",
      50: "#a58af5",
      100: "#875bf0",
      200: "#6b2deb",
      300: "#5814d1",
      400: "#4c297b",
      500: "#380a75",
      600: "#310967",
      700: "#1d0548",
      800: "#1d0548",
      900: "#09001c",
    },
  },
  fonts,
  breakpoints,
  components: {
    Button: {
      baseStyle: {
        rounded: "8px",
      },
      sizes: {
        md: {
          h: 50,
        },
      },
      variants: {
        solid: {
          background: "primary.500",
          color: "white",
          _hover: {
            background: "primary.500",
            _disabled: { background: "primary.300" },
          },
          _active: { background: "primary.500" },
          _disabled: { background: "primary.300" },
        },
      },
      defaultProps: {
        variant: "solid", // default was solid
      },
    },
    Input: {
      baseStyle: {
        field: {
          rounded: "6px",
        },
      },
      sizes: {
        md: {
          field: {
            h: 50,
          },
        },
      },
      variants: {
        outline: {
          field: {
            _placeholder: {
              color: "gray.300",
            },
            _focus: {
              borderColor: "#6A30D0",
            },
            background: "white",
          },
        },
      },
      defaultProps: {
        variant: "outline",
      },
    },
    Select: {
      baseStyle: {
        field: {
          outline: "none",
          border: "none",
          rounded: "6px",
        },
      },
      sizes: {
        md: {
          field: {
            h: 50,
          },
        },
      },
      variants: {
        outline: {
          field: {
            _focus: {
              borderColor: "#6A30D0",
            },
            background: "white",
          },
        },
      },
      defaultProps: {
        variant: "outline",
      },
    },
  },
});

export default theme;
