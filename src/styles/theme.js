import { css } from 'lit';

export const themeStyles = css`
  :host {
    --wx-font-family: wfont_abc117_da7ed18ea46143cfbe0543c9975115a1, wf_da7ed18ea46143cfbe0543c99, orig_sfu_futura, 'SFU Futura', 'SFUFutura', Futura, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    --wx-color-primary: #d40026;
    --wx-color-primary-hover: #b00020;
    --wx-color-dark: #111111;
    --wx-color-surface: #ffffff;
    --wx-color-surface-subtle: #f8f9fa;
    --wx-color-surface-hover: #f1f3f5;
    --wx-color-border: #e5e7eb;
    --wx-color-border-hover: #d1d5db;
    --wx-color-text: #191919;
    --wx-color-text-secondary: #595959;
    --wx-color-text-muted: #8c8c8c;
    --wx-color-accent: #b48c5e;
    --wx-color-badge-bg: #fdf2f2;
    --wx-color-badge-text: #d40026;
    
    --wx-radius-sm: 4px;
    --wx-radius-md: 8px;
    --wx-radius-lg: 12px;
    --wx-radius-full: 9999px;
    
    --wx-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --wx-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
    --wx-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --wx-shadow-hover: 0 12px 24px -4px rgba(0, 0, 0, 0.12);

    --wx-transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    --wx-transition-normal: 0.25s cubic-bezier(0.4, 0, 0.2, 1);

    font-family: var(--wx-font-family);
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: var(--wx-color-text);
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`;
