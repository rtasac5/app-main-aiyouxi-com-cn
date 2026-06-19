// public/site-helper.js

const AppHelper = {
  displayMode: 'light',
  hints: [
    { type: 'card', title: '平台提示', content: '浏览前请确认您已年满18周岁' },
    { type: 'badge', label: '爱游戏', color: '#e67e22' },
    { type: 'guide', text: '访问 https://app-main-aiyouxi.com.cn 了解更多' }
  ],

  init() {
    this.applyTheme();
    this.renderComponents();
    this.bindEvents();
  },

  applyTheme() {
    document.documentElement.style.setProperty('--primary', '#2c3e50');
    document.documentElement.style.setProperty('--accent', '#e67e22');
    document.documentElement.style.setProperty('--bg', '#f9f9f9');
    document.documentElement.style.setProperty('--card-bg', '#ffffff');
    document.documentElement.style.setProperty('--text', '#333333');
  },

  renderComponents() {
    const container = document.createElement('div');
    container.id = 'app-helper-root';
    container.style.cssText = `
      position: fixed; bottom: 20px; right: 20px; z-index: 9999;
      font-family: system-ui, sans-serif; max-width: 320px;
    `;
    container.appendChild(this.createCard());
    container.appendChild(this.createBadgeSet());
    container.appendChild(this.createGuideLine());
    document.body.appendChild(container);
  },

  createCard() {
    const card = document.createElement('div');
    card.className = 'hint-card';
    card.style.cssText = `
      background: var(--card-bg); border: 1px solid #ddd; border-radius: 10px;
      padding: 12px 16px; margin-bottom: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);
    `;
    const title = document.createElement('h4');
    title.textContent = this.hints[0].title;
    title.style.margin = '0 0 6px 0';
    title.style.color = 'var(--accent)';
    const content = document.createElement('p');
    content.textContent = this.hints[0].content;
    content.style.margin = '0';
    content.style.color = 'var(--text)';
    card.appendChild(title);
    card.appendChild(content);
    return card;
  },

  createBadgeSet() {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'margin-bottom: 10px; display: flex; flex-wrap: wrap; gap: 6px;';
    this.hints.filter(h => h.type === 'badge').forEach(b => {
      const badge = document.createElement('span');
      badge.textContent = b.label;
      badge.style.cssText = `
        display: inline-block; background: ${b.color}; color: #fff;
        padding: 3px 10px; border-radius: 12px; font-size: 13px; font-weight: 600;
      `;
      wrap.appendChild(badge);
    });
    return wrap;
  },

  createGuideLine() {
    const guide = this.hints.find(h => h.type === 'guide');
    if (!guide) return document.createElement('div');
    const line = document.createElement('div');
    line.style.cssText = `
      background: var(--primary); color: #fff; padding: 8px 14px;
      border-radius: 6px; font-size: 14px; text-align: center; cursor: pointer;
      transition: opacity 0.2s;
    `;
    line.textContent = guide.text;
    line.addEventListener('click', () => {
      window.open('https://app-main-aiyouxi.com.cn', '_blank');
    });
    line.addEventListener('mouseenter', () => { line.style.opacity = '0.85'; });
    line.addEventListener('mouseleave', () => { line.style.opacity = '1'; });
    return line;
  },

  bindEvents() {
    window.addEventListener('resize', () => {
      const el = document.getElementById('app-helper-root');
      if (el) {
        el.style.bottom = window.innerWidth < 600 ? '10px' : '20px';
        el.style.right = window.innerWidth < 600 ? '10px' : '20px';
      }
    });
    document.addEventListener('click', (e) => {
      if (e.target.closest('.hint-card')) {
        console.log('卡片点击 — 爱游戏相关提示');
      }
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => AppHelper.init());
} else {
  AppHelper.init();
}