# UX/UI Design Template for Vibe Coding Tools

**Version:** 1.0  
**Format:** JSON-like Pseudocode for easy parsing  
**Purpose:** Help Vibe Coding Tools implement good UX/UI design practices that are **responsive**, **theme-aware**, and **developer-friendly**.

---

## 1. PROJECT METADATA (Editable)
```json
{
  "projectName": "Prompt Tutor",
  "version": "1.0.0",
  "author": "honeylouluzon",
  "themePreference": "auto",
  "defaultFont": "Inter, sans-serif"
}
```

---

## 2. FILE STRUCTURE (Instruction for Vibe Coding Tools)
```
/ui/
├── components/         
│   ├── Button.jsx
│   ├── InputField.jsx
│   └── Card.jsx
├── layouts/            
│   ├── DefaultLayout.jsx
│   └── ResponsiveGrid.jsx
├── pages/              
│   ├── Home.jsx
│   └── Settings.jsx
├── styles/             
│   ├── lightTheme.css
│   ├── darkTheme.css
│   └── global.css
└── utils/
    └── themeManager.js
```

**Naming Convention:** Use `PascalCase` for components and layouts, `kebab-case` for files and folders, and `camelCase` for variables and functions.

---

## 3. RESPONSIVE DESIGN BREAKPOINTS
```json
{
  "breakpoints": {
    "mobile": "0px - 767px",
    "tablet": "768px - 1023px",
    "desktop": "1024px and up"
  }
}
```

---

## 4. THEME DESIGN (Editable)
```json
{
  "themes": {
    "light": {
      "background": "#FFFFFF",
      "text": "#111111",
      "accent": "#2563EB"
    },
    "dark": {
      "background": "#1F2937",
      "text": "#F9FAFB",
      "accent": "#3B82F6"
    }
  }
}
```

---

## 5. COMPONENT STYLE TEMPLATE (Editable)
```json
{
  "component": "Button",
  "style": {
    "padding": "10px 20px",
    "borderRadius": "6px",
    "backgroundColor": "accent",
    "textColor": "text",
    "hoverEffect": true
  }
}
```

---

## 6. INPUT FIELD TEMPLATE (Editable)
```json
{
  "component": "InputField",
  "style": {
    "padding": "12px",
    "border": "1px solid #DDD",
    "borderRadius": "4px",
    "placeholderText": "Enter text"
  },
  "validations": ["required", "length"]
}
```

---

## 7. PAGE STRUCTURE & ROUTES (Editable)
```json
{
  "pages": [
    {
      "name": "Home",
      "route": "/",
      "layout": "DefaultLayout",
      "components": ["Header", "HeroSection", "Footer"],
      "editable": true
    },
    {
      "name": "Settings",
      "route": "/settings",
      "layout": "DefaultLayout",
      "components": ["Sidebar", "FormSection", "SaveButton"],
      "editable": true
    }
  ]
}
```

---

## 8. USER INTERACTION RULES
```json
{
  "accessibility": {
    "supportsKeyboard": true,
    "ariaLabels": true,
    "minContrastRatio": "4.5:1"
  },
  "interactions": {
    "animations": "minimal",
    "loadingIndicators": "spinner or skeleton"
  }
}
```

---

## 9. INSTRUCTIONS TO VIBE CODING TOOLS

- **Render responsive layout** using `ResponsiveGrid.jsx`.
- **Apply theme** from `themePreference` and load from `/styles/`.
- **Use reusable components** from `/components/`.
- **Bind user-defined styles** from `[Editable]` flags.
- **Follow file structure** for modular design.
- **Autogenerate ARIA roles** for accessibility.
- **Font and colors** use `global.css` and active theme.

---

## 10. FUTURE EXTENSION (Optional)
```json
{
  "supportsMultilingual": true,
  "dynamicFormBuilder": true,
  "customThemes": true
}
```

---

## 11. BUTTON PLACEMENT & SPACING GUIDELINES

- **Button Alignment:**
  - Primary action buttons (e.g., Submit, Save) should be right-aligned at the bottom of forms or sections.
  - Secondary actions (e.g., Cancel, Back) should be left-aligned or placed to the left of primary actions.
  - In toolbars or navigation, buttons should be evenly spaced and vertically centered.
- **Spacing:**
  - Use at least `1rem` (16px) margin between buttons and other elements.
  - For stacked buttons (vertical), use `0.5rem` (8px) vertical spacing.
  - For inline buttons (horizontal), use `0.5rem` (8px) horizontal spacing.
- **Button Groups:**
  - Group related buttons using a flex container with `gap: 0.5rem`.
  - Use `.button-group` class for button containers to ensure consistent spacing.
- **Form Layout:**
  - Inputs and labels should have `1rem` vertical spacing.
  - The submit button should be separated from the last input by at least `1.5rem`.
- **Accessibility:**
  - Ensure buttons are large enough for touch (min 44x44px).
  - Maintain clear focus outlines and sufficient contrast.

**Example CSS:**
```css
.button-group {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
form button[type="submit"] {
  align-self: flex-end;
  margin-top: 1.5rem;
}
form label, form input, form select, form textarea {
  margin-bottom: 1rem;
}
```

**Example HTML:**
```html
<div class="button-group">
  <button type="button">Cancel</button>
  <button type="submit">Save</button>
</div>
```

**Instruction:**
- Apply these guidelines to all forms, navigation bars, and action areas for consistent, professional UI/UX.

---

## 12. NAVIGATION & HEADER BUTTON LAYOUT

- **Header Layout:**
  - Use a flex container for the header with `justify-content: space-between` for title and navigation.
  - Navigation buttons (Home, Leaderboard, Achievements, Set/Clear API Key) should be grouped in a `.nav-group` flex container.
  - All nav buttons should be vertically centered and have at least `0.5rem` horizontal spacing.
  - On mobile, stack nav buttons vertically or allow them to wrap.
- **Set/Clear API Key Button:**
  - Place this button at the end of the navigation group, separated by at least `1rem` from the other nav buttons.
  - Use `.nav-group .api-key-btn` for custom styling if needed.
- **Accessibility:**
  - All nav buttons must be keyboard accessible and have clear focus outlines.

**Example HTML:**
```html
<header>
  <h1>Prompt Review Tool</h1>
  <nav class="nav-group">
    <button id="navHome">Home</button>
    <button id="navLeaderboard">Leaderboard</button>
    <button id="navAchievements">Achievements</button>
    <button id="setApiKeyBtn" class="api-key-btn">Set/Clear OpenAI API Key</button>
  </nav>
</header>
```

**Example CSS:**
```css
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-group {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.api-key-btn {
  margin-left: 1rem;
}
@media (max-width: 767px) {
  .nav-group {
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
  }
  header {
    flex-direction: column;
    align-items: flex-start;
  }
}
```

**Instruction:**
- Apply these layout and alignment rules to the header and navigation in your HTML and CSS for a clean, professional, and accessible navigation bar.
