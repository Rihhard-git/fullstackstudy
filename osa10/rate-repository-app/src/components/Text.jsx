import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
    margin: 2,
  },
  colorLanguage: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.textSubheading
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorTextError: {
    color: theme.colors.textError
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorSubheading: {
    color: theme.colors.textSubheading
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  textAlign: {
    textAlign: 'center'
  }
});

const Text = ({ color, fontSize, fontWeight, textAlign, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'textSubheading' && styles.colorSubheading,
    color === 'colorLanguage' && styles.colorLanguage,
    color === 'error' && styles.colorTextError,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    textAlign === 'center' && styles.textAlign,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;