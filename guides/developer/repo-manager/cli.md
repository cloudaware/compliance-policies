---
title: CLI Reference
---
# `repo-manager` Documentation

This document provides documentation for the `repo-manager` command-line tool. `repo-manager` is a set of tools designed to manage a Compliance Engine policy repository.

## `repo-manager`

Set of tools to manage compliance-platform-policies repository.

```bash
repo-manager [OPTIONS] [COMMAND]
```

### Options

- `-b`, `--backend`=`BACKEND`
  - API backend. Valid values: `PRODUCTION`, `LOCAL`.
  - Default: `PRODUCTION`
- `-c`, `--config`=`PATH`
  - Path to the configuration folder.
  - Default: `.ca`
- `-h`, `--help`
  - Show this help message and exit.
- `-r`, `--repository`=`PATH`
  - Path to the root of repository.
  - Default: `''`
- `-V`, `--version`
  - Print version information and exit.

### Subcommands

- [auth](#repo-manager-auth) - Authorization commands.
- [policies](#repo-manager-policies) - Tools for working with compliance policies.
- [docs](#repo-manager-docs) - Tools to manage auto-generated documentation from repository.
- [schema](#repo-manager-schema) - Tools to manage schema files in the repository.
- [sections](#repo-manager-sections) - Tools for working with frameworks and sections.
- [types](#repo-manager-types) - Tools for working with types form the Salesforce Org.
- [ai](#repo-manager-ai) - Tools for working with AI and LLMs.
- [ui](#repo-manager-ui) - Run UI for repo-manager.
- [soql](#repo-manager-soql) - Tools for working with SOQL queries.
- [gen-manpage](#repo-manager-gen-manpage) - Generates man pages for all commands in the specified directory.

## `repo-manager auth`

Authorization commands.

```bash
repo-manager auth [OPTIONS] [COMMAND]
```

### Options

- `-h`, `--help`
  - Show this help message and exit.
- `-V`, `--version`
  - Print version information and exit.

### Subcommands

- [activate](#repo-manager-auth-activate) - Set the active profile.
- [add](#repo-manager-auth-add) - Add auth profile.
- [list](#repo-manager-auth-list) - List auth profiles.
- [refresh-session](#repo-manager-auth-refresh-session) - Refresh session for active profile.
- [remove](#repo-manager-auth-remove) - Remove auth profile.

## `repo-manager auth activate`

Set the active profile for `repo-manager` to use for subsequent commands.

```bash
repo-manager auth activate [OPTIONS]
```

### Options

- `-h`, `--help`
  - Show this help message and exit.
- `-n`, `--name`=`NAME`
  - Name of the profile to activate.
- `-V`, `--version`
  - Print version information and exit.

## `repo-manager auth add`

Add auth profile.

Add a new authorization profile for `repo-manager` to connect to Salesforce.

```bash
repo-manager auth add [OPTIONS]
```

### Options

- `-a`, `--[no-]active`
  - Sets this profile as active upon creation.
- `-h`, `--help`
  - Show this help message and exit.
- `-n`, `--name`=`NAME`
  - Name of the profile to be added.
- `-s`, `--[no-]sandbox`
  - Set this profile for a Salesforce sandbox organization.
- `-t`, `--token`=`TOKEN`
  - OAuth token obtained from Cloudaware Admin Tab.
- `-V`, `--version`
  - Print version information and exit.

## `repo-manager auth list`

List all configured authorization profiles for `repo-manager`.

```bash
repo-manager auth list [OPTIONS]
```

### Options

- `-h`, `--help`
  - Show this help message and exit.
- `-V`, `--version`
  - Print version information and exit.

## `repo-manager auth refresh-session`

Refreshes the current session for the active authorization profile, ensuring continued access to Salesforce.

```bash
repo-manager auth refresh-session [OPTIONS]
```

### Options

- `-h`, `--help`
  - Show this help message and exit.
- `-V`, `--version`
  - Print version information and exit.

## `repo-manager auth remove`

Remove a configured authorization profile from `repo-manager`.

```bash
repo-manager auth remove [OPTIONS]
```

### Options

- `-h`, `--help`
  - Show this help message and exit.
- `-n`, `--name`=`NAME`
  - Name of the profile to remove.
- `-V`, `--version`
  - Print version information and exit.

## `repo-manager docs`

Tools to manage auto-generated documentation from the repository.

```bash
repo-manager docs [OPTIONS] [COMMAND]
```

### Options

- `-h`, `--help`
  - Show this help message and exit.
- `-V`, `--version`
  - Print version information and exit.

### Subcommands

- [cleanup](#repo-manager-docs-cleanup) - Cleans up documentation files from repository.
- [generate](#repo-manager-docs-generate) - Generates documentation for the repository.

## `repo-manager docs cleanup`

Cleans up generated documentation files from the repository, removing auto-generated documentation clutter.

```bash
repo-manager docs cleanup [OPTIONS]
```

### Options

- `-h`, `--help`
  - Show this help message and exit.
- `-V`, `--version`
  - Print version information and exit.

## `repo-manager docs generate`

Generates documentation for the repository based on the current state of the code and configurations.

```bash
repo-manager docs generate [OPTIONS]
```

### Options

- `-h`, `--help`
  - Show this help message and exit.
- `-V`, `--version`
  - Print version information and exit.
- `-w`, `--watch`
  - Watch the repository for modifications and automatically update the generated documentation files when changes are detected.

## `repo-manager policies`

Tools for managing and working with compliance policies within the repository.

```bash
repo-manager policies [OPTIONS] [COMMAND]
```

### Options

- `-h`, `--help`
  - Show this help message and exit.
- `-V`, `--version`
  - Print version information and exit.

### Subcommands

- [generate](#repo-manager-policies-generate) - Generate BigQuery script for a policy.
- [test](#repo-manager-policies-test) - Run tests for a policy.

## `repo-manager policies generate`

Generates a BigQuery script for a specified compliance policy, allowing for different script types based on the provided kind.

```bash
repo-manager policies generate [OPTIONS] <kind> <id>
```

### Options

- `-h`, `--help`
  - Show this help message and exit.
- `-V`, `--version`
  - Print version information and exit.

### Arguments

- `kind`
  - Kind of script to generate.
  - Valid values: `FULL`, `DEBUG`, `CAPTURE_TEST_DATA`, `TESTS`.
- `id`
  - Policy ID or Logic ID for which to generate the script.

## `repo-manager policies test`

Runs tests for a specified compliance policy to ensure its correctness and validity.

```bash
repo-manager policies test [OPTIONS] <id>
```

### Options

- `-h`, `--help`
  - Show this help message and exit.
- `-V`, `--version`
  - Print version information and exit.

### Arguments

- `id`
  - Policy ID, Logic ID, `'all'` to run tests for all policies or `'unit-tests'` to run tests for all unit-tests.

## `repo-manager schema`

Tools for managing and updating schema files within the repository.

```bash
repo-manager schema [OPTIONS] [COMMAND]
```

### Options

- `-h`, `--help`
  - Show this help message and exit.
- `-V`, `--version`
  - Print version information and exit.

### Subcommands

- [update](#repo-manager-schema-update) - Updates schema files in the repository.

## `repo-manager schema update`

Updates schema files within the repository to reflect the latest data structures and definitions.

```bash
repo-manager schema update [OPTIONS]
```

### Options

- `-h`, `--help`
  - Show this help message and exit.
- `-V`, `--version`
  - Print version information and exit.

## `repo-manager ai`

Tools for working with AI and LLMs.

```bash
repo-manager ai [OPTIONS] [COMMAND]
```

### Options

- `-h`, `--help`
  - Show this help message and exit.
- `-V`, `--version`
  - Print version information and exit.

### Subcommands

- [context](#repo-manager-ai-context) - Tools for to manage context information for LLMs.

## `repo-manager ai context`

Tools for to manage context information for LLMs.

```bash
repo-manager ai context [OPTIONS] [COMMAND]
```

### Options

- `-h`, `--help`
  - Show this help message and exit.
- `-V`, `--version`
  - Print version information and exit.

### Subcommands

- [generate](#repo-manager-ai-context-generate) - Generates context information for LLMs.

## `repo-manager ai context generate`

Generates context information for LLMs.

```bash
repo-manager ai context generate [OPTIONS]
```

### Options

- `-h`, `--help`
  - Show this help message and exit.
- `-o`, `--output-directory`=`PATH`
  - Path to the output file.
  - Default: `'export/llm-context'`
- `-V`, `--version`
  - Print version information and exit.

## `repo-manager ui`

Run UI for repo-manager.

```bash
repo-manager ui [OPTIONS]
```

### Options

- `-h`, `--help`
  - Show this help message and exit.
- `-V`, `--version`
  - Print version information and exit.

## `repo-manager soql`

Tools for working with SOQL queries.

```bash
repo-manager soql [OPTIONS] [COMMAND]
```

### Options

- `-h`, `--help`
  - Show this help message and exit.
- `-V`, `--version`
  - Print version information and exit.

### Subcommands

- [convert](#repo-manager-soql-convert) - Converts provided SOQL query into BigQuery query.

## `repo-manager soql convert`

Converts provided SOQL query into BigQuery query.

```bash
repo-manager soql convert [OPTIONS] queryText
```

### Options

- `-h`, `--help`
  - Show this help message and exit.
- `-i`, `--input-file`=`<arg0>`
  - Input file with query to convert
- `-o`, `--output-file`=`<arg1>`
  - Output file where to store converted query
- `-V`, `--version`
  - Print version information and exit.

### Arguments

- `queryText`
  - SOQL query text to convert

## `repo-manager sections`

Tools for managing frameworks and sections, likely related to compliance frameworks and their sectional breakdown within the repository.

```bash
repo-manager sections [OPTIONS] [COMMAND]
```

### Options

- `-h`, `--help`
  - Show this help message and exit.
- `-V`, `--version`
  - Print version information and exit.

### Subcommands

- [export](#repo-manager-sections-export) - Exports the framework sections to a file.

## `repo-manager sections export`

Exports the defined framework sections to a file, allowing for data extraction in various formats.

```bash
repo-manager sections export [OPTIONS]
```

### Options

- `-f`, `--format`=`FORMAT`
  - Format to use for export.
  - Valid values: `DEFAULT_CSV`, `INFORMIX_UNLOAD_CSV`, `INFORMIX_UNLOAD`, `EXCEL`, `MONGODB_CSV`, `MONGODB_TSV`, `MYSQL`, `ORACLE`, `POSTGRESQL_CSV`, `POSTGRESQL_TEXT`, `RFC4180`, `TDF`, `BIGQUERY`, `JSONL`.
  - Default: `DEFAULT`
- `-h`, `--help`
  - Show this help message and exit.
- `-o`, `--output-directory`=`PATH`
  - Path to the output file.
  - Default: `'export'`
- `-V`, `--version`
  - Print version information and exit.

## `repo-manager types`

Tools for managing Salesforce SObject types data within the repository, likely used for schema management or policy definition.

```bash
repo-manager types [OPTIONS] [COMMAND]
```

### Options

- `-h`, `--help`
  - Show this help message and exit.
- `-V`, `--version`
  - Print version information and exit.

### Subcommands

- [delete](#repo-manager-types-delete) - Remove imported Salesforce SObject types data.
- [import](#repo-manager-types-import) - Import Salesforce SObject types data.

## `repo-manager types delete`

Removes previously imported Salesforce SObject types data from `repo-manager`, allowing for a clean slate or data refresh.

```bash
repo-manager types delete [OPTIONS]
```

### Options

- `-h`, `--help`
  - Show this help message and exit.
- `-V`, `--version`
  - Print version information and exit.

## `repo-manager types import`

Imports Salesforce SObject types data, enriching `repo-manager` with Salesforce schema information for policy and logic definitions.

```bash
repo-manager types import [OPTIONS]
```

### Options

- `--exclude-custom-fields`
  - Excludes custom fields from imported types, focusing on standard Salesforce objects.
- `-h`, `--help`
  - Show this help message and exit.
- `-p`, `--preset`=`PRESET`
  - One or more presets to import.
  - Valid values: `REFERENCED`, `CLOUDAWARE`, `STANDARD`, `EXTRA`.
- `-t`, `--type`=`TYPE`
  - Salesforce type API name to import. Can be specified multiple times.
- `-V`, `--version`
  - Print version information and exit.

## `repo-manager gen-manpage`

Generates man pages in AsciiDoc format for all `repo-manager` commands found within a specified directory.

```bash
repo-manager gen-manpage [OPTIONS] [@<filename>...]
```

### Options

- `-d`, `--outdir`=`<outdir>`
  - Output directory to write the generated AsciiDoc files to.
  - If not specified, files are written to the current directory.
- `-t`, `--template-dir`=`<template-dir>`
  - Optional directory to write customizable man page template files.
    If specified, an additional "template" file is created here for each generated manpage AsciiDoc file.
    Each template file contains `include` directives that import content from the corresponding generated manpage AsciiDoc file in the `--outdir` directory. Text can be added after each include to customize the resulting man page. The resulting man page will be a mixture of generated and manually edited text.
    These customizable templates are intended to be generated once, and afterward be manually updated and maintained.
- `-v`, `--verbose`
  - Specify multiple `-v` options to increase verbosity (e.g., `-v -v -v` or `-vvv`).
- `-f`, `--[no-]force`
  - Overwrite existing man page templates.
  - The default is `--no-force`, meaning processing is aborted and the process exits with status code 4 if a man page template file already exists.
- `-h`, `--help`
  - Show this help message and exit.
- `-V`, `--version`
  - Print version information and exit.

### Arguments

- `@<filename>...`
  - One or more argument files containing options.

### Converting to Man Page Format

Use the `asciidoctor` tool to convert the generated AsciiDoc files to man pages in roff format:

```bash
asciidoctor --backend=manpage --source-dir=SOURCE_DIR --destination-dir=DESTINATION *.adoc
```

Point the `SOURCE_DIR` to either the `--outdir` directory or the `--template-dir` directory. Use some other directory as the `DESTINATION`.

See [https://asciidoctor.org/docs/user-manual/\#man-pages](https://asciidoctor.org/docs/user-manual/#man-pages)
See [http://man7.org/linux/man-pages/man7/roff.7.html](http://man7.org/linux/man-pages/man7/roff.7.html)
