# Contributing to Next Foundry

Thanks for your interest in improving **Next Foundry**. Contributions are welcome whether bug fixes, docs, refactors, or new optional integrations.

## Table of Contents

1. Core Principles
2. Getting Started
3. Development Workflow
4. Branching & Naming
5. Commit Message Convention
6. Code Style & Quality Gates
7. Environment Variables
8. Adding Dependencies
9. UI / Component Guidelines
10. PR Submission Checklist
11. Community & Conduct
12. Security Disclosure
13. License

---

## 1. Core Principles

- **Lean Core**: Keep the starter focused; advanced features should be opt‑in.
- **Clarity Over Cleverness**: Readability > micro‑abstractions.
- **Production Minded**: Prefer patterns that scale (security, resilience, DX).
- **Consistency**: Follow established naming and folder structures.
- **Document As You Go**: Every new integration warrants a short README section or inline docs.

## 2. Getting Started

```bash
pnpm install
cp .env.example .env # fill in required values
pnpm db:generate
pnpm dev
```

Visit `http://localhost:3000/playground` to verify widgets render.

## 3. Development Workflow

1. Create a feature branch (see naming below).
2. Make focused changes; keep PRs scoped.
3. Run local quality gates (see section 6).
4. Update docs (`README.md` or widget comments) if behavior changes.
5. Open a Pull Request with a clear description (problem → solution → notes).

## 4. Branching & Naming

Format: `<type>/<short-hyphenated-summary>`
Examples:

- `feat/oauth-github-provider`
- `fix/magic-link-timeout`
- `docs/readme-env-vars`
- `chore/update-deps`

Types: `feat`, `fix`, `docs`, `chore`, `refactor`, `perf`, `test`, `ci`.

## 5. Commit Message Convention

Use **Conventional Commits**:

```
<type>(optional scope): <description>

[optional body]
[optional footer(s)]
```

Examples:

- `feat(auth): add GitHub provider`
- `fix(rate-limit): correct actionType constant`
- `docs: expand security posture section`

Scopes (common): `auth`, `email`, `rate-limit`, `db`, `ui`, `deps`, `docs`, `build`, `infra`.

## 6. Code Style & Quality Gates

Before pushing / opening a PR run:

```bash
pnpm lint
pnpm typecheck
pnpm format:check
pnpm analyze # (Knip dead code scan)
```

Optional but encouraged:

```bash
pnpm security:audit
```

Automations:

- `lint-staged` enforces formatting & lint on staged files.
- `postinstall` runs `prisma generate` to keep client current.

### Style Notes

- Use TypeScript everywhere; avoid `any` unless justified.
- Prefer named exports; keep default exports for pages / Next.js requirements.
- Co-locate small helper functions; promote to `lib/` only if reused across domains.
- Use `zod` for all external input validation (actions, API routes, forms).
- Avoid premature abstraction; duplicate once is OK, abstract after the third time.
- Avoid leaking secrets client-side.

## 7. Environment Variables

Document new variables in `.env.example` AND `README.md` if they are user-facing.
Use `@t3-oss/env-nextjs` patterns already established in `src/env.ts`.

## 8. Adding Dependencies

Criteria:

- Justify additions in the PR description (why existing stack insufficient).
- Prefer lightweight, well-maintained libraries.
- Avoid overlapping functionality (e.g., do not add another date library).

Run after adding:

```bash
pnpm dedupe
pnpm build
```

## 9. UI / Component Guidelines

- Shared primitives live in `components/ui/` (shadcn-based).
- Context/providers go under `components/providers/`.
- Widgets in the playground go in `src/app/playground/_widgets/`.
- Keep JSX clean by extracting complex logic into small helpers.
- Use Tailwind utility classes; fall back to minimal custom CSS when necessary.
- Prefer composition via `className` merging (`tailwind-merge`, `clsx`).

## 10. PR Submission Checklist

- [ ] Branch follows naming convention
- [ ] Conventional commit history
- [ ] `pnpm lint` passes
- [ ] `pnpm typecheck` passes
- [ ] `pnpm format:check` passes
- [ ] Added / updated docs or comments
- [ ] Added / updated `.env.example` if needed
- [ ] No stray `console.log` (leave purposeful debug logs commented or removed)
- [ ] Tested auth / affected flows locally

## 11. Community & Conduct

Be respectful, constructive, and inclusive. Assume good intent. No harassment, discrimination, or disruptive behavior. Maintain focus on technical merit.

If a disagreement persists, propose objective benchmarks or create a follow-up issue rather than blocking unrelated improvements.

## 12. Security Disclosure

If you find a vulnerability:

1. Do **NOT** open a public issue immediately.
2. Email the maintainer (hello@ubonggeorge.com) with steps to reproduce.
3. You'll receive acknowledgment within 12 hours; coordinated disclosure appreciated.

## 13. License

By contributing you agree your work is provided under the project MIT License (see [LICENSE.md](LICENSE.md)).

---

Thank you for looking to improve Next Foundry. Your contributions reduce boilerplate for the next builder 🚀
