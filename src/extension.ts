import * as vscode from 'vscode';
import * as path from 'path';

function getSelectionInfo(editor: vscode.TextEditor, includeContent: boolean = false) {
    const selection = editor.selection;
    const document = editor.document;
    const filePath = document.uri.fsPath;

    // Get workspace folder (repository root)
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);

    let relativePath: string;
    if (workspaceFolder) {
        relativePath = path.relative(workspaceFolder.uri.fsPath, filePath);
    } else {
        relativePath = path.basename(filePath);
    }

    // Line numbers are 0-indexed in VS Code, so add 1 for display
    const startLine = selection.start.line + 1;
    const endLine = selection.end.line + 1;

    let content = '';
    if (includeContent) {
        content = document.getText(selection);
    }

    return {
        fullPath: filePath,
        relativePath,
        startLine,
        endLine,
        content,
    };
}

function formatResult(filePath: string, startLine: number, endLine: number): string {
    if (startLine === endLine) {
        return `${filePath} line:${startLine}`;
    }
    return `${filePath} line:${startLine}-${endLine}`;
}

export function activate(context: vscode.ExtensionContext) {
    // Copy with relative path
    const copyRelative = vscode.commands.registerCommand('copySelectionPath.copy', async () => {
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            vscode.window.showWarningMessage('No active editor');
            return;
        }

        if (editor.selection.isEmpty) {
            vscode.window.showWarningMessage('No text selected');
            return;
        }

        const info = getSelectionInfo(editor);
        const result = formatResult(info.relativePath, info.startLine, info.endLine);

        await vscode.env.clipboard.writeText(result);
        vscode.window.showInformationMessage(`Copied: ${result}`);
    });

    // Copy with full path
    const copyFullPath = vscode.commands.registerCommand('copySelectionPath.copyFullPath', async () => {
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            vscode.window.showWarningMessage('No active editor');
            return;
        }

        if (editor.selection.isEmpty) {
            vscode.window.showWarningMessage('No text selected');
            return;
        }

        const info = getSelectionInfo(editor);
        const result = formatResult(info.fullPath, info.startLine, info.endLine);

        await vscode.env.clipboard.writeText(result);
        vscode.window.showInformationMessage(`Copied: ${result}`);
    });

    // Copy with path, line range and content
    const copyPathWithContent = vscode.commands.registerCommand('copySelectionPath.copyPathWithContent', async () => {
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            vscode.window.showWarningMessage('No active editor');
            return;
        }

        if (editor.selection.isEmpty) {
            vscode.window.showWarningMessage('No text selected');
            return;
        }

        const info = getSelectionInfo(editor, true);
        const lineRange = info.startLine === info.endLine
            ? `line:${info.startLine}`
            : `line:${info.startLine}-${info.endLine}`;
        const result = `${info.relativePath} ${lineRange}\n${info.content}`;

        await vscode.env.clipboard.writeText(result);
        vscode.window.showInformationMessage(`Copied: ${info.relativePath} ${lineRange}`);
    });

    context.subscriptions.push(copyRelative, copyFullPath, copyPathWithContent);
}

export function deactivate() {}
