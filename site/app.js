const list = document.getElementById('reportList');
const content = document.getElementById('reportContent');
const title = document.getElementById('pageTitle');
const eyebrow = document.getElementById('eyebrow');
const meta = document.getElementById('reportMeta');

function activeId() {
  const hash = decodeURIComponent(location.hash.replace('#', ''));
  return REPORTS.some(r => r.id === hash) ? hash : REPORTS[0].id;
}

function renderList(currentId) {
  list.innerHTML = REPORTS.map(r => `
    <button class="report-tab ${r.id === currentId ? 'active' : ''}" data-id="${r.id}">
      <div class="tab-row"><span class="tab-week">${r.week}</span><span class="tab-badge">${r.badge}</span></div>
      <div class="tab-title">${r.title}</div>
      <div class="tab-sub">${r.subtitle}</div>
    </button>
  `).join('');
  list.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      location.hash = btn.dataset.id;
    });
  });
}

function renderReport() {
  const id = activeId();
  const report = REPORTS.find(r => r.id === id) || REPORTS[0];
  renderList(report.id);
  title.textContent = report.title;
  eyebrow.textContent = `${report.week} · ${report.period}`;
  meta.innerHTML = `
    <span class="meta-pill">${report.subtitle}</span>
    <span class="meta-pill">来源：${report.source}</span>
    <span class="meta-pill">${report.period}</span>
  `;
  content.innerHTML = report.html;
  document.title = report.title;
}

document.getElementById('printPage').addEventListener('click', () => window.print());
document.getElementById('copyLink').addEventListener('click', async () => {
  const url = location.href;
  try {
    await navigator.clipboard.writeText(url);
    document.getElementById('copyLink').textContent = '已复制';
    setTimeout(() => document.getElementById('copyLink').textContent = '复制当前报告链接', 1200);
  } catch {
    prompt('复制链接', url);
  }
});
window.addEventListener('hashchange', renderReport);
renderReport();
