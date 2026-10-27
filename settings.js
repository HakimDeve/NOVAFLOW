if (localStorage.getItem('novaflow-authenticated') !== 'true') window.location.replace('login.html');
const key = 'novaflow-settings';
const defaults = { name: 'حكيم', email: 'admin@novaflow.com', role: 'مدير النظام', taskNotifications: true, weeklySummary: true, failureNotifications: true, motion: true, color: 'purple' };
const data = { ...defaults, ...JSON.parse(localStorage.getItem(key) || '{}') };
const toast = document.getElementById('toast');
document.getElementById('displayName').value = data.name; document.getElementById('email').value = data.email; document.getElementById('role').value = data.role;
document.querySelectorAll('[data-setting]').forEach((input) => { input.checked = data[input.dataset.setting]; input.onchange = () => save(); });
function applyColor(color) { document.body.classList.remove('blue', 'pink'); if (color !== 'purple') document.body.classList.add(color); document.querySelectorAll('[data-color]').forEach((button) => button.classList.toggle('selected', button.dataset.color === color)); }
function save(show = false) { data.name = document.getElementById('displayName').value.trim() || defaults.name; data.email = document.getElementById('email').value; data.role = document.getElementById('role').value.trim() || defaults.role; document.querySelectorAll('[data-setting]').forEach((input) => data[input.dataset.setting] = input.checked); localStorage.setItem(key, JSON.stringify(data)); if (show) { toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2300); } }
document.getElementById('profileForm').onsubmit = (event) => { event.preventDefault(); save(true); };
document.querySelectorAll('[data-color]').forEach((button) => button.onclick = () => { data.color = button.dataset.color; applyColor(data.color); save(true); });
applyColor(data.color);
document.getElementById('logout').onclick = () => { localStorage.removeItem('novaflow-authenticated'); window.location.href = 'login.html'; };
