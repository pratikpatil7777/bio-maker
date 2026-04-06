# Bio Maker - App Features Documentation

This document lists every feature available in the `/app` page (Biodata Builder).

---

## 1. TOOLBAR FEATURES

### 1.1 Home Button (Logo)
- **Location**: Top-left corner of toolbar
- **Function**: Clicking the logo returns user to the home page
- **Behavior**: Shows confirmation dialog if there are unsaved changes

### 1.2 Dark Mode Toggle
- **Location**: Toolbar
- **Function**: Switches between light mode and dark mode
- **Behavior**: Applies to the entire app interface (not the biodata preview which always stays light for printing)

### 1.3 Language Toggle (EN / हिं / मरा)
- **Location**: Toolbar
- **Function**: Changes the language of the entire interface
- **Options**:
  - EN (English)
  - हिं (Hindi)
  - मरा (Marathi)
- **Behavior**: Updates all labels, placeholders, and UI text. Also enables transliteration for Hindi/Marathi input.

### 1.4 Theme Selector
- **Location**: Toolbar
- **Function**: Changes the color theme of the biodata
- **Features**:
  - Shows color preview swatch
  - Dropdown with all available themes
  - Each theme has a name in current language
  - Themes affect header colors, text colors, and accent colors

### 1.5 Border Selector
- **Location**: Toolbar
- **Function**: Changes the decorative border design around the biodata
- **Features**:
  - Dropdown with all available border designs
  - Preview of border style
  - Options include: Classic, Peacock, Floral, Mandala, etc.

### 1.6 Data Backup Menu
- **Location**: Toolbar (folder icon)
- **Function**: Export and import biodata data
- **Options**:
  - **Export Backup**: Downloads biodata data as JSON file
  - **Import Backup**: Uploads previously saved JSON backup file
- **Behavior**: Shows validation errors for invalid files, version compatibility warnings

### 1.7 AI Bio Writer Button (Sparkles icon)
- **Location**: Toolbar
- **Function**: Opens AI-powered biodata generator modal
- **Features**:
  - Form to input personal details (name, age, education, profession, family, etc.)
  - Tone selection: Traditional, Modern, Professional
  - Output language: English, Marathi, or Both
  - Generates complete biodata sections automatically

### 1.8 Download Button
- **Location**: Toolbar
- **Function**: Downloads the biodata as PDF
- **Features**:
  - Shows dropdown with options
  - Progress indicator during PDF generation
  - Generates A4-sized PDF
  - Multi-page support (if biodata spans multiple pages)
  - Post-download modal for feedback/sharing

### 1.9 Share Button
- **Location**: Toolbar
- **Function**: Share biodata with others
- **Features**:
  - **Share as Image**: Generates PNG and uses native share API
  - **Share as Link**: Creates shareable URL with encoded biodata data
  - **Copy Link**: Copies shareable link to clipboard
  - **Privacy Consent Modal**: Asks user about data sharing preferences
  - Redacts sensitive information (phone, email) in shared links

---

## 2. PHOTO GALLERY URL EDITOR

### 2.1 Photo Gallery URL Input
- **Location**: Below toolbar (edit mode only)
- **Function**: Add a link to an external photo gallery (Google Photos, etc.)
- **Behavior**: URL appears as QR code on the biodata when enabled

### 2.2 Show QR Toggle
- **Location**: Next to URL input
- **Function**: Toggle QR code visibility on the biodata
- **Behavior**: When enabled, QR code appears in the photo gallery section

---

## 3. BIODATA CONTENT EDITING

### 3.1 Name Field
- **Location**: Top of biodata, below "|| Shri Ganeshaya Namah ||" header
- **Function**: Enter the person's name
- **Features**:
  - Supports both English and Marathi/Hindi input
  - Auto-transliteration when typing in Devanagari mode
  - Styled with theme colors

### 3.2 Photo Section
- **Location**: Right side of biodata (or top on mobile)
- **Function**: Upload and display profile photo
- **Features**:
  - Click to upload photo
  - Photo cropping modal with:
    - Zoom slider
    - Pan/drag to reposition
    - 4:5 aspect ratio (passport style)
  - Delete photo option
  - Maximum file size: 5MB
  - Toggle to show/hide photo

### 3.3 Sections
Each section contains a title and multiple attributes.

#### Section Features:
- **Title Selection**: Searchable dropdown with predefined titles
- **Custom Title**: Option to use custom title text
- **Hide/Show Toggle**: Eye icon to hide section from final output
- **Move Up**: Reorder section upward
- **Move Down**: Reorder section downward
- **Add Section Below**: Insert new section after current one
- **Delete Section**: Remove section entirely

### 3.4 Attributes (within sections)
Each attribute has a label and a value.

#### Attribute Features:
- **Label Selection**: Searchable dropdown with categorized predefined labels
- **Custom Label**: Option to use custom label text
- **Value Input**: Text input for attribute value
- **Transliteration**: Automatic English-to-Devanagari conversion for Hindi/Marathi
- **Hide/Show Toggle**: Eye icon to hide attribute from final output
- **Move Up**: Reorder attribute upward within section
- **Move Down**: Reorder attribute downward within section
- **Delete Attribute**: Remove attribute from section

### 3.5 Add Attribute Button
- **Location**: Bottom of each section
- **Function**: Add new attribute to the section
- **Behavior**: Appears on hover, adds blank attribute at end of list

### 3.6 Add Section Button
- **Location**: Bottom of all sections (in edit mode)
- **Function**: Add new empty section at the end

---

## 4. PREVIEW FEATURES

### 4.1 Live Preview
- **Function**: Real-time preview of biodata as you edit
- **Behavior**: Updates instantly as you type or make changes

### 4.2 Paged View
- **Function**: Shows how biodata will appear when printed/downloaded
- **Features**:
  - A4 page size simulation
  - Multi-page support with page numbers
  - Page counter showing "Page X of Y"

### 4.3 Border Rendering
- **Function**: Displays selected decorative border around biodata
- **Features**:
  - SVG-based borders for crisp printing
  - Theme color integration

---

## 5. KEYBOARD SHORTCUTS

### 5.1 Undo (Ctrl+Z / Cmd+Z)
- **Function**: Undo last action
- **Behavior**: Reverts to previous state in history

### 5.2 Redo (Ctrl+Y / Cmd+Shift+Z)
- **Function**: Redo previously undone action
- **Behavior**: Restores next state from history

---

## 6. DATA PERSISTENCE

### 6.1 Auto-Save
- **Function**: Automatically saves biodata to browser's local storage
- **Behavior**: Saves after every change, persists across browser sessions

### 6.2 Change History
- **Function**: Maintains history of changes for undo/redo
- **Limit**: Up to 50 history states

---

## 7. SHARED BIODATA LOADING

### 7.1 URL Parameter Parsing
- **Function**: Loads biodata from shared URL
- **Behavior**: Decodes compressed biodata data from URL parameter
- **Privacy**: Sensitive fields (phone, email) are redacted in shared links

---

## 8. TEMPLATE LOADING

### 8.1 Template from Home Page
- **Function**: When user clicks "Create My Biodata" on home page
- **Behavior**: Loads pre-filled sample biodata with selected theme and border

---

## 9. ALERT SYSTEM

### 9.1 Success Alerts
- **Function**: Shows success messages (green)
- **Use cases**: Download complete, backup exported, etc.

### 9.2 Error Alerts
- **Function**: Shows error messages (red)
- **Use cases**: Invalid file, download failed, etc.

### 9.3 Warning Alerts
- **Function**: Shows warning messages (yellow)
- **Use cases**: File too large, old version backup, etc.

### 9.4 Confirmation Dialogs
- **Function**: Asks user to confirm destructive actions
- **Use cases**: Reset all data, go back with unsaved changes, import backup

---

## 10. TRANSLITERATION

### 10.1 English to Devanagari
- **Function**: Automatically converts English keystrokes to Devanagari script
- **Languages**: Hindi and Marathi
- **Behavior**: Works in real-time as user types
- **Location**: Name field and all attribute value inputs

---

## 11. RESPONSIVE DESIGN

### 11.1 Mobile Layout
- **Function**: Adapts layout for mobile screens
- **Changes**:
  - Single column layout
  - Photo above content
  - Toolbar wraps to multiple rows
  - Touch-friendly buttons

### 11.2 Desktop Layout
- **Function**: Optimized for larger screens
- **Changes**:
  - Side-by-side editing
  - Larger preview
  - Hover effects on buttons

---

## 12. PRINT OPTIMIZATION

### 12.1 Print Styles
- **Function**: Hides editing controls when printing/downloading
- **Elements hidden**: Toolbar, edit buttons, dashed borders

### 12.2 PDF Generation
- **Technology**: html2canvas + jsPDF
- **Features**:
  - High resolution (2x scale)
  - A4 format
  - Multi-page support
  - Compressed output

---

## 13. BACKGROUND DESIGN

### 13.1 Light Mode Background
- **Design**: Subtle warm cream gradient
- **Colors**: #FFFEF8 to #FFF9E8

### 13.2 Dark Mode Background
- **Design**: Deep space gradient with subtle golden star dots
- **Colors**: #0a0a15 to #1a1a2e with golden accents

---

## 14. FOOTER

### 14.1 Biodata Footer
- **Content**: "Created with Bio Maker" with logo
- **Function**: Attribution that appears on printed biodata
- **Styling**: Uses theme colors

---

## SUMMARY

Total Features: 50+

**Categories:**
- Toolbar: 9 features
- Photo Gallery: 2 features
- Content Editing: 6 major features
- Preview: 3 features
- Keyboard Shortcuts: 2 features
- Data Management: 4 features
- Alerts: 4 types
- Design: 5 features
