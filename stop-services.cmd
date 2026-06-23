@echo off
title Stopping All Services...
echo ============================================
echo   Stopping all dev services...
echo ============================================

:: Kill Node.js processes (Vite, npm)
echo [1/4] Stopping Node.js processes (Vite/npm)...
taskkill /F /IM node.exe 2>nul
echo       Done.

:: Kill Rust/Cargo processes
echo [2/4] Stopping Cargo/Rust processes...
taskkill /F /IM cargo.exe 2>nul
taskkill /F /IM rustc.exe 2>nul
echo       Done.

:: Kill Tauri processes
echo [3/4] Stopping Tauri processes...
taskkill /F /IM ExcelDateFixerPro.exe 2>nul
echo       Done.

:: Free common ports
echo [4/4] Freeing ports (5173, 5174)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5173 " ^| findstr "LISTENING"') do taskkill /F /PID %%a 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5174 " ^| findstr "LISTENING"') do taskkill /F /PID %%a 2>nul
echo       Done.

echo.
echo ============================================
echo   All services stopped.
echo ============================================
timeout /t 3 >nul