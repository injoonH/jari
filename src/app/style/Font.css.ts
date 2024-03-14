import { style } from "@vanilla-extract/css";
import { sprinkles } from "@/app/style/sprinkles.css";

const body = style([
  sprinkles({
    fontSize: "1.4rem",
    lineHeight: "default",
  }),
]);

export const bodyNormal = style([
  body,
  sprinkles({
    fontWeight: "normal",
  }),
]);

export const bodyBold = style([
  body,
  sprinkles({
    fontWeight: "bold",
  }),
]);
