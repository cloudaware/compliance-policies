---
title: Environment Setup
---
# Environment Setup

This guide details how to set up your development environment for working with the Cloudaware Compliance Engine repository. We provide several equally viable options to suit your preferences.

## Recommended IDE: Visual Studio Code

For the best experience, we recommend using Visual Studio Code. This repository is pre-configured to support VS Code with a rich set of extensions and a ready-to-use development container.

There are two equally preferred ways to use VS Code:

- **Local VS Code:** Use your local installation of VS Code and install the recommended extensions.
- **Dev Container:** Use the provided dev container, which comes with all the necessary tools and extensions pre-installed.

In both cases, we strongly recommend using the suggested extensions for the best experience.

### Local VS Code Setup

If you prefer to use your local installation of VS Code, you will need to install the following:

- **Git:** For version control.
- **Java:** Required to run the `repo-manager.jar`.
- **[`repo-manager`](../repo-manager/index.md):** To manage the repository.
- **Google Cloud CLI:** For interacting with Google Cloud services, particularly BigQuery.
- **Recommended VS Code Extensions:** See the list below.

### Dev Container Setup

The dev container provides a consistent and reproducible environment with all the necessary tools and extensions pre-installed. To use it, you will need to have [Docker](https://www.docker.com/products/docker-desktop) and the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) for VS Code installed.

Once you have the prerequisites, open the repository in VS Code, and you will be prompted to "Reopen in Container". This will build the container image and start the dev container.

For more details on running devcontainers, see [Running Devcontainer](running-devcontainer.md).

The dev container includes:

- The latest LTS version of Java.
- Git and the Google Cloud CLI.
- The Gemini CLI.
- A pre-configured `repo-manager` alias.
- The recommended VS Code extensions.

### Recommended VS Code Extensions

Whether you are using a local setup or the dev container, we recommend the following extensions for the best experience:

#### `.yaml` file support

- [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml)
  *Pre-configured for schema mapping.* Utilize schema validation and autocompletion (Ctrl+Space) for accurate policy writing.

#### `.md` file support

- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
- [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)

#### BigQuery integration

- [SQL (BigQuery)](https://marketplace.visualstudio.com/items?itemName=shinichi-takii.sql-bigquery)
- [BigQuery Runner](https://marketplace.visualstudio.com/items?itemName=minodisk.bigquery-runner)

#### General utilities

- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [Path Autocomplete](https://marketplace.visualstudio.com/items?itemName=ionutvmi.path-autocomplete)

## Other IDEs

You are welcome to use other IDEs such as IntelliJ IDEA, WebStorm, or any other editor of your choice. However, we do not provide pre-configured setups or specific instructions for them. You will need to configure the necessary tools and plugins yourself.

## CLI-Only Setup

If you prefer to work from the command line, you can use the following tools:

- **Git:** For version control.
- **Java:** Required to run the `repo-manager.jar`.
- **[`repo-manager`](../repo-manager/index.md):** To manage the repository.
- **Google Cloud CLI:** For interacting with Google Cloud services, particularly BigQuery.
