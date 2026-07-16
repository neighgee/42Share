# 42Share – Documentation Index

This directory contains the product, constraints, architecture, data, API, interface, implementation, and submission documentation for 42Share. For the user-facing demo, installation, and usage instructions, see the [project README](../README.md).

## Core Documentation

| Document                                                | Purpose                                                                                |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [01 – Product Requirements Document](01-PRD.md)         | Defines the problem, goals, scope, business rules, and acceptance criteria             |
| [02 – Implementation Constraints](02-CONSTRAINTS.md)    | Defines the authoritative technology, scope, security, and implementation limits       |
| [03 – Architecture](03-ARCHITECTURE.md)                 | Describes the application structure, request lifecycle, services, and design decisions |
| [04 – Database](04-DATABASE.md)                         | Documents the PostgreSQL schema, relationships, constraints, and computed values       |
| [05 – API](05-API.md)                                   | Defines authentication, order, membership, response, and error contracts               |
| [06 – UI Specification](06-UI_SPEC.md)                  | Defines the visual language, layout, interaction, accessibility, and responsive rules  |
| [07 – User Flows](07-USER_FLOWS.md)                     | Describes user journeys, preconditions, actions, and results                           |
| [08 – Implementation Tasks](08-TASKS.md)                | Records the intended implementation sequence and definitions of done                   |
| [09 – Implementation Guide](09-IMPLEMENTATION_GUIDE.md) | Defines documentation priority and implementation practices                            |
| [10 – Wireframes](10-WIREFRAMES.md)                     | Shows the intended information hierarchy for each screen                               |
| [11 – Components](11-COMPONENTS.md)                     | Defines reusable interface components and their responsibilities                       |

## Submission Documentation

| Document                                     | Purpose                                                                               |
| -------------------------------------------- | ------------------------------------------------------------------------------------- |
| [AI Development Notes](ai-dev/README.md)     | Records AI tools, agent roles, development approach, review decisions, and reflection |
| [Extra AI Chat Logs](ai-dev/Extra/README.md) | Indexes the redacted Codex and ChatGPT session evidence                               |

## Documentation Conventions

- Use one level-one heading (`#`) for the document title.
- Use level-two headings (`##`) for major sections and level-three headings (`###`) for subsections.
- Use hyphens for unordered lists.
- Add a language identifier to fenced code blocks where practical.
- Use relative Markdown links for repository files.
- Keep credentials, OAuth codes, private user data, and local environment values out of documentation.

## Source of Truth

Apply documents in the priority order defined by [09 – Implementation Guide](09-IMPLEMENTATION_GUIDE.md). When documents conflict, [02 – Implementation Constraints](02-CONSTRAINTS.md) is authoritative.
