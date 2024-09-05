# Description

Create an activity log alert for the Create or Update Security Solution event.

## Rationale

Monitoring for Create or Update Security Solution events gives insight into changes to the active security solutions and may reduce the time it takes to detect suspicious activity.

## Audit

### From Azure Portal

1. Navigate to the `Monitor` blade.
2. Click on `Alerts`.
3. In the Alerts window, click on `Alert rules`.
4. Ensure an alert rule exists where the Condition column contains `Operation name=Microsoft.Security/securitySolutions/write`.
5. Click on the `Alert Name` associated with the previous step.
6. Ensure the `Condition` panel displays the text `Whenever the Activity Log has an event with Category='Administrative'`, `Operation name='Create or Update Security Solutions'` and does not filter on `Level`, `Status` or `Caller`.
7. Ensure the `Actions` panel displays an Action group is assigned to notify the appropriate personnel in your organization.

### From Azure CLI

```sh
az monitor activity-log alert list --subscription <subscription Id> --query "[].{Name:name,Enabled:enabled,Condition:condition.allOf,Actions:actions}"
```

Look for `Microsoft.Security/securitySolutions/write` in the output.

### From PowerShell

```ps
Get-AzActivityLogAlert -SubscriptionId <subscription ID>|where-object {$_.ConditionAllOf.Equal -match "Microsoft.Security/securitySolutions/write"}|select-object Location,Name,Enabled,ResourceGroupName,ConditionAllOf
```

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [b954148f-4c11-4c38-8221-be76711e194a](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fb954148f-4c11-4c38-8221-be76711e194a) - **Name**: `An activity log alert should exist for specific Administrative operations`

## Default Value

By default, no monitoring alerts are created.

## References

1. <https://azure.microsoft.com/en-us/updates/classic-alerting-monitoring-retirement>
2. <https://docs.microsoft.com/en-in/azure/azure-monitor/platform/alerts-activity-log>
3. <https://docs.microsoft.com/en-in/rest/api/monitor/activitylogalerts/createorupdate>
4. <https://docs.microsoft.com/en-in/rest/api/monitor/activitylogalerts/listbysubscriptionid>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>
