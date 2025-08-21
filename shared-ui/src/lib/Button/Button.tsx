import React from 'react';
import type { ButtonProps } from './Button.types';
import './Button.module.css';

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
}) => {
  const getButtonClasses = () => {
    let baseClasses = 'button ';
    
    // Size classes
    baseClasses += `button--${size} `;
    
    // Variant classes
    baseClasses += `button--${variant} `;
    
    // State classes
    if (disabled || loading) {
      baseClasses += 'button--disabled ';
    }
    
    return baseClasses.trim();
  };

  return (
    <button
      className={getButtonClasses()}
      onClick={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <div className="button__loading">
          <div className="button__spinner" />
          Loading...
        </div>
      ) : (
        title
      )}
    </button>
  );
};