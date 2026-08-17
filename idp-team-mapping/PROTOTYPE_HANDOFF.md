# Konnect Dev Portal Prototype — Working State

## Purpose

This is a desktop-only React/Vite prototype of Konnect Developer Portal flows. The first completed flow is **Identity provider team mapping**; the app now also contains a **Developers / Teams** area and individual team detail view.

The prototype is visual and interaction-focused. Most actions update local React state and display confirmation feedback rather than persisting to an API.

## Repository and startup

- Repository root: `kong-dev-portal`
- App: `kong-dev-portal/idp-team-mapping`
- Primary implementation files:
  - `src/main.jsx` — React UI and local interaction state
  - `src/styles.css` — visual system and component states
  - `public/favicon.svg` — Kong favicon
- Start locally: `npm install` then `npm run dev`
- Validate: `npm run build`
- GitHub Pages: `.github/workflows/deploy-pages.yml` builds this nested app and deploys it on pushes to `main`. Vite uses `/kong-dev-portal/` as its production base path.

The application is self-contained. It does not depend on the starter-kit parent directory after cloning.

## Design rules to preserve

- This is a **compact desktop app**. Do not introduce large fonts, controls, paddings, or row heights unless the user explicitly asks.
- Base interactive controls use `14px` sizing and `font-weight: 500`.
- Headings use `font-weight: 500`; do not introduce `700` headings.
- Tile labels/titles are the exception and intentionally use a stronger `600` weight.
- Table headers use `font-weight: 400`.
- Controls use compact spacing tokens (`--space-4`, `--space-6`, `--space-8`, etc.) declared in `styles.css`.
- Side navigation hover and active containers use `8px` radius.
- Inputs and multiselect controls darken only their border on hover.
- Dropdowns have `4px` vertical container padding and must overlay surrounding content rather than being clipped.
- Dropdown reveal uses a short subtle bounce animation (`dropdown-reveal`); slideouts use a smooth, quick slide in and a faster slide out; modals use a subtle scale reveal plus overlay fade.

## Shared shell behavior

- Layout consists of a fixed top bar, fixed left sidebar, and main content.
- Below `700px`, `.desktop-layout-overlay` covers the app and explains that this desktop layout is not intended for mobile.
- The sidebar’s **Connectivity** item toggles its child links (API Gateway through Service Mesh).
- Sidebar Dev Portal > **Settings** opens the IDP mapping settings page.
- Sidebar Dev Portal > **Developers** opens the Developers page and defaults to the Teams tab.
- Sidebar footer menus match regular navigation item sizing and have down chevrons by default.
- Breadcrumb links underline on hover.

## Identity provider team mapping flow

### Initial state

- The Settings page includes a Konnect mapping tile and an Identity provider mapping tile.
- The provider choice control offers OIDC and SAML.
- Choosing a provider opens a configuration slideout only. It must not replace the mapping content area immediately.
- The provider control is a secondary-style control: hover only darkens its existing outline/text; it must never turn into a filled primary button.

### OIDC slideout

- Selecting OIDC opens the OIDC/OpenID Connect configuration slideout.
- Slideout width is approximately `40%` of the viewport.
- The slideout has required issuer URI, client ID, client secret, and organization login path fields, concise expected-format placeholders, and help text for all non-advanced fields.
- Advanced settings holds scopes and claim mappings.
- Save is disabled until all required fields contain values.
- An **Autofill** floating button appears while the slideout is open. It sits 24px to the left of the slideout, near its top, and fills valid test data.
- Saving config sets `provider` to `OIDC`, disables team mapping by default, closes the slideout, and shows the `OIDC configured` toast.

### Team mapping table

- Once OIDC is configured, the mapping table remains visible whether the mapping toggle is on or off.
- Mapping stays disabled after provider configuration and is not automatically enabled when a first team is mapped.
- If the toggle is clicked while no team is mapped, show one dismissible inline error alert above the table. Repeated clicks must not stack alerts; a dismissed alert can be shown again on a later invalid click.
- The table filters by team name.
- Unmapped rows show a left-aligned tertiary `Map groups` control. Its text aligns with the identity-provider-groups column header, including hover state.
- Mapped rows show group chips and a far-right more control. More menu includes Edit mapping and Clear mapping.
- The final table row has no bottom border.

### Map groups modal and multiselect

- Clicking Map groups or Edit mapping opens the modal for that team.
- The multiselect supports custom values:
  - The user types into the control itself, after selected chips.
  - A missing value produces an explicit “Add new value” option.
  - Selecting/adding a value appends a chip without clearing existing chips.
  - Multiple chips are supported with `4px` spacing.
  - Chips can only be removed through their actual X icon.
  - Clicking the field opens the menu without removing values.
  - Clicking outside dismisses the menu.
- Saving creates/updates `mappedGroups[team.name]`, closes the modal, and shows a mapping confirmation toast.

### Clear mapping

- Clear mapping opens a confirmation modal.
- If the team is the final mapped team, show an inline warning explaining that mapping will be turned off because at least one team must be mapped to keep it enabled.
- Confirming removes the team’s groups. If it was the final mapping, the mapping toggle becomes disabled/off.
- A confirmation toast is displayed after clearing.

### Toasts

- Toasts are lower-right and use Kong-style icons.
- They reveal with the same quick bounce treatment as dropdowns.
- Important feedback currently includes OIDC configured, mapping saved, mapping cleared, and toggle changes.
- Toast state lives in `App` as `toast`; `showToast()` resets its five-second timer.

## Developers and Teams views

### Developers page

- Sidebar **Developers** opens the `DevelopersContent` area.
- It contains two tabs: Developers and Teams.
- The Developers tab’s alert badge is inside the same `<span>` / hover capsule as the tab text. Do not move it outside the label; it must remain on the same line and not increase tab height.
- The Developers view provides a searchable developer list with Name, Email, and Team columns.

### Teams page

- The Teams tab has a search control, identity-provider-mapped filter, new-team button, table, and pagination.
- Columns: Team name, Description, Developers, Identity provider mapped, actions.
- The Teams page and mapping table draw from the shared `portalTeams` list in `src/main.jsx`; add or remove teams there so both views stay in sync.
- Mapping status reads from `mappedGroups`, so teams show a check when mapped and an em dash when not mapped.
- Every team row is keyboard-accessible and interactive:
  - Hover uses only a light gray background.
  - Click or Enter/Space opens that team’s individual detail page.
  - The row’s more button stops propagation and does not navigate.

### Individual team page

- Selecting a team updates `selectedTeam` and renders `TeamDetailContent`.
- Breadcrumb becomes: Dev Portal / KongAir / Developers / Teams /.
- The page has team title, an Actions menu, About this team card, created timestamp, team ID with copy action, tabs, developer table, and pagination.
- Team detail tabs: Developers, APIs, Applications, Settings. Only Developers has active table content now; other tabs deliberately show a lightweight placeholder panel for future prototypes.
- The Actions menu has Edit team and Delete team prototype actions and uses the standard dropdown reveal.

### Developer table consistency

All Developers/Teams-related tables intentionally share the same rhythm:

- No top border above the header row.
- Header row: `48px` minimum height.
- Data row: `56px` minimum height.
- Horizontal content padding: `12px`.
- Font size: `14px`, line-height `20px`.
- Header color: `#667288`, weight `400`.
- Data color: `#172248`.
- Standard `#d9dfe9` dividers between header/data and between rows.
- Never render a bottom divider on the final data row.

The shared normalization is at the end of `styles.css` under `Developers uses one table rhythm in every view` and should be updated before adding one-off table overrides.

## Current local state model

Important `App` state values in `src/main.jsx`:

- `activePortalPage`: `settings` or `developers`.
- `developerView`: `developers` or `teams`.
- `selectedTeam`: selected team object or `null`.
- `teamDetailTab`: active individual team section.
- `provider`: identity provider, currently configured by OIDC flow.
- `idpMappingEnabled`: identity mapping toggle state.
- `mappedGroups`: object keyed by team name, whose values are arrays of mapped group strings.
- `mapGroupsTeam`, `selectedGroups`, `availableGroups`, `groupQuery`, `groupPickerOpen`: modal/multiselect state.
- `clearMappingTeam`: current clear-confirmation target.
- `oidcSlideoutOpen`, `oidcSlideoutClosing`, `oidcForm`, `advancedOpen`: configuration slideout state.
- `toast`: lower-right feedback state.

## Icons

`Icon` in `src/main.jsx` contains inline paths sourced from the official Kong/icons repository’s `svg/solid` assets. Continue using this map for new icons rather than substituting unrelated glyphs or emoji. The map currently includes the app shell, status, close/remove, search, filter, more, copy, and mapping-related icons.

## Verification and git notes

- Run `npm run build` after implementation changes. Builds currently succeed, though Vite prints a non-blocking recommendation to update Node from `22.11.0` to `22.12+`.
- Do not commit or push changes unless the user explicitly asks.
- The app repository has existing, ongoing working-tree changes by design; preserve unrelated work.
