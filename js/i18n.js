/* ===== Языки сайта: РУС / САХА / ENG =====
   Русский текст берётся из разметки. Перевода нет — остаётся русский.
   Саха — перевод преподавателя якутского языка (01_ПРОЕКТЫ/Салон_автоматизация/Сайт_перевод_саха.md), без правок. */
(() => {
  const DICT = {
    nav_offers:   { sah: "Этиилэр", en: "Offers" },
    offer_tag:    { sah: "Бастакы суруйтарыыга сыаната", en: "First visit" },
    services:     { sah: "Өҥө уонна сыана", en: "Services & prices" },
    nav_masters:  { sah: "Маастардар", en: "Masters" },
    nav_reviews:  { sah: "Сыанабыллар", en: "Reviews" },
    nav_video:    { sah: "Биидьийэ", en: "Video" },
    nav_contacts: { sah: "Билсиһэр сибээс", en: "Contacts" },
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
    // Дополнения к массажу: черновик Claude, ждёт проверки преподавателя
    a_title:      { sah: "Илбийиигэ <em>эбии</em>", en: "Massage <em>add-ons</em>" },
    a_feet:       { sah: "Күнү быһа атах үрдүгэр сылдьыбыт кэннэ чэпчэтэр", en: "Lightness after a day on your feet" },
    a_hands_t:    { sah: "Илии илбийиитэ", en: "Hand massage" },
    a_hands:      { sah: "Компьютерга олорон үлэлээбит илиилэргэ", en: "For hands after working at a computer" },
    a_cups_t:     { sah: "Баанканан илбийии", en: "Cupping massage" },
    a_cups:       { sah: "Күүстээҕи сөбүлүүргэ — көхсү дириҥник илбийии", en: "Deep work on the back for those who like it stronger" },
    a_head:       { sah: "Сынньатар, санааны чэпчэтэр", en: "Helps you relax and switch off" },
    a_neck_t:     { sah: "Моой уонна санны", en: "Neck and collar zone" },
    a_neck:       { sah: "Санныта «таас» курдук буолбуттарга", en: "For shoulders that feel like stone" },
    // Карта напряжения: перевод преподавателя
    z_chip_full:  { sah: "Бүтүн эт-сиин · 60 мүн" },
    z_chip_shvz:  { sah: "Моой уонна санны үрдэ (шейно-воротниковая зона)" },
    z_chip_back:  { sah: "Сис · 30" },
    z_chip_arms:  { sah: "Илии · 30" },
    z_chip_legs:  { sah: "Атах · 30" },
    z_chip_head:  { sah: "Төбө уонна сирэй" },
    z_chip_feet:  { sah: "Уллуңнар +15 мүн" },
    z_full_name:  { sah: "Бүтүн эт-сиин" },
    z_full_text:  { sah: "Бүтүн эт-сиин, төбө уонна уллуҥ өттүттэн ураты — 60 мүнүүтэ: моой уонна санны үрдэ, сис, илии, атах." },
    z_body:       { sah: "Бүтүн эт-сиин, төбө уонна уллуҥ өттүттэн ураты" },
    z_fine:       { sah: "Көмө сурук: маастар кылгас кэпсэтии кэнниттэн бырагыраамманы талан биэриэ." },
    z_shvz_name:  { sah: "Моой уонна санны үрдэ" },
    z_shvz_text:  { sah: "Моой, санны үрдэ уонна сарын — 30 мүнүүтэ. Көмпүүтэр иннигэр уонна төлөпүөҥҥэ уһуннук олорор дьон тыҥааһына саамай барытыттан ордук манна мунньуллар." },
    z_health:     { sah: "Чэбдигирдэр (доруобуйаны тупсарар) илбийии", en: "Wellness massage" },
    z_btn:        { sah: "Суруттарыы: {min} мүнүүтэ {price}га", en: "Book: {min} min for {price}" },
    u_min:        { sah: "мүнүүтэ", en: "min" },
    u_rub:        { sah: "солкуобай" },
    c_addr:       { sah: "Аадырыс", en: "Address" },
    c_hours:      { en: "Hours" },
    c_daily:      { sah: "Күн ахсын", en: "Daily" },
    c_phone:      { sah: "Төлөпүөн", en: "Phone" },
    c_byappt:     { sah: "Сурутуунан үлэлиибит.", en: "By appointment only." },
  };

  // Слайды главного экрана: заголовок и текст
  const SLIDES = {
    1: {
      sah: { title: "Дьокуускайга массаас кэнниттэн эт-сиин чэпчиир, сымныыр", text: "Моой, санны, көхсү: маастар ханна күүрүү баарын быһаарар уонна ол сирдэринэн чопчу үлэлиир. Эккит-сииңңит чэпчээн тахсагыт." },
      en: { title: "Massage in Yakutsk that leaves your body light", text: "Neck, shoulders, back: the master finds where tension has settled and works right there. You walk out feeling light." },
    },
    2: {
      sah: { title: "60 мүнүүтэни бэйэҕитигэр анаан", text: "Чуумпуга, сымнагас уокка, маастар сылаас илиилэригэр. Телефоңңутун киириигэ хаалларыаххытын сөп." },
      en: { title: "60 minutes that are all yours", text: "Silence, soft light, the master’s warm hands. You can leave your phone at reception." },
    },
    3: {
      sah: { title: "Эти-сиини билэр-көрөр маастардар", text: "7 маастар. Хас биирдилэрэ техникаҕа эрэ буолбакка, ханна быччың күүрэн тутан олорорун быһаарарга эмиэ үөрэммиттэрэ." },
      en: { title: "Masters who feel the body", text: "7 masters. Each was trained not only in technique but in hearing where you hold tension." },
    },
    4: {
      sah: { title: "1 мүнүүтэ иһигэр суруттарыы", text: "Whatsapp арыйарга, \"ватсапка суруттарыы\" баттаан. Маастары уонна табыгастаах бириэмэни сөп түбэһиннэрэн талыахпыт." },
      en: { title: "Booking in one minute", text: "Tap “Book” and WhatsApp opens. We’ll find a master and a time that suits you." },
    },
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
    document.dispatchEvent(new Event("langchange"));
  };

  // Одна кнопка: по нажатию открывается список языков
  const btn = document.getElementById("langBtn");
  const menu = document.getElementById("langMenu");
  const toggle = (open) => { menu.hidden = !open; btn.setAttribute("aria-expanded", String(open)); };
  btn.addEventListener("click", (e) => { e.stopPropagation(); toggle(menu.hidden); });
  menu.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => { apply(b.dataset.lang); toggle(false); }));
  document.addEventListener("click", (e) => { if (!menu.hidden && !e.target.closest("#lang")) toggle(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { toggle(false); btn.focus(); } });

  // Плашка под кнопкой: подсказывает, что есть саха и английский; прячется после выбора или через 10 с
  const hint = document.getElementById("langHint");
  const hideHint = () => hint && hint.classList.add("is-hidden");
  if (hint) {
    hint.addEventListener("click", (e) => { e.stopPropagation(); hideHint(); toggle(true); });
    btn.addEventListener("click", hideHint);
    setTimeout(hideHint, 10000);
  }

  // Сайт всегда открывается на русском; другой язык — только по ссылке ?lang=sah или ?lang=en
  const saved = new URLSearchParams(location.search).get("lang");
  if (saved && saved !== "ru") { apply(saved); hideHint(); }
})();
