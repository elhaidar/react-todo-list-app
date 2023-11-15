import { extendTheme } from "@chakra-ui/react";
import { checkboxAnatomy as parts, tagAnatomy } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system";

const {
  definePartsStyle: defineCheckboxStyle,
  defineMultiStyleConfig: defineCheckboxConfig,
} = createMultiStyleConfigHelpers(parts.keys);
const {
  definePartsStyle: defineTagStyle,
  defineMultiStyleConfig: defineTagConfig,
} = createMultiStyleConfigHelpers(tagAnatomy.keys);

// default base style from the Checkbox theme
const baseStyle = defineCheckboxStyle({
  control: {
    padding: 3,
    borderRadius: "50%",
  },
});

// Defining a custom variant
const variantCircular = defineCheckboxStyle({
  control: defineStyle({
    borderRadius: "50%",
  }),
});

const variantCircularChecked = defineCheckboxStyle({
  control: defineStyle({
    borderRadius: "50%",
    backgroundColor: "green.400",
  }),
});

const variants = {
  circular: variantCircular,
  checked: variantCircularChecked,
};

const sizes = {
  xl: defineCheckboxStyle({
    control: defineStyle({
      boxSize: 14,
    }),
    label: defineStyle({
      fontSize: "2xl",
      marginLeft: 6,
    }),
  }),
};

const checkboxTheme = defineCheckboxConfig({
  baseStyle,
  variants,
  sizes,
});

const dangerTag = defineTagStyle({
  container: {
    bg: "red.100",
    color: "red.400",
  },
});
const dangerOutlineTag = defineTagStyle({
  container: {
    color: "red.300",
    border: "1px",
    borderColor: "red.400",
  },
});
const warningTag = defineTagStyle({
  container: {
    bg: "orange.100",
    color: "orange.500",
  },
});
const warningOutlineTag = defineTagStyle({
  container: {
    color: "orange.300",
    border: "1px",
    borderColor: "orange.400",
  },
});
const primaryTag = defineTagStyle({
  container: {
    bg: "purple.100",
    color: "purple.500",
  },
});
const primaryOutlineTag = defineTagStyle({
  container: {
    color: "purple.300",
    border: "1px",
    borderColor: "purple.500",
  },
});

const grayOutlineTag = defineTagStyle({
  container: {
    color: "gray.300",
    border: "1px",
    borderColor: "gray.300",
    opacity: 0.5,
  },
});

const grayTag = defineTagStyle({
  container: {
    background: "gray.300",
    color: "gray.500",
    opacity: 0.8,
  },
});

const completedTag = defineTagStyle({
  container: {
    background: "green.200",
    color: "green.600",
  },
});

const completedOutlineTag = defineTagStyle({
  container: {
    color: "green.300",
    border: "1px",
    borderColor: "green.300",
  },
});

const tagTheme = defineTagConfig({
  variants: {
    danger: dangerTag,
    dangerOutline: dangerOutlineTag,
    warning: warningTag,
    warningOutline: warningOutlineTag,
    primary: primaryTag,
    primaryOutline: primaryOutlineTag,
    completed: completedTag,
    completedOutline: completedOutlineTag,
    gray: grayTag,
    grayOutline: grayOutlineTag,
  },
});

const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Plus Jakarta Sans Variable', sans-serif`,
  },
  colors: {
    black: "#0C0C1D",
    checked: "#48BB78",
  },
  components: {
    Checkbox: checkboxTheme,
    Tag: tagTheme,
    // Other components can also be customized here.
  },
});

export default theme;
