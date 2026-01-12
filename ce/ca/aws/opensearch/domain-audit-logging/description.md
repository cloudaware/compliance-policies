# Description

This policy identifies AWS OpenSearch Domains that are not configured to publish audit logs (`AUDIT_LOGS`) to Amazon CloudWatch Logs.

## Rationale

Audit logs capture user access and activity within an OpenSearch Service domain and are a critical security control for the following purposes:

1. **Forensic Analysis**: Enables investigation of user actions, including who accessed specific data and what operations were performed.
2. **Unauthorized Access Detection**: Helps identify failed authentication attempts and unauthorized access to restricted indices.
3. **Compliance**: Supports adherence to regulatory and industry standards (such as SOC 2, HIPAA, and PCI DSS) that require monitoring and auditing access to sensitive data.

## Audit

This policy flags an *AWS OpenSearch Service domain* as `INCOMPLIANT` when the `Log Publishing Options` configuration is either **empty** or does not have the **AUDIT_LOGS** option enabled.
