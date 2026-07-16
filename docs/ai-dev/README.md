# 42Share – AI Development Notes

## AI Tools

- **Codex (GPT-5-based coding agent)**
  - **Purpose and role:** implementation and review agent used to analyse the repository, build and debug features, refine the interface, update documentation, and verify the application against the approved specification.
  - **Skills applied:** Next.js and TypeScript development, 42 OAuth and API debugging, Supabase integration, responsive Tailwind CSS design, testing, production-build verification, repository inspection, and technical writing.
- **ChatGPT**
  - **Purpose and role:** product and documentation assistant used to interpret the B1 brief, shape the 42Share requirements, review documentation consistency, and prepare the implementation handoff.
  - **Skills applied:** requirement definition, scope review, product planning, document structure, consistency checking, UX discussion, and prompt refinement.
- **OpenAI image generation**
  - **Purpose and role:** visual asset tool used to prepare the supplied stylised 42 mark as a lightweight transparent web asset while preserving its visual form.
  - **Skills applied:** reference-guided image preparation, transparent-background asset generation, and visual adaptation for the web interface.

## Development Approach with AI

Representative prompts and instructions used:

- Read all documentation in `docs/` and the B1 Builders Programme PDF.
- Confirm that 42Share is the organisational-use B1 project.
- Create 42Share according to the documentation without requesting additional input unless required.
- Inspect the repository, dependencies, README instructions, and local environment before starting the application.
- Add development-only organiser and participant identities so multi-user behaviour can be tested without additional 42 accounts.
- Support logout and identity switching while keeping production authentication on 42 OAuth.
- Display the creator's 42 intra login rather than their real or full name.
- Improve the login, dashboard, order form, and details page using the supplied food photography, 42 logo, and turquoise visual reference.
- Make delivery-fee sharing and estimated savings understandable through comparison layouts, concise wording, and clear calls to action.
- Refine responsive sizing and spacing so important dashboard and order-detail sections are visible together on common desktop viewports.
- Maintain redacted AI development logs and rerun formatting, type, lint, and production-build checks after implementation changes.

Key review points and corresponding decisions:

| Review point                                                       | Decision                                                                                                                                                                                |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Which documents control implementation when requirements conflict? | Follow the documented priority order and treat `02-CONSTRAINTS.md` as authoritative.                                                                                                    |
| How should production users authenticate?                          | Keep 42 OAuth as the production authentication method. Add only environment-gated development test identities for local multi-user testing.                                             |
| How should order membership be represented?                        | Store membership in `order_members` rather than maintaining duplicate participant counters.                                                                                             |
| Which order values should be stored or derived?                    | Compute status, participant count, remaining slots, delivery cost per person, and estimated savings from source data.                                                                   |
| How should creators be identified publicly?                        | Display the 42 intra login and avoid exposing real or full names.                                                                                                                       |
| How should the original monochrome interface be improved?          | Use the supplied food imagery and a consistent 42-inspired turquoise, black, white, and light-grey visual system while preserving the approved product scope.                           |
| How should delivery savings be communicated?                       | Compare Group Order and Individual Order costs, highlight the recommended shared option, state calculation assumptions, and keep the functional join action near the estimated savings. |
| How should alternate identities be tested safely?                  | Enable organiser and participant test sessions only in development and keep them unavailable in production.                                                                             |
| How should secrets and credentials be handled?                     | Commit placeholders only, exclude local environment files, and redact OAuth codes, keys, and unnecessary local paths from AI records.                                                   |
| How should AI-generated changes be accepted?                       | Review the resulting code and run formatting, TypeScript, ESLint, and production-build checks rather than accepting output without verification.                                        |

## Reflection

Learning from my previous attempts, I created clear and concise documentation so that Codex could better understand exactly what I wanted to implement. Since I was already familiar with the process and knew the most efficient approach, I was able to start the project much faster.

However, after reviewing the completed project, I noticed that many of the call-to-action buttons and taglines were too lengthy and could easily lose the user’s attention. Some of the calculations and disclaimers generated by the AI were also unclear or inaccurate, so I had to review and revise them before I could complete the deployment.

I also went through several iterations to improve the webpage’s overall user interface. The initial colour scheme was not as visually appealing as I had hoped, so I refined it to create a cleaner and more consistent design. I also shortened the wording and improved the calls to action so that they were clearer and easier for users to understand.

When I could no longer identify further areas for improvement on my own, I asked my teammates to review the project. Their fresh perspective helped me spot mistakes and areas that I had previously overlooked. This experience reinforced the importance of reviewing AI-generated content carefully, testing from a user’s perspective, and seeking feedback before finalising a project.

## Extra

Redacted AI-session evidence and supporting development records are indexed in [Extra/README.md](Extra/README.md):

- `01-codex-session-log.md` records the Codex prompts, implementation actions, debugging findings, design decisions, and verification work.
- `02-shared-chatgpt-log.md` records the external ChatGPT product and documentation discussion supplied by the project owner.
- `03-decisions-and-verification.md` records important technical decisions, issues, and checks.

The shared ChatGPT page was not directly accessible through the available tools, so the project owner supplied the relevant content during the Codex session. The committed records are structured, redacted logs rather than raw transcripts. They retain prompts, goals, decisions, outcomes, and unresolved issues while excluding secrets, OAuth codes, and unnecessary local details.

All AI chat sessions used for this project are represented by the Codex and ChatGPT session records in the `Extra` folder.
