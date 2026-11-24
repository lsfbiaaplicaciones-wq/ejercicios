(() => {
  const STORAGE_KEY = 'ld_fit_history_v1';
  const RING_RADIUS = 40;
  const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

  let appData = null;
  let selectedDayIndex = getTodayMondayIndex();
  let currentCalDate = new Date();

  // Estado del Modo Guiado Automático
  let guidedDay = null;
  let guidedIndex = 0;
  let currentSerie = 1;
  let phase = 'WORK'; // 'PREP' | 'WORK' | 'REST'
  let timerInterval = null;
  let timerSecondsLeft = 0;
  let timerTotalSeconds = 1;
  let timerRunning = false;
  let voiceEnabled = true;

  // --- Utilidades de fecha e historial ---
  function getTodayMondayIndex() {
    const jsDay = new Date().getDay();
    return jsDay === 0 ? 6 : jsDay - 1;
  }

  function toDateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function getHistory() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  function saveHistory(hist) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(hist));
  }

  let cloudDocRef = null;
  let initialCloudSyncDone = false;

  function initCloudSync() {
    try {
      if (typeof firebase === 'undefined' || !firebase.firestore) return;
      if (!firebase.apps.length) {
        firebase.initializeApp({
          apiKey: "AIzaSyA1rL-1n7VyqIZSkiLN-rU3jkclf0kmFnQ",
          authDomain: "cuchufly-fit.firebaseapp.com",
          projectId: "cuchufly-fit",
          storageBucket: "cuchufly-fit.firebasestorage.app",
          messagingSenderId: "1015958832944",
          appId: "1:1015958832944:web:9c9f538dee179eecf0eaf5"
        });
      }
      const db = firebase.firestore();
      cloudDocRef = db.collection('families').doc('cuchufly-fit');

      cloudDocRef.onSnapshot((snap) => {
        const cloudHist = (snap.exists && snap.data() && snap.data().history) ? snap.data().history : {};
        const localHist = getHistory();

        if (!initialCloudSyncDone) {
          initialCloudSyncDone = true;
          const merged = { ...cloudHist, ...localHist };
          const hasLocalOnly = Object.keys(localHist).some((k) => !cloudHist[k]);
          if (hasLocalOnly && Object.keys(merged).length > 0) {
            cloudDocRef.set({ history: merged }, { merge: true }).catch(() => {});
          }
          saveHistory(merged);
        } else {
          saveHistory(cloudHist);
        }

        if (appData) {
          renderHeaderStreak();
          renderHoy();
          renderHistorial();
        }
      }, (err) => {
        console.warn('Firestore sync en espera:', err && err.code ? err.code : err);
      });
    } catch (err) {
      console.warn('No se pudo iniciar sync en la nube:', err);
    }
  }

  function syncDateToCloud(dateKey, entry) {
    if (!cloudDocRef) return;
    cloudDocRef.set({ history: { [dateKey]: entry } }, { merge: true }).catch(() => {});
  }

  function deleteDateFromCloud(dateKey) {
    if (!cloudDocRef || typeof firebase === 'undefined') return;
    cloudDocRef.set({
      history: { [dateKey]: firebase.firestore.FieldValue.delete() }
    }, { merge: true }).catch(() => {});
  }

  function markTodayDone(dayObj) {
    const hist = getHistory();
    const key = toDateKey(new Date());
    const entry = {
      diaId: dayObj.diaId,
      titulo: dayObj.titulo,
      tipo: dayObj.tipo,
      ts: Date.now()
    };
    hist[key] = entry;
    saveHistory(hist);
    syncDateToCloud(key, entry);
  }

  function toggleDateHistory(dateKey) {
    const hist = getHistory();
    if (hist[dateKey]) {
      delete hist[dateKey];
      saveHistory(hist);
      deleteDateFromCloud(dateKey);
    } else {
      const entry = { diaId: 'manual', titulo: 'Entrenamiento completado', tipo: 'fuerte', ts: Date.now() };
      hist[dateKey] = entry;
      saveHistory(hist);
      syncDateToCloud(dateKey, entry);
    }
    renderHeaderStreak();
    renderHoy();
    renderHistorial();
  }

  function getWeekCount(hist) {
    const now = new Date();
    const monOffset = getTodayMondayIndex();
    const monday = new Date(now);
    monday.setDate(now.getDate() - monOffset);
    monday.setHours(0, 0, 0, 0);

    let count = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      if (hist[toDateKey(d)]) count++;
    }
    return count;
  }

  function getTotalCount(hist) {
    return Object.keys(hist).length;
  }

  function getCurrentStreak(hist) {
    let streak = 0;
    const d = new Date();
    if (!hist[toDateKey(d)]) {
      d.setDate(d.getDate() - 1);
    }
    while (hist[toDateKey(d)]) {
      streak++;
      d.setDate(d.getDate() - 1);
    }
    return streak;
  }

  // --- Audio & Voz Guía ---
  function playTone(freq = 660, duration = 0.16, vol = 0.15) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration + 0.02);
    } catch {
      // Silencioso si el navegador bloquea audio
    }
  }

  function playChime() {
    playTone(660, 0.14, 0.16);
    setTimeout(() => playTone(880, 0.28, 0.18), 140);
  }

  function playStartWhistle() {
    playTone(880, 0.12, 0.22);
    setTimeout(() => playTone(1175, 0.24, 0.24), 120);
  }

  function playEndCue() {
    playTone(784, 0.14, 0.20);
    setTimeout(() => playTone(523, 0.28, 0.22), 140);
  }

  function playCountdownTick() {
    playTone(620, 0.09, 0.16);
  }

  let currentAudio = null;
  let motIndex = 0;
  let restIndex = 0;

  function stopVoice() {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }

  function playClipQueue(items, onComplete) {
    if (!voiceEnabled || !items || !items.length) {
      if (onComplete) onComplete();
      return;
    }
    stopVoice();

    const playNext = (idx) => {
      if (!voiceEnabled || idx >= items.length) {
        if (onComplete) onComplete();
        return;
      }
      const { key, fallback } = items[idx];
      const src = window.AUDIO_CLIPS && key ? window.AUDIO_CLIPS[key] : null;
      if (src) {
        currentAudio = new Audio(src);
        currentAudio.onended = () => playNext(idx + 1);
        currentAudio.onerror = () => playNext(idx + 1);
        currentAudio.play().catch(() => {
          if (onComplete) onComplete();
        });
      } else if (fallback && 'speechSynthesis' in window) {
        try {
          const utter = new SpeechSynthesisUtterance(fallback);
          utter.lang = 'es-CL';
          utter.rate = 1.02;
          utter.onend = () => playNext(idx + 1);
          window.speechSynthesis.speak(utter);
        } catch {
          playNext(idx + 1);
        }
      } else {
        playNext(idx + 1);
      }
    };

    playNext(0);
  }

  function nextMotKey() {
    motIndex = (motIndex % 6) + 1;
    return `mot_${motIndex}`;
  }

  function nextRestKey() {
    restIndex = (restIndex % 3) + 1;
    return `rest_${restIndex}`;
  }

  // --- Navegación por pestañas ---
  function setupNav() {
    const buttons = document.querySelectorAll('.nav-btn');
    const views = document.querySelectorAll('.view');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        buttons.forEach((b) => b.classList.toggle('active', b === btn));
        views.forEach((v) => v.classList.toggle('active', v.id === `view-${tab}`));

        if (tab === 'historial') renderHistorial();
        if (tab === 'semana') renderSemana();
      });
    });
  }

  function renderHeaderStreak() {
    const hist = getHistory();
    const weekCount = getWeekCount(hist);
    document.getElementById('streak-text').textContent = `${weekCount} esta sem.`;
  }

  // --- Render HOY ---
  function renderDayPills() {
    const container = document.getElementById('day-pills');
    container.innerHTML = '';

    appData.semana.forEach((dia, idx) => {
      const btn = document.createElement('button');
      btn.className = `day-pill tipo-${dia.tipo} ${idx === selectedDayIndex ? 'selected' : ''}`;
      btn.innerHTML = `
        <span class="day-pill-name">${dia.diaCorto}</span>
        <span class="day-pill-dot"></span>
      `;
      btn.addEventListener('click', () => {
        selectedDayIndex = idx;
        renderHoy();
      });
      container.appendChild(btn);
    });
  }

  function getBadgeInfo(tipo) {
    if (tipo === 'fuerte') return { cls: 'badge-fuerte', label: 'Día Fuerte' };
    if (tipo === 'suave') return { cls: 'badge-suave', label: 'Día Suave' };
    return { cls: 'badge-descanso', label: 'Descanso Activo' };
  }

  function getCuchufliMessage(hist, dia, todayDone) {
    const weekCount = getWeekCount(hist);
    const totalCount = getTotalCount(hist);
    const streak = getCurrentStreak(hist);

    if (todayDone) {
      if (streak >= 3) {
        return `¡${streak} días seguidos! <strong>Cuchuflí</strong> ronronea orgullosa. Misión cumplida por hoy.`;
      }
      return `<strong>Cuchuflí</strong> celebra el entrenamiento de hoy. ¡Ahora toca descansar y jugar con ella!`;
    }

    if (streak >= 3) {
      return `¡Racha de ${streak} días! <strong>Cuchuflí</strong> ya se acomodó en el mat para ver cómo la alargan.`;
    }
    if (weekCount >= 4) {
      return `¡${weekCount} días esta semana! <strong>Cuchuflí</strong> dice que hoy cierran con broche de oro.`;
    }
    if (weekCount >= 1) {
      return `Llevan ${weekCount} ${weekCount === 1 ? 'día' : 'días'} esta semana. <strong>Cuchuflí</strong> los espera en el mat para sumar otro.`;
    }
    if (totalCount > 0) {
      return `<strong>Cuchuflí</strong> revisó sus ${totalCount} días acumulados y dice: ¡hoy es buen día para retomar!`;
    }
    if (dia.tipo === 'descanso') {
      return `Hoy toca caminata y relajo. <strong>Cuchuflí</strong> cuida el mat mientras ustedes suman pasos.`;
    }
    return `<strong>Cuchuflí</strong> ya está instalada en el mat. ¡A entrenar juntos para empezar la racha!`;
  }

  function renderHoy() {
    renderDayPills();
    const dia = appData.semana[selectedDayIndex];
    const badge = getBadgeInfo(dia.tipo);
    const hist = getHistory();
    const isTodaySelected = selectedDayIndex === getTodayMondayIndex();
    const todayDone = isTodaySelected && !!hist[toDateKey(new Date())];

    const card = document.getElementById('hoy-card-container');
    card.innerHTML = `
      <div class="hero-card">
        <div class="hero-top">
          <span class="type-badge ${badge.cls}">${dia.diaNombre} • ${badge.label}</span>
          <span class="duration-tag">⏱ ${dia.duracionMin} min</span>
        </div>
        <h2 class="hero-title">${dia.titulo}</h2>
        <p class="hero-focus">${dia.enfoque}</p>
        <div class="cuchufli-banner">
          <div class="cuchufli-banner-icon">${window.CUCHUFLI_SLEEP_SVG || ''}</div>
          <div class="cuchufli-banner-text">
            ${getCuchufliMessage(hist, dia, todayDone)}
          </div>
        </div>
        ${todayDone ? `<div class="completed-banner">✓ ¡Entrenamiento de hoy completado!</div>` : ''}
        <button class="btn-primary full-width" id="btn-start-guided">
          ${todayDone ? 'Repetir sesión juntos ▶' : 'Comenzar entrenamiento juntos ▶'}
        </button>
      </div>
    `;

    document.getElementById('btn-start-guided').addEventListener('click', () => {
      startGuidedWorkout(dia, 0);
    });

    document.getElementById('hoy-ejercicios-count').textContent = `${dia.ejercicios.length} pasos`;

    const list = document.getElementById('hoy-ejercicios-list');
    list.innerHTML = '';

    dia.ejercicios.forEach((ej, i) => {
      const row = document.createElement('div');
      row.className = 'exercise-row';
      const svg = window.EXERCISE_ILLUSTRATIONS[ej.ilustracion] || window.EXERCISE_ILLUSTRATIONS.warmup;
      row.innerHTML = `
        <div class="exercise-thumb">${svg}</div>
        <div class="exercise-row-info">
          <div class="exercise-row-block">${ej.bloque}</div>
          <div class="exercise-row-title">${ej.nombre}</div>
          <div class="exercise-row-meta">${ej.series > 1 ? `${ej.series} series • ` : ''}Lili: ${ej.lili}</div>
        </div>
      `;
      row.addEventListener('click', () => startGuidedWorkout(dia, i));
      list.appendChild(row);
    });
  }

  // --- Render SEMANA ---
  function renderSemana() {
    const container = document.getElementById('semana-list');
    container.innerHTML = '';
    const todayIdx = getTodayMondayIndex();

    appData.semana.forEach((dia, idx) => {
      const badge = getBadgeInfo(dia.tipo);
      const card = document.createElement('div');
      card.className = `week-card ${idx === todayIdx ? 'is-today' : ''}`;
      card.innerHTML = `
        <div class="week-card-left">
          <div class="week-day-label">
            <span>${dia.diaNombre}</span>
            <span class="type-badge ${badge.cls}">${badge.label}</span>
            ${idx === todayIdx ? '<span class="today-chip">Hoy</span>' : ''}
          </div>
          <div class="week-card-title">${dia.titulo}</div>
          <div class="week-card-sub">⏱ ${dia.duracionMin} min • ${dia.ejercicios.length} pasos guiados</div>
        </div>
        <div class="week-arrow">›</div>
      `;
      card.addEventListener('click', () => {
        selectedDayIndex = idx;
        document.getElementById('nav-hoy').click();
        renderHoy();
      });
      container.appendChild(card);
    });
  }

  // --- Render HISTORIAL ---
  function renderHistorial() {
    const hist = getHistory();
    const weekCount = getWeekCount(hist);
    const totalCount = getTotalCount(hist);
    const streak = getCurrentStreak(hist);

    document.getElementById('historial-stats').innerHTML = `
      <div class="stat-box">
        <div class="stat-value">${weekCount}</div>
        <div class="stat-label">Esta semana</div>
      </div>
      <div class="stat-box">
        <div class="stat-value">${streak}</div>
        <div class="stat-label">Racha (días)</div>
      </div>
      <div class="stat-box">
        <div class="stat-value">${totalCount}</div>
        <div class="stat-label">Total días</div>
      </div>
    `;

    const year = currentCalDate.getFullYear();
    const month = currentCalDate.getMonth();
    const monthName = currentCalDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

    const firstDay = new Date(year, month, 1);
    const startOffset = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayKey = toDateKey(new Date());

    let cellsHtml = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
      .map((d) => `<div class="cal-weekday">${d}</div>`)
      .join('');

    for (let i = 0; i < startOffset; i++) {
      cellsHtml += `<div class="cal-day empty"></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day);
      const key = toDateKey(dateObj);
      const isDone = !!hist[key];
      const isToday = key === todayKey;
      cellsHtml += `
        <button class="cal-day ${isDone ? 'done' : ''} ${isToday ? 'today' : ''}" data-key="${key}">
          ${day}
        </button>
      `;
    }

    const cal = document.getElementById('historial-calendar');
    cal.innerHTML = `
      <div class="cal-header">
        <div class="cal-month">${monthName}</div>
        <div class="cal-nav">
          <button id="cal-prev" aria-label="Mes anterior">‹</button>
          <button id="cal-next" aria-label="Mes siguiente">›</button>
        </div>
      </div>
      <div class="cal-grid">${cellsHtml}</div>
    `;

    document.getElementById('cal-prev').addEventListener('click', () => {
      currentCalDate.setMonth(currentCalDate.getMonth() - 1);
      renderHistorial();
    });

    document.getElementById('cal-next').addEventListener('click', () => {
      currentCalDate.setMonth(currentCalDate.getMonth() + 1);
      renderHistorial();
    });

    cal.querySelectorAll('.cal-day[data-key]').forEach((btn) => {
      btn.addEventListener('click', () => toggleDateHistory(btn.dataset.key));
    });
  }

  // --- MODO GUIADO EN VIVO (AUTOMÁTICO MANOS LIBRES) ---
  let wakeLockSentinel = null;
  let wakeLockWanted = false;

  async function requestWakeLock() {
    wakeLockWanted = true;
    if (!('wakeLock' in navigator) || !navigator.wakeLock || wakeLockSentinel) return;
    try {
      const sentinel = await navigator.wakeLock.request('screen');
      if (!wakeLockWanted) {
        sentinel.release().catch(() => {});
        return;
      }
      wakeLockSentinel = sentinel;
      sentinel.addEventListener('release', () => {
        if (wakeLockSentinel === sentinel) {
          wakeLockSentinel = null;
        }
      });
    } catch {
      // Silencioso si el dispositivo/navegador no permite Wake Lock
    }
  }

  function releaseWakeLock() {
    wakeLockWanted = false;
    if (wakeLockSentinel) {
      const sentinel = wakeLockSentinel;
      wakeLockSentinel = null;
      sentinel.release().catch(() => {});
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && wakeLockWanted) {
      requestWakeLock();
    }
  });

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    timerRunning = false;
  }

  function formatTime(sec) {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  function startGuidedWorkout(dia, startIndex = 0) {
    guidedDay = dia;
    guidedIndex = startIndex;
    currentSerie = 1;
    phase = 'PREP';
    document.getElementById('guided-overlay').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    requestWakeLock();
    loadStepAndRun();
  }

  function closeGuidedWorkout() {
    stopTimer();
    stopVoice();
    releaseWakeLock();
    document.getElementById('guided-overlay').classList.add('hidden');
    document.body.style.overflow = '';
  }

  function finishWorkout() {
    markTodayDone(guidedDay);
    closeGuidedWorkout();
    renderHeaderStreak();
    renderHoy();
    playChime();
    playClipQueue([{ key: 'done', fallback: '¡Felicitaciones Lili y Daniel! Rutina completada.' }]);
    const doneEmojiEl = document.querySelector('.done-emoji');
    if (doneEmojiEl && window.CUCHUFLI_HAPPY_SVG) {
      doneEmojiEl.innerHTML = `<div class="done-cuchufli">${window.CUCHUFLI_HAPPY_SVG}</div>`;
    }
    document.getElementById('done-summary').textContent =
      `Completaron "${guidedDay.titulo}" juntos. ¡Cuchuflí celebra con ustedes y quedó guardado en su historial!`;
    document.getElementById('done-modal').classList.remove('hidden');
  }

  let previewShownForRest = false;

  function renderStageContent(ej, isPreviewNext = false) {
    const svg = window.EXERCISE_ILLUSTRATIONS[ej.ilustracion] || window.EXERCISE_ILLUSTRATIONS.warmup;
    const stage = document.getElementById('guided-illustration');
    stage.innerHTML =
      `${svg}<div class="cuchufli-corner" title="Cuchuflí acompañando">${window.CUCHUFLI_SLEEP_SVG || ''}</div>`;
    document.getElementById('guided-title').textContent = isPreviewNext ? `⏭ Siguiente: ${ej.nombre}` : ej.nombre;
    document.getElementById('guided-lili').textContent = ej.lili;
    document.getElementById('guided-daniel').textContent = ej.daniel;
    document.getElementById('guided-tips').innerHTML = ej.tips.map((t) => `<li>${t}</li>`).join('');
  }

  function updateStageVisualState() {
    const stage = document.getElementById('guided-illustration');
    if (!stage || !guidedDay) return;

    const ej = guidedDay.ejercicios[guidedIndex];
    const total = guidedDay.ejercicios.length;
    const seriesCount = ej.series || 1;
    const oldTag = stage.querySelector('.stage-status-tag');
    if (oldTag) oldTag.remove();

    stage.classList.remove('is-paused', 'is-preview');

    const isManualPause = !timerRunning && phase !== 'PREP';
    const isRestPreview = phase === 'REST' && timerSecondsLeft <= 5 && timerRunning;

    if (isRestPreview) {
      if (currentSerie >= seriesCount && guidedIndex < total - 1 && !previewShownForRest) {
        previewShownForRest = true;
        renderStageContent(guidedDay.ejercicios[guidedIndex + 1], true);
      }
      stage.classList.add('is-preview');
      const tag = document.createElement('div');
      tag.className = 'stage-status-tag is-preview';
      tag.textContent = '⏳ Prepárate';
      stage.appendChild(tag);
      return;
    }

    if (phase === 'REST' || isManualPause) {
      stage.classList.add('is-paused');
      const tag = document.createElement('div');
      tag.className = 'stage-status-tag';
      tag.textContent = phase === 'REST' ? '⏸ Momento de pausa' : '⏸ En pausa';
      stage.appendChild(tag);
    }
  }

  function loadStepAndRun() {
    stopTimer();
    previewShownForRest = false;
    const ej = guidedDay.ejercicios[guidedIndex];
    const total = guidedDay.ejercicios.length;

    document.getElementById('guided-step-label').textContent = `Paso ${guidedIndex + 1} de ${total}`;
    document.getElementById('guided-block-badge').textContent = ej.bloque;
    document.getElementById('guided-progress-fill').style.width = `${((guidedIndex + 1) / total) * 100}%`;

    renderStageContent(ej, false);
    document.getElementById('guided-prev').disabled = guidedIndex === 0;
    document.getElementById('guided-next').textContent =
      guidedIndex === total - 1 ? 'Finalizar 🎉' : 'Siguiente →';

    if (phase === 'PREP') {
      timerTotalSeconds = 5;
      timerSecondsLeft = 5;
      renderTimerUI();
      updateStageVisualState();
      playClipQueue(
        [
          { key: 'prep_start', fallback: 'Acomódense, en cinco segundos partimos.' },
          { key: ej.audioKey, fallback: `Siguiente: ${ej.nombre}` }
        ],
        () => {
          if (phase === 'PREP' && !document.getElementById('guided-overlay').classList.contains('hidden')) {
            startCountdown();
          }
        }
      );
      return;
    } else if (phase === 'WORK') {
      const workSec = ej.tipo === 'tiempo' ? (ej.duracionSeg || 40) : (ej.tiempoSerieSeg || 40);
      timerTotalSeconds = workSec;
      timerSecondsLeft = workSec;
      playStartWhistle();

      if (currentSerie === 1) {
        if (guidedIndex === 0) {
          playClipQueue([{ key: nextMotKey(), fallback: '¡Vamos con energía!' }]);
        } else {
          playClipQueue([
            { key: ej.audioKey, fallback: `Comenzamos: ${ej.nombre}` },
            { key: nextMotKey(), fallback: '¡Vamos con energía!' }
          ]);
        }
      } else if (currentSerie === 2) {
        playClipQueue([
          { key: 'serie_2', fallback: 'Vamos por la serie dos.' },
          { key: nextMotKey(), fallback: '' }
        ]);
      } else {
        playClipQueue([
          { key: 'serie_3', fallback: '¡Última serie! ¡Ustedes pueden!' }
        ]);
      }
    } else if (phase === 'REST') {
      const restSec = ej.descansoSeg || 30;
      timerTotalSeconds = restSec;
      timerSecondsLeft = restSec;
      const hasMoreSeries = currentSerie < (ej.series || 1);
      if (hasMoreSeries) {
        playClipQueue([{ key: nextRestKey(), fallback: 'Descansen unos segundos.' }]);
      } else if (guidedIndex < total - 1) {
        const nextEj = guidedDay.ejercicios[guidedIndex + 1];
        playClipQueue([
          { key: nextRestKey(), fallback: 'Descansen.' },
          { key: nextEj.audioKey, fallback: `Siguiente: ${nextEj.nombre}` }
        ]);
      }
    }

    renderTimerUI();
    startCountdown();
    updateStageVisualState();
  }

  function advancePhaseAutomatically() {
    stopTimer();
    const ej = guidedDay.ejercicios[guidedIndex];
    const total = guidedDay.ejercicios.length;
    const seriesCount = ej.series || 1;

    if (phase === 'PREP') {
      phase = 'WORK';
      loadStepAndRun();
      return;
    }

    if (phase === 'WORK') {
      playEndCue();
      if (currentSerie < seriesCount) {
        if ((ej.descansoSeg || 0) > 0) {
          phase = 'REST';
          loadStepAndRun();
        } else {
          currentSerie++;
          phase = 'WORK';
          loadStepAndRun();
        }
      } else {
        // Terminó todas las series de este ejercicio
        if (guidedIndex >= total - 1) {
          finishWorkout();
        } else if ((ej.descansoSeg || 0) > 0) {
          phase = 'REST';
          loadStepAndRun();
        } else {
          guidedIndex++;
          currentSerie = 1;
          phase = 'WORK';
          loadStepAndRun();
        }
      }
      return;
    }

    if (phase === 'REST') {
      if (currentSerie < seriesCount) {
        currentSerie++;
        phase = 'WORK';
        loadStepAndRun();
      } else if (guidedIndex < total - 1) {
        guidedIndex++;
        currentSerie = 1;
        phase = 'WORK';
        loadStepAndRun();
      } else {
        finishWorkout();
      }
    }
  }

  function startCountdown() {
    stopTimer();
    timerRunning = true;
    updateToggleBtnText();
    updateStageVisualState();

    timerInterval = setInterval(() => {
      timerSecondsLeft--;
      if (timerSecondsLeft > 0 && timerSecondsLeft <= 3) {
        playCountdownTick();
      }
      if (phase === 'REST' && timerSecondsLeft === 5) {
        renderTimerUI();
        updateStageVisualState();
      } else {
        updateTimerVisuals();
      }

      if (timerSecondsLeft <= 0) {
        advancePhaseAutomatically();
      }
    }, 1000);
  }

  function updateToggleBtnText() {
    const btn = document.getElementById('auto-toggle');
    if (btn) btn.textContent = timerRunning ? '⏸ Pausar' : '▶ Continuar';
  }

  function updateTimerVisuals() {
    const timeEl = document.getElementById('ring-time-text');
    const ringEl = document.getElementById('ring-fg');
    if (!timeEl || !ringEl) return;

    timeEl.textContent = formatTime(Math.max(0, timerSecondsLeft));
    const ratio = Math.max(0, timerSecondsLeft) / Math.max(1, timerTotalSeconds);
    ringEl.style.strokeDashoffset = String(RING_CIRCUMFERENCE * (1 - ratio));
  }

  function renderTimerUI() {
    const ej = guidedDay.ejercicios[guidedIndex];
    const seriesCount = ej.series || 1;
    const total = guidedDay.ejercicios.length;

    let badgeCls = 'phase-work';
    let badgeText = 'En movimiento';
    let subText = seriesCount > 1 ? `Serie ${currentSerie} de ${seriesCount}` : 'Tiempo continuo';
    let nextText = '';
    let ringCls = '';
    let panelCls = 'timer-panel';

    if (phase === 'PREP') {
      badgeCls = 'phase-prep';
      badgeText = 'Prepárate';
      subText = 'En posición, comenzamos en breve...';
      ringCls = 'prep';
    } else if (phase === 'REST') {
      const isPreviewWindow = timerSecondsLeft <= 5 && timerRunning;
      if (isPreviewWindow) {
        badgeCls = 'phase-prep';
        badgeText = '⏳ Prepárate';
        ringCls = 'prep';
        panelCls = 'timer-panel is-preview';
        if (currentSerie < seriesCount) {
          subText = `En posición • Serie ${currentSerie + 1} de ${seriesCount}`;
        } else if (guidedIndex < total - 1) {
          subText = 'En posición para el siguiente ejercicio';
          nextText = `Siguiente: ${guidedDay.ejercicios[guidedIndex + 1].nombre}`;
        }
      } else {
        badgeCls = 'phase-rest';
        badgeText = '⏸ Momento de pausa';
        ringCls = 'rest';
        panelCls = 'timer-panel is-rest';
        if (currentSerie < seriesCount) {
          subText = `Descanso entre series • Viene Serie ${currentSerie + 1} de ${seriesCount}`;
        } else if (guidedIndex < total - 1) {
          subText = 'Descanso entre ejercicios • Recupera';
          nextText = `Luego viene: ${guidedDay.ejercicios[guidedIndex + 1].nombre}`;
        }
      }
    } else if (guidedIndex < total - 1 && currentSerie === seriesCount) {
      nextText = `Luego: ${guidedDay.ejercicios[guidedIndex + 1].nombre}`;
    }

    if (!timerRunning && phase !== 'PREP' && phase !== 'REST') {
      badgeCls = 'phase-rest';
      badgeText = '⏸ En pausa';
      panelCls = 'timer-panel is-rest';
    }

    const ratio = Math.max(0, timerSecondsLeft) / Math.max(1, timerTotalSeconds);
    const offset = RING_CIRCUMFERENCE * (1 - ratio);

    const panel = document.getElementById('guided-timer-panel');
    panel.className = panelCls;
    panel.innerHTML = `
      <div class="ring-timer-wrap">
        <div class="ring-center-box">
          <svg class="ring-svg" viewBox="0 0 96 96">
            <circle class="ring-bg" cx="48" cy="48" r="${RING_RADIUS}"></circle>
            <circle class="ring-fg ${ringCls}" id="ring-fg" cx="48" cy="48" r="${RING_RADIUS}"
              stroke-dasharray="${RING_CIRCUMFERENCE}"
              stroke-dashoffset="${offset}"></circle>
          </svg>
          <span class="ring-time-text" id="ring-time-text">${formatTime(timerSecondsLeft)}</span>
        </div>
        <div class="phase-info-col">
          <span class="phase-badge ${badgeCls}">${badgeText}</span>
          <div class="phase-sub">${subText}</div>
          ${nextText ? `<div class="phase-next">${nextText}</div>` : ''}
        </div>
      </div>
      <div class="timer-actions">
        <button class="btn-sm primary" id="auto-toggle">${timerRunning ? '⏸ Pausar' : '▶ Continuar'}</button>
        <button class="btn-sm" id="auto-skip">Saltar etapa ⏭</button>
      </div>
    `;

    document.getElementById('auto-toggle').addEventListener('click', () => {
      if (timerRunning) {
        stopTimer();
        renderTimerUI();
        updateStageVisualState();
      } else {
        startCountdown();
        renderTimerUI();
      }
    });

    document.getElementById('auto-skip').addEventListener('click', () => {
      advancePhaseAutomatically();
    });
  }

  function setupGuidedControls() {
    document.getElementById('guided-close').addEventListener('click', closeGuidedWorkout);

    const voiceBtn = document.getElementById('toggle-voice');
    voiceBtn.addEventListener('click', () => {
      voiceEnabled = !voiceEnabled;
      voiceBtn.classList.toggle('active', voiceEnabled);
      voiceBtn.textContent = voiceEnabled ? '🔊 Voz' : '🔇 Voz';
      if (!voiceEnabled) {
        stopVoice();
      }
    });

    document.getElementById('guided-prev').addEventListener('click', () => {
      if (guidedIndex > 0) {
        guidedIndex--;
        currentSerie = 1;
        phase = 'WORK';
        loadStepAndRun();
      }
    });

    document.getElementById('guided-next').addEventListener('click', () => {
      if (guidedIndex < guidedDay.ejercicios.length - 1) {
        guidedIndex++;
        currentSerie = 1;
        phase = 'WORK';
        loadStepAndRun();
      } else {
        finishWorkout();
      }
    });

    document.getElementById('done-close').addEventListener('click', () => {
      document.getElementById('done-modal').classList.add('hidden');
    });
  }

  // --- Inicialización ---
  async function init() {
    setupNav();
    setupGuidedControls();

    try {
      const res = await fetch('./rutinas.json', { cache: 'no-store' });
      appData = await res.json();
    } catch (err) {
      console.error('Error cargando rutinas.json:', err);
      document.getElementById('hoy-card-container').innerHTML =
        `<div class="hero-card"><p>No se pudo cargar <code>rutinas.json</code>.</p></div>`;
      return;
    }

    renderHeaderStreak();
    renderHoy();
    initCloudSync();

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
