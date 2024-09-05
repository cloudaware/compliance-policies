---
title: VSCode Setup
---
# VSCode Setup

## `settiogs.json`

You can download `settings.json` [here](../../.vscode/settings.json) and put it into the `.vscode/settions.json` in the repository.

It is pre-configured for ease of working with the repo with the following extensions.


## Extensions

- `.yaml` files support
    - [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) comes pre-configured for correct schema mapping
      1. Go to the "Extensions" panel on the left side
      2. Choose "YAML" and Install
      3. Make sure that schema validation works in the policy yaml files
- `.md` files support
  - [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
  - [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
- BigQuery support and running queries
  - [SQL (BigQuery)](https://marketplace.visualstudio.com/items?itemName=shinichi-takii.sql-bigquery)
  - [BigQuery Runner](https://marketplace.visualstudio.com/items?itemName=minodisk.bigquery-runner)
    1. Go to the "Extensions" panel on the left side
    2. Choose "BigQuery Runner" and Install
    3. Go to "Authentication" -> "Gcloud Credential (Recommended)" and proceed with the instructions\
       If you need to install "Google Cloud CLI", be prepared, it takes a while
    4. Restart VS Code
    5. Make sure that "BigQuery Runner" works in the panel on the left side
- General
  - [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
  - [Path Autocomplete](https://marketplace.visualstudio.com/items?itemName=ionutvmi.path-autocomplete) comes pre-configured for correct path suggestions in the repo
