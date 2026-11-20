# Description

A Managed HSM keeps its AuditEvent resource log, the record of authenticated requests and key operations, only when a diagnostic setting sends that log category to a Log Analytics workspace, storage account, or event hub.

## Rationale

Without a diagnostic setting, the HSM's key operations, local role assignment changes, and security domain downloads leave no retained record. Misuse of a key, an over- broad role assignment, or a security domain export by an insider then cannot be detected or attributed, for the keys that protect an estate's most sensitive data.

## Audit

This requirement needs manual assessment. Managed HSM resources and their audit diagnostic settings are not collected.
