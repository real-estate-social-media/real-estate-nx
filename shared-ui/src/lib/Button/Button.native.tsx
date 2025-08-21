import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import type { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button];
    
    // Size styles
    switch (size) {
      case 'small':
        baseStyle.push(styles.buttonSmall);
        break;
      case 'large':
        baseStyle.push(styles.buttonLarge);
        break;
      default:
        baseStyle.push(styles.buttonMedium);
    }

    // Variant styles
    switch (variant) {
      case 'secondary':
        baseStyle.push(styles.buttonSecondary);
        break;
      case 'outline':
        baseStyle.push(styles.buttonOutline);
        break;
      default:
        baseStyle.push(styles.buttonPrimary);
    }

    // Disabled styles
    if (disabled || loading) {
      baseStyle.push(styles.buttonDisabled);
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text];
    
    switch (size) {
      case 'small':
        baseStyle.push(styles.textSmall);
        break;
      case 'large':
        baseStyle.push(styles.textLarge);
        break;
      default:
        baseStyle.push(styles.textMedium);
    }

    switch (variant) {
      case 'outline':
        baseStyle.push(styles.textOutline);
        break;
      case 'secondary':
        baseStyle.push(styles.textSecondary);
        break;
      default:
        baseStyle.push(styles.textPrimary);
    }

    return baseStyle;
  };

  const getSpinnerColor = () => {
    switch (variant) {
      case 'outline':
        return '#3B82F6';
      case 'secondary':
        return '#374151';
      default:
        return '#FFFFFF';
    }
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getSpinnerColor()} />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Size variants
  buttonSmall: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonMedium: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonLarge: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  
  // Color variants
  buttonPrimary: {
    backgroundColor: '#3B82F6',
  },
  buttonSecondary: {
    backgroundColor: '#E5E7EB',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  
  // Disabled state
  buttonDisabled: {
    opacity: 0.5,
  },
  
  // Text styles
  text: {
    fontWeight: '500',
    textAlign: 'center',
  },
  textSmall: {
    fontSize: 14,
  },
  textMedium: {
    fontSize: 16,
  },
  textLarge: {
    fontSize: 18,
  },
  textPrimary: {
    color: '#FFFFFF',
  },
  textSecondary: {
    color: '#374151',
  },
  textOutline: {
    color: '#3B82F6',
  },
});