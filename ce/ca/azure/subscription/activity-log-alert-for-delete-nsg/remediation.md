# Remediation

Create an enabled Activity Log Alert for **Microsoft.Network/networkSecurityGroups/delete** in the **Administrative** category across the affected subscription. Set the scope to `/subscriptions/{{subscription-id}}`.

Review existing alerts for this event before creating another. Select a current action group with enabled notification receivers for the responsible team, and review the expected notification volume and any charges for its notification channels.

**Use an unused alert-rule name for the command examples.** Before editing an existing rule, record its configuration and retain all action groups that are still required.

## From Azure Portal

1. Go to **Monitor > Alerts** and select **Create > Alert rule**.
2. On the **Scope** tab, select the affected subscription itself and select **Apply**.
3. On the **Condition** tab, select **See all signals**, choose **Delete Network Security Group (Network Security Group)**, and select **Apply**.
4. Leave **Event level**, **Status**, and **Event initiated by** set to **All**. The condition should match only the Administrative category and the specified operation.
5. On the **Actions** tab, select an existing action group or create one with the required notification receivers.
6. On the **Details** tab, select a resource group and enter an alert-rule name and an optional description.
7. Ensure that the rule is enabled, then select **Review + create** and **Create**.

To correct an existing rule, open **Monitor > Alerts > Alert rules**, select the rule, and update its scope, condition, and actions to match these settings. Save the changes. Repeat for each subscription requiring remediation.

## From Azure CLI

Replace the placeholders with the target subscription, an existing resource group, and an unused alert-rule name. Use the full resource ID of an existing action group for `{{action-group-id}}`.

```sh
az monitor activity-log alert create \
    --subscription "{{subscription-id}}" \
    --resource-group "{{resource-group-name}}" \
    --name "{{alert-rule-name}}" \
    --scope "/subscriptions/{{subscription-id}}" \
    --condition category=Administrative and operationName=Microsoft.Network/networkSecurityGroups/delete \
    --action-group "{{action-group-id}}"
```

## From PowerShell

Create the required condition and attach the existing action group by its resource ID.

```ps
$conditions = @()
$conditions += New-AzActivityLogAlertAlertRuleAnyOfOrLeafConditionObject `
    -Field "category" `
    -Equal "Administrative"

$conditions += New-AzActivityLogAlertAlertRuleAnyOfOrLeafConditionObject `
    -Field "operationName" `
    -Equal "Microsoft.Network/networkSecurityGroups/delete"

$action = New-AzActivityLogAlertActionGroupObject `
    -Id "{{action-group-id}}"

New-AzActivityLogAlert `
    -SubscriptionId "{{subscription-id}}" `
    -ResourceGroupName "{{resource-group-name}}" `
    -Name "{{alert-rule-name}}" `
    -Location "global" `
    -Scope "/subscriptions/{{subscription-id}}" `
    -Condition $conditions `
    -Action $action `
    -Enabled $true `
    -ErrorAction Stop
```

## Verification

Inspect the alert rule using Azure CLI.

```sh
az monitor activity-log alert show \
    --subscription "{{subscription-id}}" \
    --resource-group "{{resource-group-name}}" \
    --name "{{alert-rule-name}}" \
    --output json
```

Confirm the following settings.

- `enabled` is `true`.
- `scopes` contains the single entry `/subscriptions/{{subscription-id}}`.
- `condition.allOf` contains exactly two conditions, matching `category=Administrative` and `operationName=Microsoft.Network/networkSecurityGroups/delete` on their respective fields.
- `actions.actionGroups` includes the intended current action group.

Review the action group's recipients and enabled receivers, and use its **Test** feature to confirm notification delivery with the responsible team.
When a matching event occurs during an approved administrative change, confirm that the alert fires and its notifications reach the intended recipients.
