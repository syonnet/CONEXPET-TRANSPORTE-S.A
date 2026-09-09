/**
 * CONEXPET TRANSPORTE S.A. - SISTEMA INTERACTIVO PRINCIPAL
 * Soporte para Modo Claro (Default) / Modo Oscuro, Calculadora, Radar y Modales
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 0. CONFIGURACIÓN CENTRALIZADA DE LA EMPRESA (FUENTE ÚNICA DE LA VERDAD)
  // =========================================================================
  const CONEXPET_CONFIG = {
    name: 'CONEXPET TRANSPORTE S.A.',
    phoneFormatted: '+593 99 900 8114',
    phoneRaw: '593999008114',
    email: 'operaciones@conexpet.com',
    base: 'Lago Agrio, Sucumbíos (Km 4.5 Vía Quito)',
    office: 'Quito, Av. República de El Salvador y Moscú',
    ruc: '2191717468001'
  };

  // =========================================================================
  // 1. TEMA CLARO / OSCURO (LIGHT BY DEFAULT + SAFE STORAGE)
  // =========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile-btn');
  
  function getSafeTheme() {
    try {
      return localStorage.getItem('conexpet_theme') || 'light';
    } catch (e) {
      return 'light';
    }
  }

  function setSafeTheme(theme) {
    try {
      localStorage.setItem('conexpet_theme', theme);
    } catch (e) {
      // Ignorar si el almacenamiento local está restringido
    }
  }

  const currentTheme = getSafeTheme();
  
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    setSafeTheme(theme);

    // Actualizar iconos
    const sunIcons = document.querySelectorAll('.theme-icon-sun');
    const moonIcons = document.querySelectorAll('.theme-icon-moon');

    if (theme === 'dark') {
      sunIcons.forEach(el => el.classList.remove('hidden'));
      moonIcons.forEach(el => el.classList.add('hidden'));
    } else {
      sunIcons.forEach(el => el.classList.add('hidden'));
      moonIcons.forEach(el => el.classList.remove('hidden'));
    }
  }

  // Aplicar tema inicial
  applyTheme(currentTheme);

  function toggleTheme() {
    const active = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = active === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (themeToggleMobileBtn) themeToggleMobileBtn.addEventListener('click', toggleTheme);

  // =========================================================================
  // 2. PRELOADER ELEGANTE & ÁGIL (~1.6s)
  // =========================================================================
  const preloader = document.getElementById('preloader');
  const preloaderBar = document.getElementById('preloader-progress-bar');
  const preloaderCounter = document.getElementById('preloader-counter');

  let loadProgress = 0;
  const preloaderDuration = 1600;
  const startTime = performance.now();

  function updatePreloader(now) {
    const elapsed = now - startTime;
    const rawProgress = Math.min(elapsed / preloaderDuration, 1);
    loadProgress = Math.floor(rawProgress * 100);

    if (preloaderBar) preloaderBar.style.width = `${loadProgress}%`;
    if (preloaderCounter) preloaderCounter.textContent = `${loadProgress}`;

    if (rawProgress < 1) {
      requestAnimationFrame(updatePreloader);
    } else {
      setTimeout(() => {
        if (preloader) {
          preloader.classList.add('fade-out');
        }
        triggerHeroReveal();
      }, 150);
    }
  }

  requestAnimationFrame(updatePreloader);

  function triggerHeroReveal() {
    const heroReveals = document.querySelectorAll('#hero .reveal');
    heroReveals.forEach((el, index) => {
      const delay = (index + 1) * 100;
      setTimeout(() => {
        el.classList.add('active');
      }, delay);
    });
    initTypewriter();
  }

  // =========================================================================
  // 3. BARRA DE NAVEGACIÓN & SCROLL INDICATOR
  // =========================================================================
  const mainNav = document.getElementById('command-header') || document.getElementById('main-nav');
  const scrollProgressBar = document.getElementById('scroll-progress-bar');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenuOverlay = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // =========================================================================
  // CENTRO DE COMANDO & TELEMETRÍA SATELITAL 24/7 (HUD DRAWER TÁCTICO)
  // =========================================================================
  const hudDrawer = document.getElementById('command-hud-drawer');
  const hudTrigger = document.getElementById('command-hud-trigger');
  const heroStatusPill = document.getElementById('hero-status-pill');
  const hudClose = document.getElementById('command-hud-close');
  const hudBackdrop = document.getElementById('command-hud-backdrop');
  const hudRadarLink = document.getElementById('hud-radar-link');

  function openHudDrawer() {
    if (!hudDrawer) return;
    hudDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeHudDrawer() {
    if (!hudDrawer) return;
    hudDrawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  const mobileHudBtn = document.getElementById('mobile-hud-btn');

  if (hudTrigger) hudTrigger.addEventListener('click', openHudDrawer);
  if (heroStatusPill) heroStatusPill.addEventListener('click', openHudDrawer);
  if (hudClose) hudClose.addEventListener('click', closeHudDrawer);
  if (hudBackdrop) hudBackdrop.addEventListener('click', closeHudDrawer);
  if (hudRadarLink) hudRadarLink.addEventListener('click', closeHudDrawer);

  if (mobileHudBtn) {
    mobileHudBtn.addEventListener('click', () => {
      if (mobileMenuOverlay) mobileMenuOverlay.classList.add('hidden');
      document.body.style.overflow = '';
      const hamburgerIcon = document.getElementById('hamburger-icon');
      const closeIcon = document.getElementById('close-icon');
      if (hamburgerIcon) hamburgerIcon.classList.remove('hidden');
      if (closeIcon) closeIcon.classList.add('hidden');
      openHudDrawer();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hudDrawer && hudDrawer.classList.contains('open')) {
      closeHudDrawer();
    }
  });

  function handleScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.height = `${Math.min(progress, 100)}%`;
    }

    if (mainNav) {
      if (scrollY > 40) {
        mainNav.classList.add('scrolled');
      } else {
        mainNav.classList.remove('scrolled');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Menú Mobile
  if (mobileMenuToggle && mobileMenuOverlay) {
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');

    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = !mobileMenuOverlay.classList.contains('hidden');
      if (isOpen) {
        mobileMenuOverlay.classList.add('hidden');
        document.body.style.overflow = '';
        if (hamburgerIcon) hamburgerIcon.classList.remove('hidden');
        if (closeIcon) closeIcon.classList.add('hidden');
      } else {
        mobileMenuOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        if (hamburgerIcon) hamburgerIcon.classList.add('hidden');
        if (closeIcon) closeIcon.classList.remove('hidden');
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuOverlay.classList.add('hidden');
        document.body.style.overflow = '';
        if (hamburgerIcon) hamburgerIcon.classList.remove('hidden');
        if (closeIcon) closeIcon.classList.add('hidden');
      });
    });
  }

  // =========================================================================
  // 3.1 INDICADOR ELÁSTICO HORIZONTAL (NAVBAR ADAPTADO DE navbar.txt)
  // =========================================================================
  function initHoriSelector() {
    const navContent = document.getElementById('navbarSupportedContent');
    if (!navContent) return;

    const selector = navContent.querySelector('.hori-selector');
    const navList = navContent.querySelector('.custom-navbar-nav');
    if (!selector || !navList) return;

    const items = navList.querySelectorAll('.nav-item');
    if (!items.length) return;

    function updateSelector(targetLi, animate = true) {
      if (!targetLi) return;

      const offsetLeft = targetLi.offsetLeft;
      const offsetTop = targetLi.offsetTop;
      const width = targetLi.offsetWidth;
      const height = targetLi.offsetHeight;

      if (!animate) {
        selector.style.transition = 'none';
      } else {
        selector.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      }

      selector.style.left = `${offsetLeft}px`;
      selector.style.top = `${offsetTop}px`;
      selector.style.width = `${width}px`;
      selector.style.height = `${height}px`;
      selector.style.opacity = '1';

      if (!animate) {
        void selector.offsetHeight;
        selector.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      }
    }

    let activeItem = navList.querySelector('.nav-item.active') || items[0];
    if (activeItem) {
      setTimeout(() => updateSelector(activeItem, false), 60);
      window.addEventListener('load', () => updateSelector(activeItem, false));
    }

    items.forEach(item => {
      item.addEventListener('mouseenter', () => {
        updateSelector(item, true);
      });

      item.addEventListener('click', () => {
        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        activeItem = item;
        updateSelector(item, true);
      });
    });

    navList.addEventListener('mouseleave', () => {
      const currentActive = navList.querySelector('.nav-item.active') || activeItem;
      if (currentActive) {
        updateSelector(currentActive, true);
      }
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const currentActive = navList.querySelector('.nav-item.active') || activeItem;
        if (currentActive) updateSelector(currentActive, false);
      }, 40);
    }, { passive: true });

    // Calibración post-preloader
    setTimeout(() => {
      const currentActive = navList.querySelector('.nav-item.active') || activeItem;
      if (currentActive) updateSelector(currentActive, false);
    }, 1800);

    const sectionIds = ['empresa', 'servicios', 'flota', 'cobertura', 'intranet', 'faq', 'contacto'];
    function onScrollNav() {
      const scrollPos = window.scrollY + 140;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sectionIds[i]);
        if (sec && sec.offsetTop <= scrollPos) {
          const targetLink = navList.querySelector(`a[href="#${sectionIds[i]}"]`);
          if (targetLink) {
            const parentLi = targetLink.closest('.nav-item');
            if (parentLi && !parentLi.classList.contains('active')) {
              items.forEach(it => it.classList.remove('active'));
              parentLi.classList.add('active');
              activeItem = parentLi;
              updateSelector(parentLi, true);
            }
          }
          break;
        }
      }
    }

    window.addEventListener('scroll', onScrollNav, { passive: true });
  }

  initHoriSelector();

  // =========================================================================
  // 4. MÁQUINA DE ESCRIBIR DINÁMICA (HERO)
  // =========================================================================
  function initTypewriter() {
    const typewriterEl = document.getElementById('hero-typewriter-text');
    if (!typewriterEl) return;

    const phrases = [
      'Transporte de Fluidos Vacuum hasta 200 bbl',
      'Movilización de Taladros Petroleros (RIGs)',
      'Izaje Industrial con Grúas de 120 Toneladas',
      'Infraestructura Propia en Lago Agrio y Cobertura 24 Provincias'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 45;

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 25;
      } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 50;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 350;
      }

      setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
  }

  // =========================================================================
  // 5. SCROLL REVEAL (IntersectionObserver)
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (el.closest('#hero')) {
          obs.unobserve(el);
          return;
        }
        const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
        setTimeout(() => {
          el.classList.add('active');
        }, delay);
        obs.unobserve(el);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => {
    if (!el.closest('#hero')) revealObserver.observe(el);
  });

  // =========================================================================
  // 6. CONTADORES NUMÉRICOS ANIMADOS
  // =========================================================================
  const counterElements = document.querySelectorAll('[data-target]');
  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-target') || '0');
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeVal = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeVal * target);

      el.textContent = `${prefix}${currentVal.toLocaleString('es-EC')}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${prefix}${target.toLocaleString('es-EC')}${suffix}`;
      }
    }
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  counterElements.forEach(el => counterObserver.observe(el));

  // =========================================================================
  // 7. FILTROS DE FLOTA INTERACTIVOS
  // =========================================================================
  const fleetFilterBtns = document.querySelectorAll('.fleet-filter-btn');
  const fleetCards = document.querySelectorAll('.fleet-card-item');

  fleetFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      fleetFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      fleetCards.forEach(card => {
        const itemCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || itemCategory === filterCategory) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 250);
        }
      });
    });
  });

  // =========================================================================
  // 8. TABS DE INTRANET & PORTALES CORPORATIVOS
  // =========================================================================
  const intranetTabs = document.querySelectorAll('.intranet-tab-btn');
  const intranetPanes = document.querySelectorAll('.intranet-tab-pane');

  intranetTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      intranetTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetId = btn.getAttribute('data-tab');
      intranetPanes.forEach(pane => {
        if (pane.id === targetId) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });

  // =========================================================================
  // 9. RADAR DE COBERTURA & CALCULADORA DE RUTAS NACIONALES
  // =========================================================================
  const routeDistances = {
    'lago-agrio_quito': { km: 278, hours: '6.5 h', desc: 'Ruta Papallacta - Baeza - Lago Agrio (Vía E20/E45)' },
    'quito_lago-agrio': { km: 278, hours: '6.5 h', desc: 'Ruta Papallacta - Baeza - Lago Agrio (Vía E20/E45)' },
    'lago-agrio_guayaquil': { km: 695, hours: '12 h', desc: 'Conexión Amazónica - Sierra Centro - Costa (E45/E35/E40)' },
    'guayaquil_lago-agrio': { km: 695, hours: '12 h', desc: 'Conexión Costa - Sierra Centro - Amazónica (E40/E35/E45)' },
    'quito_guayaquil': { km: 420, hours: '7.5 h', desc: 'Corredor Troncal Panamericana - Santo Domingo - Guayas' },
    'guayaquil_quito': { km: 420, hours: '7.5 h', desc: 'Corredor Troncal Costa a Sierra Norte' },
    'lago-agrio_coca': { km: 85, hours: '1.8 h', desc: 'Eje Petrolero Sucumbíos - Orellana (Vía E45)' },
    'coca_lago-agrio': { km: 85, hours: '1.8 h', desc: 'Eje Petrolero Orellana - Sucumbíos (Vía E45)' },
    'lago-agrio_shushufindi': { km: 58, hours: '1.2 h', desc: 'Conexión Directa Bloques Petroleros Shushufindi' },
    'shushufindi_lago-agrio': { km: 58, hours: '1.2 h', desc: 'Conexión Directa Bloques Petroleros Shushufindi' },
    'quito_cuenca': { km: 465, hours: '8.5 h', desc: 'Corredor Interandino Panamericana Sur (E35)' },
    'cuenca_quito': { km: 465, hours: '8.5 h', desc: 'Corredor Interandino Panamericana Sur (E35)' },
    'guayaquil_cuenca': { km: 198, hours: '3.5 h', desc: 'Vía Molleturo - El Cajas (E582)' },
    'cuenca_guayaquil': { km: 198, hours: '3.5 h', desc: 'Vía Molleturo - El Cajas (E582)' },
    'guayaquil_manta': { km: 195, hours: '3.2 h', desc: 'Corredor Costero del Pacífico (E40/E482)' },
    'manta_guayaquil': { km: 195, hours: '3.2 h', desc: 'Corredor Costero del Pacífico (E40/E482)' }
  };

  const radarPoints = document.querySelectorAll('.radar-point');
  const radarCityTooltip = document.getElementById('radar-city-tooltip');

  radarPoints.forEach(point => {
    point.addEventListener('mouseenter', () => {
      const city = point.getAttribute('data-city');
      const info = point.getAttribute('data-info');
      if (radarCityTooltip) {
        radarCityTooltip.innerHTML = `<span class="font-bold text-red-600 dark:text-red-400">${city}:</span> <span>${info}</span>`;
        radarCityTooltip.classList.remove('opacity-0');
        radarCityTooltip.classList.add('opacity-100');
      }
    });

    point.addEventListener('mouseleave', () => {
      if (radarCityTooltip) {
        radarCityTooltip.classList.remove('opacity-100');
        radarCityTooltip.classList.add('opacity-0');
      }
    });

    point.addEventListener('click', () => {
      const cityKey = point.getAttribute('data-city-key');
      const calcOrigin = document.getElementById('calc-origin');
      if (calcOrigin && cityKey) {
        calcOrigin.value = cityKey;
        calculateRouteEstimate();
        // Scroll suave hacia el cotizador
        const calcSection = document.getElementById('cotizador');
        if (calcSection) calcSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // =========================================================================
  // 10. COTIZADOR INTELIGENTE EN VIVO
  // =========================================================================
  const calcOrigin = document.getElementById('calc-origin');
  const calcDestination = document.getElementById('calc-destination');
  const calcService = document.getElementById('calc-service');
  const calcWeight = document.getElementById('calc-weight');
  const calcResultDist = document.getElementById('calc-result-dist');
  const calcResultTime = document.getElementById('calc-result-time');
  const calcResultUnit = document.getElementById('calc-result-unit');
  const calcRouteDesc = document.getElementById('calc-route-desc');
  const calcWhatsappBtn = document.getElementById('calc-whatsapp-btn');

  function calculateRouteEstimate() {
    if (!calcOrigin || !calcDestination) return;

    const origin = calcOrigin.value;
    const dest = calcDestination.value;
    const service = calcService ? calcService.value : 'fluidos';
    const weight = calcWeight ? calcWeight.value : '20';

    const routeKey = `${origin}_${dest}`;
    let distanceData = routeDistances[routeKey];

    if (origin === dest) {
      distanceData = { km: 45, hours: '1.5 h', desc: 'Operación local intracanton / maniobra de patio' };
    } else if (!distanceData) {
      distanceData = { km: 380, hours: '7.0 h', desc: 'Ruta interprovincial multimodal monitoreada vía GPS' };
    }

    if (calcResultDist) calcResultDist.textContent = `${distanceData.km} km`;
    if (calcResultTime) calcResultTime.textContent = distanceData.hours;
    if (calcRouteDesc) calcRouteDesc.textContent = distanceData.desc;

    // Unidad recomendada según servicio
    let unitType = 'Tanquero Vacuum 150-200 bbl';
    if (service === 'pesada') {
      unitType = parseInt(weight, 10) > 40 ? 'Lowboy Cama Baja 3 Ejes 60-80 Ton' : 'Cabezal 6x4 + Plataforma 40 Ton';
    } else if (service === 'izaje') {
      unitType = parseInt(weight, 10) > 60 ? 'Grúa Telescópica Liebherr 120 Ton' : 'Grúa Telescópica Grove 60 Ton';
    } else if (service === 'contenedores') {
      unitType = 'Cabezal 6x4 + Plataforma Portacontenedor 40ft (Genset Reefer)';
    }

    if (calcResultUnit) calcResultUnit.textContent = unitType;

    // Actualizar botón de WhatsApp
    if (calcWhatsappBtn) {
      const originName = calcOrigin.options[calcOrigin.selectedIndex].text;
      const destName = calcDestination.options[calcDestination.selectedIndex].text;
      const serviceName = calcService ? calcService.options[calcService.selectedIndex].text : 'Transporte Pesado';

      const msg = `Hola CONEXPET, deseo solicitar una cotización formal:%0A%0A` +
        `• Servicio: ${encodeURIComponent(serviceName)}%0A` +
        `• Origen: ${encodeURIComponent(originName)}%0A` +
        `• Destino: ${encodeURIComponent(destName)}%0A` +
        `• Distancia estim.: ${distanceData.km} km%0A` +
        `• Equipo sugerido: ${encodeURIComponent(unitType)}%0A` +
        `• Peso/Volumen: ${encodeURIComponent(weight)} ton/bbl%0A%0A` +
        `Agradezco su atención técnica inmediata.`;

      calcWhatsappBtn.href = `https://wa.me/${CONEXPET_CONFIG.phoneRaw}?text=${msg}`;
    }
  }

  if (calcOrigin) calcOrigin.addEventListener('change', calculateRouteEstimate);
  if (calcDestination) calcDestination.addEventListener('change', calculateRouteEstimate);
  if (calcService) calcService.addEventListener('change', calculateRouteEstimate);
  if (calcWeight) calcWeight.addEventListener('input', calculateRouteEstimate);

  calculateRouteEstimate();

  // =========================================================================
  // 11. MODAL DE FICHA TÉCNICA (SERVICIOS Y FLOTA)
  // =========================================================================
  const modalOverlay = document.getElementById('spec-modal');
  const modalCloseBtn = document.getElementById('spec-modal-close');
  const modalTitle = document.getElementById('spec-modal-title');
  const modalBadge = document.getElementById('spec-modal-badge');
  const modalContent = document.getElementById('spec-modal-content');
  const openSpecBtns = document.querySelectorAll('.open-spec-btn');

  const specsDatabase = {
    'vacuum': {
      title: 'Transporte de Fluidos Vacuum (Hasta 200 BBL)',
      badge: 'División Hidrocarburos & Ambiental',
      html: `
        <div class="space-y-4 text-sm text-slate-600 dark:text-zinc-300">
          <p class="font-medium text-slate-800 dark:text-zinc-100">
            Flota especializada de tanqueros de vacío con revestimientos epóxicos y tanques de acero al carbono de alta resistencia para el manejo seguro de fluidos en locaciones petroleras.
          </p>
          <div class="grid grid-cols-2 gap-3 py-2">
            <div class="p-3 rounded-lg bg-slate-100 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700">
              <span class="block text-xs text-slate-500 dark:text-zinc-400">Capacidades por Unidad</span>
              <span class="font-bold text-slate-900 dark:text-white text-base">150 bbl a 200 bbl</span>
            </div>
            <div class="p-3 rounded-lg bg-slate-100 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700">
              <span class="block text-xs text-slate-500 dark:text-zinc-400">Bomba de Succión</span>
              <span class="font-bold text-slate-900 dark:text-white text-base">Alto Vacío ATEX</span>
            </div>
          </div>
          <h4 class="font-bold text-slate-900 dark:text-white pt-2">Fluidos Autorizados y Transportados:</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li>Crudo pesado, liviano y condensados de petróleo.</li>
            <li>Aguas de formación y salmueras de reinyección.</li>
            <li>Lodos de perforación (Base Agua y Base Aceite / OBM).</li>
            <li>Aguas residuales industriales y lodos de decantación.</li>
          </ul>
          <h4 class="font-bold text-slate-900 dark:text-white pt-2">Seguridad & Cumplimiento:</h4>
          <p>
            Válvulas de alivio de presión y vacío, sistema de contención de derrames incorporado, kit ambiental de emergencia y choferes con certificación de manejo de materiales peligrosos (HazMat).
          </p>
        </div>
      `
    },
    'pesada': {
      title: 'Carga Pesada & Movilización de Taladros (RIGs)',
      badge: 'División Carga Extrapesada',
      html: `
        <div class="space-y-4 text-sm text-slate-600 dark:text-zinc-300">
          <p class="font-medium text-slate-800 dark:text-zinc-100">
            Logística integral de movilización y desmovilización de taladros petroleros (Workover y Drilling), componentes de subestructura, bombas de lodo, generadores y tubería.
          </p>
          <div class="grid grid-cols-2 gap-3 py-2">
            <div class="p-3 rounded-lg bg-slate-100 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700">
              <span class="block text-xs text-slate-500 dark:text-zinc-400">Capacidad Máxima por Eje</span>
              <span class="font-bold text-slate-900 dark:text-white text-base">Hasta 80 Toneladas</span>
            </div>
            <div class="p-3 rounded-lg bg-slate-100 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700">
              <span class="block text-xs text-slate-500 dark:text-zinc-400">Configuraciones de Plataforma</span>
              <span class="font-bold text-slate-900 dark:text-white text-base">Lowboy / Cama Cuna</span>
            </div>
          </div>
          <h4 class="font-bold text-slate-900 dark:text-white pt-2">Equipamiento Técnico:</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li>Cabezales 6x4 de 500+ HP con doble tracción y frenos auxiliares Jake Brake.</li>
            <li>Camas bajas con cuello de ganso desmontable hidráulico.</li>
            <li>Plataformas extensibles para tuberías de perforación y casing de gran longitud.</li>
            <li>Contenedores secos (Dry Van) y refrigerados (Reefer con motogenerador).</li>
          </ul>
          <h4 class="font-bold text-slate-900 dark:text-white pt-2">Gestión de Permisos MTOP:</h4>
          <p>
            Trámite de salvoconductos y permisos de sobredimensión y sobrepeso con servicio de vehículos escolta con señalética reglamentaria.
          </p>
        </div>
      `
    },
    'izaje': {
      title: 'Izaje y Montaje Industrial con Grúas hasta 120 Tn',
      badge: 'División Izaje & Maniobras Críticas',
      html: `
        <div class="space-y-4 text-sm text-slate-600 dark:text-zinc-300">
          <p class="font-medium text-slate-800 dark:text-zinc-100">
            Servicio de izaje pesado de alta precisión con grúas telescópicas y todo terreno para campamentos petroleros, refinerías, subestaciones eléctricas y proyectos de infraestructura.
          </p>
          <div class="grid grid-cols-2 gap-3 py-2">
            <div class="p-3 rounded-lg bg-slate-100 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700">
              <span class="block text-xs text-slate-500 dark:text-zinc-400">Capacidad Máxima</span>
              <span class="font-bold text-slate-900 dark:text-white text-base">120 Toneladas</span>
            </div>
            <div class="p-3 rounded-lg bg-slate-100 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700">
              <span class="block text-xs text-slate-500 dark:text-zinc-400">Altura Máxima de Pluma</span>
              <span class="font-bold text-slate-900 dark:text-white text-base">Hasta 60 Metros</span>
            </div>
          </div>
          <h4 class="font-bold text-slate-900 dark:text-white pt-2">Ingeniería de Rigging:</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li>Elaboración previa de Planes de Izaje Crítico (Rigging Plans) con cálculo de radio y capacidad.</li>
            <li>Pruebas de compactación y resistencia de suelo en locación.</li>
            <li>Aparejos certificados: eslingas sintéticas de alta tenacidad, grilletes Crosby y balancines calibrados.</li>
            <li>Operadores y aparejadores (riggers) con certificación internacional vigente.</li>
          </ul>
        </div>
      `
    },
    'talleres': {
      title: 'Talleres Propios & Mantenimiento Integral 24/7',
      badge: 'División Soporte & Operaciones',
      html: `
        <div class="space-y-4 text-sm text-slate-600 dark:text-zinc-300">
          <p class="font-medium text-slate-800 dark:text-zinc-100">
            Complejo de talleres mecánicos propios ubicado estratégicamente en Lago Agrio (Sucumbíos), garantizando una disponibilidad de flota superior al 98% mediante mantenimiento preventivo y correctivo.
          </p>
          <div class="grid grid-cols-2 gap-3 py-2">
            <div class="p-3 rounded-lg bg-slate-100 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700">
              <span class="block text-xs text-slate-500 dark:text-zinc-400">Ubicación Estratégica</span>
              <span class="font-bold text-slate-900 dark:text-white text-base">Lago Agrio, Km 4.5</span>
            </div>
            <div class="p-3 rounded-lg bg-slate-100 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700">
              <span class="block text-xs text-slate-500 dark:text-zinc-400">Disponibilidad Técnica</span>
              <span class="font-bold text-slate-900 dark:text-white text-base">24 Horas / 365 Días</span>
            </div>
          </div>
          <h4 class="font-bold text-slate-900 dark:text-white pt-2">Capacidades del Taller:</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li>Diagnóstico computarizado para motores Cummins, Detroit, Caterpillar y PACCAR.</li>
            <li>Fosas de alineación y mantenimiento de tren motriz y sistemas neumáticos.</li>
            <li>Stock permanente de repuestos originales certificados y llantas industriales.</li>
            <li>Unidades móviles de asistencia en ruta preparadas para intervención inmediata en pozo o carretera.</li>
          </ul>
        </div>
      `
    }
  };

  openSpecBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const specKey = btn.getAttribute('data-spec');
      const data = specsDatabase[specKey];
      if (data && modalOverlay && modalTitle && modalBadge && modalContent) {
        modalTitle.textContent = data.title;
        modalBadge.textContent = data.badge;
        modalContent.innerHTML = data.html;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // =========================================================================
  // 12. FAQ ACCORDION INTERACTIVO
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Cerrar otros
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // =========================================================================
  // 13. FORMULARIO DE CONTACTO & COTIZACIÓN
  // =========================================================================
  const quoteForm = document.getElementById('quote-form');
  const quoteFeedback = document.getElementById('quote-feedback');

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Procesando solicitud técnica...
        `;
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }

        quoteForm.reset();

        if (quoteFeedback) {
          quoteFeedback.classList.remove('hidden');
          quoteFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

          setTimeout(() => {
            quoteFeedback.classList.add('hidden');
          }, 8000);
        }
      }, 1300);
    });
  }

  // =========================================================================
  // 14. BOTÓN FLOTANTE DE WHATSAPP
  // =========================================================================
  const whatsappBtn = document.getElementById('whatsapp-btn');
  if (whatsappBtn) {
    setTimeout(() => {
      whatsappBtn.classList.add('visible');
    }, 2500);
  }

  // =========================================================================
  // 15. CUSTOM CURSOR & BOTONES MAGNÉTICOS EN DESKTOP
  // =========================================================================
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (isFinePointer) {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');

    if (dot && ring) {
      let mouseX = -100;
      let mouseY = -100;
      let dotX = -100;
      let dotY = -100;
      let ringX = -100;
      let ringY = -100;
      let isVisible = false;

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!isVisible) {
          dot.style.opacity = '1';
          ring.style.opacity = '1';
          isVisible = true;
        }
      });

      window.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
        isVisible = false;
      });

      // Feedback háptico visual al presionar (Mousedown / Mouseup)
      window.addEventListener('mousedown', () => {
        ring.classList.add('cursor-active');
      });

      window.addEventListener('mouseup', () => {
        ring.classList.remove('cursor-active');
      });

      function renderCursor() {
        // Dot de precisión óptica con seguimiento inmediato
        dotX += (mouseX - dotX) * 0.45;
        dotY += (mouseY - dotY) * 0.45;

        // Halo ambiental de cristal con inercia elástica sedosa
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        dot.style.transform = `translate(${dotX}px, ${dotY}px)`;
        ring.style.transform = `translate(${ringX}px, ${ringY}px)`;

        requestAnimationFrame(renderCursor);
      }

      requestAnimationFrame(renderCursor);

      // Elementos interactivos con morphing suave a lente de cristal
      const interactiveSelector = 'a, button, [role="button"], .service-card, .fleet-card-item, .radar-point, .faq-header, .tab-btn, .sharp-glow-card, .command-hub-btn, .status-indicator, .custom-navbar-nav li, .theme-toggle-3d, .shimmer-cta';
      const interactiveElements = document.querySelectorAll(interactiveSelector);
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          ring.classList.add('cursor-hover');
          dot.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
          ring.classList.remove('cursor-hover');
          dot.classList.remove('cursor-hover');
        });
      });

      // En inputs de texto y formularios, ocultar suavemente el custom cursor para escribir con comodidad
      const formInputs = document.querySelectorAll('input, select, textarea');
      formInputs.forEach(input => {
        input.addEventListener('mouseenter', () => {
          dot.style.opacity = '0';
          ring.style.opacity = '0';
        });
        input.addEventListener('mouseleave', () => {
          dot.style.opacity = '1';
          ring.style.opacity = '1';
        });
      });
    }

    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - btnCenterX) * 0.2;
        const deltaY = (e.clientY - btnCenterY) * 0.2;
        btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }
});
