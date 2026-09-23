# Gemini Agent Guidelines for CyrusAlcala.com

## Jev 1.13 Judgment Layer

This project has **Jev 1.13** (`typesafe/jev-1.13`) configured via OpenRouter to serve as a fast, calibrated structured decision layer during the website redesign.

### When to Invoke Jev

Whenever you need to make bounded design judgments, invoke `scripts/judge.cjs`:

1. **Evaluating Component Iterations**:
   ```sh
   node scripts/judge.cjs --task evaluate --component "<Name>" --state "<Properties and styling>"
   ```
   Inspect the structured decision (`ACCEPT`, `REVISE`, `SIMPLIFY`, `RETRY`, `ESCALATE_TO_GEMINI`).

2. **Comparing UI Layout Variants**:
   ```sh
   node scripts/judge.cjs --task choose --goal "<Goal>" --variants '{"Variant_A":"...","Variant_B":"..."}'
   ```

3. **Checking Design System Consistency**:
   ```sh
   node scripts/judge.cjs --task consistency --component "<Name>" --state "<Tokens used>"
   ```

4. **Deciding Iteration Completion**:
   ```sh
   node scripts/judge.cjs --task iterate --component "<Name>" --iteration <N> --issues "<Remaining issues>"
   ```

### Operational Boundaries
- **Gemini**: Implements all code, HTML, CSS, JavaScript, responsive styles, bug fixes, and copywriting.
- **Jev**: Provides fast, typed evaluations and probability distributions to help Gemini decide whether to accept, revise, simplify, or choose between options.
- **Non-blocking**: If Jev is offline or fails, it returns `ESCALATE_TO_GEMINI`. Do not let Jev downtime block website development.

## Autonomous Execution & Maximum Agency

- **Default to Autonomous Execution**: Take initiative and proceed end-to-end to fulfill the user's objective without stopping to ask "what should I do next?" or requesting confirmation for routine actions, edits, builds, tests, or file operations.
- **Make Calibrated Judgments**: When encountering design decisions, implementation choices, or trade-offs, evaluate and decide directly (using Jev or established engineering principles) rather than pausing to query the user.
- **Act First, Report Outcomes**: Carry out all necessary file inspections, edits, command runs, builds, and validations proactively, and report concise results upon completion.
