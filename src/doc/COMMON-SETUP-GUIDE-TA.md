# Trading App — Common Setup Guide

**மொழி:** தமிழ்  
**நோக்கம்:** புதிய Page உருவாக்கும்போது Common Components, Services, CSS மற்றும் Routing-ஐ எப்படிப் பயன்படுத்துவது என்பதை நினைவில் வைத்துக்கொள்ள.

---

## 1. நம்முடைய தற்போதைய Folder Structure

```text
src/
├── app/
│   ├── shared/
│   │   ├── components/
│   │   │   └── app-header/
│   │   │       ├── header.ts
│   │   │       ├── header.html
│   │   │       └── header.css
│   │   └── theme-toggle/
│   │       └── theme.ts
│   │
│   ├── dashboard/
│   │   ├── dashboard.ts
│   │   ├── dashboard.html
│   │   └── dashboard.css
│   │
│   └── broker-management/
│       ├── broker-management.ts
│       ├── broker-management.html
│       └── broker-management.css
│
└── styles.css
```

**குறிப்பு:** இது நம்முடைய தற்போதைய structure. புதிய files சேர்க்கும்போது இதே அமைப்பைப் பின்பற்றவும்.

---

## 2. Common Files — ஒவ்வொன்றின் வேலை என்ன?

| File | வேலை |
|---|---|
| `header.ts` | Header logic, Theme Switch, Logout |
| `header.html` | Common Header UI |
| `header.css` | Header design மற்றும் responsive styling |
| `theme.ts` | எல்லா pages-க்கும் பொதுவான theme state |
| `styles.css` | முழு application-க்குமான global CSS |
| `dashboard.css` | Dashboard page-ன் CSS |
| `broker-management.css` | Broker Management page-ன் CSS |
| Routes file | URL-ஐ சரியான page component-உடன் இணைக்கிறது |

### முக்கியமான விதி

- பொதுவாக எல்லா pages-லும் தேவைப்படும் code → `shared/` அல்லது `styles.css`.
- ஒரு குறிப்பிட்ட page-க்கு மட்டும் தேவைப்படும் code → அந்த page-ன் சொந்த files.
- ஏற்கெனவே உள்ள common file-ஐச் சரிபார்க்காமல் அதே வேலையைச் செய்யும் புதிய file உருவாக்க வேண்டாம்.

---

## 3. புதிய Page உருவாக்குவது எப்படி?

உதாரணம்: `Order History` page உருவாக்க வேண்டும்.

### Step 1 — Folder உருவாக்குங்கள்

```text
src/app/order-history/
```

### Step 2 — மூன்று files உருவாக்குங்கள்

```text
order-history/
├── order-history.ts
├── order-history.html
└── order-history.css
```

### Step 3 — TypeScript file

`order-history.ts`-ல் component logic மற்றும் தேவையான imports இருக்கும்.

### Step 4 — HTML file

`order-history.html`-ல் அந்த page-ன் content இருக்கும்.

### Step 5 — CSS file

`order-history.css`-ல் அந்த page-ன் தனிப்பட்ட design இருக்கும்.

### Step 6 — Route சேர்க்கவும்

உங்கள் project-ல் இருக்கும் routes file-ஐத் திறந்து, புதிய page-க்கான route சேர்க்கவும்.

உதாரணம்:

```typescript
{
  path: 'order-history',
  component: OrderHistoryComponent
}
```

இதற்குத் தேவையான `OrderHistoryComponent` import-ஐயும் சேர்க்க வேண்டும்.

**கவனம்:** இது ஒரு route உதாரணம். உங்கள் project-ல் இருக்கும் component பெயர் மற்றும் import path-க்கு ஏற்ப மாற்ற வேண்டும்.

---

## 4. புதிய Page-ல் Common Header பயன்படுத்துவது

### Step 1 — HeaderComponent import செய்யுங்கள்

புதிய page-ன் `.ts` file-ல்:

```typescript
import { HeaderComponent } from '../shared/components/app-header/header';
```

**முக்கியம்:** இந்த import path ஒரு உதாரணம். புதிய page எந்த folder-ல் இருக்கிறது என்பதைப் பொறுத்து `../` எண்ணிக்கை மாறும்.

### Step 2 — Component imports-ல் சேர்க்கவும்

```typescript
imports: [
  HeaderComponent
]
```

ஏற்கெனவே `CommonModule`, `RouterLink` போன்ற imports இருந்தால் அவற்றை நீக்காமல் `HeaderComponent`-ஐ மட்டும் சேர்க்கவும்.

### Step 3 — HTML-ல் Header சேர்க்கவும்

```html
<app-header></app-header>
```

இதனால் common Header அந்த page-ல் தோன்றும்.

### நினைவில் கொள்ளுங்கள்

நம்முடைய தற்போதைய அமைப்பில் Header நேரடியாக `ThemeService`-ஐப் பயன்படுத்துகிறது.

எனவே இதுபோன்ற பழைய event binding-ஐப் புதிதாகச் சேர்க்க வேண்டாம்:

```html
<app-header (themeToggle)="toggleTheme()"></app-header>
```

பயன்படுத்த வேண்டியது:

```html
<app-header></app-header>
```

---

## 5. Global Theme — தற்போதைய அமைப்பு

நம்முடைய Theme Service file:

```text
src/app/shared/theme-toggle/theme.ts
```

இதன் வேலை:

- `isDarkMode` மூலம் தற்போதைய theme-ஐ வைத்திருக்கும்.
- `toggleTheme()` மூலம் Light/Dark mode மாற்றும்.
- HTML root-ல் `dark-theme` class சேர்க்கும் அல்லது நீக்கும்.

### ThemeService-ஐ எப்படிப் பயன்படுத்துவது?

உதாரண import:

```typescript
import { ThemeService } from '../shared/theme-toggle/theme';
```

இது Dashboard போன்ற `src/app/`-க்கு நேரடியாக உள்ள page-க்கான relative path உதாரணம். வேறு folder-ல் இருக்கும் page-க்கு path மாறலாம்.

Service-ஐப் பயன்படுத்த:

```typescript
private themeService = inject(ThemeService);
```

`inject` பயன்படுத்தும்போது:

```typescript
import { Component, inject } from '@angular/core';
```

தேவைப்படும்.

### முக்கிய விதி

`ThemeService`-ஐ component-ன் `imports` array-ல் சேர்க்க வேண்டாம்.

`imports` array-ல் template-ல் பயன்படுத்தும் components, directives, pipes மற்றும் modules ஆகியவற்றைச் சேர்க்க வேண்டும்.

---

## 6. Global CSS vs Page CSS

### `src/styles.css`

முழு application-க்கும் பொதுவான styles:

- HTML மற்றும் body background
- Global text color
- பொதுவான theme variables
- எல்லா pages-க்கும் பொருந்த வேண்டிய styles

### `dashboard.css`

Dashboard-க்கான styles:

- Market cards
- Quick Access cards
- Dashboard content
- Dashboard headings

### `broker-management.css`

Broker Management-க்கான styles:

- Page background
- Broker details
- Forms மற்றும் buttons
- அந்த page-ன் text மற்றும் cards

### `header.css`

Header-க்கான styles:

- Header background
- Logo
- Theme Switch
- Market Connected status
- Logout button
- Responsive layout

### Dark Theme பற்றிய முக்கிய குறிப்பு

ThemeService `dark-theme` class-ஐச் சேர்ப்பது மட்டுமே எல்லா elements-ன் நிறங்களையும் தானாக மாற்றாது.

ஒவ்வொரு page-ன் CSS-லும் தேவையான Dark Theme styles இருக்க வேண்டும்.

உதாரணமாக, ஒரு card-க்கு நேரடியாக வெள்ளை background கொடுக்கப்பட்டிருந்தால், body கருமையாக மாறினாலும் அந்த card வெள்ளையாகவே இருக்கலாம்.

---

## 7. Common Component அல்லது Service சேர்ப்பதற்கு முன்

ஒவ்வொரு முறையும் இந்த checklist-ஐப் பின்பற்றவும்.

- [ ] இதே வேலைக்கான file ஏற்கெனவே இருக்கிறதா என்று Explorer-ல் பார்க்கவும்.
- [ ] சரியான folder-ல் புதிய file உருவாக்கவும்.
- [ ] Import path-ஐ file-ன் உண்மையான location-ஐ வைத்து சரிபார்க்கவும்.
- [ ] Component என்றால் தேவையான `imports` array-ல் சேர்க்கவும்.
- [ ] Service-ஐ `imports` array-ல் சேர்க்க வேண்டாம்.
- [ ] Common Header தேவைப்பட்டால் `<app-header></app-header>` பயன்படுத்தவும்.
- [ ] Global CSS மற்றும் page-specific CSS-ஐ தனித்தனியாக வைத்திருக்கவும்.
- [ ] ஒரு நேரத்தில் ஒரு மாற்றம் மட்டும் செய்யவும்.
- [ ] Save செய்து terminal errors உள்ளதா என்று பார்க்கவும்.
- [ ] Browser-ல் தொடர்புடைய எல்லா pages-லும் சோதிக்கவும்.

---

## 8. Code மாற்றுவதற்கான பாதுகாப்பான நடைமுறை

1. மாற்றுவதற்கு முன் தற்போதைய code-ஐப் பாருங்கள்.
2. ஒரே நேரத்தில் பல files-ஐ மாற்ற வேண்டாம்.
3. ஒரு file-ல் மாற்றம் செய்து Save செய்யுங்கள்.
4. Terminal-ல் compilation error உள்ளதா பாருங்கள்.
5. Browser-ல் சரிபார்க்கவும்.
6. வேலை செய்த பிறகு Git status பார்க்கவும்.
7. முக்கியமான மாற்றங்களுக்குப் பிறகு commit மற்றும் push செய்யவும்.

Commands:

```bash
git status
git add docs/COMMON-SETUP-GUIDE-TA.md
git commit -m "Add common setup guide in Tamil"
git push
```

இந்த commands documentation file-ஐ மட்டும் commit செய்யும். வேறு code changes-ஐயும் சேர்க்க விரும்பினால், அவற்றை `git status` மூலம் முதலில் சரிபார்க்கவும்.

---

## 9. அடுத்த முறை Project-ஐத் தொடரும்போது

முதலில் இந்த document-ஐத் திறந்து படிக்கவும்.

நம்முடைய தற்போதைய அடுத்த வேலை:

1. Dashboard-ல் Dark Theme நிறங்களைச் சரிசெய்தல்.
2. Broker Management page-ல் Dark Theme styling சேர்த்தல்.
3. இரண்டு pages-லும் Theme Switch-ஐச் சோதித்தல்.
4. எல்லாம் சரியாக இருந்தால் GitHub-ல் push செய்தல்.

**இறுதி நினைவூட்டல்:** புதிய page உருவாக்கும்போது common code-ஐ மீண்டும் எழுத வேண்டாம். ஏற்கெனவே உள்ள `shared` components மற்றும் services-ஐ மீண்டும் பயன்படுத்தவும்.
