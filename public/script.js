// Mobile Menu Toggle
const menuBtn = document.querySelector('.menubtn');
const nav = document.querySelector('#nav');
menuBtn?.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('#nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
document.querySelector('#year').textContent = new Date().getFullYear();

// Scroll Spy Active Link
const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('#nav a')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) links.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`)); });
}, {rootMargin:'-25% 0px -60% 0px'});
sections.forEach(section => observer.observe(section));

// Bilingual Language Switcher (EN / HI)
const langBtns = document.querySelectorAll('.lang-btn');
function setLanguage(lang) {
  langBtns.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else {
        el.innerHTML = text;
      }
    }
  });
}
langBtns.forEach(btn => {
  btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

// Product Category Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('#product-grid .product');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.filter;
    filterBtns.forEach(b => b.classList.toggle('active', b === btn));
    productCards.forEach(card => {
      const match = category === 'all' || card.dataset.category === category;
      card.classList.toggle('hidden', !match);
    });
  });
});

// Interactive Crop Solutions Advisory Data
const cropData = {
  Rice: { title: '🌾 Rice (Paddy / धान)', stages: 'Basal / Transplanting (0–15 DAT), Active Tillering (20–40 DAT).', issues: 'Early weed competition, stem borer, leaf folder.', products: 'RootMax GR (Basal), KisanWeed Clean, Humistar + AgriShield Duo.' },
  Wheat: { title: '🌿 Wheat / गेहूँ', stages: 'CRI Root Stage (20–25 DAS), Tillering (35–45 DAS), Grain Filling.', issues: 'Phalaris minor, yellow rust, aphids.', products: 'Bhoomistar, KisanWeed Clean, Humistar + ZymeBoost Gold.' },
  Maize: { title: '🌽 Maize / मक्का', stages: 'Knee-High Stage (20–30 DAS), Tasseling & Silking.', issues: 'Fall armyworm, early weed flush.', products: 'RootMax GR, AgriShield Duo, ZymeBoost Gold.' },
  Mustard: { title: '🌼 Mustard / सरसों', stages: 'Rosette / Branching (25–35 DAS), Flowering.', issues: 'Painted bug, aphids, sulphur/boron deficiency.', products: 'Bhoomistar, Humistar, ZymeBoost Gold + AgriShield Duo.' },
  Sugarcane: { title: '🌱 Sugarcane / गन्ना', stages: 'Sett Germination, Tillering / Formative Stage (45–120 DAP).', issues: 'Early shoot borer, top borer, red rot stress.', products: 'Bhoomistar + RootMax GR, Humistar, AgriShield Duo.' },
  Chana: { title: '🫘 Chana / चना', stages: 'Vegetative Branching, Pre-Flowering (45–55 DAS).', issues: 'Wilt stress, pod borer (Helicoverpa).', products: 'Bhoomistar, ZymeBoost Gold, AgriShield Duo.' },
  Soybean: { title: '🌱 Soybean / सोयाबीन', stages: 'Early Vegetative, Flowering (35–45 DAS), Pod Filling.', issues: 'Grassy weeds, stem fly, girdle beetle.', products: 'KisanWeed Clean, Humistar, ZymeBoost Gold.' },
  Moong: { title: '🌿 Moong / मूंग', stages: 'Trifoliate Stage, Bud & Flowering (30–40 DAS).', issues: 'Whitefly, yellow mosaic stress, thrips.', products: 'Humistar, AgriShield Duo, ZymeBoost Gold.' },
  Bhindi: { title: '🌶️ Bhindi / भिंडी', stages: 'Vegetative Growth, Continuous Flowering & Multi-Picking.', issues: 'Jassids, whitefly, fruit borer.', products: 'Bhoomistar, Humistar + ZymeBoost Gold, AgriShield Duo.' },
  Potato: { title: '🥔 Potato / आलू', stages: 'Sprouting, Tuber Initiation (35–50 DAP), Tuber Bulking.', issues: 'Early/late blight, black scurf.', products: 'Bhoomistar + RootMax GR, Humistar, ZymeBoost Gold.' },
  Onion: { title: '🧅 Onion / प्याज', stages: 'Bulb Initiation (30–45 DAT), Bulb Development.', issues: 'Thrips, purple blotch, tip burn.', products: 'Bhoomistar, Humistar, AgriShield Duo + ZymeBoost Gold.' }
};

const cropBtns = document.querySelectorAll('.crop-btn');
const cropTitle = document.getElementById('crop-title');
const cropStages = document.getElementById('crop-stages');
const cropIssues = document.getElementById('crop-issues');
const cropProducts = document.getElementById('crop-products');
const cropSupportBtn = document.getElementById('crop-support-btn');
const supportCropSelect = document.querySelector('#farmer-support select');
const cropReadMoreBtn = document.getElementById('crop-read-more-btn'); // READ MORE BUTTON LINKED

cropBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const cropKey = btn.dataset.crop;
    const info = cropData[cropKey];
    if (!info) return;
    
    // Manage Active State
    cropBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update Crop Details
    cropTitle.textContent = info.title;
    cropStages.innerHTML = `<b>Key Stages:</b> ${info.stages}`;
    cropIssues.innerHTML = `<b>Watch Out For:</b> ${info.issues}`;
    cropProducts.innerHTML = `<b>Suggested Solutions (Temp):</b> ${info.products}`;
    
    // Update 'Ask an Expert' Button
    if (cropSupportBtn) {
      cropSupportBtn.textContent = `Ask an Expert About ${cropKey} →`;
      cropSupportBtn.dataset.crop = cropKey;
    }
    
    // Update 'Read More' Button Href for Django Backend
    if (cropReadMoreBtn) {
      cropReadMoreBtn.href = `/crop-details/${cropKey.toLowerCase()}/`;
    }
  });
});

cropSupportBtn?.addEventListener('click', () => {
  const selectedCrop = cropSupportBtn.dataset.crop;
  if (supportCropSelect && selectedCrop) supportCropSelect.value = selectedCrop;
});

// Knowledge Hub Checklist Toggles
document.querySelectorAll('.learn-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const moreBox = btn.previousElementSibling;
    const isHidden = moreBox.hasAttribute('hidden');
    if (isHidden) {
      moreBox.removeAttribute('hidden');
      btn.textContent = 'Hide field checklist ↑';
    } else {
      moreBox.setAttribute('hidden', '');
      btn.textContent = 'Read field checklist ↓';
    }
  });
});

// Backend Lead Engine (Saves to SQLite DB + Opens WhatsApp)
const LEAD_CONFIG = { salesWhatsApp: '919795565890', agronomyWhatsApp: '919795565890', hrWhatsApp: '919795565890' };
document.querySelectorAll('form.lead-form:not(#verify-form)').forEach(form => {
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const type = form.dataset.formType || 'GEN';
    const formData = Object.fromEntries(new FormData(form).entries());
    const btn = form.querySelector('button[type="submit"]');
    const note = form.querySelector('.formnote');

    if (btn) btn.textContent = 'Saving...';

    try {
      const response = await fetch('/api/leads/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, ...formData })
      });
      const data = await response.json();
      const leadId = data.leadId || `AG-${type.slice(0,3)}-${Math.floor(1000 + Math.random() * 9000)}`;

      const targetPhone = type === 'FARMER' ? LEAD_CONFIG.agronomyWhatsApp : type === 'CAREER' ? LEAD_CONFIG.hrWhatsApp : LEAD_CONFIG.salesWhatsApp;
      const messageText = `*Enquiry Reference: ${leadId}*\n*Name:* ${formData.name || formData.business}\n*Phone:* ${formData.phone || formData.email || ''}\n*Type:* ${type}`;
      const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(messageText)}`;

      if (btn) btn.textContent = `✓ Saved in DB (${leadId})`;
      if (note) {
        note.className = 'formnote success-box';
        note.innerHTML = `<b>Ref: ${leadId}</b> — Saved to Server! Opening WhatsApp... <a href="${waUrl}" target="_blank" rel="noopener" style="text-decoration:underline;font-weight:800;">Click here if WhatsApp didn't open →</a>`;
      }
      window.open(waUrl, '_blank', 'noopener');
      form.reset();
    } catch (err) {
      if (note) note.innerHTML = `<span style="color:red;">Server error. Please try again.</span>`;
    }
  });
});

// Backend 3-State Scratch Verification Engine
const verifyForm = document.getElementById('verify-form');
const verifyProduct = document.getElementById('verify-product');
const verifyCodeInput = document.getElementById('verify-code');
const verifyResult = document.getElementById('verify-result');

document.querySelectorAll('.code-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    if (verifyProduct) verifyProduct.value = chip.dataset.prod;
    if (verifyCodeInput) verifyCodeInput.value = chip.dataset.code;
    verifyForm?.requestSubmit();
  });
});

document.addEventListener('click', async (e) => {
  if (e.target && e.target.id === 'reset-verify-demo') {
    await fetch('/api/reset-demo/', { method: 'POST' });
    if (verifyResult) {
      verifyResult.hidden = false;
      verifyResult.className = 'verify-result state-genuine';
      verifyResult.innerHTML = '<b>✓ Server Database Reset!</b> Fresh test codes are back to 0 scans.';
    }
  }
});

verifyForm?.addEventListener('submit', async event => {
  event.preventDefault();
  const enteredCode = verifyCodeInput.value.trim().toUpperCase();
  const selectedProd = verifyProduct.value;

  verifyResult.hidden = false;
  verifyResult.className = 'verify-result';
  verifyResult.innerHTML = 'Checking server database...';

  try {
    const response = await fetch('/api/verify/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product: selectedProd, code: enteredCode })
    });
    const result = await response.json();

    if (result.status === 'mismatch') {
      verifyResult.className = 'verify-result state-fake';
      verifyResult.innerHTML = `<h4>❌ Product Mismatch!</h4><p>Code <b>${result.code}</b> is genuine, but it belongs to <b>${result.actualProduct}</b>, NOT ${result.selectedProduct}.</p><p>Please double-check your packet.</p>`;
    } else if (result.status === 'fake') {
      verifyResult.className = 'verify-result state-fake';
      verifyResult.innerHTML = `<h4>❌ Product Not Verified — Fake / Invalid!</h4><p>Code <b>${result.code}</b> does not match any genuine AgriGrowth batch record in our central database.</p><a class="verify-report-btn" href="https://wa.me/919795565890?text=${encodeURIComponent('FAKE CODE ALERT: ' + result.code)}" target="_blank" rel="noopener">🚨 Report Fake Product on WhatsApp →</a>`;
    } else if (result.status === 'already_verified') {
      verifyResult.className = 'verify-result state-already';
      verifyResult.innerHTML = `<h4>⚠️ Genuine Product — But Already Verified Earlier!</h4><p>Code <b>${result.code}</b> is authentic, but was <b>already verified earlier</b> (Scan #${result.scanCount}).</p><div class="meta-list"><span><b>First Verified On:</b> ${result.firstVerifiedAt}</span><span><b>Product:</b> ${result.product} (${result.packSize})</span><span><b>Batch:</b> ${result.batch}</span></div>`;
    } else if (result.status === 'genuine') {
      verifyResult.className = 'verify-result state-genuine';
      verifyResult.innerHTML = `<h4>✅ Genuine Product Verified!</h4><p>Your scratch code <b>${result.code}</b> is 100% authentic and verified for the <b>first time</b>.</p><div class="meta-list"><span><b>Product:</b> ${result.product} (${result.packSize})</span><span><b>Batch:</b> ${result.batch}</span><span><b>Mfg / Exp:</b> ${result.mfg} / ${result.exp}</span></div>`;
    }
  } catch (error) {
    verifyResult.className = 'verify-result state-fake';
    verifyResult.innerHTML = `<h4>⚠️ Connection Error</h4><p>Could not connect to verification server. Make sure Node.js server is running.</p>`;
  }
});

// Cinematic Reveal Animation Observer
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target); 
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

revealElements.forEach(el => revealObserver.observe(el));