# Remediation

A Managed HSM keeps its AuditEvent resource log, the record of authenticated requests and key operations, only when a diagnostic setting sends that log category to a Log Analytics workspace, storage account, or event hub.

On the Managed HSM, open **Monitoring > Diagnostic settings**. Add or edit a setting, enable the **audit** category group or **AuditEvent** category, select at least one approved destination, and save. Preserve existing log categories and destinations when editing a setting. Verify that audit events reach the destination.

Automated assessment is unavailable: Managed HSM resources and their audit diagnostic settings are not collected.
