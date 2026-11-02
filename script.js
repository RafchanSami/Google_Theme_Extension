const form = document.getElementById('searchForm');
const input = document.getElementById('searchInput');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = input.value.trim();
  if (!query) return;
  const looksLikeUrl = /^(https?:\/\/|localhost(:\d+)?$|[\w-]+\.[a-z]{2,})(\/.*)?$/i.test(query);
  window.location.href = looksLikeUrl
    ? (query.startsWith('http') ? query : `https://${query}`)
    : `https://www.google.com/search?q=${encodeURIComponent(query)}`;
});

const clock = document.getElementById('clock');
const dateText = document.getElementById('dateText');
function updateTime() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  dateText.textContent = now.toLocaleDateString([], {weekday:'short', month:'short', day:'numeric'}).toUpperCase() + '  /  READY TO CREATE';
}
updateTime();
setInterval(updateTime, 30000);

const toggle = document.getElementById('motionToggle');
toggle.addEventListener('click', () => {
  const paused = document.body.classList.toggle('paused');
  toggle.textContent = paused ? '▶ RESUME FX' : 'Ⅱ PAUSE FX';
  toggle.setAttribute('aria-pressed', String(paused));
});

// Lightweight Matrix-style code rain. Resizes with the new-tab window.
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
const glyphs = '01{}[]<>/;=+-constfunction';
let columns = 0;
let drops = [];
let fontSize = 15;
function resizeMatrix() {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  columns = Math.ceil(window.innerWidth / fontSize);
  drops = Array.from({length: columns}, () => Math.random() * -80);
}
function drawMatrix() {
  if (!document.body.classList.contains('paused')) {
    ctx.fillStyle = 'rgba(3, 8, 18, 0.09)';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.font = `${fontSize}px ${getComputedStyle(document.body).fontFamily}`;
    for (let i = 0; i < drops.length; i++) {
      const char = glyphs[Math.floor(Math.random() * glyphs.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      ctx.fillStyle = Math.random() > 0.975 ? '#a5f5ff' : '#087dbb';
      ctx.fillText(char, x, y);
      if (y > window.innerHeight && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 0.42;
    }
  }
  requestAnimationFrame(drawMatrix);
}
window.addEventListener('resize', resizeMatrix);
resizeMatrix();
drawMatrix();
