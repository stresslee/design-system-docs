import React from 'react';
import styles from './Tag.module.css';

export function Tag({
  children,
  size = 'md',
  icon,
  action,
  checkbox = false,
  checked = false,
  onClose,
  onCheck,
  count,
  countValue,
  avatarSrc,
  countryCode,
  ...props
}) {
  const classes = [styles.tag, styles[size]];

  const avatarSize = `avatar-${size}`;
  const countrySize = `country-${size}`;

  return (
    <span className={classes.join(' ')} {...props}>
      {/* Checkbox */}
      {checkbox && (
        <span
          className={`${styles.checkbox} ${checked ? styles.checked : ''}`}
          onClick={onCheck}
          role="checkbox"
          aria-checked={checked}
        >
          {checked && (
            <svg viewBox="0 0 10 10" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 5.5L4 7.5L8 3" />
            </svg>
          )}
        </span>
      )}

      {/* Dot icon */}
      {icon === 'dot' && <span className={styles.dot} />}

      {/* Avatar icon */}
      {icon === 'avatar' && (
        <span className={`${styles.avatar} ${styles[avatarSize]}`}>
          {avatarSrc ? (
            <img src={avatarSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : null}
        </span>
      )}

      {/* Country flag icon */}
      {icon === 'country' && (
        <span className={`${styles.country} ${styles[countrySize]}`}>
          {countryCode || ''}
        </span>
      )}

      {/* Label text */}
      {children}

      {/* Action: count badge */}
      {action === 'count' && (
        <span className={styles.count}>{countValue ?? 5}</span>
      )}

      {/* Action: close button */}
      {action === 'close' && (
        <button className={styles.close} onClick={onClose} aria-label="Remove">
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.5 3.5L3.5 10.5M3.5 3.5l7 7" />
          </svg>
        </button>
      )}
    </span>
  );
}
