# Disha Constructions — Content Upload Guide
> This file tells you exactly where to add your images, photos, text, and contact details across the website.

---

## 📁 Image Files (Drop Into the `images/` Folder)

| Filename | Where It Appears | Recommended Size |
|---|---|---|
| `logo.png` | Navbar (all pages), Footer, Preloader | ~200×200 px, transparent PNG |
| `hero-video.mp4` | Full-screen background video on Homepage | 1080p or higher, landscape |
| `about-image.jpg` | Right side of the About section on Homepage | 800×600 px |
| `talk-bg.jpg` | Background of the "Talk With Us" quote box | 1200×800 px, dark/industrial |
| `project-1.jpg` | Project Card 1 photo | 800×600 px |
| `project-2.jpg` | Project Card 2 photo | 800×600 px |
| `project-3.jpg` | Project Card 3 photo | 800×600 px |
| `founder-1.jpg` | Founder 1 photo on Founders page | 400×500 px portrait |
| `founder-2.jpg` | Founder 2 photo on Founders page | 400×500 px portrait |

---

## 🏠 Homepage (`index.html`)

### Hero Section
- **File:** `index.html` → Lines ~83–86
- **What to change:**
  - **Video:** Replace `images/hero-video.mp4` with your construction video file
  - **Headline:** `"Building The Future, Restoring The Past."` → Change to your preferred tagline
  - **Subtext:** `"Over 23 years of excellence..."` → Update with your specific statement

### Stats Bar (Numbers)
- **File:** `index.html` → Lines ~99–113
- **What to change:**
  - `23` → Years of experience (update if different)
  - `100` → Total projects delivered
  - `15` → Ongoing sites currently

### About Section
- **File:** `index.html` → Lines ~125–145
- **What to change:**
  - **About image:** Replace the Unsplash URL with `images/about-image.jpg` once you add your photo
  - **Section heading:** `"Setting New Standards In the Construction Industry"` → Your preferred heading
  - **Body text:** The two paragraphs describing Disha's mission → Replace with your actual company description

### Specialisations / Service Cards
- **File:** `index.html` → Lines ~155–205
- **What to change:**
  - Card titles: `Civil Contract`, `Property Development`, `Pre-construction`
  - Card descriptions (1–2 sentences each)
  - Bullet points under each "Know More" dropdown (5 points per card)

### Projects Section
- **File:** `index.html` → Lines ~222–270
- **What to change (3 project cards):**
  - **Project images:** Replace Unsplash URLs with your photos (`images/project-1.jpg`, etc.)
  - **Project names:** `Ayanavaram Bungalow`, `Civil Works at Shenoy Nagar`, `Luxury Villa` → Your actual project names
  - **Locations:** `Chennai, TN`, `Shenoy Nagar`, `Injambakkam` → Actual locations
  - **Status badges:** `Completed` / `Ongoing` → Update accordingly
  - **Room/size specs:** `4 BHK / 3200 sq.ft` → Update per project

### "Talk With Us" Quote Form
- **File:** `index.html` → Lines ~278–296
- **What to change:**
  - **Background image:** Add `images/talk-bg.jpg` → Update `src` in the `talk-image` div
  - **Heading:** `"Talk With Us"` → Can keep or update
  - **Intro text:** Update the description below "Talk With Us"

### Footer
- **File:** `index.html` → Lines ~300–340
- **What to change:**
  - **Phone number:** `+91 90000 00000` → Your actual number
  - **Email:** `info@dishaconstructions.com` → Your actual email
  - **Address:** `123, Gandhi Nagar, Chennai – 600 020` → Your office address
  - **Facebook link:** `href="#"` → Your Facebook page URL
  - **Instagram link:** `href="#"` → Your Instagram URL
  - **LinkedIn link:** `href="#"` → Your LinkedIn URL
  - **WhatsApp number:** `wa.me/919000000000` → Your actual WhatsApp number (in code)

---

## 👥 About Page (`about.html`)

- **What to change:**
  - Company history and background paragraphs
  - Mission / Vision text
  - About image (`images/about-image.jpg`)

---

## 👨‍💼 Founders Page (`founders.html`)

- **What to change:**
  - Founder 1 name, title, and bio
  - Founder 2 name, title, and bio
  - Founder photos → `images/founder-1.jpg` and `images/founder-2.jpg`

---

## ❤️ Core Values Page (`core-values.html`)

- **What to change:**
  - Each value card: title and description
  - Currently has placeholder values like `Integrity`, `Quality`, `Innovation` — update with your exact company values

---

## 🔧 Services Page (`services.html`)

- **What to change:**
  - Service names and descriptions
  - Any service-specific images

---

## 🏗️ Specialisations Page (`specialisations.html`)

- **What to change:**
  - Specialisation names and detail paragraphs
  - Any supporting images

---

## 📐 Projects Page (`projects.html`)

- **What to change:**
  - All project names, locations, status, and details
  - Project photos → replace Unsplash URLs with your own images

---

## 📞 Contact Page (`contact.html`)

- **What to change:**
  - Phone link in `href="tel:+91XXXXXXXXXX"` → Your actual number
  - WhatsApp link in `href="https://wa.me/91XXXXXXXXXX"` → Your actual number
  - Email link `href="mailto:..."` → Your actual email
  - Office address block
  - Google Maps embed (search your address on maps.google.com → Share → Embed)
  - Developer note about PHP form → Remove before going live

---

## 🔍 SEO (Update in ALL pages `<head>`)

In each `.html` file, update:
```html
<title>Disha Constructions | Premium Real Estate</title>
<meta name="description" content="..." />
```
Use specific, keyword-rich titles and descriptions for each page.

---

## ⚡ Quick Checklist Before Going Live

- [ ] Drop `logo.png` in `images/` folder
- [ ] Drop `hero-video.mp4` in `images/` folder
- [ ] Update all phone numbers (`+91 90000 00000`)
- [ ] Update all email addresses
- [ ] Update office address in Contact page and Footer
- [ ] Replace all project photos with real photos
- [ ] Add Facebook, Instagram, LinkedIn URLs in footer
- [ ] Update founder names, photos, and bios
- [ ] Remove developer notes from contact page
- [ ] Update Google Maps embed code with your actual address
