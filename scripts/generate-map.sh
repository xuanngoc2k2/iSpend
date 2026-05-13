#!/bin/bash

# ============================================================
# generate-map.sh — Build/Update Code Knowledge Graph
# Uses code-review-graph (Tree-sitter + MCP)
# ============================================================

set -e

echo "🗺️ Building Code Knowledge Graph..."

# Check if code-review-graph is installed
if command -v code-review-graph &> /dev/null; then
  # Check if graph already exists → incremental update
  if [ -d ".code-review-graph" ]; then
    echo "📡 Incremental update (only changed files)..."
    code-review-graph update
  else
    echo "🔨 First build (full parse)..."
    code-review-graph build
  fi

  echo ""
  echo "✅ Knowledge Graph updated: .code-review-graph/"
  echo "📊 Stats:"
  code-review-graph status 2>/dev/null || true
  echo ""
  echo "AI sẽ tự động dùng graph qua MCP tools."

else
  echo "⚠️ code-review-graph chưa cài đặt!"
  echo "Cài đặt ngay: pip install code-review-graph && code-review-graph install"
  exit 1
fi
