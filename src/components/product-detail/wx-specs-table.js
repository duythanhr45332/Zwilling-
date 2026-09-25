import { LitElement, html, css } from 'lit';
import { themeStyles } from '../../styles/theme.js';
import { safeDefine } from '../../utils/element.js';
import { safeJsonParse } from '../../utils/formatters.js';
import { t } from '../../utils/i18n.js';

export class WxSpecsTable extends LitElement {
  static properties = {
    specs: { type: Object },
    lang: { type: String }
  };

  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
        margin: 0;
        padding: 0;
      }

      .specs-title {
        font-size: 15px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 14px;
        color: var(--wx-color-dark);
      }

      .specs-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 13px;
      }

      .specs-table tr {
        border-bottom: 1px solid var(--wx-color-border);
      }

      .specs-table tr:nth-child(even) {
        background-color: var(--wx-color-surface-subtle);
      }

      .spec-name {
        padding: 10px 14px;
        font-weight: 600;
        color: var(--wx-color-text-secondary);
        width: 35%;
      }

      .spec-value {
        padding: 10px 14px;
        color: var(--wx-color-text);
      }
    `
  ];

  constructor() {
    super();
    this.specs = [];
    this.lang = 'vi';
  }

  render() {
    const raw = typeof this.specs === 'string' ? safeJsonParse(this.specs, []) : this.specs;
    if (!raw || !Array.isArray(raw) || raw.length === 0) return html``;

    return html`
      <div>
        <div class="specs-title">${t('specsTab', this.lang)}</div>
        <table class="specs-table">
          <tbody>
            ${raw.map(
              (item) => html`
                <tr>
                  <td class="spec-name">${item.name || item.key}</td>
                  <td class="spec-value">${item.value}</td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}

safeDefine('wx-specs-table', WxSpecsTable);
