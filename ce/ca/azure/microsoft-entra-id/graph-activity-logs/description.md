# Description

Ensure that a Microsoft Entra diagnostic setting is configured to send Microsoft Graph activity logs to a suitable destination, such as a Log Analytics workspace, storage account, or event hub. This enables centralized monitoring and analysis of all HTTP requests that the Microsoft Graph service receives and processes for a tenant.

## Rationale

Microsoft Graph activity logs provide visibility into HTTP requests made to the Microsoft Graph service, helping detect unauthorized access, suspicious activity, and security threats. Configuring diagnostic settings in Microsoft Entra ensures these logs are collected and sent to an appropriate destination for monitoring, analysis, and retention.

## Impact

A Microsoft Entra ID P1 or P2 tenant license is required to access the Microsoft Graph activity logs.

The amount of data logged and, thus, the cost incurred can vary significantly depending on the tenant size and the applications in your tenant that interact with the Microsoft Graph APIs.

See the following pricing calculations for respective services:

- Log Analytics: <https://learn.microsoft.com/en-us/azure/azure-monitor/logs/cost-logs#pricing-model>
- Azure Storage: <https://azure.microsoft.com/en-gb/pricing/details/storage/blobs/>
- Event Hubs: <https://azure.microsoft.com/en-gb/pricing/details/event-hubs/>

## Audit

### From Azure Portal

1. Go to `Microsoft Entra ID`.
2. Under `Monitoring`, click `Diagnostic settings`.
3. Next to each diagnostic setting, click `Edit setting`, and review the selected log categories and destination details.
4. Ensure that at least one diagnostic setting is configured to send `MicrosoftGraphActivityLogs` to an appropriate destination.

## Default Value

By default, Microsoft Entra diagnostic settings do not exist.

## References

1. <https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-configure-diagnostic-settings>
2. <https://learn.microsoft.com/en-us/graph/microsoft-graph-activity-logs-overview>
3. <https://learn.microsoft.com/en-us/azure/azure-monitor/logs/cost-logs#pricing-model>
4. <https://azure.microsoft.com/en-gb/pricing/details/storage/blobs/>
5. <https://azure.microsoft.com/en-gb/pricing/details/event-hubs/>
