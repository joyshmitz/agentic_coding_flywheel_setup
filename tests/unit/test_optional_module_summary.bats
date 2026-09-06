#!/usr/bin/env bats
#
# Issue #387: a stale installer pin on an OPTIONAL generated module surfaced
# only as a WARN line, while the same failure on a required module was named
# in the final summary box. install.sh now owns record_skipped_tool() (the
# hook generated optional modules already call) and print_summary() lists the
# recorded skips beside the failures. These tests exercise the shipped
# function bodies extracted from install.sh, in the style of
# test_only_module_failure.bats.

setup() {
    PROJECT_ROOT="$(cd "$(dirname "$BATS_TEST_FILENAME")/../.." && pwd)"
    INSTALL_SH="$PROJECT_ROOT/install.sh"

    eval "$(sed -n '/^record_skipped_tool() {$/,/^}$/p' "$INSTALL_SH")"
    eval "$(sed -n '/^print_summary() {$/,/^}$/p' "$INSTALL_SH")"
    [[ "$(type -t record_skipped_tool)" == "function" ]]
    [[ "$(type -t print_summary)" == "function" ]]

    # Globals print_summary reads; colors empty so assertions match plain text.
    RED="" GREEN="" YELLOW="" BLUE="" GRAY="" NC=""
    ACFS_SUCCESS="2" ACFS_WARNING="3"
    HAS_GUM=false
    DRY_RUN=false
    MODE="vibe"
    ACFS_VERSION="test"
    TARGET_USER="tester"
    TARGET_HOME="/home/tester"
    ACFS_SSH_KEY_WARNING=false
    SMOKE_TEST_FAILED=false
    ACFS_PHASE_FAILURES=()
    ACFS_MODULE_FAILURES=()
    ACFS_OPTIONAL_MODULE_SKIPS=()
    ACFS_LAST_MODULE_FAILURE_REASON=""
    check_tailscale_auth() { return 1; }

    STATE_SKIPS=()
    state_tool_skip() { STATE_SKIPS+=("$1"); }
}

@test "record_skipped_tool prefers the module's categorized reason over the generic call-site text" {
    ACFS_LAST_MODULE_FAILURE_REASON="checksum"
    record_skipped_tool "stack.pfr" "verified installer failed"

    [[ ${#ACFS_OPTIONAL_MODULE_SKIPS[@]} -eq 1 ]]
    [[ "${ACFS_OPTIONAL_MODULE_SKIPS[0]}" == "stack.pfr (checksum)" ]]
    # Consumed, so a later module cannot inherit this module's category.
    [[ -z "$ACFS_LAST_MODULE_FAILURE_REASON" ]]
    # The persisted skip marker generated modules relied on is still written.
    [[ ${#STATE_SKIPS[@]} -eq 1 && "${STATE_SKIPS[0]}" == "stack.pfr" ]]
}

@test "record_skipped_tool keeps a specific reason, bounds long verify commands, and dedupes by module" {
    record_skipped_tool "stack.slb" 'verify failed: export PATH="$HOME/go/bin:$PATH" && slb >/dev/null 2>&1 || slb --help >/dev/null 2>&1'
    record_skipped_tool "stack.slb" "verified installer failed"
    record_skipped_tool "stack.ntm" "verified installer failed"

    [[ ${#ACFS_OPTIONAL_MODULE_SKIPS[@]} -eq 2 ]]
    [[ "${ACFS_OPTIONAL_MODULE_SKIPS[0]}" == 'stack.slb (verify failed: export PATH="$HOME/go/bin:$PATH" && slb >/dev/null'*'...)' ]]
    # Module id + a 72-char-bounded reason stays within a summary-box line.
    local bounded="stack.slb ()"
    (( ${#ACFS_OPTIONAL_MODULE_SKIPS[0]} <= 72 + ${#bounded} ))
    # No categorized reason set: the call-site text is kept verbatim.
    [[ "${ACFS_OPTIONAL_MODULE_SKIPS[1]}" == "stack.ntm (verified installer failed)" ]]
}

@test "record_skipped_tool ignores an empty module id" {
    record_skipped_tool "" "checksum"
    [[ ${#ACFS_OPTIONAL_MODULE_SKIPS[@]} -eq 0 ]]
    [[ ${#STATE_SKIPS[@]} -eq 0 ]]
}

@test "print_summary lists optional skips beside required failures" {
    ACFS_MODULE_FAILURES=("stack.mcp_agent_mail (checksum)")
    ACFS_LAST_MODULE_FAILURE_REASON="checksum"
    record_skipped_tool "stack.pfr" "verified installer failed"

    run print_summary
    [[ "$status" -eq 0 ]]
    [[ "$output" == *"Finished With Failures"* ]]
    [[ "$output" == *"stack.mcp_agent_mail (checksum)"* ]]
    [[ "$output" == *"Optional modules skipped"* ]]
    [[ "$output" == *"stack.pfr (checksum)"* ]]
    [[ "$output" == *"acfs update --stack"* ]]
    # The optional block follows the failures block, never displaces it.
    local failures_pos optional_pos
    failures_pos="${output%%COMPLETED WITH FAILURES*}"
    optional_pos="${output%%Optional modules skipped*}"
    (( ${#failures_pos} < ${#optional_pos} ))
}

@test "print_summary keeps the success banner when only optional modules were skipped" {
    record_skipped_tool "stack.pfr" "verified installer failed"

    run print_summary
    [[ "$status" -eq 0 ]]
    [[ "$output" == *"Installation Complete"* ]]
    [[ "$output" != *"COMPLETED WITH FAILURES"* ]]
    [[ "$output" == *"Optional modules skipped"* ]]
    [[ "$output" == *"stack.pfr (verified installer failed)"* ]]
}

@test "print_summary prints no optional block when nothing was skipped" {
    run print_summary
    [[ "$status" -eq 0 ]]
    [[ "$output" == *"Installation Complete"* ]]
    [[ "$output" != *"Optional modules skipped"* ]]
}
