// ---- Count-up animation for stats ----
function countUp(el, target, suffix){
  const dur = 1400, start = performance.now();
  const decimals = target % 1 !== 0 ? 1 : 0;
  function tick(now){
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = (target * eased).toFixed(decimals) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

async function load(){
  const c = await (await fetch("/api/company")).json();

  // Hero
  document.getElementById("heroLead").textContent = c.intro;
  document.getElementById("heroMeta").innerHTML = `
    <div class="hm"><b>${(c.platforms||["iOS","Android"]).join(" · ")}</b>Platforms</div>
    <div class="hm"><b>${c.hq.split(",")[0]}</b>Headquarters</div>
    <div class="hm"><b>${c.business ? c.business.length : 3}</b>Revenue models</div>`;

  // Stats (with count-up once visible)
  const stats = document.getElementById("stats");
  stats.innerHTML = c.stats.map(s=>
    `<div class="stat"><div class="v" data-target="${s.value}" data-suffix="${s.suffix}">0</div><div class="l">${s.label}</div></div>`).join("");

  // About
  document.getElementById("aboutText").textContent =
    `Founded in ${c.founded} in ${c.hq}, ${c.name} is a ${c.tagline.toLowerCase()}. ${c.intro}`;

  // Services
  document.getElementById("serviceGrid").innerHTML = c.services.map(s=>
    `<div class="svc reveal"><div class="ico">${s.icon}</div><h3>${s.title}</h3><p>${s.desc}</p></div>`).join("");

  // Business models
  document.getElementById("bizGrid").innerHTML = c.business.map(b=>
    `<div class="biz reveal">
      <div class="biz-top"><div class="biz-ico">${b.icon}</div><span class="biz-tag">${b.tag}</span></div>
      <h3>${b.title}</h3><p>${b.desc}</p></div>`).join("");

  // Products
  document.getElementById("productGrid").innerHTML = c.products.map(p=>
    `<div class="prod reveal"><div class="pico">${p.icon}</div><h3>${p.name}</h3>
      <div class="cat">${p.category}</div><div class="desc">${p.desc}</div>
      <div class="rate">★ ${p.rating}</div></div>`).join("");

  // Values
  document.getElementById("valueGrid").innerHTML = c.values.map((v,i)=>
    `<div class="val reveal"><div class="num">0${i+1}</div><h3>${v.title}</h3><p>${v.desc}</p></div>`).join("");

  // Contact
  document.getElementById("ctaMail").href = `mailto:${c.email}`;
  document.getElementById("footInfo").innerHTML =
    `<span>📍 ${c.hq}</span><span>✉ ${c.email}</span><span>🗓 Since ${c.founded}</span>`;

  initReveal();
}

// ---- Scroll reveal + stat trigger ----
function initReveal(){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      e.target.classList.add("in");
      if(e.target.id === "stats"){
        e.target.querySelectorAll(".v").forEach(v=>
          countUp(v, parseFloat(v.dataset.target), v.dataset.suffix));
      }
      io.unobserve(e.target);
    });
  }, { threshold:.18 });
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
}

// ---- Scroll progress bar ----
const bar = document.getElementById("scrollProgress");
function onScroll(){
  const h = document.documentElement;
  const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
  bar.style.width = (p * 100) + "%";
}
window.addEventListener("scroll", onScroll, { passive:true });

// ---- Subtle 3D tilt on the phone (pointer parallax) ----
function initTilt(){
  const phone = document.querySelector(".phone");
  const wrap = document.querySelector(".hero-visual");
  if(!phone || !wrap || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  wrap.addEventListener("pointermove", (e)=>{
    const r = wrap.getBoundingClientRect();
    const x = (e.clientX - r.left)/r.width - .5;
    const y = (e.clientY - r.top)/r.height - .5;
    phone.style.transform = `rotate(-4deg) rotateY(${x*12}deg) rotateX(${-y*12}deg)`;
  });
  wrap.addEventListener("pointerleave", ()=>{ phone.style.transform = "rotate(-4deg)"; });
}

load().then(initTilt);
