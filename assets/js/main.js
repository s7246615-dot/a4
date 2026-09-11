/* MetricBrainCliff Main JavaScript */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Drawer Toggle
  const toggleBtn = document.getElementById('mobile-toggle');
  const closeBtn = document.getElementById('drawer-close');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');

  function openDrawer() {
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  // FAQ Accordions
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      item.classList.toggle('active');
    });
  });

  // Interactive Cognitive Retention Cliff & Spaced Retrieval Calculator
  const disciplineSelect = document.getElementById('discipline-select');
  const daysInput = document.getElementById('days-input');
  const reviewsSelect = document.getElementById('reviews-select');
  const retentionScoreEl = document.getElementById('retention-score');
  const decayCategoryEl = document.getElementById('decay-category');
  const daysValEl = document.getElementById('days-val');

  function updateRetentionCalc() {
    if (!disciplineSelect || !daysInput || !reviewsSelect) return;
    const stabilityFactor = parseFloat(disciplineSelect.value) || 1.0;
    const elapsedDays = parseInt(daysInput.value) || 7;
    const reviewBonus = parseFloat(reviewsSelect.value) || 1.0;

    if (daysValEl) daysValEl.textContent = elapsedDays + ' Days';

    // Ebbinghaus modified power retention formula: R = e^(-t / (S * N))
    const sEff = stabilityFactor * reviewBonus * 8.5;
    const retention = Math.round(100 * Math.exp(-elapsedDays / sEff));
    const normalized = Math.min(Math.max(retention, 14), 98);

    if (retentionScoreEl) retentionScoreEl.textContent = normalized + ' %';
    if (decayCategoryEl) {
      if (normalized > 75) {
        decayCategoryEl.textContent = 'Stable Synaptic Consolidation (Overlearning Band)';
      } else if (normalized > 45) {
        decayCategoryEl.textContent = 'Active Retention Cliff (Immediate Retrieval Required)';
      } else {
        decayCategoryEl.textContent = 'Synaptic Decay Threshold (Full Re-Encoding Mandated)';
      }
    }
  }

  if (disciplineSelect && daysInput && reviewsSelect) {
    disciplineSelect.addEventListener('change', updateRetentionCalc);
    daysInput.addEventListener('input', updateRetentionCalc);
    reviewsSelect.addEventListener('change', updateRetentionCalc);
    updateRetentionCalc();
  }

  // Admissions Form Handler
  const admissionsForm = document.getElementById('admissions-form');
  if (admissionsForm) {
    admissionsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for submitting your fellowship application to MetricBrainCliff Institute. Our admissions committee will review your dossier and respond within 48 hours.');
      admissionsForm.reset();
    });
  }
});
