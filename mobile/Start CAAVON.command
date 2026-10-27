#!/bin/zsh
set -e
cd "$(dirname "$0")"

# Prefer the compatible Node runtime bundled with Codex when available.
caavon_runtime="$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin"
if [[ -x "$caavon_runtime/node" ]]; then
  export PATH="$caavon_runtime:$PATH"
fi
if [[ ! -d node_modules ]]; then
  npm ci
fi
echo "Starting CAAVON. Scan the QR code on your phone, or press w for the browser preview."
npm start
