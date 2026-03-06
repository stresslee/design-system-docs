import React from 'react';
import styles from './Button.module.css';

export const Button = ({
    variant = 'primary',
    size = 'md',
    state = 'default', // For docs visualization: 'default', 'hover', 'active'
    disabled = false,
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    className = '',
    ...props
}) => {
    // Determine classes
    const classes = [
        styles.button,
        styles[`size-${size}`],
        styles[`variant-${variant}`],
    ];

    if (state === 'hover') classes.push(styles['force-hover']);
    if (state === 'active') classes.push(styles['force-active']);
    if (className) classes.push(className);

    return (
        <button
            className={classes.join(' ')}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <div className={styles['loading-spinner']} />}
            {!isLoading && leftIcon}
            {children}
            {!isLoading && rightIcon}
        </button>
    );
};
