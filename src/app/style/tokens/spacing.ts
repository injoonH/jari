/* primitives */
export const spacing = {
  0: "0rem",
  1: "0.4rem",
  2: "0.8rem",
  3: "1.2rem",
  4: "1.6rem",
} as const;

/* semantics */
export const padding = {
  none: spacing[0],
  radioPadding: `${spacing[1]} ${spacing[3]}`,
};

export const margin = {
  none: spacing[0],
};

export const radius = {
  none: spacing[0],
  rounded: spacing[2],
};
