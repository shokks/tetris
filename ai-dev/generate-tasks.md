# Rule: Generating a Task List from User Requirements

## Goal

To guide an AI assistant in creating a detailed, step-by-step task list in Markdown format based on user requirements, feature requests, or existing documentation. The task list should guide a developer through implementation.

## Output

- **Format:** Markdown (`.md`)
- **Location:** `/docs/tasks/`
- **Filename:** `tasks-[feature-name].md` (e.g., `tasks-user-profile-editing.md`)

## Process

1.  **Receive Requirements:** The user provides a feature request, task description, or points to existing documentation
2.  **Analyze Requirements:** The AI analyzes the functional requirements, user needs, and implementation scope from the provided information
3.  **Phase 1: Generate Parent Tasks:** Based on the requirements analysis, create the file and generate the main, high-level tasks required to implement the feature. **IMPORTANT: Always include task 0.0 "Create feature branch" as the first task, unless the user specifically requests not to create a branch.** Use your judgement on how many additional high-level tasks to use. It's likely to be about 5. Present these tasks to the user in the specified format (without sub-tasks yet). Inform the user: "I have generated the high-level tasks based on your requirements. Ready to generate the sub-tasks? Respond with 'Go' to proceed."
4.  **Wait for Confirmation:** Pause and wait for the user to respond with "Go".
5.  **Phase 2: Generate Sub-Tasks:** Once the user confirms, break down each parent task into smaller, actionable sub-tasks necessary to complete the parent task. Ensure sub-tasks logically follow from the parent task and cover the implementation details implied by the requirements.
6.  **Identify Relevant Files:** Based on the tasks and requirements, identify potential files that will need to be created or modified. List these under the `Relevant Files` section, including corresponding test files if applicable.
7.  **Generate Final Output:** Combine the parent tasks, sub-tasks, relevant files, and notes into the final Markdown structure.
8.  **Save Task List:** Save the generated document in the `/docs/tasks/` directory with the filename `tasks-[feature-name].md`, where `[feature-name]` describes the main feature or task being implemented (e.g., if the request was about user profile editing, the output is `tasks-user-profile-editing.md`).

## Output Format

The generated task list _must_ follow this structure:

```markdown
## Relevant Files

- `path/to/potential/file1.ts` - Brief description of why this file is relevant (e.g., Contains the main component for this feature).
- `path/to/file1.test.ts` - Unit tests for `file1.ts`.
- `path/to/another/file.tsx` - Brief description (e.g., API route handler for data submission).
- `path/to/another/file.test.tsx` - Unit tests for `another/file.tsx`.
- `lib/utils/helpers.ts` - Brief description (e.g., Utility functions needed for calculations).
- `lib/utils/helpers.test.ts` - Unit tests for `helpers.ts`.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

### Task Completion Requirements

**Before marking any task as complete, you MUST:**

1. **Verify the implementation works** - Test the feature manually in the browser/app
2. **Write tests if applicable** - Unit tests for logic, integration tests for flows
3. **Run existing tests** - Ensure you haven't broken anything (`npm test` or equivalent)
4. **Fix any lint/type errors** - Run linters and type checkers before moving on

**Do NOT move to the next task until:**
- The current task is verified working
- All related tests pass
- The task checkbox is marked complete in this file

## Development Workflow Guidance

### Branch Strategy

Every feature or set of related tasks should be developed on a **dedicated feature branch**, never directly on `main`.

**Branch Naming Convention:**
- Format: `feature/[task-number]-[short-description]`
- Examples: `feature/1-0-user-auth`, `feature/2-1-market-list-ui`, `feature/3-0-amm-logic`
- Create with: `git checkout -b feature/[name]`

**Why Branches Matter:**
- Isolates work in progress from production code
- Enables testing and validation before merging
- Allows user review and approval before integration
- Makes rollback easy if needed

### Frontend-First Development Approach

For features with both UI and backend components, implement in this order:

**Phase 1: Frontend First** (Build UI with mock data)
- Create React components and pages
- Use hardcoded/mock data initially (no backend dependency)
- Test user flows and interactions in browser immediately
- Validate UX, responsive design, and visual polish
- **Benefit:** See and test the actual interface instantly

**Phase 2: Backend Second** (Implement API/database logic)
- Build database schema, API endpoints, or mutations
- Implement business logic to match frontend expectations
- Test API/queries independently (in API dashboard, console, etc.)
- Verify data validation and error handling
- **Benefit:** Backend implementation matches proven frontend requirements

**Phase 3: Wire Together** (Connect UI to real backend)
- Replace mock data with real API calls/database queries
- Test end-to-end flow with real data
- Verify loading and error states work correctly
- Handle edge cases and race conditions
- **Benefit:** Integration issues caught and fixed before production

### Testing & Validation Requirements

**Manual Testing (Required):**
- Test every feature in the actual browser (not just unit tests)
- Validate on desktop (1920px) and mobile (375px)
- For real-time features: Test across multiple browser tabs simultaneously
- Check all user flows: normal path, edge cases, error states

**Automated Testing (Required before merge):**
- Write unit tests for any new functions, utilities, or business logic
- Write integration tests for API endpoints or database operations
- Run the full test suite and ensure all tests pass
- Fix any failing tests before proceeding

**Testing Philosophy:**
- **Not strictly TDD** - Build functionality first, test in UI, add unit tests for critical logic
- **Practical validation** - If it works in the browser, it works for the user
- **User acceptance** - Feature must be demoed and approved by user before merge
- **No merge without green tests** - All tests must pass before merging to main

### Merge & Deployment Workflow

**Step-by-step process per feature branch:**

1. ✅ **Complete all tasks on branch** - All code written and self-tested
2. ✅ **Write and run tests** - Unit tests written, all tests passing (`npm test`)
3. ✅ **Test thoroughly** - Manual testing in browser, responsive testing, edge cases
4. ✅ **Run linters/type checks** - Ensure code quality (`npm run lint`, `npm run typecheck`)
5. ✅ **Deploy preview** - Push to remote, trigger preview deployment (Vercel preview or staging)
6. ✅ **Request user review** - Share preview URL with user, demo the feature
7. ✅ **User approves** - User confirms feature meets requirements and looks good
8. ✅ **Final test verification** - Run full test suite one more time before merge
9. ✅ **Merge to main** - Create pull request, merge feature branch to main
10. ✅ **Delete feature branch** - Clean up with `git branch -d feature/[name]`
11. ✅ **Deploy to production** - Verify feature works in live environment

**If user requests changes:**
- Make updates on the same feature branch
- Re-test in browser
- Re-deploy preview
- Request review again (repeat steps 4-5)

### Task Breakdown Structure

When breaking down tasks, follow this pattern:

- **Task 0.0: Create feature branch** ← Always first
- **Task 1.0+: Parent tasks** ← High-level chunks (one per major component or feature area)
  - **Sub-tasks 1.1, 1.2, etc.:** Specific actions (frontend, backend, testing, deployment)

**Example for a product list feature:**
```
0.0 Create feature branch
  0.1 Create and checkout branch: git checkout -b feature/1-product-list

1.0 Build Product List UI
  1.1 Create components/product-card.tsx with mock product data
  1.2 Create app/products/page.tsx with hardcoded product array
  1.3 Write unit tests for product-card component
  1.4 Test responsive layout on desktop and mobile
  1.5 Run all tests and verify passing
  1.6 Get user approval on preview

2.0 Implement Product API
  2.1 Define products table/model in database schema
  2.2 Create API endpoint or query for listing products
  2.3 Write tests for products API
  2.4 Test API endpoint independently
  2.5 Run all tests and verify passing
  2.6 Get user approval

3.0 Wire Frontend to Backend
  3.1 Replace mock data with real API calls
  3.2 Test data flow end-to-end
  3.3 Add loading and error states
  3.4 Write integration tests for the full flow
  3.5 Run all tests and verify passing
  3.6 Get user approval

4.0 Final Testing and Merge
  4.1 Run full test suite (npm test)
  4.2 Run linters and type checks
  4.3 Create pull request and merge to main
  4.4 Verify feature in production
  4.5 Delete feature branch
```

---

## Tasks

- [ ] 0.0 Create feature branch
  - [ ] 0.1 Create and checkout a new branch for this feature (e.g., `git checkout -b feature/[feature-name]`)
- [ ] 1.0 Parent Task Title
  - [ ] 1.1 [Sub-task description 1.1]
  - [ ] 1.2 [Sub-task description 1.2]
  - [ ] 1.3 Write tests for this task
  - [ ] 1.4 Run tests and verify passing
- [ ] 2.0 Parent Task Title
  - [ ] 2.1 [Sub-task description 2.1]
  - [ ] 2.2 Write tests for this task
  - [ ] 2.3 Run tests and verify passing
- [ ] 3.0 Parent Task Title (may not require sub-tasks if purely structural or configuration)
- [ ] 4.0 Final Testing and Merge
  - [ ] 4.1 Run full test suite
  - [ ] 4.2 Run linters and type checks
  - [ ] 4.3 Create pull request and merge to main
  - [ ] 4.4 Verify feature in production
  - [ ] 4.5 Delete feature branch
```

## Interaction Model

The process explicitly requires a pause after generating parent tasks to get user confirmation ("Go") before proceeding to generate the detailed sub-tasks. This ensures the high-level plan aligns with user expectations before diving into details.

## Target Audience

Assume the primary reader of the task list is a **junior developer** who will implement the feature.
