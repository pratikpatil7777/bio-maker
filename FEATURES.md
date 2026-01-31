# Shubh Vivah - Marriage Biodata Builder Features

## Core Features

### Biodata Creation
- **Dynamic Section Builder**: Add, remove, and reorder sections (Personal, Family, Education, etc.)
- **Attribute Management**: Choose from 100+ pre-defined attributes or create custom fields
- **Photo Upload**: Add profile photo with automatic positioning on A4 layout
- **Photo Gallery QR**: Link to external photo gallery with QR code on biodata

### Multi-Language Support
- **Trilingual Interface**: Full support for English, Hindi (हिंदी), and Marathi (मराठी)
- **Transliteration**: Type in English and auto-convert to Devanagari script (Hindi/Marathi)
- **Language-Specific Labels**: All form fields and UI elements translated

### Themes & Borders
- **Multiple Themes**: Choose from various color themes (Classic, Royal, Modern, etc.)
- **Decorative Borders**: Traditional Indian border designs for A4 pages
- **Dark Mode**: Full dark mode support for comfortable editing

### Export & Download
- **PDF Export**: Download multi-page A4 PDF optimized for printing
- **Image Download**: Export as PNG images (supports multi-page with separate files)
- **WYSIWYG Preview**: What you see is exactly what gets exported

### Sharing Options
- **Share Image**: Direct share via Web Share API (mobile)
- **WhatsApp Share**: Quick share to WhatsApp contacts
- **Copy Page Link**: Share the current page URL
- **Shareable Link**: Generate link with embedded biodata data
  - **Privacy Mode**: Option to hide sensitive info (phone, address, income)

---

## Privacy & Safety Features

### Privacy Consent Modal
- Warning about sharing personal information
- Safety tips about matrimonial/romance scams
- Consent checkbox before sharing full biodata

### Share Privately Option
- Automatically redacts sensitive fields:
  - Phone numbers (mobile, WhatsApp, family contacts)
  - Email addresses
  - Full addresses and pincode
  - Income details (annual, monthly, family)
  - Photo gallery QR code

---

## Technical Features

### Field & Section Visibility Control
- **Hide/Show Toggle**: Eye icon button on each field and section title
- **Edit Mode**: Hidden items displayed in gray with reduced opacity (still editable)
- **View/Export Mode**: Hidden fields and sections are completely invisible
- **Section-Level Control**: Hide entire section with one click

### Data Management
- **Local Storage**: Biodata saved automatically in browser
- **Undo/Redo**: Full history support for edits
- **Import/Export**: Backup and restore biodata data
- **Reset Option**: Clear all data and start fresh

### Responsive Design
- **Mobile Friendly**: Horizontal scroll for A4 preview on small screens
- **Toolbar Wrapping**: Buttons adapt to screen width
- **Fixed A4 Dimensions**: Consistent export regardless of device

### AI Integration
- **AI Bio Writer**: Generate bio descriptions using AI (OpenRouter API)

---

## Changelog

### January 2025
- Added vertical edit actions sidebar (Undo/Redo/Edit-Save/Reset) on right side of template
- Mobile bottom bar for edit actions on smaller screens
- Moved photo hide/show toggle to photo frame itself with visual overlay
- Added hide/view toggle for individual fields and entire sections
- Added privacy consent modal with "Share Privately" option
- Created Download button with PDF/Image dropdown
- Multi-page image download support (separate PNG files)
- Fixed mobile horizontal scroll in view mode
- Added Hindi language support with transliteration
- Implemented trilingual alerts and messages
