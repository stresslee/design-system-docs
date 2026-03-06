import React from 'react';
import styles from './Dropdown.module.css';

/* ===========================
   SVG Icons (inline)
   =========================== */

const ChevronDown = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 7.5l5 5 5-5" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16.667 5L7.5 14.167 3.333 10" />
  </svg>
);

const DotsIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <circle cx="10" cy="4" r="1.5" />
    <circle cx="10" cy="10" r="1.5" />
    <circle cx="10" cy="16" r="1.5" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 17.5l-3.625-3.625M14.167 8.333a5.833 5.833 0 1 1-11.667 0 5.833 5.833 0 0 1 11.667 0z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3L3 9M3 3l6 6" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1.667 5.833l7.133 4.988c.387.27.58.406.792.458.187.046.383.046.57 0 .212-.052.405-.188.792-.458l7.133-4.988M5.667 16.667h8.666c1.4 0 2.1 0 2.635-.273a2.5 2.5 0 0 0 1.093-1.092c.272-.535.272-1.235.272-2.635V7.333c0-1.4 0-2.1-.272-2.635a2.5 2.5 0 0 0-1.093-1.092c-.535-.273-1.235-.273-2.635-.273H5.667c-1.4 0-2.1 0-2.635.273a2.5 2.5 0 0 0-1.093 1.092c-.272.535-.272 1.235-.272 2.635v5.334c0 1.4 0 2.1.272 2.635a2.5 2.5 0 0 0 1.093 1.092c.535.273 1.235.273 2.635.273z" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.53 1.864c.154-.462.231-.692.352-.769a.417.417 0 0 1 .236-.074c.144 0 .296.183.6.55l2.878 3.468c.068.082.102.123.144.152a.417.417 0 0 0 .126.06c.049.013.102.013.207.013h4.508c.562 0 .843 0 .962.1a.417.417 0 0 1 .146.221c.025.13-.1.28-.348.582l-2.872 3.476c-.066.08-.1.12-.12.165a.417.417 0 0 0-.032.137c-.002.05.01.102.034.206l1.167 4.47c.142.546.214.819.14.955a.417.417 0 0 1-.19.183c-.14.068-.4-.027-.92-.218l-4.368-1.6c-.1-.036-.15-.054-.201-.061a.417.417 0 0 0-.114 0c-.052.007-.102.025-.201.06l-4.37 1.601c-.52.19-.779.286-.919.218a.417.417 0 0 1-.19-.183c-.073-.136-.002-.41.14-.955l1.168-4.47c.025-.104.037-.156.034-.206a.416.416 0 0 0-.032-.137c-.019-.045-.053-.085-.12-.165L3.73 6.267c-.25-.301-.374-.452-.349-.582a.417.417 0 0 1 .146-.221c.12-.1.4-.1.962-.1h4.508c.106 0 .158 0 .207-.013a.417.417 0 0 0 .126-.06c.042-.03.076-.07.144-.152L12.35 1.67" />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
    <path d="M15.606 12.273a1.25 1.25 0 0 0 .25 1.378l.045.046a1.515 1.515 0 1 1-2.143 2.143l-.045-.046a1.25 1.25 0 0 0-1.378-.25 1.25 1.25 0 0 0-.758 1.144v.129a1.515 1.515 0 1 1-3.03 0v-.068a1.25 1.25 0 0 0-.819-1.144 1.25 1.25 0 0 0-1.378.25l-.046.046a1.515 1.515 0 1 1-2.143-2.143l.046-.046a1.25 1.25 0 0 0 .25-1.378 1.25 1.25 0 0 0-1.144-.757h-.13a1.515 1.515 0 0 1 0-3.03h.069a1.25 1.25 0 0 0 1.144-.819 1.25 1.25 0 0 0-.25-1.378l-.046-.045a1.515 1.515 0 1 1 2.143-2.143l.046.045a1.25 1.25 0 0 0 1.378.25h.06a1.25 1.25 0 0 0 .759-1.143v-.13a1.515 1.515 0 0 1 3.03 0v.069a1.25 1.25 0 0 0 .758 1.144 1.25 1.25 0 0 0 1.378-.25l.045-.046a1.515 1.515 0 1 1 2.143 2.143l-.045.046a1.25 1.25 0 0 0-.25 1.378v.06a1.25 1.25 0 0 0 1.143.759h.13a1.515 1.515 0 1 1 0 3.03h-.069a1.25 1.25 0 0 0-1.144.758z" />
  </svg>
);

const LayersIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1.667 10l7.77 4.317c.199.11.298.166.404.187a.833.833 0 0 0 .318 0c.106-.021.205-.077.404-.187L18.333 10M1.667 14.167l7.77 4.316c.199.111.298.167.404.188a.833.833 0 0 0 .318 0c.106-.021.205-.077.404-.188l7.77-4.316M1.667 5.833L9.437 1.517c.199-.111.298-.167.404-.188a.833.833 0 0 1 .318 0c.106.021.205.077.404.188l7.77 4.316-7.77 4.317c-.199.11-.298.166-.404.187a.833.833 0 0 1-.318 0c-.106-.021-.205-.077-.404-.187L1.667 5.833z" />
  </svg>
);

/* ===========================
   Dropdown (container + trigger)
   =========================== */

export function Dropdown({
  children,
  trigger = 'button',
  label = 'Options',
  open = false,
  avatarText,
  ...props
}) {
  const renderTrigger = () => {
    if (trigger === 'icon') {
      return (
        <button className={styles['trigger-icon']} type="button">
          <span style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DotsIcon />
          </span>
        </button>
      );
    }
    if (trigger === 'avatar') {
      return (
        <button className={styles['trigger-avatar']} type="button">
          <span className={styles['avatar-circle']}>
            {avatarText || 'JL'}
          </span>
        </button>
      );
    }
    // default: button
    return (
      <button className={styles.trigger} type="button">
        {label}
        <span className={styles.chevron}><ChevronDown /></span>
      </button>
    );
  };

  return (
    <div className={styles.dropdown} {...props}>
      {renderTrigger()}
      <div className={`${styles.menu} ${open ? styles.open : ''}`}>
        {children}
      </div>
    </div>
  );
}

/* Static menu (for documentation demos without trigger) */
export function DropdownMenu({ children, ...props }) {
  return (
    <div className={`${styles.menu} ${styles['static-open']}`} {...props}>
      {children}
    </div>
  );
}

/* ===========================
   DropdownItem
   =========================== */

export function DropdownItem({
  children,
  icon,
  shortcut,
  disabled = false,
  checked,
  state = 'default',
  ...props
}) {
  const classes = [styles['menu-item']];
  if (state === 'hover') classes.push(styles['force-hover']);
  if (disabled || state === 'disabled') classes.push(styles.disabled);

  return (
    <button className={classes.join(' ')} disabled={disabled || state === 'disabled'} type="button" {...props}>
      {checked !== undefined && (
        <span className={`${styles['item-checkbox']} ${checked ? styles.checked : ''}`}>
          {checked && (
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 3L4.5 8.5 2 6" />
            </svg>
          )}
        </span>
      )}
      {icon && (
        <span className={styles['item-icon']}>
          {icon}
        </span>
      )}
      <span className={styles['item-label']}>{children}</span>
      {shortcut && <span className={styles['item-shortcut']}>{shortcut}</span>}
    </button>
  );
}

/* ===========================
   DropdownHeader
   =========================== */

export function DropdownHeader({ children, avatar = false, name, email }) {
  if (avatar) {
    return (
      <div className={styles['menu-header-avatar']}>
        <span className={styles['avatar-circle']}>{name ? name.charAt(0) : 'U'}</span>
        <div className={styles['header-avatar-info']}>
          <span className={styles['header-avatar-name']}>{name}</span>
          <span className={styles['header-avatar-email']}>{email}</span>
        </div>
      </div>
    );
  }
  return <div className={styles['menu-header']}>{children}</div>;
}

/* ===========================
   DropdownDivider
   =========================== */

export function DropdownDivider() {
  return <div className={styles['menu-divider']} />;
}

/* ===========================
   Select
   =========================== */

export function Select({
  label,
  hint,
  placeholder,
  value,
  size = 'md',
  state = 'default',
  leadingIcon,
  leadingAvatar,
  leadingDot,
  search = false,
  tags = [],
  children,
  ...props
}) {
  const controlClasses = [styles['select-control'], styles[size]];
  if (!value && placeholder) controlClasses.push(styles.placeholder);
  if (state === 'focused') controlClasses.push(styles.focused);
  if (state === 'disabled') controlClasses.push(styles.disabled);
  if (state === 'open') controlClasses.push(styles.open);

  const isDisabled = state === 'disabled';

  return (
    <div className={styles['select-wrapper']} {...props}>
      {label && <label className={styles['select-label']}>{label}</label>}
      <div className={controlClasses.join(' ')}>
        {leadingIcon && <span className={styles['select-leading-icon']}>{leadingIcon}</span>}
        {leadingAvatar && <span className={styles['select-leading-avatar']} />}
        {leadingDot && <span className={styles['select-leading-dot']} style={{ background: leadingDot }} />}
        {search ? (
          <input
            className={styles['select-search']}
            type="text"
            placeholder={placeholder || 'Search...'}
            disabled={isDisabled}
            defaultValue={value}
          />
        ) : tags.length > 0 ? (
          <span className={styles['select-tags']}>
            {tags.map((tag, i) => (
              <span key={i} className={styles['select-tag']}>
                {tag}
                <span className={styles['select-tag-remove']}><XIcon /></span>
              </span>
            ))}
          </span>
        ) : (
          <span>{value || placeholder}</span>
        )}
        <span className={styles['select-chevron']}><ChevronDown /></span>
      </div>
      {hint && <span className={styles['select-hint']}>{hint}</span>}
      {children}
    </div>
  );
}

/* ===========================
   SelectItem
   =========================== */

export function SelectItem({
  children,
  supportingText,
  selected = false,
  disabled = false,
  state = 'default',
  size = 'md',
  icon,
  avatar,
  dot,
  ...props
}) {
  const classes = [styles['select-item']];
  if (size === 'sm') classes.push(styles.sm);
  if (state === 'hover') classes.push(styles['force-hover']);
  if (disabled || state === 'disabled') classes.push(styles.disabled);

  return (
    <button className={classes.join(' ')} disabled={disabled || state === 'disabled'} type="button" {...props}>
      {icon && <span className={styles['select-item-icon']}>{icon}</span>}
      {avatar && (
        <span className={styles['select-item-avatar']}>
          {typeof avatar === 'string' ? avatar : 'U'}
        </span>
      )}
      {dot && <span className={styles['select-item-dot']} style={{ background: dot }} />}
      <span className={styles['select-item-content']}>
        <span className={styles['select-item-label']}>{children}</span>
        {supportingText && <span className={styles['select-item-supporting']}>{supportingText}</span>}
      </span>
      {selected && (
        <span className={styles['select-item-check']}>
          <CheckIcon />
        </span>
      )}
    </button>
  );
}

/* Re-export icons for MDX usage */
export { MailIcon, StarIcon, SettingsIcon, LayersIcon, SearchIcon };
