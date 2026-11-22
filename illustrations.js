// Ilustraciones vectoriales deportivas acabadas, articuladas y con Cuchuflí
window.CUCHUFLI_SLEEP_SVG = `
  <svg viewBox="0 0 90 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Colita moviéndose suave -->
    <g class="j-cat-tail" style="transform-origin: 66px 46px;">
      <path d="M66 46 Q82 40 78 28" stroke="#F59E0B" stroke-width="5.5" stroke-linecap="round"/>
    </g>
    <!-- Cuerpo dormido -->
    <ellipse cx="46" cy="42" rx="22" ry="13" fill="#FBBF24"/>
    <path d="M36 33 Q42 38 48 33 M48 34 Q54 39 58 34" stroke="#D97706" stroke-width="2" stroke-linecap="round"/>
    <!-- Cabecita -->
    <circle cx="26" cy="36" r="12" fill="#FBBF24"/>
    <polygon points="16,28 19,17 26,25" fill="#F59E0B"/>
    <polygon points="27,25 34,17 36,28" fill="#F59E0B"/>
    <!-- Ojitos cerrados durmiendo -->
    <path d="M20 36 Q22 38 24 36 M28 36 Q30 38 32 36" stroke="#78350F" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="26" cy="39" r="1.5" fill="#EC4899"/>
    <!-- Zzz -->
    <text x="38" y="18" fill="#64748B" font-size="9" font-weight="700" font-family="sans-serif">zZz</text>
  </svg>`;

window.CUCHUFLI_HAPPY_SVG = `
  <svg viewBox="0 0 90 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="45" cy="48" rx="18" ry="14" fill="#FBBF24"/>
    <path d="M62 50 Q78 40 74 26" stroke="#F59E0B" stroke-width="5.5" stroke-linecap="round"/>
    <circle cx="45" cy="28" r="13" fill="#FBBF24"/>
    <polygon points="34,20 36,8 44,16" fill="#F59E0B"/>
    <polygon points="46,16 54,8 56,20" fill="#F59E0B"/>
    <circle cx="40" cy="27" r="2" fill="#1E293B"/>
    <circle cx="50" cy="27" r="2" fill="#1E293B"/>
    <path d="M42 32 Q45 35 48 32" stroke="#78350F" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="45" cy="30" r="1.5" fill="#EC4899"/>
    <path d="M72 14 C72 11 76 11 76 14 C76 11 80 11 80 14 C80 17 76 20 76 20 C76 20 72 17 72 14 Z" fill="#EF4444"/>
  </svg>`;

const DB_SVG = (x, y) => `
  <rect x="${x - 10}" y="${y - 3}" width="20" height="6" rx="2" fill="#334155"/>
  <rect x="${x - 12}" y="${y - 6}" width="5" height="12" rx="2" fill="#0F172A"/>
  <rect x="${x + 7}" y="${y - 6}" width="5" height="12" rx="2" fill="#0F172A"/>
  <rect x="${x - 9}" y="${y - 5}" width="2" height="10" rx="1" fill="#38BDF8"/>
  <rect x="${x + 7}" y="${y - 5}" width="2" height="10" rx="1" fill="#38BDF8"/>
`;

window.EXERCISE_ILLUSTRATIONS = {
  warmup_shoulders: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="30" y1="142" x2="210" y2="142" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round"/>
      <!-- Piernas y zapatillas -->
      <path d="M113 96 L108 138 M127 96 L132 138" stroke="#E5B08E" stroke-width="9" stroke-linecap="round"/>
      <rect x="100" y="135" width="14" height="6" rx="3" fill="#1E293B"/>
      <rect x="126" y="135" width="14" height="6" rx="3" fill="#1E293B"/>
      <!-- Shorts -->
      <path d="M108 88 L132 88 L135 106 L122 106 L120 98 L118 106 L105 106 Z" fill="#1E293B"/>
      <!-- Torso polera -->
      <rect x="106" y="50" width="28" height="40" rx="10" fill="#0284C7"/>
      <!-- Cabeza -->
      <g class="j-head-tilt" style="transform-origin: 120px 46px;">
        <circle cx="120" cy="31" r="11" fill="#F5C6A5"/>
        <path d="M110 28 Q120 17 130 28" stroke="#1E293B" stroke-width="5" stroke-linecap="round"/>
      </g>
      <!-- Brazos articulados -->
      <g class="j-arm-circle-l" style="transform-origin: 108px 57px;">
        <path d="M108 57 L80 46" stroke="#F5C6A5" stroke-width="7.5" stroke-linecap="round"/>
        <circle cx="80" cy="46" r="4.5" fill="#38BDF8"/>
      </g>
      <g class="j-arm-circle-r" style="transform-origin: 132px 57px;">
        <path d="M132 57 L160 46" stroke="#F5C6A5" stroke-width="7.5" stroke-linecap="round"/>
        <circle cx="160" cy="46" r="4.5" fill="#38BDF8"/>
      </g>
    </svg>`,

  warmup_hips: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="30" y1="142" x2="210" y2="142" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round"/>
      <path d="M113 96 L106 138 M127 96 L134 138" stroke="#E5B08E" stroke-width="9" stroke-linecap="round"/>
      <rect x="98" y="135" width="14" height="6" rx="3" fill="#1E293B"/>
      <rect x="128" y="135" width="14" height="6" rx="3" fill="#1E293B"/>
      <path d="M108 88 L132 88 L135 106 L122 106 L120 98 L118 106 L105 106 Z" fill="#1E293B"/>
      <g class="j-hip-sway" style="transform-origin: 120px 92px;">
        <rect x="106" y="50" width="28" height="40" rx="10" fill="#0284C7"/>
        <circle cx="120" cy="31" r="11" fill="#F5C6A5"/>
        <path d="M110 28 Q120 17 130 28" stroke="#1E293B" stroke-width="5" stroke-linecap="round"/>
        <path d="M108 58 L92 78 L108 88 M132 58 L148 78 L132 88" stroke="#F5C6A5" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <ellipse cx="120" cy="94" rx="28" ry="7" stroke="#38BDF8" stroke-width="2" stroke-dasharray="4 4"/>
    </svg>`,

  warmup_knees: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="30" y1="142" x2="210" y2="142" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round"/>
      <rect x="124" y="135" width="20" height="7" rx="3.5" fill="#1E293B"/>
      <g class="j-shin-bend" style="transform-origin: 130px 138px;">
        <path d="M130 138 L134 100" stroke="#E5B08E" stroke-width="9.5" stroke-linecap="round"/>
        <g class="j-thigh-bend" style="transform-origin: 134px 100px;">
          <path d="M134 100 L112 82" stroke="#1E293B" stroke-width="11" stroke-linecap="round"/>
          <g class="j-torso-upright" style="transform-origin: 112px 82px;">
            <path d="M106 84 L118 44 L132 46 L120 86 Z" fill="#0284C7"/>
            <circle cx="126" cy="28" r="10.5" fill="#F5C6A5"/>
            <path d="M117 24 Q127 14 136 25" stroke="#1E293B" stroke-width="5" stroke-linecap="round"/>
            <path d="M122 50 L150 60" stroke="#F5C6A5" stroke-width="7" stroke-linecap="round"/>
          </g>
        </g>
      </g>
    </svg>`,

  warmup_march: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="30" y1="142" x2="210" y2="142" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round"/>
      <g class="j-bob">
        <rect x="106" y="50" width="28" height="40" rx="10" fill="#0284C7"/>
        <path d="M108 88 L132 88 L134 102 L106 102 Z" fill="#1E293B"/>
        <circle cx="120" cy="31" r="11" fill="#F5C6A5"/>
        <path d="M110 28 Q120 17 130 28" stroke="#1E293B" stroke-width="5" stroke-linecap="round"/>
        <g class="j-march-arm-l" style="transform-origin: 108px 57px;">
          <path d="M108 57 L94 78 L102 92" stroke="#F5C6A5" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <g class="j-march-arm-r" style="transform-origin: 132px 57px;">
          <path d="M132 57 L146 78 L138 92" stroke="#F5C6A5" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </g>
      <g class="j-march-leg-l" style="transform-origin: 114px 96px;">
        <path d="M114 96 L106 118 L106 138" stroke="#E5B08E" stroke-width="8.5" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="98" y="135" width="14" height="6" rx="3" fill="#1E293B"/>
      </g>
      <g class="j-march-leg-r" style="transform-origin: 126px 96px;">
        <path d="M126 96 L134 118 L134 138" stroke="#E5B08E" stroke-width="8.5" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="128" y="135" width="14" height="6" rx="3" fill="#1E293B"/>
      </g>
    </svg>`,

  warmup: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="30" y1="142" x2="210" y2="142" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round"/>
      <path d="M113 96 L106 138 M127 96 L134 138" stroke="#E5B08E" stroke-width="9" stroke-linecap="round"/>
      <rect x="98" y="135" width="14" height="6" rx="3" fill="#1E293B"/>
      <rect x="128" y="135" width="14" height="6" rx="3" fill="#1E293B"/>
      <path d="M108 88 L132 88 L135 106 L105 106 Z" fill="#1E293B"/>
      <rect x="106" y="50" width="28" height="40" rx="10" fill="#0284C7"/>
      <circle cx="120" cy="31" r="11" fill="#F5C6A5"/>
      <g class="j-lat-l" style="transform-origin: 108px 57px;">
        <path d="M108 57 L76 48" stroke="#F5C6A5" stroke-width="7" stroke-linecap="round"/>
      </g>
      <g class="j-lat-r" style="transform-origin: 132px 57px;">
        <path d="M132 57 L164 48" stroke="#F5C6A5" stroke-width="7" stroke-linecap="round"/>
      </g>
    </svg>`,

  squat: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="30" y1="142" x2="210" y2="142" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round"/>
      <rect x="124" y="135" width="22" height="7" rx="3.5" fill="#1E293B"/>
      <g class="j-squat-shin" style="transform-origin: 130px 138px;">
        <path d="M130 138 L138 100" stroke="#E5B08E" stroke-width="9.5" stroke-linecap="round"/>
        <g class="j-squat-thigh" style="transform-origin: 138px 100px;">
          <path d="M138 100 L108 86" stroke="#1E293B" stroke-width="11.5" stroke-linecap="round"/>
          <g class="j-squat-torso" style="transform-origin: 108px 86px;">
            <path d="M100 84 L116 44 L132 48 L116 88 Z" fill="#0284C7"/>
            <circle cx="128" cy="28" r="10.5" fill="#F5C6A5"/>
            <path d="M119 23 Q129 14 138 25" stroke="#1E293B" stroke-width="5" stroke-linecap="round"/>
            <g class="j-squat-arm" style="transform-origin: 122px 52px;">
              <path d="M122 52 L122 98" stroke="#F5C6A5" stroke-width="7" stroke-linecap="round"/>
              ${DB_SVG(122, 100)}
            </g>
          </g>
        </g>
      </g>
    </svg>`,

  shoulder_press: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="30" y1="142" x2="210" y2="142" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round"/>
      <path d="M113 96 L106 138 M127 96 L134 138" stroke="#E5B08E" stroke-width="9" stroke-linecap="round"/>
      <rect x="98" y="135" width="14" height="6" rx="3" fill="#1E293B"/>
      <rect x="128" y="135" width="14" height="6" rx="3" fill="#1E293B"/>
      <path d="M108 88 L132 88 L135 106 L105 106 Z" fill="#1E293B"/>
      <rect x="106" y="50" width="28" height="40" rx="10" fill="#0284C7"/>
      <circle cx="120" cy="32" r="10.5" fill="#F5C6A5"/>
      <path d="M110 28 Q120 18 130 28" stroke="#1E293B" stroke-width="5" stroke-linecap="round"/>
      <g class="j-press-sh-l" style="transform-origin: 108px 57px;">
        <path d="M108 57 L88 57" stroke="#F5C6A5" stroke-width="7" stroke-linecap="round"/>
        <g class="j-press-el-l" style="transform-origin: 88px 57px;">
          <path d="M88 57 L88 30" stroke="#F5C6A5" stroke-width="6.5" stroke-linecap="round"/>
          ${DB_SVG(88, 28)}
        </g>
      </g>
      <g class="j-press-sh-r" style="transform-origin: 132px 57px;">
        <path d="M132 57 L152 57" stroke="#F5C6A5" stroke-width="7" stroke-linecap="round"/>
        <g class="j-press-el-r" style="transform-origin: 152px 57px;">
          <path d="M152 57 L152 30" stroke="#F5C6A5" stroke-width="6.5" stroke-linecap="round"/>
          ${DB_SVG(152, 28)}
        </g>
      </g>
    </svg>`,

  row: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="30" y1="142" x2="210" y2="142" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round"/>
      <path d="M92 86 L104 114 L98 138" stroke="#E5B08E" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M92 86 L86 114 L82 138" stroke="#D19A78" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="76" y="135" width="16" height="6" rx="3" fill="#1E293B"/>
      <rect x="92" y="135" width="16" height="6" rx="3" fill="#1E293B"/>
      <path d="M86 80 L138 54 L146 66 L94 94 Z" fill="#0284C7"/>
      <circle cx="156" cy="48" r="10.5" fill="#F5C6A5"/>
      <path d="M149 42 Q159 34 166 44" stroke="#1E293B" stroke-width="5" stroke-linecap="round"/>
      <g class="j-row-sh" style="transform-origin: 136px 63px;">
        <path d="M136 63 L128 92" stroke="#F5C6A5" stroke-width="7" stroke-linecap="round"/>
        <g class="j-row-el" style="transform-origin: 128px 92px;">
          <path d="M128 92 L130 116" stroke="#F5C6A5" stroke-width="6.5" stroke-linecap="round"/>
          ${DB_SVG(130, 118)}
        </g>
      </g>
    </svg>`,

  glute_bridge: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="134" width="180" height="8" rx="4" fill="#0284C7" opacity="0.22"/>
      <circle cx="58" cy="120" r="10.5" fill="#F5C6A5"/>
      <path d="M48 118 Q56 107 66 113" stroke="#1E293B" stroke-width="5" stroke-linecap="round"/>
      <g class="j-bridge-hip" style="transform-origin: 72px 126px;">
        <path d="M72 120 L124 88 L128 98 L76 130 Z" fill="#0284C7"/>
        <path d="M124 94 L162 94" stroke="#1E293B" stroke-width="11" stroke-linecap="round"/>
        <path d="M162 94 L176 132" stroke="#E5B08E" stroke-width="9" stroke-linecap="round"/>
        ${DB_SVG(124, 82)}
      </g>
      <rect x="170" y="129" width="18" height="6" rx="3" fill="#1E293B"/>
      <path d="M78 128 L114 130" stroke="#F5C6A5" stroke-width="6.5" stroke-linecap="round"/>
    </svg>`,

  plank: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="26" y="132" width="188" height="8" rx="4" fill="#0284C7" opacity="0.22"/>
      <g class="j-plank-breathe">
        <path d="M164 84 L158 120 L174 130" stroke="#F5C6A5" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M114 96 L58 112 L52 130" stroke="#1E293B" stroke-width="9.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M168 74 L112 90 L116 102 L172 84 Z" fill="#0284C7"/>
        <circle cx="182" cy="70" r="10.5" fill="#F5C6A5"/>
        <path d="M175 62 Q185 56 192 67" stroke="#1E293B" stroke-width="5" stroke-linecap="round"/>
      </g>
    </svg>`,

  dead_bug: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="28" y="132" width="184" height="8" rx="4" fill="#0284C7" opacity="0.22"/>
      <circle cx="60" cy="118" r="10.5" fill="#F5C6A5"/>
      <rect x="72" y="114" width="52" height="14" rx="7" fill="#0284C7"/>
      <rect x="122" y="115" width="28" height="13" rx="5" fill="#1E293B"/>
      <g class="j-deadbug-arm" style="transform-origin: 84px 120px;">
        <path d="M84 120 L84 72" stroke="#F5C6A5" stroke-width="7" stroke-linecap="round"/>
      </g>
      <g class="j-deadbug-leg" style="transform-origin: 148px 122px;">
        <path d="M148 122 L148 86 L180 86" stroke="#E5B08E" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
    </svg>`,

  stretch: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="28" y="134" width="184" height="8" rx="4" fill="#0284C7" opacity="0.22"/>
      <path d="M88 126 L176 126" stroke="#1E293B" stroke-width="10" stroke-linecap="round"/>
      <g class="j-stretch-torso" style="transform-origin: 88px 126px;">
        <rect x="78" y="76" width="20" height="48" rx="9" fill="#0284C7"/>
        <circle cx="88" cy="60" r="10.5" fill="#F5C6A5"/>
        <path d="M88 86 L146 106" stroke="#F5C6A5" stroke-width="7" stroke-linecap="round"/>
      </g>
    </svg>`,

  cat_camel: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="28" y="134" width="184" height="8" rx="4" fill="#0284C7" opacity="0.22"/>
      <path d="M82 92 L82 132 M154 88 L154 132" stroke="#E5B08E" stroke-width="8" stroke-linecap="round"/>
      <circle cx="166" cy="82" r="10" fill="#F5C6A5"/>
      <g class="j-cat-spine" style="transform-origin: 118px 90px;">
        <path d="M82 92 Q118 58 154 88" stroke="#0284C7" stroke-width="11" stroke-linecap="round"/>
      </g>
    </svg>`,

  bird_dog: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="28" y="134" width="184" height="8" rx="4" fill="#0284C7" opacity="0.22"/>
      <path d="M148 84 L148 132 M90 88 L90 132" stroke="#E5B08E" stroke-width="8" stroke-linecap="round"/>
      <path d="M88 88 L150 84" stroke="#0284C7" stroke-width="12" stroke-linecap="round"/>
      <circle cx="162" cy="74" r="10" fill="#F5C6A5"/>
      <g class="j-birddog-arm" style="transform-origin: 148px 84px;">
        <path d="M148 84 L196 78" stroke="#F5C6A5" stroke-width="7" stroke-linecap="round"/>
      </g>
      <g class="j-birddog-leg" style="transform-origin: 90px 88px;">
        <path d="M90 88 L42 84" stroke="#1E293B" stroke-width="8.5" stroke-linecap="round"/>
      </g>
    </svg>`,

  breathing: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="28" y="134" width="184" height="8" rx="4" fill="#0284C7" opacity="0.22"/>
      <circle cx="58" cy="118" r="10.5" fill="#F5C6A5"/>
      <rect x="70" y="116" width="52" height="14" rx="7" fill="#0284C7"/>
      <path d="M122 124 L138 124 L158 94 L180 130" stroke="#1E293B" stroke-width="9.5" stroke-linecap="round" stroke-linejoin="round"/>
      <g class="j-breathe-wave" style="transform-origin: 112px 102px;">
        <path d="M96 104 Q112 92 128 104" stroke="#0284C7" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M102 90 Q112 80 122 90" stroke="#0284C7" stroke-width="2.5" stroke-linecap="round"/>
      </g>
    </svg>`,

  rdl: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="30" y1="142" x2="210" y2="142" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round"/>
      <path d="M100 92 L106 138" stroke="#E5B08E" stroke-width="9.5" stroke-linecap="round"/>
      <rect x="100" y="135" width="18" height="6" rx="3" fill="#1E293B"/>
      <g class="j-rdl-hinge" style="transform-origin: 100px 92px;">
        <path d="M94 86 L142 62 L148 74 L102 98 Z" fill="#0284C7"/>
        <circle cx="156" cy="58" r="10.5" fill="#F5C6A5"/>
        <g class="j-rdl-arm" style="transform-origin: 136px 72px;">
          <path d="M136 72 L136 116" stroke="#F5C6A5" stroke-width="7" stroke-linecap="round"/>
          ${DB_SVG(136, 118)}
        </g>
      </g>
    </svg>`,

  floor_press: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="28" y="134" width="184" height="8" rx="4" fill="#0284C7" opacity="0.22"/>
      <circle cx="58" cy="118" r="10.5" fill="#F5C6A5"/>
      <rect x="70" y="116" width="52" height="14" rx="7" fill="#0284C7"/>
      <path d="M122 124 L138 124 L158 94 L180 130" stroke="#1E293B" stroke-width="9.5" stroke-linecap="round" stroke-linejoin="round"/>
      <g class="j-floor-press" style="transform-origin: 96px 124px;">
        <path d="M96 124 L96 76" stroke="#F5C6A5" stroke-width="7.5" stroke-linecap="round"/>
        ${DB_SVG(96, 72)}
      </g>
    </svg>`,

  lunge: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="30" y1="142" x2="210" y2="142" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round"/>
      <g class="j-lunge-body" style="transform-origin: 122px 138px;">
        <path d="M122 92 L152 98 L152 138 M122 92 L96 118 L76 138" stroke="#1E293B" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="112" y="52" width="20" height="40" rx="8" fill="#0284C7"/>
        <circle cx="122" cy="34" r="10.5" fill="#F5C6A5"/>
        <path d="M122 58 L122 100" stroke="#F5C6A5" stroke-width="7" stroke-linecap="round"/>
        ${DB_SVG(122, 102)}
      </g>
    </svg>`,

  biceps: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="30" y1="142" x2="210" y2="142" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round"/>
      <path d="M113 96 L108 138 M127 96 L132 138" stroke="#E5B08E" stroke-width="9" stroke-linecap="round"/>
      <rect x="100" y="135" width="14" height="6" rx="3" fill="#1E293B"/>
      <rect x="126" y="135" width="14" height="6" rx="3" fill="#1E293B"/>
      <path d="M108 88 L132 88 L135 106 L105 106 Z" fill="#1E293B"/>
      <rect x="106" y="50" width="28" height="40" rx="10" fill="#0284C7"/>
      <circle cx="120" cy="32" r="10.5" fill="#F5C6A5"/>
      <path d="M108 56 L98 84 M132 56 L142 84" stroke="#F5C6A5" stroke-width="7" stroke-linecap="round"/>
      <g class="j-curl-l" style="transform-origin: 98px 84px;">
        <path d="M98 84 L82 62" stroke="#F5C6A5" stroke-width="6.5" stroke-linecap="round"/>
        ${DB_SVG(82, 60)}
      </g>
      <g class="j-curl-r" style="transform-origin: 142px 84px;">
        <path d="M142 84 L158 62" stroke="#F5C6A5" stroke-width="6.5" stroke-linecap="round"/>
        ${DB_SVG(158, 60)}
      </g>
    </svg>`,

  side_plank: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="26" y="132" width="188" height="8" rx="4" fill="#0284C7" opacity="0.22"/>
      <g class="j-plank-breathe">
        <path d="M160 82 L154 120 L172 130" stroke="#F5C6A5" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M114 102 L58 128" stroke="#1E293B" stroke-width="10" stroke-linecap="round"/>
        <path d="M166 76 L112 100" stroke="#0284C7" stroke-width="13" stroke-linecap="round"/>
        <circle cx="178" cy="66" r="10.5" fill="#F5C6A5"/>
        <path d="M158 78 L158 46" stroke="#F5C6A5" stroke-width="6.5" stroke-linecap="round"/>
      </g>
    </svg>`,

  leg_raise: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="28" y="134" width="184" height="8" rx="4" fill="#0284C7" opacity="0.22"/>
      <circle cx="58" cy="118" r="10.5" fill="#F5C6A5"/>
      <rect x="70" y="116" width="52" height="14" rx="7" fill="#0284C7"/>
      <path d="M138 126 L138 88 L172 88" stroke="#1E293B" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <g class="j-deadbug-leg" style="transform-origin: 138px 126px;">
        <path d="M138 126 L172 106 L188 128" stroke="#E5B08E" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
    </svg>`,

  chair_squat: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="30" y1="142" x2="210" y2="142" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round"/>
      <path d="M62 66 L62 140 M62 100 L102 100 L102 140" stroke="#94A3B8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="132" y="135" width="20" height="7" rx="3.5" fill="#1E293B"/>
      <g class="j-squat-shin" style="transform-origin: 138px 138px;">
        <path d="M138 138 L142 100" stroke="#E5B08E" stroke-width="9" stroke-linecap="round"/>
        <g class="j-squat-thigh" style="transform-origin: 142px 100px;">
          <path d="M142 100 L108 92" stroke="#1E293B" stroke-width="11" stroke-linecap="round"/>
          <g class="j-squat-torso" style="transform-origin: 108px 92px;">
            <path d="M102 90 L116 50 L130 54 L116 94 Z" fill="#0284C7"/>
            <circle cx="124" cy="36" r="10.5" fill="#F5C6A5"/>
            <path d="M120 58 L152 66" stroke="#F5C6A5" stroke-width="7" stroke-linecap="round"/>
          </g>
        </g>
      </g>
    </svg>`,

  balance: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="30" y1="142" x2="210" y2="142" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round"/>
      <path d="M64 76 L64 140 M64 104 L92 104 L92 140" stroke="#94A3B8" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      <g class="j-bob">
        <path d="M136 96 L136 138" stroke="#E5B08E" stroke-width="9" stroke-linecap="round"/>
        <rect x="130" y="135" width="16" height="6" rx="3" fill="#1E293B"/>
        <path d="M136 96 L158 104 L152 122" stroke="#1E293B" stroke-width="8.5" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="124" y="50" width="24" height="44" rx="9" fill="#0284C7"/>
        <circle cx="136" cy="32" r="10.5" fill="#F5C6A5"/>
        <path d="M124 58 L100 68 M148 58 L170 68" stroke="#F5C6A5" stroke-width="6.5" stroke-linecap="round"/>
      </g>
    </svg>`,

  thruster: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="30" y1="142" x2="210" y2="142" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round"/>
      <path d="M60 72 L60 140 M60 102 L94 102 L94 140" stroke="#94A3B8" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      <g class="j-squat-shin" style="transform-origin: 132px 138px;">
        <path d="M132 138 L138 100" stroke="#E5B08E" stroke-width="9" stroke-linecap="round"/>
        <g class="j-squat-thigh" style="transform-origin: 138px 100px;">
          <path d="M138 100 L110 90" stroke="#1E293B" stroke-width="11" stroke-linecap="round"/>
          <g class="j-squat-torso" style="transform-origin: 110px 90px;">
            <path d="M104 88 L118 50 L132 54 L118 92 Z" fill="#0284C7"/>
            <circle cx="126" cy="34" r="10.5" fill="#F5C6A5"/>
            <g class="j-press-sh-r" style="transform-origin: 124px 56px;">
              <path d="M124 56 L124 26" stroke="#F5C6A5" stroke-width="6.5" stroke-linecap="round"/>
              ${DB_SVG(124, 24)}
            </g>
          </g>
        </g>
      </g>
    </svg>`,

  chair_row: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="30" y1="142" x2="210" y2="142" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round"/>
      <path d="M66 66 L66 140 M66 100 L104 100 L104 140" stroke="#94A3B8" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M164 82 L176 138 M164 82 L148 138" stroke="#1E293B" stroke-width="9" stroke-linecap="round"/>
      <path d="M164 82 L122 64" stroke="#0284C7" stroke-width="13" stroke-linecap="round"/>
      <circle cx="110" cy="54" r="10.5" fill="#F5C6A5"/>
      <path d="M122 66 L94 100" stroke="#F5C6A5" stroke-width="6.5" stroke-linecap="round"/>
      <g class="j-row-sh" style="transform-origin: 136px 70px;">
        <path d="M136 70 L132 108" stroke="#F5C6A5" stroke-width="7" stroke-linecap="round"/>
        ${DB_SVG(132, 110)}
      </g>
    </svg>`,

  lateral_raise: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="30" y1="142" x2="210" y2="142" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round"/>
      <path d="M113 96 L108 138 M127 96 L132 138" stroke="#E5B08E" stroke-width="9" stroke-linecap="round"/>
      <rect x="100" y="135" width="14" height="6" rx="3" fill="#1E293B"/>
      <rect x="126" y="135" width="14" height="6" rx="3" fill="#1E293B"/>
      <path d="M108 88 L132 88 L135 106 L105 106 Z" fill="#1E293B"/>
      <rect x="106" y="50" width="28" height="40" rx="10" fill="#0284C7"/>
      <circle cx="120" cy="32" r="10.5" fill="#F5C6A5"/>
      <g class="j-lat-l" style="transform-origin: 108px 57px;">
        <path d="M108 57 L66 57" stroke="#F5C6A5" stroke-width="7" stroke-linecap="round"/>
        ${DB_SVG(62, 57)}
      </g>
      <g class="j-lat-r" style="transform-origin: 132px 57px;">
        <path d="M132 57 L174 57" stroke="#F5C6A5" stroke-width="7" stroke-linecap="round"/>
        ${DB_SVG(178, 57)}
      </g>
    </svg>`,

  triceps_chair: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="30" y1="142" x2="210" y2="142" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round"/>
      <path d="M66 64 L66 140 M66 96 L106 96 L106 140" stroke="#94A3B8" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      <g class="j-dip-body" style="transform-origin: 102px 96px;">
        <path d="M122 106 L168 106 L180 138" stroke="#1E293B" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="112" y="66" width="20" height="40" rx="8" fill="#0284C7"/>
        <circle cx="122" cy="50" r="10.5" fill="#F5C6A5"/>
        <path d="M122 72 L102 96" stroke="#F5C6A5" stroke-width="7" stroke-linecap="round"/>
      </g>
    </svg>`,

  russian_twist: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="28" y="134" width="184" height="8" rx="4" fill="#0284C7" opacity="0.22"/>
      <path d="M118 124 L152 96 L168 132" stroke="#1E293B" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
      <g class="j-twist-torso" style="transform-origin: 118px 124px;">
        <path d="M112 124 L92 76 L108 72 L126 120 Z" fill="#0284C7"/>
        <circle cx="94" cy="60" r="10.5" fill="#F5C6A5"/>
        <path d="M104 84 L126 98" stroke="#F5C6A5" stroke-width="6.5" stroke-linecap="round"/>
        ${DB_SVG(132, 98)}
      </g>
    </svg>`,

  shoulder_tap: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="26" y="132" width="188" height="8" rx="4" fill="#0284C7" opacity="0.22"/>
      <path d="M114 94 L56 114 L50 130" stroke="#1E293B" stroke-width="9.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M168 72 L112 94" stroke="#0284C7" stroke-width="13" stroke-linecap="round"/>
      <path d="M162 76 L162 130" stroke="#F5C6A5" stroke-width="7.5" stroke-linecap="round"/>
      <circle cx="178" cy="62" r="10.5" fill="#F5C6A5"/>
      <g class="j-tap-hand" style="transform-origin: 162px 76px;">
        <path d="M162 76 L148 92" stroke="#E5B08E" stroke-width="6.5" stroke-linecap="round"/>
      </g>
    </svg>`,

  walk: `
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="30" y1="142" x2="210" y2="142" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round"/>
      <g class="j-bob">
        <!-- Lili -->
        <path d="M98 94 L88 138 M102 94 L112 138" stroke="#E5B08E" stroke-width="7.5" stroke-linecap="round"/>
        <rect x="88" y="52" width="24" height="42" rx="9" fill="#38BDF8"/>
        <circle cx="100" cy="36" r="10" fill="#F5C6A5"/>
        <!-- Daniel -->
        <path d="M142 95 L132 138 M146 95 L156 138" stroke="#E5B08E" stroke-width="7.5" stroke-linecap="round"/>
        <rect x="132" y="54" width="24" height="42" rx="9" fill="#0284C7"/>
        <circle cx="144" cy="38" r="10" fill="#F5C6A5"/>
      </g>
    </svg>`
};
