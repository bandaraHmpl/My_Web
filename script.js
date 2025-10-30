// Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;
if(localStorage.getItem('theme') === 'dark'){
  body.classList.add('dark');
  themeBtn.textContent = '🌞';
}
themeBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
  themeBtn.textContent = body.classList.contains('dark') ? '🌞' : '🌙';
});

// Scroll Reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
});
document.querySelectorAll('section').forEach(sec => observer.observe(sec));

// Back to Top Button
const btn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  btn.style.display = window.scrollY > 300 ? 'block' : 'none';
});
btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
