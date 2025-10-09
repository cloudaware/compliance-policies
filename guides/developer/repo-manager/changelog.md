# Changelog

## 2.3.4

- `repo-manager` now outputs absolute paths (to allow click/ctrl+click) in terminals and IDEs
- `repo-manager policies` subcommand now works from any directory inside the repo and accepts:
  - full canonical paths `/ce/ca/aws/ec2/elastic-ip-unused`
  - canonical paths without leading slash `ce/ca/aws/ec2/elastic-ip-unused`
  - OS-specific paths, like `ce\ca\aws\ec2\elastic-ip-unused` on Windows
  - relative paths `ec2/elastic-ip-unused` (`ce/ca/aws` being current directory)
- `repo-manager policies test` in addition to above now:
  - does not support `/ce/unit-test/*`, instead you can specify folders `/ce/unit-test` to test all policies inside the folder
- Added `description` into front-matter for `repo-manager docs generate --renderer=DOCUSAURUS` 

## 2.3.3

- Added `repo-manager policies evaluate-object` to check the output of a specific policy against a specific object. Uses data directly from CMDB
- Endpoint for `repo-manager policies test` updated with the latest changes
- Added parameter `-t/--threads` to `repo-manager policies test`

## 2.3.2

- Replaced `&nbsp;` with \u3000 for SectionTree and Folder tree for better readability in plain text

## 2.3.1

- Added `repo-manager policies import-stats` to import stats about latest policy runs
- Added StatBar and StatBlock components to display stats in generated documentation

## 2.3.0

- Refactored `repo-manager docs generate` classes
- Improvements to generated documents
- Replaced internal entity graph implementation with a faster one
- `repo-manager docs generate` now supports
  - `--threads=N` to  for faster generation
  - `--format=MD/MDX` to generate `.mdx` or `.md` for supported entities
  - `--renderer=NONE/CLOUDAWRE/DOCUSAURUS` to generate renderer-specific `.md` or `.mdx` files

## 2.2.1

- `repo-manager policies test --format=JUNIT` test time reporting fix

## 2.2.0

- Better generation error handling
- Updated to the latest API version

## 2.1.1

- `repo-manager policies test` now supports `--format=JUNIT` and `--output-dir` to generate JUnit and Maven Surefire compatible test results

## 2.1.0

- `repo-manager docs generate` now generates `*.yaml.md`/`*.json.md` files instead of `*.yaml.gen.md`/`*.json.gen.md`
- `.gitignore` refactored and updated to match
- Obsidian vault config generation removed
- `repo-manager cleanup` added - this command removes generated and imported files from the repo
- `repo-manager docs cleanup` update - this command removes only generated files and keeps imported
- Minor documentation changes

## 2.0.1

- `docs generate` fix for flags on Types

## 2.0.0

- `repo-manager` auto-update feature added.

## 1.5.6

- Dropping requirement to use `javaw.exe` for `ui` subcommand on Windows 

## 1.5.5

- Fixed missing links for logic files

## 1.5.4

- Improved logic for `repo-manager docs generate` for infos with missing primary descriptors 

## 1.5.3

- Type icons now reflect the presence of metadata and references in the repo.

## 1.5.2

- Fixed `repo-manager soql convert` description.

## 1.5.1

- Added `soql` subcommand with `soql convert` to convert SOQL to BigQuery.
- Added gemini-cli configuration and context file `agents.md`.
- The `types import` command now creates `/types/types.json` which contains all types available in the org.

## 1.4.13

- Handled new `UNIT_TEST` parameters correctly.
- Refactored unit-tests.

## 1.4.12

- Updated to the latest version of metadata for the `types import` command.

## 1.4.11

- Handles type-independent extracts correctly.

## 1.4.10

- Fixed various bugs.
- Added Search (`Ctrl+F`) functionality.

## 1.4.9

- Improved names for entities in "Navigate to related".
- Improved test result output.
- Added "Copy path to clipboard" action.

## 1.4.8

- Fixed `Test All`, `Test Unit-Tests`, and `Test` commands.

## 1.4.7

- Fixed the "Navigate To" action.

## 1.4.6

- Fixed `--watch` for paths that logically exist in the repository but not on the file system.

## 1.4.5

- Fixed links to internal frameworks.
- Fixed bugs in `repo-manager ui` and added `F5` hotkey to reload the directory.

## 1.4.4

- The `--watch` command is now functional.
- Refactored tree/graph components.
- The UI now watches the repository for changes.

## 1.4.2

- The `repo-manager ui` no longer needs to parse the entire repository.
- General refactoring.

## 1.4.1

- Added the ability to close windows in `repo-manager ui` with the `Escape` key.

## 1.4.0

- Added the `repo-manager ui` command.
- Implemented proper logging.

## 1.3.4

- Added the `repo-manager policies test unit-tests` command.

## 1.3.3

- The `repo-manager ai context generate` command now creates a `prod-policies.txt` file with all production policies.

## 1.3.2

- Added the `repo-manager ai context generate` command.

## 1.3.1

- Updated to reflect new naming conventions in the Compliance Engine.
- Updated documentation.

## 1.2.11

- Improved slug generation for main directories.
- Added a command for manpage generation.

## 1.2.10

- Improved representation of extracts in type documentation.

## 1.2.9

- Improved Markdown generation for included files.

## 1.2.8

- Introduced a new Markdown generation library.
- Added `slug` for each page.

## 1.2.7

- Updated to be compatible with unit-test changes.

## 1.2.6

- Made updates related to unit-tests.

## 1.2.5

- `SectionInfo` similar sections are now handled from `PolicyInfo`.

## 1.2.4

- The repository can now show test results for policies.
- Implemented the `repo-manager policies test all` command.

## 1.2.3

- Updated documentation generation.
- Improved the `policy generate` command.
- Added MD5 hashes for files.

## 1.2.2

- Improved type import functionality.

## 1.2.1

- Moved extracts from `/extracts` to `/types`.

## 1.1.12

- Changed the command structure.

## 1.1.11

- Renamed the `obsidian` command to `docs`.

## 1.1.10

- Made the repository Docusaurus-friendly.

## 1.1.9

- Improved front-matter generation.

## 1.1.8

- Added more fixes for repositories without an `internal` directory.

## 1.1.6

- Improved handling for partial repositories.

## 1.1.5

- Made the tool tolerant to a missing `internal` directory.

## 1.1.2

- Improved type import.
- Added an `export` command.

## 1.1.1

- Added type import functionality.

## 1.1.0

- Major refactoring.
- Added the `repo-manager obsidian generate --watch` command.

## 1.0.14

- Renamed `DESCRIPTION.md`, `REMEDIATION.md`, `INTERNAL.md`, and `TODO.md` to lowercase.

## 1.0.13

- Added the `repo-manager policies test {id}` command.

## 1.0.11

- Added validation for internal `similarPolicies`.

## 1.0.10

- Minor updates to generation.
- Implemented Vault generation on top of the repository, allowing navigation in IntelliJ IDEA and VS Code.

## 1.0.8

- Implemented new import for internal policies.
- Improved Obsidian generation.

## 1.0.7

- Simplified paths for policies.
- Improved sorting.

## 1.0.6

- Added import for internal policies.

## 1.0.5

- Made the `policies generate` command more flexible.
- Migrated policy naming to `names.full` and `names.contextual`.

## 1.0.4

- Added `names` to all policies.
- Added flags for `names`.

## 1.0.3

- Cleaned up Vault generation.
- Added `folder.yaml` to many folders.

## 1.0.2

- Fixed various bugs.

## 1.0.1

- Fixed a bug.

## 1.0.0

- Initial release.
