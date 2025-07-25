# Description

Databricks personal access tokens (PATs) provide API-based authentication for users and applications. By default, users can generate API tokens without expiration, leading to potential security risks if tokens are leaked, improperly stored, or not rotated regularly.

To mitigate these risks, administrators should:

- Restrict token creation to approved users and service principals.
- Enforce expiration policies to prevent long-lived tokens.
- Monitor token usage and revoke unused or compromised tokens.

## Rationale

Restricting usage and enforcing expiry for personal access tokens reduces exposure to long-lived tokens, minimizes the risk of API abuse if compromised, and aligns with security best practices through controlled issuance and enforced expiry.

## Impact

If revoked improperly, applications relying on these tokens may fail, requiring a remediation plan for token rotation. Increased administrative effort is required to track and manage API tokens effectively.

## Audit

Azure Databricks administrators can monitor and revoke personal access tokens within their workspace. Detailed instructions are available in the "Monitor and Revoke Personal Access Tokens" section of the Microsoft documentation: <https://learn.microsoft.com/en-us/azure/databricks/admin/access-control/tokens>. To evaluate the usage of personal access tokens in your Azure Databricks account, you can utilize the provided notebook that lists all PATs not rotated or updated in the last 90 days, allowing you to identify tokens that may require revocation. This process is detailed here: <https://docs.azure.cn/en-us/databricks/security/auth/oauth-pat-usage>. Implementing diagnostic logging provides a comprehensive reference of audit log services and events, enabling you to track activities related to personal access tokens. More information can be found in the diagnostic log reference section: <https://docs.azure.cn/en-us/databricks/security/auth/oauth-pat-usage>.

## Default Value

By default, personal access tokens are enabled and users can create the Personal access token and their expiry time.

## References

1. <https://learn.microsoft.com/en-us/azure/databricks/administration-guide/access-control/tokens>
2. <https://learn.microsoft.com/en-us/azure/databricks/dev-tools/auth/>
