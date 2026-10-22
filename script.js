/* ===== НАСТРОЙКИ: поменяйте здесь ===== */
const CONFIG = {
  // [ЗАМЕНИТЬ] номер WhatsApp салона: только цифры, с 7 в начале
  whatsapp: "79963153101",
  slideDuration: 7000, // сколько держится один слайд, мс
  city: { lat: 62.03, lon: 129.73 }, // Якутск, для температуры за окном
};

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t) => t * t * (3 - 2 * t); // мягкий старт и финиш
const isPhone = () => window.innerWidth <= 820;
const saveData = navigator.connection?.saveData === true;

/* ===== Плавная прокрутка: мягко, но без «вязкости» ===== */
const lenis = (!reduceMotion && window.Lenis)
  ? new Lenis({ lerp: 0.12, wheelMultiplier: 1.05, anchors: { offset: -60 } })
  : null;
if (lenis) {
  const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
}

/* ===== Кнопки WhatsApp ===== */
document.querySelectorAll(".js-wa").forEach((a) => {
  const base = a.dataset.msg || "Здравствуйте! Хочу записаться на массаж.";
  // метка источника: админ видит, с какой кнопки пришла заявка
  const src = a.dataset.src || a.closest("section[id]")?.id || (a.closest(".mbar") ? "панель" : "шапка");
  const msg = `${base} (сайт, ${src})`;
  a.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
  a.target = "_blank";
  a.rel = "noopener";
});

/* ===== Мобильное меню ===== */
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const toggleMenu = (open) => {
  nav.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
  if (lenis) open ? lenis.stop() : lenis.start();
  document.documentElement.style.overflow = open ? "hidden" : "";
  document.body.style.overflow = open ? "hidden" : "";
};
burger.addEventListener("click", () => toggleMenu(!nav.classList.contains("is-open")));
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") toggleMenu(false); });

/* ===== Температура за окном (Open-Meteo, без ключа) ===== */
(() => {
  const box = document.getElementById("temp");
  const out = document.getElementById("tempOut");
  const ctrl = new AbortController();
  setTimeout(() => ctrl.abort(), 4000);
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${CONFIG.city.lat}&longitude=${CONFIG.city.lon}&current=temperature_2m`, { signal: ctrl.signal })
    .then((r) => r.json())
    .then((d) => {
      const t = Math.round(d.current.temperature_2m);
      if (Number.isNaN(t)) return;
      out.textContent = (t > 0 ? "+" : t < 0 ? "−" : "") + Math.abs(t) + "°";
      box.hidden = false;
    })
    .catch(() => {}); // нет сети — плашку просто не показываем
})();

/* ===== Видео на главном экране ===== */
(() => {
  const video = document.getElementById("heroVideo");
  const backdrop = document.getElementById("heroBackdrop");
  if (reduceMotion || saveData) { video.removeAttribute("autoplay"); return; } // остаётся постер
  const src = window.innerWidth <= 820 ? "video/hero-sm.mp4" : "video/hero.mp4";
  video.src = src;
  video.play?.().catch(() => {});
  if (window.innerWidth > 1024) {
    backdrop.src = src;
    backdrop.play?.().catch(() => {});
  }
  // экран ушёл из вида — видео на паузу, экономим батарею
  new IntersectionObserver(([e]) => {
    [video, backdrop].forEach((v) => { if (!v.src) return; e.isIntersecting ? v.play().catch(() => {}) : v.pause(); });
  }).observe(document.querySelector(".hero"));
})();

/* ===== Ролики «Как мы работаем»: грузятся и играют только на экране ===== */
(() => {
  const reels = [...document.querySelectorAll(".reel")];
  if (reduceMotion || saveData || !("IntersectionObserver" in window)) return; // только постеры
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const fig = e.target;
      const v = fig.querySelector("video");
      if (e.isIntersecting) {
        if (!v.src) v.src = v.dataset.src;
        v.play().then(() => fig.classList.add("is-playing")).catch(() => {});
      } else {
        v.pause();
        fig.classList.remove("is-playing");
      }
    });
  }, { threshold: 0.35 });
  reels.forEach((r) => io.observe(r));
})();

/* ===== Главный экран: тексты сменяются по кругу ===== */
(() => {
  const slides = [...document.querySelectorAll(".hero__slide")];
  const title = document.getElementById("heroTitle");
  const text = document.getElementById("heroText");
  const num = document.getElementById("heroNum");
  const barsBox = document.getElementById("heroBars");
  const hero = document.querySelector(".hero");
  let current = 0;
  let timer = null;
  let busy = false;

  const bars = slides.map((_, i) => {
    const b = document.createElement("button");
    b.className = "hero__bar";
    b.type = "button";
    b.setAttribute("role", "tab");
    b.setAttribute("aria-label", `Слайд ${i + 1}`);
    b.innerHTML = "<i></i>";
    b.style.setProperty("--dur", CONFIG.slideDuration + "ms");
    b.addEventListener("click", () => go(i, i > current ? 1 : -1));
    barsBox.appendChild(b);
    return b;
  });

  const setTitle = (str) => {
    title.classList.remove("is-in");
    text.classList.remove("is-in");
    title.innerHTML = str
      .split(" ")
      .map((w, i) => `<span class="w"><span style="transition-delay:${i * 50}ms">${w}</span></span>`)
      .join(" ");
    void title.offsetWidth; // перезапуск анимации слов
    title.classList.add("is-in");
    text.classList.add("is-in");
  };

  const go = (next, dir = 1) => {
    next = (next + slides.length) % slides.length;
    if (next === current || busy) return restart();
    busy = true;
    const prev = slides[current];
    const s = slides[next];

    slides.forEach((x) => { if (x !== prev && x !== s) x.className = "hero__slide"; });
    prev.className = "hero__slide is-prev" + (dir < 0 ? " to-right" : "");
    s.className = "hero__slide" + (dir < 0 ? " from-left" : "");
    void s.offsetWidth; // зафиксировать стартовую позицию шторки
    s.classList.add("is-active");

    current = next;
    setTitle(s.dataset.title);
    text.textContent = s.dataset.text;
    num.textContent = String(current + 1).padStart(2, "0");
    setTimeout(() => { busy = false; }, 900);
    restart();
  };

  const restart = () => {
    bars.forEach((b, i) => {
      b.classList.remove("is-active", "is-done");
      b.setAttribute("aria-selected", String(i === current));
      if (i < current) b.classList.add("is-done");
    });
    void barsBox.offsetWidth;
    bars[current].classList.add("is-active");
    clearTimeout(timer);
    if (!reduceMotion) timer = setTimeout(() => go(current + 1, 1), CONFIG.slideDuration);
  };

  // Свайп: влево — следующий кадр, вправо — предыдущий
  let sx = 0, sy = 0;
  hero.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  hero.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - sx;
    const dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) go(current + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  }, { passive: true });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) clearTimeout(timer); else restart();
  });

  setTitle(slides[0].dataset.title);
  restart();
})();

/* ===== Всё, что движется от прокрутки: один цикл на кадр ===== */
(() => {
  const root = document.documentElement;
  const header = document.getElementById("header");
  const mbar = document.getElementById("mbar");
  const fab = document.getElementById("fab");
  const hero = document.querySelector(".hero");
  const heroPar = document.getElementById("heroParallax");
  const heroContent = document.getElementById("heroContent");
  const heroControls = document.querySelector(".hero__controls");
  const contacts = document.getElementById("contacts");
  const contactsImg = document.querySelector(".contacts__bg img");
  const reelsBox = document.getElementById("reels");
  const reelCards = [...reelsBox.querySelectorAll(".reel")];

  const film = document.getElementById("story");
  const stage = document.getElementById("filmStage");
  const fImgs = [...film.querySelectorAll(".film__img")];
  const fTexts = [...film.querySelectorAll(".film__text")];
  const n = fImgs.length;

  // Если на экране уже видна большая кнопка записи — панель уходит, чтобы не было двух кнопок сразу
  let ctaInView = false;
  const ctaSeen = new Set();
  const ctaIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? ctaSeen.add(e.target) : ctaSeen.delete(e.target)));
    ctaInView = ctaSeen.size > 0;
    request();
  }, { rootMargin: "0px 0px -90px 0px" });
  document.querySelectorAll(".offer .btn, .reels__cta .btn").forEach((b) => ctaIO.observe(b));

  let ticking = false;

  const frame = () => {
    ticking = false;
    const y = window.scrollY;
    const vh = window.innerHeight;

    header.classList.toggle("is-solid", y > 30);

    // Нижняя панель: после главного экрана, но не поверх контактов и меню
    const cRect = contacts.getBoundingClientRect();
    const showBar = y > hero.offsetHeight * 0.55 && cRect.top > vh * 0.75 && !ctaInView && !nav.classList.contains("is-open");
    mbar.classList.toggle("is-show", showBar);
    fab.classList.toggle("is-show", showBar);

    if (reduceMotion) return;

    // Главный экран: картинка уходит глубже, текст тает
    if (y < hero.offsetHeight) {
      const hp = clamp(y / hero.offsetHeight);
      heroPar.style.setProperty("--hp", hp.toFixed(4));
      heroContent.style.setProperty("--hp", hp.toFixed(4));
      heroControls.style.setProperty("--hp", hp.toFixed(4));
    }

    // История: кадры перетекают друг в друга, холод сменяется теплом
    const r = film.getBoundingClientRect();
    if (r.top < vh && r.bottom > 0) {
      const t = clamp(-r.top / (r.height - stage.offsetHeight));
      const p = t * (n - 1);
      fImgs.forEach((img, i) => {
        const appear = i === 0 ? 1 : ease(clamp(p - (i - 1)));
        const settle = clamp(p - i + 1, 0, 2) / 2;
        const scale = 1.16 - 0.1 * appear - 0.06 * settle;
        const shift = (1 - appear) * 6;
        img.style.opacity = appear.toFixed(3);
        img.style.transform = `translate3d(0, ${shift.toFixed(2)}%, 0) scale(${scale.toFixed(4)})`;
      });
      fTexts.forEach((el, i) => {
        const d = p - i;
        const o = clamp(1 - Math.abs(d) * 2.2);
        el.style.opacity = o.toFixed(3);
        el.style.transform = `translate3d(0, ${(-d * 46).toFixed(1)}px, 0)`;
        el.style.visibility = o > 0.01 ? "visible" : "hidden";
      });
      stage.style.setProperty("--warm", t.toFixed(3));
      stage.style.setProperty("--fp", t.toFixed(4));
    }

    // Ролики на ПК: соседние карточки едут с разной скоростью
    const rr = reelsBox.getBoundingClientRect();
    if (!isPhone() && rr.top < vh && rr.bottom > 0) {
      const k = (rr.top + rr.height / 2 - vh / 2) / vh;
      reelCards.forEach((c, i) => c.style.setProperty("--ry", `${(k * (i % 2 ? 70 : -30)).toFixed(1)}px`));
    }

    // Контакты: фон плывёт медленнее страницы
    if (cRect.top < vh && cRect.bottom > 0) {
      const cp = (cRect.top + cRect.height / 2 - vh / 2) / vh;
      contactsImg.style.setProperty("--py", `${(cp * -6).toFixed(2)}%`);
    }
  };

  const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", request);
  frame();
})();

/* ===== Появление блоков ===== */
(() => {
  document.querySelectorAll(".section-title").forEach((t) => t.classList.add("reveal"));
  const els = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("is-in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const siblings = [...e.target.parentElement.querySelectorAll(".reveal")];
      e.target.style.transitionDelay = `${(siblings.indexOf(e.target) % 3) * 90}ms`;
      e.target.classList.add("is-in");
      io.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  els.forEach((el) => io.observe(el));
})();

/* ===== Счётчики ===== */
(() => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const end = +el.dataset.count;
      const suffix = el.dataset.suffix || "";
      io.unobserve(el);
      if (!end) { el.textContent = "—"; return; } // цифра ещё не заполнена
      const t0 = performance.now();
      const dur = reduceMotion ? 1 : 1400;
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll("[data-count]").forEach((el) => io.observe(el));
})();

/* ===== Услуги: карточка в центре крупнее, картинки плывут ===== */
(() => {
  const rail = document.getElementById("rail");
  const bar = document.getElementById("railBar");
  const cards = [...rail.querySelectorAll(".service")];
  let ticking = false;

  document.querySelectorAll("[data-scroll]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const step = cards[0].getBoundingClientRect().width + 16;
      rail.scrollBy({ left: step * +btn.dataset.scroll, behavior: "smooth" });
    });
  });

  const update = () => {
    ticking = false;
    const max = rail.scrollWidth - rail.clientWidth;
    const p = max > 0 ? rail.scrollLeft / max : 0;
    bar.style.setProperty("--rp", (0.2 + p * 0.8).toFixed(3));
    const vw = window.innerWidth;
    const focus = isPhone() ? vw * 0.45 : vw / 2;
    cards.forEach((c) => {
      const rect = c.getBoundingClientRect();
      const offset = (rect.left + rect.width / 2 - focus) / vw;
      c.style.setProperty("--px", `${(-10 - offset * 12).toFixed(2)}%`);
      if (isPhone() && !reduceMotion) {
        const k = Math.min(Math.abs(offset) * 1.4, 1);
        c.style.setProperty("--s", (1 - k * 0.07).toFixed(3));
        c.style.setProperty("--o", (1 - k * 0.4).toFixed(3));
      } else {
        c.style.setProperty("--s", "1");
        c.style.setProperty("--o", "1");
      }
    });
  };
  const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  rail.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", request);
  update();
})();

/* ===== Колода картин: тянется за пальцем ===== */
(() => {
  const deck = document.getElementById("deck");
  if (!deck) return;
  const cards = [...deck.querySelectorAll(".deck__card")];
  const n = cards.length;
  let front = 0;

  const spread = () => (isPhone() ? 52 : 120);

  const layout = (pos = front) => {
    cards.forEach((c, i) => {
      let o = i - pos;
      if (o > n / 2) o -= n;
      if (o < -n / 2) o += n;
      const a = Math.abs(o);
      c.style.transform = `translateX(calc(-50% + ${(o * spread()).toFixed(1)}px)) translateY(${(a * 18).toFixed(1)}px) rotate(${(o * 6).toFixed(2)}deg) scale(${(1 - a * 0.08).toFixed(3)})`;
      c.style.zIndex = String(100 - Math.round(a * 10));
      c.style.filter = a > 0.05 ? `brightness(${(1 - Math.min(a, 2) * 0.25).toFixed(2)})` : "none";
      c.style.opacity = a > 2.4 ? "0" : "1";
      c.classList.toggle("is-front", a < 0.5);
    });
  };

  const go = (d) => { front = (front + d + n) % n; layout(); };
  document.getElementById("deckPrev").addEventListener("click", () => go(-1));
  document.getElementById("deckNext").addEventListener("click", () => go(1));
  deck.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  });

  // Карточки двигаются вместе с пальцем, а на отпускании встают на место
  let startX = null, startY = 0, dragging = false, moved = 0;
  deck.addEventListener("pointerdown", (e) => { startX = e.clientX; startY = e.clientY; moved = 0; dragging = false; });
  deck.addEventListener("pointermove", (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (!dragging && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
      dragging = true;
      deck.classList.add("is-dragging");
      deck.setPointerCapture?.(e.pointerId);
    }
    if (dragging) { moved = dx; layout(front - dx / (spread() * 2.2)); }
  });
  const end = (e) => {
    if (startX === null) return;
    deck.classList.remove("is-dragging");
    if (dragging) {
      const steps = Math.round(-moved / (spread() * 2.2)) || (Math.abs(moved) > 30 ? (moved < 0 ? 1 : -1) : 0);
      go(steps);
    } else {
      const card = e.target.closest?.(".deck__card");
      const i = cards.indexOf(card);
      if (i >= 0 && i !== front) { front = i; layout(); }
    }
    startX = null; dragging = false;
  };
  deck.addEventListener("pointerup", end);
  deck.addEventListener("pointercancel", end);

  window.addEventListener("resize", () => layout());
  layout();
})();

/* ===== Задвижка с роликами «Как мы работаем» ===== */
(() => {
  const btn = document.querySelector(".reels__toggle");
  const drawer = document.getElementById("reelsDrawer");
  if (!btn || !drawer) return;
  const label = btn.querySelector(".reels__toggle-text");
  btn.addEventListener("click", () => {
    const open = !drawer.classList.contains("is-open");
    drawer.classList.toggle("is-open", open);
    drawer.inert = !open;
    btn.setAttribute("aria-expanded", String(open));
    label.textContent = open ? "Свернуть видео" : "Смотреть, как проходит сеанс";
    if (!open) drawer.querySelectorAll("video").forEach((v) => v.pause());
  });
})();

/* ===== Мастера: нажатие на фото переворачивает на сертификат ===== */
document.querySelectorAll(".master__flip").forEach((btn) => {
  btn.addEventListener("click", () => {
    const on = !btn.classList.contains("is-flipped");
    btn.classList.toggle("is-flipped", on);
    btn.setAttribute("aria-pressed", String(on));
  });
});
