#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Build the downloadable static Mansaj Digital site from the uploaded original,
applying ALL requested changes:
 1. Remove "150+ websites" / "150 clients" -> years of experience + 760+ hours
 2. English is the official default language (AR toggle stays)
 3. Delete Nibras / Al-Rafidain / Al-Kawthar projects everywhere
 4. Add 4 pricing packages (159 / 599 / 1399 / custom) with WhatsApp order
    messages containing the full package contents
 5. WhatsApp-only contact (no tel: links)
 6. Floating WhatsApp button on every page
 7. Cursor upgraded: square that colors and shows a text label on links
 8. Space Grotesk as the strong digital English font
"""
import os, re, shutil, subprocess

SRC = "/home/z/my-project/upload/mansaj-extracted"
DST = "/home/z/my-project/static-site"
PUBZIP = "/home/z/my-project/public/mansaj-digital-site.zip"

if os.path.exists(DST):
    shutil.rmtree(DST)
shutil.copytree(SRC, DST)

WA = "967770233292"

def rd(p):
    with open(p, "r", encoding="utf-8") as f:
        return f.read()

def wr(p, s):
    with open(p, "w", encoding="utf-8") as f:
        f.write(s)

HTML_FILES = ["index.html", "about.html", "services.html", "projects.html", "contact.html"]

def global_html(s):
    # 1. English default
    s = s.replace('<html lang="ar" dir="rtl"', '<html lang="en" dir="ltr"', 1)
    s = s.replace('localStorage.getItem("mansaj-lang") || "ar"', 'localStorage.getItem("mansaj-lang") || "en"', 1)
    # 2. Space Grotesk font + Alexandria (modern Arabic font)
    s = s.replace(
        '<link rel="stylesheet" href="css/style.css">',
        '<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">\n  <link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">\n  <link rel="stylesheet" href="css/style.css">',
        1,
    )
    # 2b. swap the old Arabic webfont link to Alexandria everywhere
    s = s.replace(
        '<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap" rel="stylesheet">',
        "",
        1,
    )
    # 3. remove the tel: (direct call) footer block — WhatsApp is the only number
    s = re.sub(
        r'\s*<li>\s*<svg class="icon" aria-hidden="true"><use href="assets/icons/sprite\.svg#i-phone"></use></svg>\s*<div>\s*<p class="fc-title"[^>]*>.*?</p>\s*<a class="fc-phone ltr" href="tel:\+967770233292"[^>]*>.*?</a>\s*</div>\s*</li>',
        "",
        s,
        flags=re.S,
    )
    # 4. floating WhatsApp button before scripts
    wa_float = '''  <!-- Floating WhatsApp support button -->
  <a class="wa-float" href="https://wa.me/''' + WA + '''?text=Hello%20Mansaj%20Digital" target="_blank" rel="noopener noreferrer"
     data-wa-en="Hello Mansaj Digital 👋
I visited your website and I want to discuss a project for my business."
     data-wa-ar="مرحبًا منسج الرقمية 👋
زرت موقعكم وأريد أن أناقش مشروعًا لنشاطي التجاري."
     aria-label="تواصل مع منسج الرقمية عبر واتساب" data-ar-aria="تواصل مع منسج الرقمية عبر واتساب" data-en-aria="Chat with Mansaj Digital on WhatsApp" data-cursor="Chat">
    <svg class="icon icon-fill" aria-hidden="true"><use href="assets/icons/sprite.svg#i-whatsapp"></use></svg>
  </a>

  <script src="js/theme.js" defer></script>'''
    s = s.replace('  <script src="js/theme.js" defer></script>', wa_float, 1)
    # 5. add Pricing to desktop header nav + footer sections
    s = s.replace(
        '<li><a href="contact.html" data-ar="تواصل معنا" data-en="Contact">تواصل معنا</a></li>',
        '<li><a href="index.html#pricing" data-ar="الباقات" data-en="Pricing">الباقات</a></li>\n          <li><a href="contact.html" data-ar="تواصل معنا" data-en="Contact">تواصل معنا</a></li>',
    )
    s = s.replace(
        '<li><a href="contact.html"><span class="dot" aria-hidden="true"></span><span data-ar="تواصل معنا" data-en="Contact">تواصل معنا</span></a></li>',
        '<li><a href="index.html#pricing"><span class="dot" aria-hidden="true"></span><span data-ar="الباقات" data-en="Pricing">الباقات</span></a></li>\n          <li><a href="contact.html"><span class="dot" aria-hidden="true"></span><span data-ar="تواصل معنا" data-en="Contact">تواصل معنا</span></a></li>',
    )
    # 6. sheet menu: add pricing item (05) and renumber contact (06)
    s = s.replace(
        '<li><a href="contact.html"><svg class="icon" style="color:var(--brand)" aria-hidden="true"><use href="assets/icons/sprite.svg#i-mail"></use></svg><span data-ar="تواصل معنا" data-en="Contact">تواصل معنا</span><span class="num ltr">05</span></a></li>',
        '<li><a href="index.html#pricing"><svg class="icon" style="color:var(--brand)" aria-hidden="true"><use href="assets/icons/sprite.svg#i-credit-card"></use></svg><span data-ar="الباقات والأسعار" data-en="Packages & prices">الباقات والأسعار</span><span class="num ltr">05</span></a></li>\n        <li><a href="contact.html"><svg class="icon" style="color:var(--brand)" aria-hidden="true"><use href="assets/icons/sprite.svg#i-mail"></use></svg><span data-ar="تواصل معنا" data-en="Contact">تواصل معنا</span><span class="num ltr">06</span></a></li>',
    )
    return s

def new_stats_block(indent="          "):
    i = indent
    return f'''{i}<div class="stat-card reveal">
{i}  <span class="dot" aria-hidden="true"></span>
{i}  <p class="value ltr" data-count="1" data-suffix="+">1+</p>
{i}  <p class="label" data-ar="سنة خبرة" data-en="year of experience">سنة خبرة</p>
{i}</div>
{i}<div class="stat-card reveal" style="--reveal-delay:.08s">
{i}  <span class="dot" aria-hidden="true"></span>
{i}  <p class="value ltr" data-count="760" data-suffix="+">760+</p>
{i}  <p class="label" data-ar="ساعة عمل فعلية" data-en="hours of hands-on work">ساعة عمل فعلية</p>
{i}</div>
{i}<div class="stat-card reveal" style="--reveal-delay:.16s">
{i}  <span class="dot" aria-hidden="true"></span>
{i}  <p class="value ltr" data-count="100" data-suffix="%">100%</p>
{i}  <p class="label" data-ar="تصميم متجاوب على كل الشاشات" data-en="responsive on every screen">تصميم متجاوب على كل الشاشات</p>
{i}</div>
{i}<div class="stat-card reveal" style="--reveal-delay:.24s">
{i}  <span class="dot" aria-hidden="true"></span>
{i}  <p class="value ltr" data-count="24" data-suffix="/7">24/7</p>
{i}  <p class="label" data-ar="دعم ومتابعة عبر واتساب" data-en="WhatsApp support & follow-up">دعم ومتابعة عبر واتساب</p>
{i}</div>'''

STATS_OLD_RE = re.compile(
    r'<div class="stats-grid">\s*<div class="stat-card reveal">.*?<p class="label"[^>]*>[^<]*</p>\s*</div>\s*<div class="stat-card reveal"[^>]*>.*?<p class="label"[^>]*>[^<]*</p>\s*</div>\s*<div class="stat-card reveal"[^>]*>.*?<p class="label"[^>]*>[^<]*</p>\s*</div>\s*<div class="stat-card reveal"[^>]*>.*?<p class="label"[^>]*>[^<]*</p>\s*</div>',
    re.S,
)

for name in HTML_FILES:
    p = os.path.join(DST, name)
    s = rd(p)
    s = global_html(s)
    wr(p, s)

# ---------- index.html ----------
p = os.path.join(DST, "index.html")
s = rd(p)

s = s.replace(
    "وتجارب رقمية تساعد عملاءك على فهم ما تقدمه والوصول إليك واتخاذ الخطوة التالية بسهولة. أكثر من 150 موقعًا خلال السنة الماضية.",
    "وتجارب رقمية تساعد عملاءك على فهم ما تقدمه والوصول إليك واتخاذ الخطوة التالية بسهولة. سنة خبرة وأكثر من 760 ساعة عمل فعلي.",
)

old_trust = re.search(
    r'<span class="item"><span class="dot"[^>]*></span><strong class="ltr">\+150</strong>.*?<span class="item"><span class="dot"[^>]*></span><strong class="ltr">\+1</strong>&nbsp;<span data-ar="سنة خبرة" data-en="year of experience">سنة خبرة</span></span>',
    s, re.S)
if old_trust:
    new_trust = (
        '<span class="item"><span class="dot" aria-hidden="true"></span><strong class="ltr">+1</strong>&nbsp;<span data-ar="سنة خبرة" data-en="year of experience">سنة خبرة</span></span>\n'
        '          <span class="vr" aria-hidden="true"></span>\n'
        '          <span class="item"><span class="dot" aria-hidden="true"></span><strong class="ltr">+760</strong>&nbsp;<span data-ar="ساعة عمل فعلية" data-en="hours of hands-on work">ساعة عمل فعلية</span></span>\n'
        '          <span class="vr" aria-hidden="true"></span>\n'
        '          <span class="item"><span class="dot" aria-hidden="true"></span><strong class="ltr">100%</strong>&nbsp;<span data-ar="تصميم متجاوب على كل الشاشات" data-en="responsive on every screen">تصميم متجاوب على كل الشاشات</span></span>'
    )
    s = s[: old_trust.start()] + new_trust + s[old_trust.end():]

s = STATS_OLD_RE.sub('<div class="stats-grid">\n' + new_stats_block(), s)

nibras = re.search(r'\s*<article class="project-card reveal" style="--reveal-delay:\.16s" data-category="realty" data-url="https://nebrasestate\.netlify\.app/">.*?</article>', s, re.S)
if nibras:
    s = s[: nibras.start()] + s[nibras.end():]

wr(p, s)

# ---------- about.html ----------
p = os.path.join(DST, "about.html")
s = rd(p)
s = s.replace("— بأكثر من 150 موقعًا و150 عميلًا.", "— بأكثر من 760 ساعة عمل فعلي.")
s = s.replace("— with 150+ websites and 150 clients.", "— with 760+ hours of hands-on work.")
s = STATS_OLD_RE.sub('<div class="stats-grid">\n' + new_stats_block(), s)
wr(p, s)

# ---------- projects.html ----------
p = os.path.join(DST, "projects.html")
s = rd(p)

s = s.replace('<button type="button" class="chip" data-filter="all" aria-pressed="true"><span data-ar="الكل" data-en="All">الكل</span><span class="count ltr">7</span></button>',
              '<button type="button" class="chip" data-filter="all" aria-pressed="true"><span data-ar="الكل" data-en="All">الكل</span><span class="count ltr">4</span></button>')
s = s.replace('<button type="button" class="chip" data-filter="restaurants" aria-pressed="false"><span data-ar="مطاعم ومشويات" data-en="Restaurants">مطاعم ومشويات</span><span class="count ltr">4</span></button>',
              '<button type="button" class="chip" data-filter="restaurants" aria-pressed="false"><span data-ar="مطاعم ومشويات" data-en="Restaurants">مطاعم ومشويات</span><span class="count ltr">2</span></button>')
s = re.sub(r'\s*<button type="button" class="chip" data-filter="realty"[^>]*>.*?</button>', "", s, count=1, flags=re.S)

for marker in [
    r'\s*<!-- 04 — Nibras -->\s*<article class="project-card reveal"[^>]*data-category="realty"[^>]*>.*?</article>',
    r'\s*<!-- 05 — Naseem -->\s*<article class="project-card reveal"[^>]*>.*?</article>',
    r'\s*<!-- 07 — Al-Kawthar -->\s*<article class="project-card reveal"[^>]*>.*?</article>',
]:
    s = re.sub(marker, "", s, count=1, flags=re.S)

s = s.replace('<!-- 06 — Just Wow -->', '<!-- 04 — Just Wow -->')
s = s.replace('<span class="no-badge ltr">06</span>', '<span class="no-badge ltr">04</span>')
s = s.replace('<span class="d-no ltr">06</span>', '<span class="d-no ltr">04</span>')
wr(p, s)

# ----------------------------------------------------------------------
# pricing section for index.html
# ----------------------------------------------------------------------
def plan_card(no, icon, en_name, ar_name, en_tag, ar_tag, en_feats, ar_feats,
              wa_en, wa_ar, price=None, featured=False, custom=False):
    badge = '\n          <span class="plan-badge" data-ar="الأكثر طلبًا" data-en="Most popular">الأكثر طلبًا</span>' if featured else ""
    cls = "service-card plan plan-featured reveal" if featured else "service-card plan reveal"
    if custom:
        price_html = '<p class="plan-price ltr"><span data-ar="لنتحدث" data-en="Let&#39;s talk">لنتحدث</span></p>'
        btn_txt_ar, btn_txt_en = "لنناقش مشروعي", "Scope my project"
    else:
        price_html = f'<p class="plan-price ltr">{price} <small><span data-ar="دفعة واحدة" data-en="one-time">دفعة واحدة</span></small></p>'
        btn_txt_ar, btn_txt_en = "اطلب عبر واتساب", "Order via WhatsApp"
    items = "\n".join(
        f'            <li><svg class="icon" aria-hidden="true"><use href="assets/icons/sprite.svg#i-check"></use></svg><span data-ar="{a}" data-en="{e}">{a}</span></li>'
        for a, e in zip(ar_feats, en_feats)
    )
    return f'''        <article class="{cls}" style="--reveal-delay:{no * 0.08:.2f}s">{badge}
          <div class="head">
            <span class="s-icon"><svg class="icon" aria-hidden="true"><use href="assets/icons/sprite.svg#{icon}"></use></svg></span>
            <h3><span data-ar="{ar_name}" data-en="{en_name}">{ar_name}</span></h3>
          </div>
          {price_html}
          <p class="s-desc"><span data-ar="{ar_tag}" data-en="{en_tag}">{ar_tag}</span></p>
          <ul class="plan-list">
{items}
          </ul>
          <div class="s-action">
            <a href="https://wa.me/{WA}?text=Package%20order" target="_blank" rel="noopener noreferrer" class="btn btn-brand btn-block" data-wa-en="{wa_en}" data-wa-ar="{wa_ar}" data-cursor="Order">
              <svg class="icon icon-fill" aria-hidden="true"><use href="assets/icons/sprite.svg#i-whatsapp"></use></svg>
              <span data-ar="{btn_txt_ar}" data-en="{btn_txt_en}">{btn_txt_ar}</span>
            </a>
          </div>
        </article>'''

plans = []
plans.append(plan_card(
    1, "i-sparkles", "Launch — $159", "لانش — 159$",
    "One sharp page that puts your business on the map — fast.",
    "صفحة واحدة قوية تضع نشاطك على الخريطة — وبسرعة.",
    ["One-page landing website", "Mobile-first responsive design", "WhatsApp direct-contact button", "Basic SEO setup", "Social media & map links", "Delivery in 3–5 days", "1 revision round", "2 weeks post-launch support"],
    ["موقع هبوط بصفحة واحدة", "تصميم متجاوب يعرض بفخر على الجوال", "زر تواصل مباشر عبر واتساب", "تهيئة أساسية لمحركات البحث", "روابط التواصل الاجتماعي والخريطة", "التسليم خلال 3–5 أيام", "جولة تعديل واحدة", "دعم أسبوعين بعد التسليم"],
    "Hello Mansaj Digital 👋\nI want to order the *Launch package — $159*.\n\nWhat the package includes:\n• One-page landing website\n• Mobile-first responsive design\n• WhatsApp direct-contact button\n• Basic SEO setup\n• Social media & map links\n• Delivery in 3–5 days\n• 1 revision round\n• 2 weeks post-launch support\n\nPlease send me the next steps to start.",
    "مرحبًا منسج الرقمية 👋\nأريد طلب باقة *لانش — 159$*.\n\nمكونات الباقة:\n• موقع هبوط بصفحة واحدة\n• تصميم متجاوب يعرض بفخر على الجوال\n• زر تواصل مباشر عبر واتساب\n• تهيئة أساسية لمحركات البحث\n• روابط التواصل الاجتماعي والخريطة\n• التسليم خلال 3–5 أيام\n• جولة تعديل واحدة\n• دعم أسبوعين بعد التسليم\n\nأرجو إرسال الخطوات التالية لبدء المشروع.",
    price="$159",
))
plans.append(plan_card(
    2, "i-layers", "Business — $599", "بزنس — 599$",
    "A full multi-page website that explains your business and sells it.",
    "موقع متعدد الصفحات يشرح نشاطك ويبيع له.",
    ["Up to 6 custom pages", "Tailored design matching your brand", "Gallery, menu, or services showcase", "Contact forms + Google Maps", "On-page SEO for every page", "Google Analytics setup", "Delivery in 7–10 days", "3 revision rounds", "1 month post-launch support"],
    ["حتى 6 صفحات مخصصة", "تصميم مفصّل على هوية علامتك", "عرض معرض أو قائمة أو خدمات", "نماذج تواصل + خرائط جوجل", "تهيئة SEO لكل صفحة", "إعداد Google Analytics", "التسليم خلال 7–10 أيام", "3 جولات تعديل", "دعم شهر كامل بعد التسليم"],
    "Hello Mansaj Digital 👋\nI want to order the *Business package — $599*.\n\nWhat the package includes:\n• Up to 6 custom pages\n• Tailored design matching your brand\n• Gallery, menu, or services showcase\n• Contact forms + Google Maps\n• On-page SEO for every page\n• Google Analytics setup\n• Delivery in 7–10 days\n• 3 revision rounds\n• 1 month post-launch support\n\nPlease send me the next steps to start.",
    "مرحبًا منسج الرقمية 👋\nأريد طلب باقة *بزنس — 599$*.\n\nمكونات الباقة:\n• حتى 6 صفحات مخصصة\n• تصميم مفصّل على هوية علامتك\n• عرض معرض أو قائمة أو خدمات\n• نماذج تواصل + خرائط جوجل\n• تهيئة SEO لكل صفحة\n• إعداد Google Analytics\n• التسليم خلال 7–10 أيام\n• 3 جولات تعديل\n• دعم شهر كامل بعد التسليم\n\nأرجو إرسال الخطوات التالية لبدء المشروع.",
    price="$599",
    featured=True,
))
plans.append(plan_card(
    3, "i-shopping-bag", "E-commerce Pro — $1,399", "متجر برو — 1,399$",
    "A complete online store, ready to take orders from day one.",
    "متجر إلكتروني كامل، جاهز لاستقبال الطلبات من اليوم الأول.",
    ["Full online store (up to 50 products)", "Payment gateway integration", "Cart & smooth checkout flow", "Categories, search & product filters", "Order alerts via WhatsApp & email", "Advanced SEO + speed optimization", "Delivery in 2–3 weeks", "Unlimited revisions within scope", "3 months priority support"],
    ["متجر كامل (حتى 50 منتجًا)", "ربط بوابة دفع إلكترونية", "سلة شراء وتجربة دفع سلسة", "تصنيفات وبحث وفلترة للمنتجات", "تنبيهات الطلبات عبر واتساب والبريد", "SEO متقدم وتحسين سرعة", "التسليم خلال 2–3 أسابيع", "تعديلات غير محدودة ضمن النطاق", "دعم أولوية 3 أشهر"],
    "Hello Mansaj Digital 👋\nI want to order the *E-commerce Pro package — $1,399*.\n\nWhat the package includes:\n• Full online store (up to 50 products)\n• Payment gateway integration\n• Cart & smooth checkout flow\n• Categories, search & product filters\n• Order alerts via WhatsApp & email\n• Advanced SEO + speed optimization\n• Delivery in 2–3 weeks\n• Unlimited revisions within scope\n• 3 months priority support\n\nPlease send me the next steps to start.",
    "مرحبًا منسج الرقمية 👋\nأريد طلب باقة *متجر برو — 1,399$*.\n\nمكونات الباقة:\n• متجر كامل (حتى 50 منتجًا)\n• ربط بوابة دفع إلكترونية\n• سلة شراء وتجربة دفع سلسة\n• تصنيفات وبحث وفلترة للمنتجات\n• تنبيهات الطلبات عبر واتساب والبريد\n• SEO متقدم وتحسين سرعة\n• التسليم خلال 2–3 أسابيع\n• تعديلات غير محدودة ضمن النطاق\n• دعم أولوية 3 أشهر\n\nأرجو إرسال الخطوات التالية لبدء المشروع.",
    price="$1,399",
))
plans.append(plan_card(
    4, "i-wrench", "Custom — Let's talk", "مخصوص — لنتحدث",
    "Booking systems, portals, and web apps — built around your idea.",
    "أنظمة حجز وبوابات وتطبيقات ويب — تُبنى حول فكرتك.",
    ["Tailored scope & quote after a short chat", "Web applications & platforms", "Booking & membership systems", "Custom integrations & APIs", "Dedicated project timeline", "Long-term partnership options"],
    ["نطاق وعرض سعر مخصص بعد محادثة قصيرة", "تطبيقات ومنصات ويب", "أنظمة حجز وعضوية", "ربط وتكاملات وواجهات برمجية", "جدول زمني مخصص لمشروعك", "خيارات شراكة طويلة المدى"],
    "Hello Mansaj Digital 👋\nI want the *Custom package* for a special project.\nMy project idea:\n- \n\nPlease contact me to discuss the details and scope the work.",
    "مرحبًا منسج الرقمية 👋\nأريد باقة *مخصوص* لمشروع خاص.\nفكرة مشروعي:\n- \n\nأرجو التواصل معي لمناقشة التفاصيل وتحديد النطاق والسعر.",
    custom=True,
))

pricing_section = '''
    <!-- ============ Packages & prices ============ -->
    <section class="section" id="pricing" aria-label="الباقات والأسعار" data-ar-aria="الباقات والأسعار" data-en-aria="Packages and prices">
      <div class="container">
        <div class="section-heading center reveal">
          <p class="eyebrow"><span class="squares-strip" aria-hidden="true"><i></i></span><span data-ar="الباقات والأسعار" data-en="Packages &amp; prices">الباقات والأسعار</span></p>
          <h2 data-ar="باقات واضحة. أسعار صادقة. بلا رسوم مخفية." data-en="Clear packages. Honest prices. No hidden fees.">باقات واضحة. أسعار صادقة. بلا رسوم مخفية.</h2>
          <p class="desc" data-ar="اختر الباقة المناسبة لمشروعك — عند الضغط على «اطلب عبر واتساب» ترسل لنا رسالة فيها كل محتويات الباقة، فنعرف طلبك من أول لحظة ونرد عليك فورًا." data-en="Pick the package that fits your project — one tap on &#8220;Order via WhatsApp&#8221; sends us your package with everything it includes, so we know your request from the very first message and reply right away.">اختر الباقة المناسبة لمشروعك — عند الضغط على «اطلب عبر واتساب» ترسل لنا رسالة فيها كل محتويات الباقة، فنعرف طلبك من أول لحظة ونرد عليك فورًا.</p>
        </div>

        <div class="cards-grid services-grid pricing-grid">
''' + "\n".join(plans) + '''
        </div>

        <div class="reveal" style="margin-top:2rem">
          <p class="pricing-note" data-ar="لست متأكدًا أي باقة تناسبك؟ راسلنا على واتساب وسنرشّح لك الأنسب لمشروعك — بلا أي إلحاح." data-en="Not sure which package fits? Message us on WhatsApp and we&#39;ll recommend the right one for your project — no pressure.">لست متأكدًا أي باقة تناسبك؟ راسلنا على واتساب وسنرشّح لك الأنسب لمشروعك — بلا أي إلحاح.</p>
        </div>
      </div>
    </section>
'''

p = os.path.join(DST, "index.html")
s = rd(p)
s = s.replace('    <!-- ============ Contact CTA ============ -->', pricing_section + '\n    <!-- ============ Contact CTA ============ -->', 1)
wr(p, s)

# ---------- main.js ----------
p = os.path.join(DST, "js", "main.js")
s = rd(p)

s = s.replace(
    '''  function initLang() {
    var saved = readStore(LANG_KEY);
    if (saved === "en" || saved === "ar") applyLang(saved);''',
    '''  function initLang() {
    applyLang(readStore(LANG_KEY) || "en");''',
)

s = s.replace(
    '''    $all(".lang-toggle").forEach(function (btn) {
      btn.textContent = lang === "ar" ? "EN" : "عربي";
    });''',
    '''    $all(".lang-toggle").forEach(function (btn) {
      btn.textContent = lang === "ar" ? "EN" : "عربي";
    });
    $all("[data-wa-en]").forEach(function (el) {
      var msg = lang === "ar" ? el.getAttribute("data-wa-ar") : el.getAttribute("data-wa-en");
      if (msg) el.setAttribute("href", "https://wa.me/" + AGENCY_WA + "?text=" + encodeURIComponent(msg));
    });''',
)

s = s.replace(
    """    layer.innerHTML =
      '<div class="cursor-frame"><div class="box"></div></div>' +
      '<div class="cursor-dot"><div class="box"></div></div>';""",
    """    layer.innerHTML =
      '<div class="cursor-frame"><div class="box"><span class="cursor-label"></span></div></div>' +
      '<div class="cursor-dot"><div class="box"></div></div>';""",
)
s = s.replace(
    """    var INTERACTIVE = 'a, button, [role="button"], label, summary, select, [data-cursor="link"]';""",
    """    var INTERACTIVE = 'a, button, [role="button"], label, summary, select, [data-cursor]';""",
)
s = s.replace(
    """    function onMouseOver(e) {
      var t = e.target;
      if (!(t instanceof Element)) return;
      if (matchesEl(t, FIELD)) layer.classList.add("is-field");
      else if (matchesEl(t, INTERACTIVE)) layer.classList.add("is-link");
      else layer.classList.remove("is-link");
    }""",
    """    function onMouseOver(e) {
      var t = e.target;
      if (!(t instanceof Element)) return;
      if (matchesEl(t, FIELD)) {
        layer.classList.add("is-field");
        layer.classList.remove("is-link");
        return;
      }
      var el = t.closest(INTERACTIVE);
      if (el) {
        layer.classList.add("is-link");
        var custom = el.getAttribute("data-cursor");
        var def = currentLang() === "ar" ? "افتح" : "Open";
        var lab = layer.querySelector(".cursor-label");
        if (lab) lab.textContent = custom || def;
      } else {
        layer.classList.remove("is-link");
      }
    }""",
)
wr(p, s)

# ---------- css ----------
p = os.path.join(DST, "css", "style.css")
s = rd(p)
s = s.replace(
    '''  font-family: "IBM Plex Sans Arabic", ui-sans-serif, system-ui, -apple-system,
    "Segoe UI", sans-serif;''',
    '''  font-family: "Space Grotesk", "IBM Plex Sans Arabic", ui-sans-serif, system-ui,
    -apple-system, "Segoe UI", sans-serif;''',
)
s = s.replace(
    """.cursor-layer.is-link .cursor-frame .box {
  transform: translate(-50%, -50%) rotate(45deg) scale(1.45);
}
.cursor-layer.is-link .cursor-dot .box {
  transform: translate(-50%, -50%) rotate(45deg) scale(0.55);
}""",
    """.cursor-layer.is-link .cursor-frame .box {
  transform: translate(-50%, -50%);
  width: auto;
  min-width: 2.75rem;
  height: 2.3rem;
  border-radius: 5px;
  background: var(--brand);
  border-color: var(--brand);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.85rem;
}
.cursor-frame .cursor-label {
  display: none;
}
.cursor-layer.is-link .cursor-frame .cursor-label {
  display: block;
  font-family: "Space Grotesk", "IBM Plex Sans Arabic", sans-serif;
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--brand-foreground);
  white-space: nowrap;
}
.cursor-layer.is-link .cursor-dot .box {
  opacity: 0;
}""",
)

extra_css = '''

/* ------------------------------------------------------------------ */
/* Pricing packages                                                    */
/* ------------------------------------------------------------------ */

.pricing-grid {
  align-items: stretch;
}
.plan {
  position: relative;
}
.plan-badge {
  position: absolute;
  top: -0.7rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  background: var(--brand);
  color: var(--brand-foreground);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  padding: 0.25rem 0.7rem;
  border-radius: 2px;
  box-shadow: 3px 3px 0 0 var(--deep);
  white-space: nowrap;
}
.plan-featured {
  border-color: var(--brand);
  box-shadow: var(--shadow-brand);
}
.plan .plan-price {
  display: flex;
  align-items: baseline;
  gap: 0.45rem;
  padding: 1.1rem 1.25rem 0;
  font-size: 1.85rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1;
}
.plan .plan-price small {
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--muted-foreground);
}
.plan .plan-list {
  list-style: none;
  padding: 1rem 1.25rem 0.25rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}
.plan .plan-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  font-size: 0.86rem;
  line-height: 1.55;
}
.plan .plan-list .icon {
  width: 0.95rem;
  height: 0.95rem;
  flex: none;
  margin-top: 0.22rem;
  color: var(--brand);
}
.plan .s-desc {
  min-height: 3.2rem;
}
.plan .s-action {
  margin-top: auto;
}
.plan .s-action .btn {
  width: 100%;
  justify-content: center;
}
.pricing-note {
  max-width: 44rem;
  margin-inline: auto;
  text-align: center;
  font-size: 0.85rem;
  line-height: 1.7;
  color: var(--muted-foreground);
  background: var(--muted);
  border: 1px solid var(--border);
  border-radius: 0.25rem;
  padding: 0.8rem 1.1rem;
}

/* Floating WhatsApp button */
.wa-float {
  position: fixed;
  bottom: 1.25rem;
  inset-inline-end: 1.25rem;
  z-index: 120;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: #25d366;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s var(--ease-out);
  animation: wa-float-pulse 2.4s ease-out infinite;
}
.wa-float:hover {
  transform: translateY(-3px) scale(1.06);
}
.wa-float .icon {
  width: 1.75rem;
  height: 1.75rem;
}
@keyframes wa-float-pulse {
  0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.45); }
  70% { box-shadow: 0 0 0 1rem rgba(37, 211, 102, 0); }
  100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
}

@media (max-width: 899px) {
  .wa-float {
    bottom: 1rem;
    inset-inline-end: 1rem;
    width: 3.1rem;
    height: 3.1rem;
  }
}
'''
s += extra_css
wr(p, s)

p = os.path.join(DST, "css", "responsive.css")
s = rd(p)
s += '''
/* Pricing grid */
@media (min-width: 1100px) {
  .cards-grid.pricing-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.1rem;
  }
}
@media (min-width: 640px) and (max-width: 1099px) {
  .cards-grid.pricing-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.1rem;
  }
}
'''
wr(p, s)

# ---------- contact.html — WhatsApp is the only channel ----------
p = os.path.join(DST, "contact.html")
s = rd(p)
# remove the "Direct call" tel: button
s = re.sub(
    r'\s*<a class="btn btn-outline" style="flex:1;min-width:14rem" href="tel:\+967770233292">\s*<svg class="icon" aria-hidden="true"><use href="assets/icons/sprite\.svg#i-phone"></use></svg>\s*<span data-ar="اتصال مباشر" data-en="Direct call">[^<]*</span>\s*</a>',
    "",
    s,
    count=1,
)
s = s.replace(
    '<span data-ar="واتساب / اتصال" data-en="WhatsApp / Call">واتساب / اتصال</span>',
    '<span data-ar="واتساب — القناة الرسمية" data-en="WhatsApp — official channel">واتساب — القناة الرسمية</span>',
)
wr(p, s)

# ---------- 404 ----------
p404 = os.path.join(DST, "404.html")
if os.path.exists(p404):
    s = rd(p404)
    s = global_html(s)
    wr(p404, s)

# ----------------------------------------------------------------------
# Real website previews — screenshots + browser-frame bars + Alexandria
# ----------------------------------------------------------------------
SHOTS_SRC = "/home/z/my-project/public/images/work"
for n in ["alhamra", "aishalaw", "maram", "justwow"]:
    shutil.copy(
        os.path.join(SHOTS_SRC, f"{n}.jpg"),
        os.path.join(DST, "assets", "images", f"shot-{n}.jpg"),
    )

SHOT_MAP = {
    "https://alhamraa.netlify.app/": (
        "assets/images/shot-alhamra.jpg",
        "لقطة حقيقية من موقع مشويات الحمراء",
        "Real screenshot of the Al-Hamra Grills website",
    ),
    "https://aishalaw.netlify.app/": (
        "assets/images/shot-aishalaw.jpg",
        "لقطة حقيقية من موقع مكتب المحامية عائشة الصيعري",
        "Real screenshot of the Law Office of Aisha Al-Sayari website",
    ),
    "https://maramalfahmi.netlify.app": (
        "assets/images/shot-maram.jpg",
        "لقطة حقيقية من موقع مكتب المحامية مرام الفهمي",
        "Real screenshot of the Law Office of Maram Al-Fahmi website",
    ),
    "https://just-wow.netlify.app/": (
        "assets/images/shot-justwow.jpg",
        "لقطة حقيقية من موقع واو وبس JUST WOW",
        "Real screenshot of the JUST WOW website",
    ),
}


def browser_bar(url: str) -> str:
    label = url.replace("https://", "").replace("http://", "").rstrip("/")
    return (
        '<div class="browser-bar" dir="ltr" aria-hidden="true">'
        '<span class="b-dots"><i></i><i></i><i></i></span>'
        f'<span class="b-url">{label}</span></div>'
    )


def upgrade_project_cards(s: str) -> str:
    """Swap AI category images for real screenshots + inject browser bar."""

    def repl(m):
        block = m.group(0)
        url = m.group("url")
        if url not in SHOT_MAP:
            return block
        src, alt_ar, alt_en = SHOT_MAP[url]
        block = re.sub(r'src="assets/images/[^"]*"', f'src="{src}"', block, count=1)
        block = re.sub(r'alt="[^"]*"', f'alt="{alt_ar}"', block, count=1)
        block = re.sub(r'data-ar-alt="[^"]*"', f'data-ar-alt="{alt_ar}"', block, count=1)
        block = re.sub(r'data-en-alt="[^"]*"', f'data-en-alt="{alt_en}"', block, count=1)
        block = re.sub(r'width="560" height="320"', 'width="1200" height="750"', block, count=1)
        block = block.replace('<div class="banner">', '<div class="banner">' + browser_bar(url), 1)
        return block

    return re.sub(
        r'<article class="project-card reveal"[^>]*data-url="(?P<url>[^"]+)">.*?</article>',
        repl,
        s,
        flags=re.S,
    )


# --- index.html: swap images, then add a Just Wow card where Nibras was ---
p = os.path.join(DST, "index.html")
s = rd(p)
aisha_end = re.search(
    r'<article class="project-card reveal"[^>]*data-url="https://aishalaw\.netlify\.app/">.*?</article>',
    s,
    re.S,
)
if aisha_end:
    justwow_card = '''

          <!-- 03 — Just Wow -->
          <article class="project-card reveal" style="--reveal-delay:.16s" data-category="restaurants" data-url="https://just-wow.netlify.app/">
            <div class="banner">
              <img src="assets/images/shot-justwow.jpg" alt="لقطة حقيقية من موقع واو وبس JUST WOW" data-ar-alt="لقطة حقيقية من موقع واو وبس JUST WOW" data-en-alt="Real screenshot of the JUST WOW website" loading="lazy" width="1200" height="750">
              <span class="no-badge ltr">03</span>
              <span class="cat-badge" data-ar="وجبات خفيفة ومأكولات" data-en="Snacks & treats">وجبات خفيفة ومأكولات</span>
            </div>
            <div class="body">
              <h3 data-ar="JUST WOW — واو وبس" data-en="JUST WOW — واو وبس">JUST WOW — واو وبس</h3>
              <span class="feedback-row"><span data-ar="عرض تقييم صاحب المشروع" data-en="View project owner feedback">عرض تقييم صاحب المشروع</span><svg class="icon arrow-flip" aria-hidden="true"><use href="assets/icons/sprite.svg#i-arrow-left"></use></svg></span>
              <a class="preview-btn" href="https://just-wow.netlify.app/" target="_blank" rel="noopener noreferrer" aria-label="معاينة موقع واو وبس في نافذة جديدة" data-ar-aria="معاينة موقع واو وبس في نافذة جديدة" data-en-aria="Preview the JUST WOW website in a new tab">
                <svg class="icon" aria-hidden="true"><use href="assets/icons/sprite.svg#i-external-link"></use></svg>
                <span data-ar="معاينة الموقع" data-en="Preview website">معاينة الموقع</span>
              </a>
            </div>
            <a class="cover-btn" href="projects.html" aria-label="عرض مشروع واو وبس في صفحة الأعمال" data-ar-aria="عرض مشروع واو وبس في صفحة الأعمال" data-en-aria="Open the JUST WOW project in the work page"></a>
          </article>'''
    s = s[: aisha_end.end()] + justwow_card + s[aisha_end.end():]
s = upgrade_project_cards(s)
wr(p, s)

# --- projects.html: swap images + sync modal banner with the real shots ---
p = os.path.join(DST, "projects.html")
s = rd(p)
s = upgrade_project_cards(s)
s = s.replace(
    '<div class="m-banner">\n        <img src="assets/images/cat-restaurants.jpg"',
    '<div class="m-banner">\n        <img src="assets/images/shot-alhamra.jpg"',
    1,
)
wr(p, s)

# --- main.js: modal banner image follows the clicked card screenshot ---
p = os.path.join(DST, "js", "main.js")
s = rd(p)
s = s.replace(
    '''      if (mLink) {
        mLink.setAttribute("href", card.getAttribute("data-url") || "#");
      }''',
    '''      if (mLink) {
        mLink.setAttribute("href", card.getAttribute("data-url") || "#");
      }
      var mImg = $(".m-banner img", modal);
      var cardImg = $(".banner img", card);
      if (mImg && cardImg) mImg.setAttribute("src", cardImg.getAttribute("src"));''',
    1,
)
wr(p, s)

# --- style.css: Alexandria font stack + browser bar + Arabic correctness ---
p = os.path.join(DST, "css", "style.css")
s = rd(p)
s = s.replace('"IBM Plex Sans Arabic"', '"Alexandria"')
s += '''
/* ------------------------------------------------------------------ */
/* Real website previews — browser window frame                        */
/* ------------------------------------------------------------------ */
.project-card .banner {
  display: flex;
  flex-direction: column;
  height: 11rem;
}
.project-card .banner img {
  flex: 1;
  min-height: 0;
  width: 100%;
  height: auto;
  object-position: top;
}
.project-card .banner .no-badge {
  top: 2.05rem;
}
.browser-bar {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  direction: ltr;
  flex: none;
  background: color-mix(in srgb, var(--card) 92%, var(--muted));
  border-bottom: 1px solid var(--border);
  padding: 0.45rem 0.65rem;
}
.browser-bar .b-dots {
  display: inline-flex;
  gap: 0.3rem;
  flex: none;
}
.browser-bar .b-dots i {
  display: block;
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
}
.browser-bar .b-dots i:nth-child(1) { background: #ff5f57; }
.browser-bar .b-dots i:nth-child(2) { background: #febc2e; }
.browser-bar .b-dots i:nth-child(3) { background: #28c840; }
.browser-bar .b-url {
  flex: 1;
  min-width: 0;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 0.18rem 0.5rem;
  font-family: "Space Grotesk", ui-monospace, SFMono-Regular, monospace;
  font-size: 0.68rem;
  color: var(--muted-foreground);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Arabic script correctness — letter-spacing breaks Arabic letter joining */
[dir="rtl"] * {
  letter-spacing: 0 !important;
}
'''
wr(p, s)

# --- remove now-unused AI category images ---
for f in ["cat-restaurants.jpg", "cat-legal.jpg", "cat-realty.jpg"]:
    pf = os.path.join(DST, "assets", "images", f)
    if os.path.exists(pf):
        os.remove(pf)

# ---------- zip ----------
if os.path.exists(PUBZIP):
    os.remove(PUBZIP)
subprocess.run(["zip", "-rq", PUBZIP, "."], cwd=DST, check=True)
print("zip written:", PUBZIP, os.path.getsize(PUBZIP), "bytes")
print("Done.")
