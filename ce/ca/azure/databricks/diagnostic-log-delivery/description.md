# Description

This policy identifies Azure Databricks Workspaces that are not configured to deliver diagnostic logging for the following categories: `accounts`, `clusters`, `notebook`, `jobs`, `workspace`.

Azure Databricks Diagnostic Logging provides visibility into system operations, user activities, and security events within a Databricks workspace. Enabling diagnostic logs allows organizations to:

- Detect security threats by capturing access events, job executions, and cluster activities.
- Maintain compliance with regulatory frameworks such as SOC 2, HIPAA, and GDPR.
- Monitor operational performance and proactively troubleshoot issues.

## Rationale

Diagnostic logging delivers critical visibility into security and operational activities within Databricks workspaces. It ensures auditability for forensic investigations and supports compliance requirements that mandate continuous logging and monitoring of cloud resources.

## Impact

- Logs consume storage and may require additional monitoring solutions, potentially increasing operational overhead and costs.
- Incomplete or misconfigured logging may result in missing critical events, reducing visibility and monitoring effectiveness.

## Audit

This policy flags an *Azure Databricks Workspace* as `INCOMPLIANT` if the related *Azure Diagnostic Setting* is not configured with the following log categories:

- `accounts`
- `clusters`
- `notebook`
- `jobs`
- `workspace`

## References

1. [Audit log delivery for Azure Databricks](https://learn.microsoft.com/en-us/azure/databricks/admin/account-settings/audit-log-delivery)
2. [Configure log data retention in Azure Monitor](https://learn.microsoft.com/en-us/troubleshoot/azure/azure-monitor/log-analytics/billing/configure-data-retention)
3. [Databricks audit logs (China)](https://docs.azure.cn/en-us/databricks/admin/account-settings/audit-logs)
4. [Supported Microsoft Databricks workspace logs](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-logs/microsoft-databricks-workspaces-logs)

## Additional Information

- Diagnostic logging requires the Azure Databricks Premium plan.
- Alert rules should be reviewed and updated regularly to address evolving security threats and operational needs.
