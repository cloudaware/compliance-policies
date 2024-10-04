# Remediation

When generating shared access signature tokens, use start and end time such that it falls within an hour.

## From Azure Portal

1. Go to `Storage Accounts`.
2. For each storage account where a shared access signature is required, under `Security + networking`, go to `Shared access signature`.
3. Select the appropriate `Allowed resource types`.
4. Set the `Start and expiry date/time` to be within one hour.
5. Click `Generate SAS and connection string`.
