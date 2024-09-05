# Description

**Prerequisite**: A Diagnostic Setting must exist. If a Diagnostic Setting does not exist, the navigation and options within this recommendation will not be available. Please review the recommendation at the beginning of this subsection titled: "Ensure that a 'Diagnostic Setting' exists."

The diagnostic setting should be configured to log the appropriate activities from the control/management plane.

## Rationale

A diagnostic setting controls how the diagnostic log is exported. Capturing the diagnostic setting categories for appropriate control/management plane activities allows proper alerting.

## Audit

### From Azure Portal

1. Go to `Azure Monitor`.
2. Click `Activity log`.
3. Click on `Export Activity Logs`.
4. Select the appropriate `Subscription`.
5. If there is no `Diagnostic Settings` listed, generate a finding.
6. Otherwise, click on `Edit Settings`.
7. Ensure that the following categories are checked: `Administrative`, `Alert`, `Policy`, and `Security`.

### From Azure CLI

Ensure the categories `Administrative`, `Alert`, `Policy`, and `Security` set to: `enabled: true`:

```sh
az monitor diagnostic-settings subscription list --subscription <subscription ID>
```

## From Powershell

Ensure the categories `Administrative`, `Alert`, `Policy`, and `Security` are set to `Enabled:True`:

```ps
Get-AzSubscriptionDiagnosticSetting -Subscription <subscriptionID>
```

## From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [3b980d31-7904-4bb7-8575-5665739a8052](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F3b980d31-7904-4bb7-8575-5665739a8052) - **Name**: `An activity log alert should exist for specific Security operations`
- **Policy ID**: [b954148f-4c11-4c38-8221-be76711e194a](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fb954148f-4c11-4c38-8221-be76711e194a) - **Name**: `An activity log alert should exist for specific Administrative operations`
- **Policy ID**: [c5447c04-a4d7-4ba8-a263-c9ee321a6858](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fc5447c04-a4d7-4ba8-a263-c9ee321a6858) - **Name**: `An activity log alert should exist for specific Policy operations`

## Default Value

When the diagnostic setting is created using Azure Portal, by default no categories are selected.

## References

1. <https://docs.microsoft.com/en-us/azure/azure-monitor/platform/diagnostic-settings>
2. <https://docs.microsoft.com/en-us/azure/azure-monitor/samples/resource-manager-diagnostic-settings>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>
4. <https://learn.microsoft.com/en-us/cli/azure/monitor/diagnostic-settings?view=azure-cli-latest>
5. <https://learn.microsoft.com/en-us/powershell/module/az.monitor/new-azsubscriptiondiagnosticsetting?view=azps-9.2.0>
