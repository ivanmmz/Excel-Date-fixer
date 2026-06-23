@echo off
title Excel Date Fixer - Install Requirements
cd /d "%~dp0"

echo ============================================
echo   Excel Date Fixer Pro - Install Requirements
echo ============================================
echo.
echo   Run this once after cloning the repo.
echo ============================================
echo.

:: ── 1. Check Node.js ──────────────────────────────────────────────────────────
where node >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Node.js found:
    node -v
    echo.
) else (
    echo [!] Node.js NOT found.
    echo     Attempting to install via winget...
    echo.
    winget install OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] winget install failed.
        echo         Please install Node.js manually:
        echo         https://nodejs.org/en/download
        echo.
        pause
        exit /b 1
    )
    echo.
    echo [OK] Node.js installed.
    echo      Please CLOSE and REOPEN this window, then run install-requirements.cmd again.
    pause
    exit /b 0
)

:: ── 2. Check Rust / Cargo ─────────────────────────────────────────────────────
where cargo >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Rust found:
    cargo --version
    echo.
) else (
    echo [!] Rust NOT found.
    echo     Attempting to install rustup via winget...
    echo.
    winget install Rustlang.Rustup --accept-source-agreements --accept-package-agreements
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] winget install failed.
        echo         Please install Rust manually:
        echo         https://rustup.rs
        echo.
        pause
        exit /b 1
    )
    echo.
    echo [OK] Rust (rustup) installed.
    echo      Please CLOSE and REOPEN this window, then run install-requirements.cmd again.
    pause
    exit /b 0
)

:: ── 3. Install npm dependencies ───────────────────────────────────────────────
echo [INFO] Installing npm packages (package.json)...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] npm install failed.
    pause
    exit /b 1
)
echo.

:: ── 4. Verify key packages are present ───────────────────────────────────────
echo [INFO] Verifying key packages...

call node -e "require('./node_modules/vite/package.json')" >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] vite not found after install. Try: npm install vite
    pause
    exit /b 1
)
echo [OK] vite

call node -e "require('./node_modules/@tauri-apps/cli/package.json')" >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] @tauri-apps/cli not found. Try: npm install @tauri-apps/cli
    pause
    exit /b 1
)
echo [OK] @tauri-apps/cli

call node -e "require('./node_modules/@tauri-apps/api/package.json')" >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] @tauri-apps/api not found. Try: npm install @tauri-apps/api
    pause
    exit /b 1
)
echo [OK] @tauri-apps/api

call node -e "require('./node_modules/exceljs/package.json')" >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] exceljs not found. Try: npm install exceljs
    pause
    exit /b 1
)
echo [OK] exceljs
echo.

:: ── 5. Check icons ────────────────────────────────────────────────────────────
if not exist "src-tauri\icons\icon.ico" (
    echo [WARN] src-tauri\icons\ has no icons.
    echo        To generate icons for packaging, place a PNG (256x256 RGBA) named
    echo        "app-icon.png" in the project root, then run:
    echo.
    echo            npx tauri icon app-icon.png
    echo.
    echo        Icons are NOT required for dev mode (dev.cmd will still work).
    echo.
)

echo ============================================
echo   All requirements installed successfully!
echo   Run dev.cmd to start development.
echo ============================================
echo.
pause
