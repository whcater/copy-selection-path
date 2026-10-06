# Copy Selection Path

A VS Code extension that copies the file path with line numbers from your selection.

## Features

Right-click on selected text in the editor to copy the file path along with the selected line range.

**Two context menu options:**

| Menu Item                                    | Output Example                                      |
| -------------------------------------------- | --------------------------------------------------- |
| Copy Selection with Path & Line Numbers      | `src\services\example.ts line:250-253`            |
| Copy Selection with Full Path & Line Numbers | `C:\project\src\services\example.ts line:250-253` |

**Output format:**

- Single line: `path\to\file.ts line:42`
- Multiple lines: `path\to\file.ts line:250-253`

## Usage

1. Select text in the editor
2. Right-click to open context menu
3. Choose one of the options:
   - **Copy Selection with Path & Line Numbers** - copies relative path
   - **Copy Selection with Full Path & Line Numbers** - copies absolute path
4. The formatted path is now in your clipboard

## Installation

### From Source

```bash
# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Package extension
npm run package
```

Then install the generated `.vsix` file:

- Open VS Code
- Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
- Type "Install from VSIX"
- Select the generated `.vsix` file

### Development

```bash
# Watch mode for development
npm run watch

# Press F5 in VS Code to launch Extension Development Host
```

## Example

Selecting lines 250-253 in `repo-root\src\services\core-service.ts` will copy:

```
`repo-root`\src\services\core-service.ts line:250-253
```

## Publishing to VS Code Marketplace

### Prerequisites

1. **Create a Publisher** (one-time setup)

   - Visit https://marketplace.visualstudio.com/manage
   - Sign in with your Microsoft account
   - Click "Create publisher"
   - Fill in Publisher ID (e.g., `whcater`) and display name
2. **Create a Personal Access Token (PAT)**

   - Visit https://dev.azure.com
   - Click user icon (top right) → Personal access tokens
   - Click "New Token"
   - Configure:
     - **Name**: `vsce` (or any name you prefer)
     - **Organization**: `All accessible organizations`
     - **Expiration**: Set as needed
     - **Scopes**: Select `Custom defined` → Check `Marketplace > Manage`
   - Click "Create" and copy the generated token (save it securely)

### Publishing Steps

```bash
# 1. Install vsce globally (optional, can use npx)
npm install -g @vscode/vsce

# 2. Login with your PAT (one-time per machine)
npx @vscode/vsce login whcater
# Enter your PAT when prompted

# 3. Package the extension
npx @vscode/vsce package --allow-missing-repository

# 4. Publish to Marketplace
npx @vscode/vsce publish --allow-missing-repository
or
npx @vscode/vsce publish minor --allow-missing-repository 2>&1

# Or publish with version bump
npx @vscode/vsce publish patch  # 1.0.0 -> 1.0.1
npx @vscode/vsce publish minor  # 1.0.0 -> 1.1.0
npx @vscode/vsce publish major  # 1.0.0 -> 2.0.0
```

### Verify Publication

After publishing, your extension will be available at:

- https://marketplace.visualstudio.com/items?itemName=whcater.copy-selection-path

It may take a few minutes for the extension to appear in search results.

- 插件地址: https://marketplace.visualstudio.com/items?itemName=whcater.copy-selection-path
- 管理页面: https://marketplace.visualstudio.com/manage/publishers/whcater/extensions/copy-selection-path/hub
