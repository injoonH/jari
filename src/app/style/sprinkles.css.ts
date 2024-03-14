import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { allColors } from "./tokens/colors";
import { fontSize, fontWeight, lineHeight } from "./tokens/typography";
import { padding, margin, radius } from "./tokens/spacing";

const displayProperties = defineProperties({
  properties: {
    display: ["none", "block", "inline-block", "flex", "inline-flex", "grid"],
    alignItems: [
      "stretch",
      "flex-start",
      "center",
      "flex-end",
      "space-between",
      "space-around",
    ],
  },
});

const colorProperties = defineProperties({
  conditions: {
    default: {},
    hover: { selector: "&:hover" },
    hasChecked: { selector: "&:has(:checked)" },
  },
  defaultCondition: "default",
  properties: {
    color: allColors,
    backgroundColor: allColors,
    borderColor: allColors,
  },
});

const spacingProperties = defineProperties({
  properties: {
    margin: margin,
    padding: padding,
  },
});

const borderProperties = defineProperties({
  properties: {
    border: ["none", "1px solid"],
    borderRadius: radius,
  },
});

const appearanceProperties = defineProperties({
  properties: {
    appearance: ["none"],
  },
});

const fontProperties = defineProperties({
  properties: {
    fontSize: fontSize,
    fontWeight: fontWeight,
    lineHeight: lineHeight,
  },
});

export const sprinkles = createSprinkles(
  displayProperties,
  colorProperties,
  spacingProperties,
  borderProperties,
  appearanceProperties,
  fontProperties,
);
export type Sprinkles = Parameters<typeof sprinkles>[0];
