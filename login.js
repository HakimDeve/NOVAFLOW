const form = document.getElementById('loginForm');
const password = document.getElementById('password');
const toast = document.getElementById('toast');
document.getElementById('togglePassword').onclick = () => {
  password.type = password.type === 'password' ? 'text' : 'password';
};
form.onsubmit = (event) => {
  event.preventDefault();
  localStorage.setItem('novaflow-authenticated', 'true');
  toast.classList.add('show');
  setTimeout(() => { window.location.href = 'dashboard.html'; }, 900);
};
