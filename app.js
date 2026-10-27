const modal = document.getElementById('modalBackdrop');
const form = document.getElementById('taskForm');
const body = document.getElementById('tableBody');
const toast = document.getElementById('toast');
const storageKey = 'nova-flow-runs';
const preferences = JSON.parse(localStorage.getItem('novaflow-settings') || '{}');
if (localStorage.getItem('novaflow-authenticated') !== 'true') window.location.replace('login.html');
if (preferences.name) {
  document.querySelector('.profile strong').textContent = preferences.name;
  document.querySelector('.profile span').textContent = preferences.name.charAt(0);
  document.querySelector('header h1 + p').textContent = 'مرحبًا يا ' + preferences.name + '، إليك ملخص أعمالك اليوم.';
}
if (preferences.motion === false) document.body.classList.add('reduce-motion');

function toastMessage(message) { toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2500); }
function makeRow(task) {
  const row = document.createElement('tr');
  row.innerHTML = '<td><b class="flow violet">✦</b><span></span></td><td></td><td>الآن</td><td><span class="status run">● قيد التنفيذ</span></td><td><button class="detail">عرض</button></td>';
  row.querySelector('td span').textContent = task.name;
  row.children[1].textContent = task.agent;
  return row;
}
document.getElementById('newTaskBtn').onclick = () => modal.classList.add('open');
document.getElementById('closeModal').onclick = () => modal.classList.remove('open');
modal.onclick = (event) => { if (event.target === modal) modal.classList.remove('open'); };
document.getElementById('menuButton').onclick = () => document.querySelector('.sidebar').classList.toggle('open');
document.getElementById('logoutButton').onclick = () => { localStorage.removeItem('novaflow-authenticated'); window.location.href = 'login.html'; };
document.querySelector('a[href="#settings"]').onclick = (event) => { event.preventDefault(); window.location.href = 'settings.html'; };
form.onsubmit = (event) => {
  event.preventDefault();
  const task = { name: document.getElementById('taskName').value.trim(), agent: document.getElementById('taskAgent').value };
  const saved = JSON.parse(localStorage.getItem(storageKey) || '[]'); saved.unshift(task); localStorage.setItem(storageKey, JSON.stringify(saved));
  body.prepend(makeRow(task)); form.reset(); modal.classList.remove('open'); toastMessage('تم إنشاء الأتمتة وبدء تشغيلها ✦');
  const counter = document.getElementById('runsCount'); counter.textContent = (Number(counter.textContent.replace(',', '')) + 1).toLocaleString('en-US');
};
document.getElementById('searchInput').oninput = (event) => {
  const value = event.target.value.trim().toLowerCase();
  [...body.rows].forEach((row) => { row.style.display = row.textContent.toLowerCase().includes(value) ? '' : 'none'; });
};
body.onclick = (event) => { if (event.target.closest('.detail')) toastMessage('تفاصيل العملية متاحة في سجل النشاط.'); };
JSON.parse(localStorage.getItem(storageKey) || '[]').forEach((task) => body.append(makeRow(task)));
const links = { '#analytics': 'analytics', '#workflows': 'workflows', '#agents': 'agents', '#activity': 'activity' };
Object.entries(links).forEach(([selector, view]) => {
  const link = document.querySelector('a[href="' + selector + '"]');
  if (link) link.onclick = (event) => { event.preventDefault(); window.location.href = 'sections.html?view=' + view; };
});
const notificationButton = document.querySelector('.top-actions > button:first-child');
notificationButton.onclick = () => {
  const current = document.querySelector('.notifications');
  if (current) return current.remove();
  const panel = document.createElement('div');
  panel.className = 'notifications';
  panel.style.cssText = 'position:absolute;top:45px;left:0;width:240px;padding:14px;background:#2b1e43;border:1px solid #ffffff1b;border-radius:10px;box-shadow:0 17px 35px #08041180;z-index:5;direction:rtl';
  panel.innerHTML = '<strong style="display:flex;justify-content:space-between;font-size:10px">الإشعارات <button style="border:0;background:none;color:#c58dff;font:8px Alexandria">تمت القراءة</button></strong><div style="display:flex;gap:8px;padding-top:12px;margin-top:10px;border-top:1px solid #ffffff10;font-size:9px"><b style="color:#a66bf0">✓</b><span>اكتملت مهمة تلخيص البريد<small style="display:block;color:#a89cb3">منذ 3 دقائق</small></span></div><div style="display:flex;gap:8px;padding-top:12px;margin-top:10px;border-top:1px solid #ffffff10;font-size:9px"><b style="color:#a66bf0">◉</b><span>وكيل الدعم يحتاج للمراجعة<small style="display:block;color:#a89cb3">منذ 18 دقيقة</small></span></div>';
  notificationButton.parentElement.style.position = 'relative';
  notificationButton.parentElement.append(panel);
  panel.querySelector('button').onclick = () => { notificationButton.querySelector('i')?.remove(); panel.remove(); };
};
