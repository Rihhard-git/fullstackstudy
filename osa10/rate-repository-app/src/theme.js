import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    textSubheading: '#ffffff',
    primary: '#0366d6',
    mainBackground: "#e1e4e8",
    textError: "#d73a4a"
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    })
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  textAlign: {
    center: 'center'
  }
};

export default theme;