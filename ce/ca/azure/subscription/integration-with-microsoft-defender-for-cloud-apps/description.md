# Description

This integration setting enables Microsoft Defender for Cloud Apps (formerly 'Microsoft Cloud App Security' or 'MCAS' - see additional info) to communicate with Microsoft Defender for Cloud.

## Rationale

Microsoft Defender for Cloud offers an additional layer of protection by using Azure Resource Manager events, which is considered to be the control plane for Azure. By analyzing the Azure Resource Manager records, Microsoft Defender for Cloud detects unusual or potentially harmful operations in the Azure subscription environment. Several of the preceding analytics are powered by Microsoft Defender for Cloud Apps. To benefit from these analytics, subscription must have a Cloud App Security license.

Microsoft Defender for Cloud Apps works only with Standard Tier subscriptions.

## Impact

Microsoft Defender for Cloud Apps works with Standard pricing tier Subscription. Choosing the Standard pricing tier of Microsoft Defender for Cloud incurs an additional cost per resource.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Defender for Cloud`.
3. Under `Management`, select `Environment Settings`.
4. Click on the subscription name.
5. Select the `Integrations` blade.
6. Ensure setting `Allow Microsoft Defender for Cloud Apps to access my data` is selected.

### From Azure CLI

Ensure the output of the below command is `True`:

```sh
az account get-access-token --query "{subscription:subscription,accessToken:accessToken}" --out tsv | xargs -L1 bash -c 'curl -X GET -H "Authorization: Bearer $1" -H "Content-Type: application/json" https://management.azure.com/subscriptions/<subscription_ID>/providers/Microsoft.Security/settings?api-version=2021-06-01' | jq '.|.value[] | select(.name=="MCAS")'|jq '.properties.enabled'
```

### From PowerShell

Run the following series of commands to audit this configuration:

```ps
Get-AzAccount Set-AzContext -Subscription <subscription ID> Get-AzSecuritySetting | Select-Object name,enabled |where-object {$_.name -eq "MCAS"}
```

### PowerShell Output - Non-Compliant

|Name|Enabled|
|---|---|
|MCAS|False|

### PowerShell Output - Compliant

|Name|Enabled|
|---|---|
|MCAS|True|

## Default Value

With Cloud App Security license, these alerts are enabled by default.

## References

1. <https://docs.microsoft.com/en-in/azure/security-center/security-center-alerts-service-layer#azure-management-layer-azure-resource-manager-preview>
2. <https://docs.microsoft.com/en-us/rest/api/securitycenter/settings/list>
3. <https://docs.microsoft.com/en-us/rest/api/securitycenter/settings/update>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-identity-management#im-9-secure-user-access-to--existing-applications>

## Additional Information

**NOTE:** "Microsoft Defender for Cloud Apps" ("MDCA") is formerly known as "Microsoft Cloud App Security" ("MCAS"). There are a number of places (e.g. Azure CLI) where the "MCAS" acronym is still used within Azure.
