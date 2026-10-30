# Remediation

## From Console

To eliminate embedded credentials and configure `OAuth` authentication for your **AWS CodeBuild Project**:

1. Locate and select the build project that currently references credentials in its source URL.
2. Edit the source configuration. Under **Source**, choose `Disconnect from Bitbucket` to remove the existing basic-auth or Personal Access Token linkage.
3. Click `Connect using OAuth`, then select `Connect to Bitbucket`. When prompted, grant the required **OAuth permissions** to allow CodeBuild secure, token-based access.
4. Enter or confirm your repository URL and omit any embedded credentials.
5. Adjust any additional source-configuration parameters (for example, buildspec path and webhook triggers).
6. Click `Update` source to apply the new OAuth-based authentication and complete remediation.
