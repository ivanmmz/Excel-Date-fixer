@echo off
chcp 65001 >nul
title Excel Date Fixer - Install Dependencies (Windows)
echo ============================================
echo  Excel Date Fixer Pro - Installing Dependencies
echo ============================================
echo.

:: ----- Check Node.js -----
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js not found! Please install Node.js v18+ from:
    echo        https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js found: 
node -v

:: ----- Check Rust -----
where rustc >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Rust not found! Please install Rust from:
    echo        https://rustup.rs/
    pause
    exit /b 1
)
echo [OK] Rust found:
rustc --version
echo.

:: ----- Install npm dependencies -----
echo [1/2] Installing npm dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] npm install failed!
    pause
    exit /b 1
)
echo [OK] npm install completed!
echo.

:: ----- Check Tauri CLI -----
echo [2/2] Verifying Tauri CLI...
call npx tauri --version >nul 2>nul
if %errorlevel% neq 0 (
    echo [INFO] Tauri CLI will be installed automatically on first use.
) else (
    echo [OK] Tauri CLI is available.
)
echo.

echo ============================================
echo  All dependencies installed successfully!
echo  Run "npm run dev:tauri" to start the app.
echo ============================================
pause
