export const TRANSITION_TYPE = {
  NAV_FORWARD: "nav-forward",
  NAV_BACK: "nav-back",
} as const;

export const SLIDE_TRANSITION_PROPS = {
  enter: {
    [TRANSITION_TYPE.NAV_FORWARD]: "slide-forward",
    [TRANSITION_TYPE.NAV_BACK]: "slide-back",
    default: "none",
  },
  exit: {
    [TRANSITION_TYPE.NAV_FORWARD]: "slide-forward",
    [TRANSITION_TYPE.NAV_BACK]: "slide-back",
    default: "none",
  },
  default: "none",
} as const;
