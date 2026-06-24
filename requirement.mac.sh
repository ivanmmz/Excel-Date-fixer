#!/bin/bash
set -e

echo "============================================"
echo " Excel Date Fixer Pro - Installing Dependencies"
echo "============================================"
echo ""

# ----- Check / Install Xcode CLI Tools -----
if ! xcode-select -p &>/dev/null; then
    echo "[INFO] Installing Xcode Command Line Tools..."
    xcode-select --install
    echo "      Please complete the installation dialog, then re-run this script."
    exit 1
fi
echo "[OK] Xcode Command Line Tools found"

# ----- Check / Install Homebrew -----
if ! command -v brew &>/dev/null; then
    echo "[INFO] Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi
echo "[OK] Homebrew found"

# ----- Check / Install Node.js -----
if ! command -v node &>/dev/null; then
    echo "[INFO] Installing Node.js via Homebrew..."
    brew install node
fi
echo "[OK] Node.js found: $(node -v)"

# ----- Check / Install Rust -----
if ! command -v rustc &>/dev/null; then
    echo "[INFO] Installing Rust via rustup..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    source "$HOME/.cargo/env"
fi
echo "[OK] Rust found: $(rustc --version)"
echo ""

# ----- Install npm dependencies -----
echo "[1/2] Installing npm dependencies..."
npm install
echo "[OK] npm install completed!"
echo ""

# ----- Check Tauri CLI -----
echo "[2/2] Verifying Tauri CLI..."
npx tauri --version &>/dev/null && echo "[OK] Tauri CLI is available" || echo "[INFO] Tauri CLI will be installed on first use"
echo ""

echo "============================================"
echo " All dependencies installed successfully!"
echo " Run 'npm run dev:tauri' to start the app."
echo "============================================"
