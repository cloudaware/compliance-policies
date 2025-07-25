# Description

Ensure that Intune logs are captured and fed into a central log analytics workspace.

## Rationale

Intune includes built-in logs that provide information about your environments. Sending logs to a Log Analytics workspace enables centralized analysis, correlation, and alerting for faster threat detection and response.

## Impact

A Microsoft Intune plan is required to access Intune: <https://www.microsoft.com/en-gb/security/business/microsoft-intune-pricing>.

The amount of data logged and, thus, the cost incurred can vary significantly depending on the tenant size.

For information on Log Analytics workspace costs, visit: <https://learn.microsoft.com/en-us/azure/azure-monitor/logs/cost-logs>.

## Audit

### From Azure Portal

1. Go to `Intune`.
2. Click `Reports`.
3. Under `Azure monitor`, click `Diagnostic settings`.
4. Next to each diagnostic setting, click `Edit setting`, and review the selected log categories and destination details.
5. Ensure that at least one diagnostic setting is configured to send the following logs to a Log Analytics workspace:
    - `AuditLogs`
    - `OperationalLogs`
    - `DeviceComplianceOrg`
    - `Devices`
    - `Windows365AuditLogs`

## Default Value

By default, Intune diagnostic settings do not exist.

## References

1. <https://learn.microsoft.com/en-us/mem/intune/fundamentals/review-logs-using-azure-monitor>
2. <https://www.microsoft.com/en-gb/security/business/microsoft-intune-pricing>
3. <https://learn.microsoft.com/en-us/azure/azure-monitor/logs/cost-logs>
