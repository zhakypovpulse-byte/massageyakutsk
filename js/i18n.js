/* ===== Языки сайта: РУС / САХА / ENG =====
   Русский текст берётся из разметки. Перевода нет — остаётся русский.
   Саха — перевод преподавателя якутского языка (01_ПРОЕКТЫ/Салон_автоматизация/Сайт_перевод_саха.md), без правок. */
(() => {
  const DICT = {
    nav_offers:   { sah: "Этиилэр", en: "Offers" },
    offer_tag:    { sah: "Бастакы суруйтарыыга сыаната", en: "First visit" },
    services:     { sah: "Өҥө уонна сыана", en: "Services & prices" },
    nav_masters:  { sah: "Маастардар", en: "Masters" },
    nav_reviews:  { en: "Reviews" },
    nav_video:    { sah: "Биидьийэ", en: "Video" },
    nav_contacts: { en: "Contacts" },
    wa:           { sah: "Ватспапка суруттарыы", en: "Book on WhatsApp" },
    book:         { sah: "Суруттарыы", en: "Book" },
    book_this:    { sah: "Бу массааска суруйтарыы", en: "Book this massage" },
    watch:        { sah: "Сеанс хайдах барарын көрүү", en: "See how a session goes" },
    want:         { sah: "Суруйтарыахпын баҕарабын", en: "I want this too — book" },
    read_reviews: { sah: "Отзывтары ааҕыы · 2GIS", en: "Read all reviews on 2GIS" },
    open_2gis:    { en: "Open in 2GIS" },
    frost:        { en: "Swipe the glass to thaw it" },
    temp_cold:    { sah: "Дьокуускайга таҺырдьа тымныы", en: "Outside in Yakutsk" },
    temp_warm:    { sah: "оттон биһиэхэ сылаас", en: "warm in here" },
    f_2019:       { sah: "2019 сыллаахтан", en: "Since 2019" },
    f_7:          { sah: "7 маастар", en: "7 masters" },
    f_min:        { sah: "1 мүнүүтэ иһигэр суруйтарыы", en: "Book in 1 minute" },
    f_all:        { sah: "Салоҥҥа сеанска аналлаах барыта баар", en: "Everything for your session is here" },
    h_offers:     { sah: "Эһиэхэ<br><em>этиилэр</em>", en: "Offers<br><em>for you</em>" },
    h_story:      { sah: "<em>Остуоруйа</em>", en: "The story of <em>Massage.ykt</em>" },
    h_why:        { sah: "Тоҕо биһигини<br><em>талаллар?</em>", en: "Why people<br><em>choose us</em>" },
    h_services:   { sah: "Өҥө<br><em>уонна сыана</em>", en: "Services<br><em>and prices</em>" },
    h_video:      { sah: "Биһиги хайдах<br><em>үлэлиирбитин көрүҥ</em>", en: "See<br><em>how we work</em>" },
    h_masters:    { sah: "Биһиги<br><em>маастардарбыт</em>", en: "Our<br><em>masters</em>" },
    our_masters:  { sah: "Биһиги маастардарбыт", en: "Our masters" },
    masters_lead: {
      sah: "Хас биирдии маастар опыттаах, туспа туттар техникалаах.",
      en: "Each master has their own experience and technique. Tap a photo to see the certificate. Tell us on WhatsApp who you’d like, and we’ll find a time.",
    },
    h_reviews:    { sah: "Килийиэннэр<br><em>этэллэр</em>", en: "What clients<br><em>say</em>" },
    h_faq:        { sah: "Куруук<br><em>ыйыталлар</em>", en: "Frequently asked<br><em>questions</em>" },
    h_contacts:   { sah: "Эһигини<br><em>күүтэбит</em>", en: "See you<br><em>in Yakutsk</em>" },
    s_relax:      { sah: "Сынньалаң илбийии", en: "Relaxing massage" },
    s_health:     { sah: "Чэгиэн илбийии", en: "Wellness massage" },
    s_sport:      { sah: "Спортивнай илбийии", en: "Sports massage" },
    s_deep:       { en: "Deep-work massage" },
    s_lymph:      { en: "Lymphatic drainage massage" },
    s_belly:      { en: "Abdominal massage" },
    s_cell:       { en: "Anti-cellulite massage" },
    s_face:       { sah: "Сирэй илбийиитэ", en: "Face massage" },
    s_body:       { en: "Body practice" },
    s_feet:       { sah: "Тилэх илбийиитэ", en: "Foot massage" },
    s_head:       { sah: "Төбөнү илбийии", en: "Head massage" },
    s_back:       { sah: "Көхсү уонна моой илбийиитэ", en: "Back and neck" },
    c_addr:       { sah: "Аадырыс", en: "Address" },
    c_hours:      { en: "Hours" },
    c_daily:      { sah: "Күн ахсын", en: "Daily" },
    c_phone:      { sah: "Төлөпүөн", en: "Phone" },
    c_byappt:     { sah: "Сурутуунан үлэлиибит.", en: "By appointment only." },
  };

  // Слайды главного экрана: заголовок и текст
  const SLIDES = {
    1: {
      sah: { title: "Дьокуускайга массаас кэнниттэн эт-сиин чэпчиир, сымныыр" },
      en: { title: "Massage in Yakutsk that leaves your body light", text: "Neck, shoulders, back: the master finds where tension has settled and works right there. You walk out feeling light." },
    },
    2: { en: { title: "60 minutes that are all yours", text: "Silence, soft light, the master’s warm hands. You can leave your phone at reception." } },
    3: { en: { title: "Masters who feel the body", text: "7 masters. Each was trained not only in technique but in hearing where you hold tension." } },
    4: { en: { title: "Booking in one minute", text: "Tap “Book” and WhatsApp opens. We’ll find a master and a time that suits you." } },
  };

  const LANGS = ["ru", "sah", "en"];
  const nodes = [...document.querySelectorAll("[data-i18n]")];
  nodes.forEach((el) => { el.dataset.ru = el.innerHTML; });
  const slides = [...document.querySelectorAll("[data-i18n-slide]")];
  slides.forEach((el) => { el.dataset.ruTitle = el.dataset.title; el.dataset.ruText = el.dataset.text; });

  let lang = "ru";
  // Для script.js: текст по ключу на текущем языке
  window.t = (key, ru) => (lang !== "ru" && DICT[key] && DICT[key][lang]) || ru;

  const apply = (next) => {
    lang = LANGS.includes(next) ? next : "ru";
    document.documentElement.lang = lang;
    nodes.forEach((el) => {
      const tr = DICT[el.dataset.i18n];
      el.innerHTML = (lang !== "ru" && tr && tr[lang]) || el.dataset.ru;
    });
    slides.forEach((el) => {
      const tr = (SLIDES[el.dataset.i18nSlide] || {})[lang] || {};
      el.dataset.title = (lang !== "ru" && tr.title) || el.dataset.ruTitle;
      el.dataset.text = (lang !== "ru" && tr.text) || el.dataset.ruText;
    });
    // Текущий слайд на главном экране — сразу на новом языке
    const active = document.querySelector(".hero__slide.is-active");
    const title = document.getElementById("heroTitle");
    const text = document.getElementById("heroText");
    if (active && title) title.textContent = active.dataset.title;
    if (active && text) text.textContent = active.dataset.text;
    document.querySelectorAll("#langMenu button").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
      if (b.dataset.lang === lang) document.getElementById("langCur").textContent = b.dataset.short;
    });
    try { localStorage.setItem("lang", lang); } catch (e) {}
  };

  // Одна кнопка: по нажатию открывается список языков
  const btn = document.getElementById("langBtn");
  const menu = document.getElementById("langMenu");
  const toggle = (open) => { menu.hidden = !open; btn.setAttribute("aria-expanded", String(open)); };
  btn.addEventListener("click", (e) => { e.stopPropagation(); toggle(menu.hidden); });
  menu.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => { apply(b.dataset.lang); toggle(false); }));
  document.addEventListener("click", (e) => { if (!menu.hidden && !e.target.closest("#lang")) toggle(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { toggle(false); btn.focus(); } });

  let saved = new URLSearchParams(location.search).get("lang");
  if (!saved) { try { saved = localStorage.getItem("lang"); } catch (e) {} }
  if (saved && saved !== "ru") apply(saved);
})();
