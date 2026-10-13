/**
 * ===================================================================
 * MONISH TM - PORTFOLIO INTERACTIVE SCRIPTS
 * Senior QA Automation Engineer | SDET Specialist
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initParticles();
  initTypewriter();
  initNavScroll();
  initMobileMenu();
  initStatsCounters();
  initTestRunner();
  initCopyButtons();
  initResumeModal();
  initContactForm();
  initBackToTop();
});

/* ===================================================================
   1. THEME TOGGLE (DARK / LIGHT)
   =================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('monish_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(toggleBtn, savedTheme);

  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('monish_theme', nextTheme);
    updateThemeIcon(toggleBtn, nextTheme);
    showToast(`Switched to ${nextTheme === 'dark' ? 'Dark Cyber' : 'Light Slate'} theme`, 'info');
  });
}

function updateThemeIcon(btn, theme) {
  if (theme === 'light') {
    btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    btn.setAttribute('aria-label', 'Switch to Dark Mode');
  } else {
    btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    btn.setAttribute('aria-label', 'Switch to Light Mode');
  }
}

/* ===================================================================
   2. INTERACTIVE PARTICLES & NETWORK CANVAS
   =================================================================== */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particlesCount = Math.min(Math.floor(width / 22), 65);
  const particles = [];

  for (let i = 0; i < particlesCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 1.8 + 0.8,
      color: Math.random() > 0.4 ? 'rgba(0, 242, 254, ' : 'rgba(139, 92, 246, '
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '0.45)';
      ctx.fill();

      // Connect adjacent nodes
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${0.12 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

/* ===================================================================
   3. TYPEWRITER EFFECT
   =================================================================== */
function initTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  const phrases = [
    'Senior QA Automation Engineer',
    'SDET & Test Automation Specialist',
    'Playwright & TypeScript Practitioner',
    'Selenium WebDriver & Java Architect',
    'RestAssured API Automation Engineer',
    'Azure CI/CD & BDD Quality Enabler'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function type() {
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      el.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 35;
    } else {
      el.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 75;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      typingSpeed = 1800; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typingSpeed = 400; // Pause before new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ===================================================================
   4. NAVIGATION SCROLL & ACTIVE SPY
   =================================================================== */
function initNavScroll() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    if (scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Nav Spy
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

/* ===================================================================
   5. STATS ANIMATED COUNTERS
   =================================================================== */
function initStatsCounters() {
  const counters = document.querySelectorAll('.counter-val');
  let animated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          counters.forEach((counter) => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const suffix = counter.getAttribute('data-suffix') || '';
            const decimals = counter.getAttribute('data-decimals') ? parseInt(counter.getAttribute('data-decimals')) : 0;
            animateValue(counter, 0, target, 1600, suffix, decimals);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  const statsSection = document.getElementById('hero-stats');
  if (statsSection) observer.observe(statsSection);
}

function animateValue(obj, start, end, duration, suffix = '', decimals = 0) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentVal = start + easeProgress * (end - start);
    
    obj.innerHTML = (decimals > 0 ? currentVal.toFixed(decimals) : Math.floor(currentVal)) + suffix;

    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      obj.innerHTML = (decimals > 0 ? end.toFixed(decimals) : end) + suffix;
    }
  };
  window.requestAnimationFrame(step);
}

/* ===================================================================
   6. INTERACTIVE SDET TEST RUNNER CONSOLE
   =================================================================== */
const TEST_SUITES = {
  mercedes: {
    name: 'Mercedes-Benz MB.OS E2E Suite',
    framework: 'Playwright + TypeScript',
    client: 'Microgenesis / Mercedes-Benz',
    env: 'QA / MB.OS Simulation',
    totalTests: 32,
    durationMs: 2400,
    steps: [
      { type: 'info', text: 'Initializing Playwright Chromium headless context (v1.44.0)...' },
      { type: 'step', text: 'Feature: MB.OS In-Car Apps & OTA Firmware Telemetry Pipeline' },
      { type: 'info', text: '  [Hook] Connecting to ECU Mock Server (Port 9082)... Connected.' },
      { type: 'success', text: '  ✓ Scenario 1: Verify OTA Package Signing & Handshake Token (142ms)' },
      { type: 'success', text: '  ✓ Scenario 2: Validate In-Car Navigation Satellite Latency Ping (88ms)' },
      { type: 'success', text: '  ✓ Scenario 3: Verify Mercedes Me App Auth Token Refresh Callback (112ms)' },
      { type: 'success', text: '  ✓ Scenario 4: Assert In-Vehicle Infotainment Climate State Sync (95ms)' },
      { type: 'success', text: '  ✓ Scenario 5: Validate Over-The-Air Firmware Delta Patch Rollback (210ms)' },
      { type: 'info', text: '  Executing Integration Test Flow: Prob Testing for ECU Bus Matrix...' },
      { type: 'success', text: '  ✓ Scenario 6: CAN-Bus Message Frame Validation for Driver Assistance (120ms)' },
      { type: 'success', text: '  ✓ Scenario 7: Validate Real-time Diagnostics Sensor Failure Alarm (90ms)' },
      { type: 'success', text: '  ✓ Scenario 8: Assert Zero Critical Leaks in MBOS Studio Runtime (165ms)' },
      { type: 'info', text: 'Generating Allure & HTML Execution Report...' },
      { type: 'success', text: '▶ PASSED: 32 tests passed across 4 parallel browser workers (2.4s) | 0 Failures' }
    ]
  },
  allstate: {
    name: 'Allstate Insurance Policy Regression Suite',
    framework: 'Selenium WebDriver + Java + TestNG',
    client: 'Autozo / Allstate',
    env: 'STG / Regulatory Compliance',
    totalTests: 48,
    durationMs: 2800,
    steps: [
      { type: 'info', text: 'Starting TestNG Runner with testng-regression.xml (Thread Count: 4)...' },
      { type: 'step', text: 'Class: com.allstate.qa.policy.PolicyCreationAndLifecycleTest' },
      { type: 'info', text: '  [Setup] Initializing Selenium RemoteWebDriver with ChromeOptions...' },
      { type: 'success', text: '  ✓ testNewPolicyQuoteGeneration_AutoVehicle: Passed (280ms)' },
      { type: 'success', text: '  ✓ testUnderwritingRuleVerification_StateCompliance: Passed (310ms)' },
      { type: 'success', text: '  ✓ testPremiumCalculationEngine_WithDiscounts: Passed (190ms)' },
      { type: 'success', text: '  ✓ testPolicyEndorsementAdditionAndRateAdjustment: Passed (240ms)' },
      { type: 'info', text: 'Class: com.allstate.qa.policy.ClaimsIntegrationFlowTest' },
      { type: 'success', text: '  ✓ testFirstNoticeOfLossClaimCreation: Passed (350ms)' },
      { type: 'success', text: '  ✓ testDeductibleThresholdVerification: Passed (175ms)' },
      { type: 'success', text: '  ✓ testPolicyRenewalSmokeVerification: Passed (210ms)' },
      { type: 'info', text: '  Defect Tracking: Synchronizing execution status with JIRA / Azure DevOps...' },
      { type: 'success', text: '▶ PASSED: 48 tests passed (0 failures, 0 skipped, 100% compliance met)' }
    ]
  },
  medvol: {
    name: 'Medvol Pharma Supply Chain API Suite',
    framework: 'RestAssured + Cucumber BDD + Java',
    client: 'Medvol Data Solutions',
    env: 'PROD Verification / Multi-City',
    totalTests: 24,
    durationMs: 2200,
    steps: [
      { type: 'info', text: 'Running Cucumber BDD Runner: cucumber-jvm-restassured.opts' },
      { type: 'step', text: 'Feature: Pharma Distributor Order & Real-Time Discount Engine' },
      { type: 'info', text: '  Given Target Endpoint: https://api.medvol.in/v2/orders' },
      { type: 'success', text: '  ✓ When POST /orders with valid stockist payload -> 201 Created (110ms)' },
      { type: 'success', text: '  ✓ Then Validate JSON Schema against medvol-order-schema.json -> MATCH (45ms)' },
      { type: 'success', text: '  ✓ When GET /distributor/discount-slabs for Chennai Region -> 200 OK (80ms)' },
      { type: 'success', text: '  ✓ Then Assert calculated tiered discount margin = 14.25% -> MATCH (35ms)' },
      { type: 'step', text: 'Feature: Cold-Chain Logistics & Inventory Synchronization' },
      { type: 'success', text: '  ✓ When PUT /inventory/batch-reconciliation -> 200 OK (160ms)' },
      { type: 'success', text: '  ✓ Then Verify zero stock mismatch across 12 distributor hubs (95ms)' },
      { type: 'info', text: 'Publishing ExtentReports Dashboard to Confluence workspace...' },
      { type: 'success', text: '▶ PASSED: 24 API Scenarios passed (Contract Integrity 100%)' }
    ]
  },
  wayfair: {
    name: 'Wayfair E-Commerce Checkout Suite',
    framework: 'Selenium WebDriver + Data-Driven',
    client: 'Powersoft / Wayfair',
    env: 'QA / High-Volume Cluster',
    totalTests: 36,
    durationMs: 2500,
    steps: [
      { type: 'info', text: 'Launching Apache Maven Test Lifecycle: `mvn clean test -Dsuite=e2e`' },
      { type: 'step', text: 'Test Suite: Wayfair Customer Catalog Browsing & Cart Checkout' },
      { type: 'info', text: '  Loading Test Data from Excel / JSON Dataprovider (36 iterations)...' },
      { type: 'success', text: '  ✓ testBrowseFurnitureCategory_FilterByRating: Passed (220ms)' },
      { type: 'success', text: '  ✓ testProductDetail_SelectDimensionsAndVariant: Passed (190ms)' },
      { type: 'success', text: '  ✓ testAddToCart_ValidateCartSubtotalAndTaxes: Passed (210ms)' },
      { type: 'success', text: '  ✓ testGuestCheckout_ApplyPromoCodeDiscount: Passed (330ms)' },
      { type: 'success', text: '  ✓ testMultiAddressShippingEstimation: Passed (250ms)' },
      { type: 'success', text: '  ✓ testPaymentGatewayMockHandshake: Passed (290ms)' },
      { type: 'info', text: 'Archiving screenshots and video traces for review...' },
      { type: 'success', text: '▶ PASSED: 36 / 36 scenarios executed successfully. Build Status: GREEN' }
    ]
  }
};

function initTestRunner() {
  const runBtn = document.getElementById('run-suite-btn');
  const resetBtn = document.getElementById('reset-suite-btn');
  const suiteSelect = document.getElementById('test-suite-select');
  const terminal = document.getElementById('terminal-logs');
  const progressBar = document.getElementById('test-progress-bar');
  const metricTests = document.getElementById('metric-tests-run');
  const metricPassed = document.getElementById('metric-tests-passed');
  const metricTime = document.getElementById('metric-exec-time');
  const metricStatus = document.getElementById('metric-suite-status');
  const metricFramework = document.getElementById('metric-framework-label');

  if (!runBtn || !suiteSelect || !terminal) return;

  let isRunning = false;
  let timerInterval = null;

  function updateSuiteMeta() {
    const suiteKey = suiteSelect.value;
    const suite = TEST_SUITES[suiteKey] || TEST_SUITES.mercedes;
    if (metricFramework) metricFramework.textContent = suite.framework;
  }

  suiteSelect.addEventListener('change', () => {
    if (isRunning) return;
    updateSuiteMeta();
    resetConsole();
  });

  updateSuiteMeta();

  function resetConsole() {
    terminal.innerHTML = `
      <div class="log-line"><span class="log-prefix">ready &gt;</span> Select a test suite and click <strong style="color:var(--accent-cyan)">"Run Test Suite"</strong> to simulate automated execution.</div>
      <div class="log-line"><span class="log-prefix">stack &gt;</span> Powered by Selenium WebDriver &bull; Playwright &bull; Java &bull; TypeScript &bull; RestAssured</div>
    `;
    if (progressBar) progressBar.style.width = '0%';
    if (metricTests) metricTests.textContent = '0 / 0';
    if (metricPassed) metricPassed.textContent = '0';
    if (metricTime) metricTime.textContent = '0.00s';
    if (metricStatus) {
      metricStatus.textContent = 'IDLE';
      metricStatus.style.color = '#94a3b8';
    }
  }

  resetBtn?.addEventListener('click', () => {
    if (isRunning) return;
    resetConsole();
  });

  runBtn.addEventListener('click', () => {
    if (isRunning) return;
    isRunning = true;
    runBtn.disabled = true;
    runBtn.innerHTML = `<span class="status-dot"></span> Executing...`;

    const suiteKey = suiteSelect.value;
    const suite = TEST_SUITES[suiteKey] || TEST_SUITES.mercedes;

    terminal.innerHTML = '';
    if (metricStatus) {
      metricStatus.textContent = 'RUNNING';
      metricStatus.style.color = '#38bdf8';
    }

    let startTime = Date.now();
    timerInterval = setInterval(() => {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
      if (metricTime) metricTime.textContent = `${elapsed}s`;
    }, 50);

    const steps = suite.steps;
    const totalSteps = steps.length;
    let stepIndex = 0;

    function executeNextStep() {
      if (stepIndex >= totalSteps) {
        // Complete
        clearInterval(timerInterval);
        const finalElapsed = ((Date.now() - startTime) / 1000).toFixed(2);
        if (metricTime) metricTime.textContent = `${finalElapsed}s`;
        if (progressBar) progressBar.style.width = '100%';
        if (metricTests) metricTests.textContent = `${suite.totalTests} / ${suite.totalTests}`;
        if (metricPassed) metricPassed.textContent = `${suite.totalTests}`;
        if (metricStatus) {
          metricStatus.textContent = 'PASSED (100%)';
          metricStatus.style.color = '#10b981';
        }

        runBtn.disabled = false;
        runBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> Run Test Suite`;
        isRunning = false;
        showToast(`Test Suite: "${suite.name}" passed with 100% success!`, 'success');
        return;
      }

      const step = steps[stepIndex];
      const logDiv = document.createElement('div');
      logDiv.className = 'log-line';

      const timeStr = new Date().toTimeString().split(' ')[0];
      const prefix = `<span class="log-prefix">[${timeStr}]</span> `;

      if (step.type === 'info') {
        logDiv.innerHTML = `${prefix}<span class="log-info">${step.text}</span>`;
      } else if (step.type === 'step') {
        logDiv.innerHTML = `${prefix}<span class="log-step"><strong>${step.text}</strong></span>`;
      } else if (step.type === 'success') {
        logDiv.innerHTML = `${prefix}<span class="log-success">${step.text}</span>`;
      } else {
        logDiv.innerHTML = `${prefix}${step.text}`;
      }

      terminal.appendChild(logDiv);
      terminal.scrollTop = terminal.scrollHeight;

      // Update progress
      stepIndex++;
      const pct = Math.floor((stepIndex / totalSteps) * 100);
      if (progressBar) progressBar.style.width = `${pct}%`;

      const currentTests = Math.floor((stepIndex / totalSteps) * suite.totalTests);
      if (metricTests) metricTests.textContent = `${currentTests} / ${suite.totalTests}`;
      if (metricPassed) metricPassed.textContent = `${currentTests}`;

      const delay = Math.floor(Math.random() * 120 + 90);
      setTimeout(executeNextStep, delay);
    }

    executeNextStep();
  });
}

/* ===================================================================
   7. COPY TO CLIPBOARD BUTTONS
   =================================================================== */
function initCopyButtons() {
  const copyElements = document.querySelectorAll('[data-copy]');
  copyElements.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = el.getAttribute('data-copy');
      const label = el.getAttribute('data-copy-label') || 'Text';

      navigator.clipboard.writeText(textToCopy).then(
        () => {
          showToast(`Copied ${label} to clipboard: "${textToCopy}"`, 'success');
        },
        () => {
          // Fallback
          const temp = document.createElement('textarea');
          temp.value = textToCopy;
          document.body.appendChild(temp);
          temp.select();
          document.execCommand('copy');
          document.body.removeChild(temp);
          showToast(`Copied ${label} to clipboard!`, 'success');
        }
      );
    });
  });
}

/* ===================================================================
   8. RESUME MODAL VIEWER
   =================================================================== */
function initResumeModal() {
  const modalBackdrop = document.getElementById('resume-modal');
  const openButtons = document.querySelectorAll('.open-resume-btn');
  const closeButton = document.getElementById('close-resume-btn');
  const printButton = document.getElementById('print-resume-btn');

  if (!modalBackdrop) return;

  function openModal() {
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach((btn) => btn.addEventListener('click', openModal));
  closeButton?.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });

  printButton?.addEventListener('click', () => {
    window.print();
  });
}

/* ===================================================================
   9. CONTACT FORM INTERACTION
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const msgInput = document.getElementById('contact-message');
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!nameInput?.value.trim() || !emailInput?.value.trim() || !msgInput?.value.trim()) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `Sending message...`;
    }

    setTimeout(() => {
      showToast(`Thank you ${nameInput.value.trim()}! Your message has been sent successfully.`, 'success');
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `Send Message`;
      }
    }, 900);
  });
}

/* ===================================================================
   10. BACK TO TOP BUTTON
   =================================================================== */
function initBackToTop() {
  const backBtn = document.getElementById('back-to-top');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 450) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  });

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===================================================================
   11. TOAST NOTIFICATION UTILITY
   =================================================================== */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let icon = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
  `;
  if (type === 'success') {
    icon = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
    `;
  } else if (type === 'error') {
    icon = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
    `;
  }

  toast.innerHTML = `
    <span style="display:flex; align-items:center;">${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
