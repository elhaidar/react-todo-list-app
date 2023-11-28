import getDateNow from "../util/getDateNow";

export const currentTheme = () => {
  try {
    return JSON.parse(localStorage.currentTheme);
  } catch (error) {
    localStorage.currentTheme = true;
    return true;
  }
};

export const primaryColor = () => {
  return "purple.500";
};

export const dangerColor = () => {
  return "red.300";
};

export const warningColor = () => {
  return "#ED8936";
};

export const dangerInfoBackgroundColor = () => {
  if (currentTheme()) {
    return "none";
  } else {
    return "red.500";
  }
};

export const primaryTextColor = () => {
  if (currentTheme()) {
    return "purple.300";
  } else {
    return "purple.500";
  }
};

export const backgroundContainerColor = () => {
  if (currentTheme()) {
    return "gray.900";
  } else {
    return "gray.100";
  }
};

export const backgroundContainerSecondaryColor = () => {
  if (currentTheme()) {
    return "gray.700";
  } else {
    return "gray.300";
  }
};
export const backgroundContainerCardColor = () => {
  if (currentTheme()) {
    return "gray.800";
  } else {
    return "gray.200";
  }
};

export const textColor = () => {
  if (currentTheme()) {
    return "gray.50";
  } else {
    return "gray.800";
  }
};

export const optionBackgroundColor = () => {
  if (currentTheme()) {
    return "#2D3748";
  } else {
    return "#fff";
  }
};

export const optionBackgroundHoverColor = () => {
  if (currentTheme()) {
    return "#90CDF4";
  } else {
    return "#39b3ff";
  }
};

export const inputFocusBorder = () => {
  if (currentTheme()) {
    return "white";
  } else {
    return "black";
  }
};

export const buttonIconColor = () => {
  return "gray.400";
};

export const buttonIconCompletedColor = () => {
  if (currentTheme()) {
    return "green.300";
  } else {
    return "green.500";
  }
};

export const buttonIconCompletedHoverStyle = () => {
  return { color: "green.300" };
};

export const buttonIconHoverStyle = (priority: string) => {
  switch (priority) {
    case "tinggi":
      return { color: dangerColor() };
    case "sedang":
      return { color: warningColor() };
    case "rendah":
      return { color: primaryColor() };
  }
};
export const buttonIconHoverPrimaryStyle = () => {
  return { color: primaryColor() };
};

export const buttonMonoHoverStyle = () => {
  if (currentTheme()) {
    return { background: "white", color: "black" };
  } else {
    return { background: "black", color: "white" };
  }
};

export const iconButtonActionHoverStyle = () => {
  return {
    bg: primaryColor(),
    borderColor: primaryColor(),
    color: "white",
    opacity: 1,
  };
};

export const primaryHoverStyle = () => {
  return { background: primaryColor(), color: "white" };
};

export const cardBorderWidth = () => {
  return "2px";
};

export const cardBackgroundColor = () => {
  if (currentTheme()) {
    return "gray.700";
  } else {
    return "gray.100";
  }
};

export const cardOpacity = () => {
  if (currentTheme()) {
    return 0.3;
  } else {
    return 0.6;
  }
};

export const cardVagueTextColor = () => {
  if (currentTheme()) {
    return textColor();
  } else {
    return primaryColor();
  }
};

export const completedStatusTagVariant = () => {
  if (currentTheme()) {
    return "completedOutline";
  } else {
    return "completed";
  }
};

export const pendingStatusTagVariant = () => {
  if (currentTheme()) {
    return "grayOutline";
  } else {
    return "gray";
  }
};

export const cardBorderColor = (priority: string) => {
  switch (priority) {
    case "tinggi":
      return dangerColor();
    case "sedang":
      return warningColor();
    case "rendah":
      return primaryColor();
  }
};

export const colorByDate = (date: string) => {
  if (date < getDateNow()) {
    return dangerColor();
  } else {
    return primaryTextColor();
  }
};

export const cardCompletedBorderColor = () => {
  if (currentTheme()) {
    return "green.300";
  } else {
    return "green.400";
  }
};

export const trackProgressColor = () => {
  if (currentTheme()) {
    return "gray.700";
  } else {
    return "gray.300";
  }
};

export const textPriorityCardColor = () => {
  if (currentTheme()) {
    return "gray.50";
  } else {
    return "gray.200";
  }
};

export const cardTextColor = (priority: string) => {
  if (currentTheme()) {
    switch (priority) {
      case "tinggi":
        return dangerColor();
      case "sedang":
        return warningColor();
      case "rendah":
        return primaryColor();
    }
  } else {
    return "white";
  }
};

export const cardInfoBackgroundColor = (priority: string) => {
  if (!currentTheme()) {
    switch (priority) {
      case "tinggi":
        return dangerColor();
      case "sedang":
        return warningColor();
      case "rendah":
        return primaryColor();
    }
  } else {
    return "transparent";
  }
};

export const tagPriorityVariant = (priority: string) => {
  let variant = "";
  if (priority === "tinggi") {
    variant = "danger";
  } else if (priority === "sedang") {
    variant = "warning";
  } else {
    variant = "primary";
  }
  if (currentTheme()) {
    return `${variant}Outline`;
  } else {
    return variant;
  }
};

export const scrollBarStyleSx = () => {
  return {
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-track": {
      background: backgroundContainerColor(),
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: textColor(),
      borderRadius: "10px",
      border: `10px solid ${backgroundContainerColor()}`,
    },
  };
};

export const scrollBarPrimaryStyleSx = () => {
  return {
    "&::-webkit-scrollbar": {
      width: "5px",
      height: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: backgroundContainerCardColor(),
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: primaryColor(),
      borderRadius: "10px",
      border: `10px solid ${backgroundContainerColor()}`,
    },
  };
};

export const textUnselectedColor = () => {
  if (currentTheme()) {
    return "gray.500";
  } else {
    return "gray.400";
  }
};

export const titleFontSize = () => {
  return { base: "md", lg: "lg" };
};

export const descFontSize = () => {
  return { base: "xs", md: "sm" };
};

export const categoryTagFontSize = () => {
  return { base: "9px", md: "xs" };
};

export const dateFontSize = () => {
  return { base: "xs", lg: "sm" };
};
