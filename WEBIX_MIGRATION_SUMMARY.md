# Webix Assets Migration Summary

This document summarizes all Webix-related assets, files, and utilities that have been copied from `webix_code/` to the main project.

## 📁 Copied Assets

### 1. Fonts (`public/webix/fonts/`)
All Webix fonts have been copied:
- `PTS-bold.woff` - PT Sans Bold font
- `PTS-webfont.woff` - PT Sans Regular font
- `Roboto-Medium-webfont.woff` / `.woff2` - Roboto Medium font
- `Roboto-Regular-webfont.woff` / `.woff2` - Roboto Regular font
- `webixmdi-webfont.woff` / `.woff2` - Webix Material Design Icons
- `font-license.txt` - Font license information

**Usage:** Fonts are automatically loaded via `@font-face` declarations in `src/styles/webix-custom.css`

### 2. Images (`public/webix/images/material/`)
Material theme images have been copied:
- Navigation arrows: `arrows.png`, `left.png`, `right.png`, `up.png`, `down.png`
- Navigation buttons: `nav_next.png`, `nav_prev.png`, `nav_next_alt.png`, `nav_prev_alt.png`, and dark variants
- UI elements: `check.png`, `draghor.png`, `dragver.png`, `slider_hor.png`, `slider_ver.png`
- Tree icons: `tree/file.gif`, `tree/folder.gif`, `tree/folderOpen.gif`, `tree/line1-4.gif`
- Uploader icons: `uploader/cancel.png`, `uploader/error.png`

**Usage:** Images are referenced by Webix CSS automatically. Paths are relative to `/webix/images/material/`

### 3. TypeScript Definitions (`src/webix/types/`)
- `webix.d.ts` - Main Webix type definitions
- `webix.global.d.ts` - Global Webix type definitions

**Usage:** Import types in TypeScript files:
```typescript
import { webix } from 'webix/types/webix';
```

### 4. Core Webix Files (`public/webix/`)
Already present (not copied, but verified):
- `webix.min.js` - Minified Webix library
- `webix.min.css` - Minified Webix base styles
- `material.min.css` - Material theme styles

## 🛠️ Utility Functions

### Created: `src/webix/utils.js`
Helper functions for working with Webix components:

- `getWebixGrid(gridId)` - Get Webix grid instance by ID
- `refreshWebixGrid(gridId, data)` - Refresh grid with new data
- `resizeWebixComponent(componentId)` - Resize Webix component
- `getSelectedRow(gridId)` - Get selected row data
- `selectRow(gridId, rowId)` - Select a row by ID
- `isWebixLoaded()` - Check if Webix is loaded
- `waitForWebix(timeout)` - Wait for Webix to load
- `formatDate(date, format)` - Format date for display
- `createColumn(id, header, width, options)` - Create column config
- `createActionColumn(action, label, width, styleClass)` - Create action button column

**Usage:**
```javascript
import { getWebixGrid, refreshWebixGrid, createActionColumn } from 'webix/utils';
```

## 🎨 CSS Customizations

### Updated: `src/styles/webix-custom.css`
- Added `@font-face` declarations for Webix fonts
- Font paths point to `/webix/fonts/`
- All custom styling matches Material Dashboard Pro React theme
- Grid width set to 100% for dynamic resizing

## 📋 Grid Configurations

### Existing Grid Configs (`src/webix/`)
- `usersGrid.js` - Users data table configuration
- `groupsGrid.js` - Groups data table configuration
- `appsGrid.js` - Apps data table configuration
- `formsGrid.js` - Forms data table configuration

All grids use the `webix-action-btn-style3h` style for action buttons.

## 🔗 References

### HTML (`public/index.html`)
- Webix CSS: `<link rel="stylesheet" href="%PUBLIC_URL%/webix/webix.min.css" />`
- Webix JS: `<script src="%PUBLIC_URL%/webix/webix.min.js"></script>`

### React Component (`src/components/WebixDataTable.js`)
- Wrapper component for Webix DataTable
- Handles initialization, data updates, and cleanup
- Includes resize handling for dynamic width

## ✅ Verification Checklist

- [x] Fonts copied to `public/webix/fonts/`
- [x] Images copied to `public/webix/images/material/`
- [x] TypeScript definitions copied to `src/webix/types/`
- [x] Font paths added to CSS
- [x] Utility functions created
- [x] All assets properly referenced
- [x] Grid configurations updated
- [x] Custom CSS matches Material Dashboard theme

## 📝 Notes

1. **Font Loading**: Fonts are loaded via CSS `@font-face` declarations. The Webix library may also reference fonts internally.

2. **Image Paths**: Webix CSS uses relative paths or data URIs. The minified CSS should handle image paths automatically.

3. **Theme**: We're using the Material theme (`material.min.css`). All images are from the `material/` directory.

4. **Custom Styling**: Custom Webix styling is in `src/styles/webix-custom.css` and matches the Material Dashboard Pro React theme.

5. **TypeScript**: Type definitions are available for TypeScript projects. Import as needed.

## 🚀 Next Steps

If you need additional Webix features:
1. Check `webix_code/samples/` for examples
2. Refer to Webix documentation: https://docs.webix.com/
3. Use utility functions from `src/webix/utils.js`
4. Customize CSS in `src/styles/webix-custom.css`

