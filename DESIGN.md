# MediPlus HP - Design Specification (DESIGN.md)

This document serves as the design system and source of truth for the MediPlus HP Clinic website.

---

## 🎨 Design Tokens

### Colors
- **Primary (Deep Medical Blue)**: `#004b87`
  - *Usage*: Navigation branding, headings, primary buttons, hero highlights. Represents trust, security, and professional medical authority.
- **Secondary (Teal/Mint)**: `#00a896`
  - *Usage*: Accent badges, hover states, icons, card lines. Represents health, recovery, and modern care.
- **Accent (Warm Coral/Red)**: `#e63946`
  - *Usage*: High-priority elements, Hotline phone link, "Đặt lịch khám" CTA. Represents urgency, contact, and action.
- **Neutral Background (Soft Ice Blue)**: `#f8fafd`
  - *Usage*: Section backgrounds, subtle card overlays.
- **Text Primary (Slate Dark)**: `#1e293b`
  - *Usage*: Default body text, paragraph copy.
- **Text Light**: `#64748b`
  - *Usage*: Secondary descriptions, footnotes.
- **Border Light**: `#e2e8f0`
  - *Usage*: Subtle separators, outline buttons.

### Typography
- **Primary Font**: `Inter`, sans-serif (Google Fonts)
- **Scale**:
  - **Hero Title**: `40px` (Desktop) / `32px` (Mobile), Bold, Line Height `1.2`
  - **Section Title**: `32px` (Desktop) / `26px` (Mobile), Semibold, Line Height `1.3`
  - **Card Title / Heading MD**: `20px`, Semibold, Line Height `1.4`
  - **Body text**: `16px`, Regular, Line Height `1.6`
  - **Label / Button Text**: `14px`, Semibold, Letter spacing `0.05em`, Uppercase.

### Shapes & Spacing
- **Border Radius**:
  - **Buttons**: `30px` (Pill-shaped for a friendly, approachable medical feel)
  - **Cards & Modals**: `16px` (Smooth, rounded corners)
- **Spacing Grid**:
  - `xs`: `8px`
  - `sm`: `16px`
  - `md`: `24px`
  - `lg`: `48px`
  - `xl`: `80px`

---

## 🏗️ Components

### Navigation Bar
- Transparent background transitioning to a blur/glassmorphism effect (`backdrop-filter: blur(12px)`) on scroll.
- Classic medical branding on the left, thin sleek navigation links in the center, and a secondary action button on the right.

### Hero Banner
- Clean asymmetrical split layout: Left side contains strong, readable typography and CTAs. Right side contains a professional illustration/image of heart health or clinic interior.

### Pillar Cards (The Three Pillars)
- Structured grid. Clicking a card opens a modal overlay showing details of that specific pillar.
- Hover state: Subtle elevation lift with a secondary teal color border highlight.
