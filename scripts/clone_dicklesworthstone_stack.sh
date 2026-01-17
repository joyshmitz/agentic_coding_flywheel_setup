#!/bin/bash
# Clone Dicklesworthstone stack from GitHub
# Based on repositories listed in install.sh
# Target: /home/ubuntu/Development

set -e

TARGET_DIR="/home/ubuntu/Development"
GITHUB_USER="Dicklesworthstone"

# Core stack repositories (from install.sh)
REPOS=(
    "agentic_coding_flywheel_setup"      # Main setup repo
    "ntm"                                 # NTM - Node Task Manager
    "mcp_agent_mail"                      # MCP Agent Mail
    "ultimate_bug_scanner"                # UBS - Ultimate Bug Scanner
    "beads_viewer"                        # Beads Viewer
    "coding_agent_session_search"         # CASS - Coding Agent Session Search
    "cass_memory_system"                  # CM - CASS Memory System
    "coding_agent_account_manager"        # CAAM - Coding Agent Account Manager
    "simultaneous_launch_button"          # SLB - Simultaneous Launch Button
)

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo ""
echo -e "${CYAN}========================================"
echo "  Dicklesworthstone Stack Downloader"
echo "========================================${NC}"
echo ""
echo "Target directory: $TARGET_DIR"
echo "Repositories: ${#REPOS[@]}"
echo ""

# Create target directory
mkdir -p "$TARGET_DIR"
cd "$TARGET_DIR"

SUCCESS=0
FAILED=0
SKIPPED=0

for repo in "${REPOS[@]}"; do
    if [ -d "$repo" ]; then
        echo -e "${YELLOW}[SKIP]${NC} $repo (already exists)"
        ((SKIPPED++))
    else
        echo -n "Cloning $repo... "
        if git clone --quiet "https://github.com/${GITHUB_USER}/${repo}.git" 2>/dev/null; then
            echo -e "${GREEN}[OK]${NC}"
            ((SUCCESS++))
        else
            echo -e "${RED}[FAILED]${NC}"
            ((FAILED++))
        fi
    fi
done

echo ""
echo -e "${CYAN}========================================"
echo "  Summary"
echo "========================================${NC}"
echo -e "  ${GREEN}Cloned:${NC}  $SUCCESS"
echo -e "  ${YELLOW}Skipped:${NC} $SKIPPED"
echo -e "  ${RED}Failed:${NC}  $FAILED"
echo ""
echo "All repositories saved to: $TARGET_DIR"
echo ""
