# Remediation

## From Azure Portal

Disable personal access tokens:

If your workspace does not require PATs, you can disable them entirely to prevent their use.

1. Navigate to your Azure Databricks workspace.
2. Click the `Settings` icon and select `Admin Console`.
3. Go to the `Advanced` tab.
4. Under `Personal Access Tokens`, toggle the setting to `Disabled`.

Databricks CLI:

```sh
databricks workspace-conf set-status --json '{"enableTokens": "false"}'
```

Control who can create and use personal access tokens:

Define which users or groups are authorized to create and utilize PATs.

1. Navigate to your Azure Databricks workspace.
2. Click the `Settings` icon and select `Admin Console`.
3. Go to the `Advanced` tab.
4. Click on `Personal Access Tokens` and then `Permissions`.
5. Assign the appropriate permissions (e.g. No Permissions, Can Use, Can Manage) to users or groups.

Set maximum lifetime for new personal access tokens:

Limit the validity period of new tokens to reduce potential misuse.

Databricks CLI:

```sh
databricks workspace-conf set-status --json '{"maxTokenLifetimeDays": "90"}'
```

Monitor and revoke personal access tokens:

Periodically review active tokens and revoke any that are unnecessary or potentially compromised.

Databricks CLI:

```sh
databricks token list
databricks token delete --token-id <token-id>
```

Transition to OAuth for enhanced security:

Utilize OAuth tokens for authentication, offering improved security features over PATs.
