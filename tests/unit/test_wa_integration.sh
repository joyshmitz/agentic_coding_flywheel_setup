#!/usr/bin/env bash
# Unit tests for FrankenTerm (ft) integration.
# The filename is retained because renaming tracked files requires a separate cleanup.
# Tests that the ft binary and non-mutating command surfaces work.

set -uo pipefail
# Note: Not using -e to allow tests to continue after failures

LOG_FILE="/tmp/frankenterm_integration_tests_$(date +%Y%m%d_%H%M%S).log"
PASS_COUNT=0
FAIL_COUNT=0
SKIP_COUNT=0

log() { echo "[$(date +%H:%M:%S)] $*" | tee -a "$LOG_FILE"; }
pass() {
    log "PASS: $*"
    ((PASS_COUNT++))
}
fail() {
    log "FAIL: $*"
    ((FAIL_COUNT++))
}
skip() {
    log "SKIP: $*"
    ((SKIP_COUNT++))
}

# Test 1: ft binary exists
test_ft_binary() {
    log "Test 1: ft binary availability..."
    if command -v ft >/dev/null 2>&1; then
        pass "ft binary found at $(command -v ft)"
        return 0
    else
        fail "ft binary not found in PATH (default-enabled tool)"
        return 1
    fi
}

# Test 2: ft --version works
test_ft_version() {
    log "Test 2: ft --version..."
    if ! command -v ft >/dev/null 2>&1; then
        skip "ft not installed, skipping version test"
        return
    fi

    local version
    if version=$(ft --version 2>&1) && [[ "$version" =~ (FrankenTerm|ft) ]]; then
        pass "ft version: $version"
    else
        fail "ft --version failed or returned unexpected output: $version"
    fi
}

# Test 3: ft --help works
test_ft_help() {
    log "Test 3: ft --help..."
    if ! command -v ft >/dev/null 2>&1; then
        skip "ft not installed, skipping help test"
        return
    fi

    if ft --help 2>&1 | head -20 | grep -qiE "(frankenterm|usage|commands|help)"; then
        pass "ft --help displays correct content"
    else
        fail "ft --help failed or missing content"
    fi
}

# Test 4: ft list command surface exists without opening the live database
test_ft_list_help() {
    log "Test 4: ft list --help..."
    if ! command -v ft >/dev/null 2>&1; then
        skip "ft not installed, skipping list help test"
        return
    fi

    if ft list --help 2>&1 | head -10 | grep -qiE "(list|pane|usage|options)"; then
        pass "ft list command is available"
    else
        fail "ft list --help failed"
    fi
}

# Test 5: ft status command surface exists
test_ft_status_help() {
    log "Test 5: ft status --help..."
    if ! command -v ft >/dev/null 2>&1; then
        skip "ft not installed, skipping status help test"
        return
    fi

    if ft status --help 2>&1 | head -10 | grep -qiE "(status|pane|usage|options)"; then
        pass "ft status command is available"
    else
        fail "ft status --help failed"
    fi
}

# Test 6: ft doctor command surface exists
test_ft_doctor_help() {
    log "Test 6: ft doctor --help..."
    if ! command -v ft >/dev/null 2>&1; then
        skip "ft not installed, skipping doctor help test"
        return
    fi

    if ft doctor --help 2>&1 | head -10 | grep -qiE "(doctor|diagnostic|usage|options)"; then
        pass "ft doctor command is available"
    else
        fail "ft doctor --help failed"
    fi
}

# Summary
print_summary() {
    log ""
    log "========================================"
    log "TEST SUMMARY"
    log "========================================"
    log "Passed:  $PASS_COUNT"
    log "Failed:  $FAIL_COUNT"
    log "Skipped: $SKIP_COUNT"
    log "Total:   $((PASS_COUNT + FAIL_COUNT + SKIP_COUNT))"
    log "Log file: $LOG_FILE"
    log "========================================"

    if [[ $FAIL_COUNT -gt 0 ]]; then
        log "OVERALL: FAILED"
        return 1
    elif [[ $SKIP_COUNT -gt 0 && $PASS_COUNT -eq 0 ]]; then
        log "OVERALL: SKIPPED (ft not installed)"
        return 0
    else
        log "OVERALL: PASSED"
        return 0
    fi
}

# Run all tests
main() {
    log "========================================"
    log "FrankenTerm (ft) Integration Tests"
    log "========================================"
    log ""

    # Test 1 determines if we can run other tests
    test_ft_binary
    test_ft_version
    test_ft_help
    test_ft_list_help
    test_ft_status_help
    test_ft_doctor_help

    print_summary
}

main "$@"
