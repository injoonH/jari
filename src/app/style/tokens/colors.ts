/* primitives */
export const color = {
  white: "#ffffff",
  black: "#000000",
  gray: {
    50: "#f5f5f5",
    100: "#e9e9e9",
    200: "#d9d9d9",
    300: "#c4c4c4",
    400: "#9d9d9d",
    500: "#7b7b7b",
    600: "#555555",
    700: "#434343",
    800: "#262626",
    900: "#040404",
  } as const,
  blue: {
    50: "#e8f3ff",
    100: "#c9e2ff",
    200: "#90c2ff",
    300: "#64a8ff",
    400: "#4593fc",
    500: "#3182f6",
    600: "#2272eb",
    700: "#1b64da",
    800: "#1957c2",
    900: "#194aa6",
  } as const,
  red: {
    50: "#ffeeee",
    100: "#ffd4d6",
    200: "#feafb4",
    300: "#fb8890",
    400: "#f66570",
    500: "#f04452",
    600: "#e42939",
    700: "#d22030",
    800: "#bc1b2a",
    900: "#a51926",
  } as const,
} as const;

/* semantics */
const primaryColor = {
  primaryDark: color.blue[900],
  primaryBase: color.blue[700],
  primaryLight: color.blue[200],
  primaryLighter: color.blue[100],
  primaryLightest: color.blue[50],
};

const neutralColor = {
  neutralDark: color.gray[900],
  neutralBase: color.gray[500],
  neutralLight: color.gray[200],
  neutralLighter: color.gray[100],
  neutralLightest: color.gray[50],
};

const stateColor = {
  warning: color.red[500],
};

const noColor = {
  none: "transparent",
};

export const allColors = {
  ...primaryColor,
  ...neutralColor,
  ...stateColor,
  ...noColor,
};
