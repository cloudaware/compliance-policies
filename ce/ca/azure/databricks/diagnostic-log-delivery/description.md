# Description

Azure Databricks Diagnostic Logging provides insights into system operations, user activities, and security events within a Databricks workspace. Enabling diagnostic logs helps organizations:

- Detect security threats by logging access, job executions, and cluster activities.
- Ensure compliance with industry regulations such as SOC 2, HIPAA, and GDPR.
- Monitor operational performance and troubleshoot issues proactively.

## Rationale

Diagnostic logging provides visibility into security and operational activities within Databricks workspaces while maintaining an audit trail for forensic investigations, and it supports compliance with regulatory standards that require logging and monitoring.

## Impact

Logs consume storage and may require additional monitoring tools, leading to increased operational overhead and costs. Incomplete log configurations may result in missing critical events, reducing monitoring effectiveness.

## Audit

### From Azure Portal

Check if diagnostic logging is enabled for the Databricks workspace:

1. Go to `Azure Databricks`.
2. Select a workspace.
3. In the left-hand menu, select `Monitoring` > `Diagnostic settings`.
4. Verify if a diagnostic setting is configured. If not, diagnostic logging is not enabled.

Ensure that logging is enabled for the following categories:

- `Audit Logs`: User and system activities.
- `Cluster Logs`: Cluster state changes and errors.
- `Notebook Logs`: Execution events.
- `Jobs Logs`: Job execution tracking.

Verify that logs are being sent to one or more of the following destinations:

- `Azure Log Analytics workspace`: For analysis and querying.
- `Azure Storage Account`: For long-term retention.
- `Azure Event Hubs`: For integration with SIEM tools.

### From Azure CLI

Check if diagnostic logging is enabled for the Databricks workspace:

```sh
az monitor diagnostic-settings list --resource <databricks-resource-id>
```

If the output is empty, no diagnostic settings are configured.

Verify log categories being collected:

```sh
az monitor diagnostic-settings show --name <setting-name> --resource <databricks-resource-id>
```

Review the output to confirm that the necessary log categories are enabled.

Check if logs are stored securely in an approved location:

```sh
az monitor diagnostic-settings list --resource <databricks-resource-id>
```

Review the storageAccountId, workspaceId, and eventHubAuthorizationRuleId fields in the output to confirm the log destinations.

### From PowerShell

Check if diagnostic logging is enabled for the Databricks workspace:

```ps
Get-AzDiagnosticSetting -ResourceId <databricks-resource-id>
```

An empty result indicates that diagnostic logging is not enabled.

## References

1. <https://learn.microsoft.com/en-us/azure/databricks/admin/account-settings/audit-log-delivery>
2. <https://learn.microsoft.com/en-us/troubleshoot/azure/azure-monitor/log-analytics/billing/configure-data-retention>

## Additional Information

- Ensure that the Azure Databricks workspace is on the Premium plan to utilize diagnostic logging features.
- Regularly review and update alert rules to adapt to evolving security threats and operational requirements.
