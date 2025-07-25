# Description

Ensure that a Microsoft Entra diagnostic setting is configured to send Microsoft Entra activity logs to a suitable destination, such as a Log Analytics workspace, storage account, or event hub. This enables centralized monitoring and analysis of Microsoft Entra activity logs.

## Rationale

Microsoft Entra activity logs enables you to assess many aspects of your Microsoft Entra tenant. Configuring diagnostic settings in Microsoft Entra ensures these logs are collected and sent to an appropriate destination for monitoring, analysis, and retention.

## Impact

To export sign-in data, your organization needs an Azure AD P1 or P2 license.

The amount of data logged and, thus, the cost incurred can vary significantly depending on the tenant size.

See the following pricing calculations for respective services:

- Log Analytics: <https://learn.microsoft.com/en-us/azure/azure-monitor/logs/cost-logs#pricing-model>
- Azure Storage: <https://azure.microsoft.com/en-gb/pricing/details/storage/blobs/>
- Event Hubs: <https://azure.microsoft.com/en-gb/pricing/details/event-hubs/>

## Audit

### From Azure Portal

1. Go to `Microsoft Entra ID`.
2. Under `Monitoring`, click `Diagnostic settings`.
3. Next to each diagnostic setting, click `Edit setting`, and review the selected log categories and destination details.
4. Ensure that at least one diagnostic setting is configured to send the following logs to an appropriate destination:

- `AuditLogs`
- `SignInLogs`
- `NonInteractiveUserSignInLogs`
- `ServicePrincipalSignInLogs`
- `ManagedIdentitySignInLogs`
- `ProvisioningLogs`
- `ADFSSignInLogs`
- `RiskyUsers`
- `UserRiskEvents`
- `NetworkAccessTrafficLogs`
- `RiskyServicePrincipals`
- `ServicePrincipalRiskEvents`
- `EnrichedOffice365AuditLogs`
- `MicrosoftGraphActivityLogs`
- `RemoteNetworkHealthLogs`
- `NetworkAccessAlerts`

## Default Value

By default, Microsoft Entra diagnostic settings do not exist.

## References

1. <https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-configure-diagnostic-settings>
2. <https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-access-activity-logs?tabs=microsoft-entra-activity-logs%2Carchive-activity-logs-to-a-storage-account>
