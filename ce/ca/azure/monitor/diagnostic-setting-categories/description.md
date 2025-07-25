# Description

**Prerequisite**: A Diagnostic Setting must exist. If a Diagnostic Setting does not exist, the navigation and options within this recommendation will not be available. Please review the recommendation at the beginning of this subsection titled: "Ensure that a 'Diagnostic Setting' exists."

The diagnostic setting should be configured to log the appropriate activities from the control/management plane.

## Rationale

A diagnostic setting controls how the diagnostic log is exported. Capturing the diagnostic setting categories for appropriate control/management plane activities allows proper alerting.

## Audit

This policy flags an *Azure Subscription Diagnostic Setting* as `INCOMPLIANT` if the `Logs JSON` does not capture one of the following categories: **Administrative**, **Alert**, **Policy**, **Security**.

## Default Value

When the diagnostic setting is created using Azure Portal, by default no categories are selected.

## References

1. <https://docs.microsoft.com/en-us/azure/azure-monitor/platform/diagnostic-settings>
2. <https://docs.microsoft.com/en-us/azure/azure-monitor/samples/resource-manager-diagnostic-settings>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>
4. <https://learn.microsoft.com/en-us/cli/azure/monitor/diagnostic-settings?view=azure-cli-latest>
5. <https://learn.microsoft.com/en-us/powershell/module/az.monitor/new-azsubscriptiondiagnosticsetting?view=azps-9.2.0>
