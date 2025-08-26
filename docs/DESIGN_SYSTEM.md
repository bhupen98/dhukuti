# 🎨 Dhukuti Design System - Implementation Guide

## 🌈 **Color System**

### **CSS Custom Properties (Variables)**

```css
:root {
  /* Primary Colors */
  --dhukuti-red: #DC2626;
  --nepal-gold: #F59E0B;
  --himalayan-blue: #1E40AF;
  
  /* Secondary Colors */
  --sage-green: #10B981;
  --warm-gray: #6B7280;
  --cream-white: #FEF3C7;
  
  /* Semantic Colors */
  --success: #059669;
  --warning: #D97706;
  --error: #DC2626;
  --info: #2563EB;
  
  /* Neutral Colors */
  --white: #FFFFFF;
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-200: #E5E7EB;
  --gray-300: #D1D5DB;
  --gray-400: #9CA3AF;
  --gray-500: #6B7280;
  --gray-600: #4B5563;
  --gray-700: #374151;
  --gray-800: #1F2937;
  --gray-900: #111827;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  
  /* Border Radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  
  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
}
```

### **Color Usage Examples**

```css
/* Primary Buttons */
.btn-primary {
  background-color: var(--dhukuti-red);
  color: var(--white);
  border: none;
}

/* Secondary Buttons */
.btn-secondary {
  background-color: var(--white);
  color: var(--dhukuti-red);
  border: 2px solid var(--dhukuti-red);
}

/* Success States */
.text-success {
  color: var(--success);
}

/* Error States */
.text-error {
  color: var(--error);
}

/* Backgrounds */
.bg-warm {
  background-color: var(--cream-white);
}

.bg-neutral {
  background-color: var(--gray-50);
}
```

---

## 📝 **Typography System**

### **Font Imports**

```html
<!-- Add to your HTML head -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### **CSS Typography Classes**

```css
/* Font Families */
.font-primary {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.font-accent {
  font-family: 'Poppins', 'Inter', sans-serif;
}

/* Display Text */
.display-large {
  font-family: var(--font-accent);
  font-size: 4.5rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.display-medium {
  font-family: var(--font-accent);
  font-size: 3.75rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.display-small {
  font-family: var(--font-accent);
  font-size: 3rem;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

/* Headlines */
.headline {
  font-family: var(--font-accent);
  font-size: 2.25rem;
  font-weight: 600;
  line-height: 1.3;
}

.title {
  font-family: var(--font-accent);
  font-size: 1.875rem;
  font-weight: 600;
  line-height: 1.4;
}

.subtitle {
  font-family: var(--font-accent);
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.4;
}

/* Body Text */
.body-large {
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.6;
}

.body {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
}

.body-small {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
}

.caption {
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.4;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

---

## 🧩 **Component Library**

### **Button Components**

```css
/* Base Button Styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  font-family: var(--font-primary);
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;
  overflow: hidden;
}

/* Button Variants */
.btn-primary {
  background-color: var(--dhukuti-red);
  color: var(--white);
  box-shadow: var(--shadow-md);
}

.btn-primary:hover {
  background-color: #B91C1C;
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

.btn-secondary {
  background-color: var(--white);
  color: var(--dhukuti-red);
  border: 2px solid var(--dhukuti-red);
}

.btn-secondary:hover {
  background-color: var(--dhukuti-red);
  color: var(--white);
}

.btn-tertiary {
  background-color: transparent;
  color: var(--dhukuti-red);
  padding: var(--space-2) var(--space-4);
}

.btn-tertiary:hover {
  background-color: var(--gray-100);
}

/* Button Sizes */
.btn-sm {
  padding: var(--space-2) var(--space-4);
  font-size: 0.875rem;
}

.btn-lg {
  padding: var(--space-4) var(--space-8);
  font-size: 1.125rem;
}

/* Button States */
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-loading {
  pointer-events: none;
}

.btn-loading::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

### **Card Components**

```css
/* Base Card */
.card {
  background-color: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease-in-out;
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

/* Card Variants */
.card-elevated {
  box-shadow: var(--shadow-md);
}

.card-outlined {
  border: 1px solid var(--gray-200);
  box-shadow: none;
}

.card-interactive {
  cursor: pointer;
}

.card-interactive:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

/* Card Content */
.card-header {
  padding: var(--space-6);
  border-bottom: 1px solid var(--gray-200);
}

.card-body {
  padding: var(--space-6);
}

.card-footer {
  padding: var(--space-6);
  border-top: 1px solid var(--gray-200);
  background-color: var(--gray-50);
}

/* Card Sizes */
.card-sm .card-header,
.card-sm .card-body,
.card-sm .card-footer {
  padding: var(--space-4);
}

.card-lg .card-header,
.card-lg .card-body,
.card-lg .card-footer {
  padding: var(--space-8);
}
```

### **Form Components**

```css
/* Input Fields */
.input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 2px solid var(--gray-300);
  border-radius: var(--radius-md);
  font-family: var(--font-primary);
  font-size: 1rem;
  line-height: 1.5;
  transition: all 0.2s ease-in-out;
  background-color: var(--white);
}

.input:focus {
  outline: none;
  border-color: var(--dhukuti-red);
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.input:invalid {
  border-color: var(--error);
}

.input:disabled {
  background-color: var(--gray-100);
  cursor: not-allowed;
}

/* Input States */
.input-success {
  border-color: var(--success);
}

.input-error {
  border-color: var(--error);
}

.input-warning {
  border-color: var(--warning);
}

/* Input Sizes */
.input-sm {
  padding: var(--space-2) var(--space-3);
  font-size: 0.875rem;
}

.input-lg {
  padding: var(--space-4) var(--space-6);
  font-size: 1.125rem;
}

/* Form Groups */
.form-group {
  margin-bottom: var(--space-4);
}

.form-label {
  display: block;
  margin-bottom: var(--space-2);
  font-weight: 500;
  color: var(--gray-700);
}

.form-help {
  margin-top: var(--space-2);
  font-size: 0.875rem;
  color: var(--gray-500);
}

.form-error {
  margin-top: var(--space-2);
  font-size: 0.875rem;
  color: var(--error);
}
```

---

## 🎯 **Layout Components**

### **Container System**

```css
/* Container */
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

/* Responsive Containers */
@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}

@media (min-width: 1536px) {
  .container {
    max-width: 1536px;
  }
}

/* Grid System */
.grid {
  display: grid;
  gap: var(--space-6);
}

.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }

@media (max-width: 768px) {
  .grid-cols-2,
  .grid-cols-3,
  .grid-cols-4 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

/* Flexbox Utilities */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-row { flex-direction: row; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.gap-4 { gap: var(--space-4); }
.gap-6 { gap: var(--space-6); }
.gap-8 { gap: var(--space-8); }
```

---

## 🎨 **Utility Classes**

### **Spacing Utilities**

```css
/* Margin */
.m-0 { margin: 0; }
.m-1 { margin: var(--space-1); }
.m-2 { margin: var(--space-2); }
.m-4 { margin: var(--space-4); }
.m-6 { margin: var(--space-6); }
.m-8 { margin: var(--space-8); }

.mt-0 { margin-top: 0; }
.mt-1 { margin-top: var(--space-1); }
.mt-2 { margin-top: var(--space-2); }
.mt-4 { margin-top: var(--space-4); }
.mt-6 { margin-top: var(--space-6); }
.mt-8 { margin-top: var(--space-8); }

.mb-0 { margin-bottom: 0; }
.mb-1 { margin-bottom: var(--space-1); }
.mb-2 { margin-bottom: var(--space-2); }
.mb-4 { margin-bottom: var(--space-4); }
.mb-6 { margin-bottom: var(--space-6); }
.mb-8 { margin-bottom: var(--space-8); }

/* Padding */
.p-0 { padding: 0; }
.p-1 { padding: var(--space-1); }
.p-2 { padding: var(--space-2); }
.p-4 { padding: var(--space-4); }
.p-6 { padding: var(--space-6); }
.p-8 { padding: var(--space-8); }

.pt-0 { padding-top: 0; }
.pt-1 { padding-top: var(--space-1); }
.pt-2 { padding-top: var(--space-2); }
.pt-4 { padding-top: var(--space-4); }
.pt-6 { padding-top: var(--space-6); }
.pt-8 { padding-top: var(--space-8); }

.pb-0 { padding-bottom: 0; }
.pb-1 { padding-bottom: var(--space-1); }
.pb-2 { padding-bottom: var(--space-2); }
.pb-4 { padding-bottom: var(--space-4); }
.pb-6 { padding-bottom: var(--space-6); }
.pb-8 { padding-bottom: var(--space-8); }
```

### **Text Utilities**

```css
/* Text Alignment */
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }

/* Text Colors */
.text-primary { color: var(--dhukuti-red); }
.text-secondary { color: var(--nepal-gold); }
.text-accent { color: var(--himalayan-blue); }
.text-success { color: var(--success); }
.text-warning { color: var(--warning); }
.text-error { color: var(--error); }
.text-info { color: var(--info); }

/* Text Weights */
.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
```

---

## 🚀 **Implementation Steps**

### **Step 1: Add CSS Variables**
1. Copy the CSS variables to your `globals.css`
2. Update existing color references to use variables
3. Test that all colors are displaying correctly

### **Step 2: Implement Typography**
1. Add Google Fonts imports to your HTML
2. Apply typography classes to existing text elements
3. Update font sizes and weights throughout the app

### **Step 3: Create Component Classes**
1. Start with buttons and cards
2. Apply new styles to existing components
3. Test hover states and interactions

### **Step 4: Update Layout**
1. Apply container and grid classes
2. Update spacing using utility classes
3. Test responsive behavior

### **Step 5: Polish & Test**
1. Review all components for consistency
2. Test on different screen sizes
3. Validate accessibility and performance

---

## 📱 **Responsive Design**

### **Mobile-First Approach**

```css
/* Base styles (mobile) */
.component {
  padding: var(--space-4);
  font-size: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .component {
    padding: var(--space-6);
    font-size: 1.125rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .component {
    padding: var(--space-8);
    font-size: 1.25rem;
  }
}
```

### **Breakpoint Mixins (if using SCSS)**

```scss
@mixin mobile {
  @media (max-width: 767px) { @content; }
}

@mixin tablet {
  @media (min-width: 768px) and (max-width: 1023px) { @content; }
}

@mixin desktop {
  @media (min-width: 1024px) { @content; }
}
```

---

**This design system provides a solid foundation for building a consistent, beautiful, and culturally-inspired Dhukuti platform. Start with the basics and gradually implement more advanced components as needed.** 🎨✨
