# Description

When this property is enabled, the Azure portal authorizes requests to blobs, files, queues, and tables with Microsoft Entra ID by default.

## Rationale

Microsoft Entra ID provides superior security and ease of use over Shared Key.

## Audit

This policy flags an *Azure Storage Account* as `INCOMPLIANT` if its `Default To OAuth Authentication` is **not** set to **Yes**.

## Default Value

By default, `defaultToOAuthAuthentication` is disabled.

## References

1. <https://learn.microsoft.com/en-us/azure/storage/blobs/authorize-data-operations-portal#default-to-microsoft-entra-authorization-in-the-azure-portal>
2. <https://learn.microsoft.com/en-us/cli/azure/storage/account?view=azure-cli-latest>
