# Troubleshooting Guide

## Issue 1: "Agant" or "npm" is not recognized
If you see an error saying `npm` is not recognized, it means **Node.js is not loaded yet**.

**Solution:**
1.  **Restart your computer**. This is the most reliable way to fix it.
2.  Open VS Code (or your editor) again.
3.  Check if it works by typing `node -v` in the terminal.

## Issue 2: "The token '&&' is not a valid statement separator"
This happens because you are using **PowerShell**, which uses different symbols than the standard command line.

**Solution:**
Use `;` instead of `&&`.

**Run this command instead:**
```powershell
cd server; npm install; npm start
```
