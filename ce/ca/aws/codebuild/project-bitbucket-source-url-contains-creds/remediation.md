# Remediation

## From Console

To eliminate embedded credentials and configure `OAuth` authentication for your **AWS CodeBuild Project**:

1. Locate and select the build project that currently references credentials in its source URL.
2. `Edit` Source Configuration
  Under Source, choose `Disconnect from Bitbucket` to remove the existing basic‑auth or Personal Access Token linkage.
3. Click `Connect using OAuth`.
  Select `Connect to Bitbucket`.
  When prompted, grant the required **OAuth permissions** to allow CodeBuild secure, token‑based access.
4. **Enter or confirm** your repository URL (omit any embedded credentials).
5. **Adjust** any additional source‑configuration parameters (e.g., build – spec path, webhook triggers).
6. Click `Update` source to apply the new OAuth‑based authentication and complete remediation.
