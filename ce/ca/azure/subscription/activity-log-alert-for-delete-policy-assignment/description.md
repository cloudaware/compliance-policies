# Description

Create an activity log alert for the Delete Policy Assignment event.

## Rationale

Monitoring for delete policy assignment events gives insight into changes done in "azure policy - assignments" and can reduce the time it takes to detect unsolicited changes.

## Audit

### From Azure Portal

1. Navigate to the `Monitor` blade.
2. Click on `Alerts`.
3. In the Alerts window, click on `Alert rules`.
4. Ensure an alert rule exists where the Condition column contains `Operation name=Microsoft.Authorization/policyAssignments/delete`.
5. Click on the Alert `Name` associated with the previous step.
6. Ensure the `Condition` panel displays the text `Whenever the Activity Log has an event with Category='Administrative'`, `Operation name='Delete policy assignment'` and does not filter on `Level`, `Status` or `Caller`.
7. Ensure the `Actions` panel displays an Action group is assigned to notify the appropriate personnel in your organization.

### From Azure CLI

```sh
az monitor activity-log alert list --subscription <subscription ID> --query "[].{Name:name,Enabled:enabled,Condition:condition.allOf,Actions:actions}"
```

Look for `Microsoft.Authorization/policyAssignments/delete` in the output.

### From PowerShell

```ps
Get-AzActivityLogAlert -SubscriptionId <subscription ID>|where-object {$_.ConditionAllOf.Equal -match "Microsoft.Authorization/policyAssignments/delete"}|select-object Location,Name,Enabled,ResourceGroupName,ConditionAllOf
```

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [c5447c04-a4d7-4ba8-a263-c9ee321a6858](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fc5447c04-a4d7-4ba8-a263-c9ee321a6858) - **Name**: `An activity log alert should exist for specific Policy operations`

## Default Value

By default, no monitoring alerts are created.

## References

1. <https://docs.microsoft.com/en-in/azure/azure-monitor/platform/alerts-activity-log>
2. <https://docs.microsoft.com/en-in/rest/api/monitor/activitylogalerts/createorupdate>
3. <https://docs.microsoft.com/en-in/rest/api/monitor/activitylogalerts/listbysubscriptionid>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>
5. <https://azure.microsoft.com/en-us/services/blueprints/>

## Additional Information

This log alert also applies for Azure Blueprints.
