# Welcome to the Cloudaware Compliance Engine Dev Container

This development container is pre-configured with all the tools you need to work on the Cloudaware Compliance Engine repository.

## Getting Started

- **repo-manager:** The `repo-manager` CLI tool is available. You can run it directly from the root of the repository using `./repo-manager` (or `repo-manager.bat` on Windows, `./repo-manager.ps1` on PowerShell).
- **Google Cloud CLI:** The `gcloud` command is available for interacting with Google Cloud services.
- **Gemini CLI:** The `gemini` command is available for interacting with the Gemini API.

## Authentication Setup

To fully utilize the tools in this environment, you will need to set up authentication for `repo-manager`, `gcloud`, and `gemini`.

### 1. repo-manager Authentication

Set up your `repo-manager` authentication profile:

```bash
repo-manager auth add --name="{name}" --token="{token}"
```

For full reference for `repo-manager auth` command see [documnetation](../guides/developer/repo-manager/cli.md#repo-manager-auth)

### 2. Google Cloud CLI Authentication

Authenticate your `gcloud` CLI to access Google Cloud services:

```bash
gcloud auth login
```

Follow the prompts for log in with your Google account.

### 3. Gemini CLI Authentication

The Gemini CLI will prompt you to set up authorization the first time you run a `gemini` command. Follow the instructions in the terminal.

If you encounter issues with the browser redirection during authentication (e.g., the browser does not redirect back correctly), you can try the following workaround:

```bash
export NO_BROWSER=true
gemini
```

This will force the Gemini CLI to authenticate without opening a browser, providing a URL and a code for you to complete the login manually.

Feel free to explore the repository and start developing!
