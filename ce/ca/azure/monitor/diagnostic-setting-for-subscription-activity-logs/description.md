# Description

Enable Diagnostic settings for exporting activity logs. Diagnostic settings are available for each individual resource within a subscription. Configure settings for all appropriate resources in your environment.

## Rationale

A diagnostic setting controls how a diagnostic log is exported. By default, logs are retained only for 90 days. Diagnostic settings should be defined so that logs can be exported and stored for a longer duration to analyze security activities within an Azure subscription.

## Audit

### From Azure Portal

To identify Diagnostic Settings on a subscription:

1. Go to `Monitor`.
2. Click `Activity Log`.
3. Click `Export Activity Logs`.
4. Select a `Subscription`.
5. Ensure a `Diagnostic settings` exists for the selected Subscription.

To identify Diagnostic Settings on specific resources:

1. Go to `Monitor`.
2. Click `Diagnostic settings`.
3. Ensure that Diagnostics status is `enabled` on all appropriate resources.

### From Azure CLI

To identify Diagnostic Settings on a subscription:

```sh
az monitor diagnostic-settings subscription list --subscription {{subscription-id}}
```

To identify Diagnostic Settings on a resource:

```sh
az monitor diagnostic-settings list --resource {{resource-id}}
```

### From PowerShell

To identify Diagnostic Settings on a Subscription:

```ps
Get-AzDiagnosticSetting -SubscriptionId {{subscription-id}}
```

To identify Diagnostic Settings on a specific resource:

```ps
Get-AzDiagnosticSetting -ResourceId {{resource-id}}
```

## Default Value

By default, diagnostic settings are not configured.

## References

1. <https://learn.microsoft.com/en-us/azure/azure-monitor/fundamentals/data-sources>
2. <https://learn.microsoft.com/en-us/cli/azure/monitor/diagnostic-settings?view=azure-cli-latest>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>
