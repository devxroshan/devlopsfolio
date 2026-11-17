const ICON_SERVER = "https://img.icons8.com/ios/96/";

export const getIconUrl = (
  icon: string,
  colorHashCode: string = "FFFFFF",
  platform: string = "ios-filled",
): string => {
  return `https://img.icons8.com/${colorHashCode}/96/${platform}/${icon}.png`;
};
