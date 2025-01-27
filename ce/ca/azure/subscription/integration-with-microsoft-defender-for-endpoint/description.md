# Description

This integration setting enables Microsoft Defender for Endpoint (formerly 'Advanced Threat Protection' or 'ATP' or 'WDATP' - see additional info) to communicate with Microsoft Defender for Cloud.

**IMPORTANT**: When enabling integration between DfE & DfC it needs to be taken into account that this will have some side effects that may be undesirable.

1. For server 2019 & above if defender is installed (default for these server SKU's) this will trigger a deployment of the new unified agent and link to any of the extended configuration in the Defender portal.
2. If the new unified agent is required for server SKU's of Win 2016 or Linux and lower there is additional integration that needs to be switched on and agents need to be aligned.

## Rationale

Microsoft Defender for Endpoint integration brings comprehensive Endpoint Detection and Response (EDR) capabilities within Microsoft Defender for Cloud. This integration helps to spot abnormalities, as well as detect and respond to advanced attacks on endpoints monitored by Microsoft Defender for Cloud.

MDE works only with Standard Tier subscriptions.

## Impact

Endpoint protection requires licensing and is included in these plans:

- Defender for Servers plan 1
- Defender for Servers plan 2

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Defender for Cloud`.
3. Under `Management`, select `Environment Settings`.
4. Click on the subscription name.
5. Click `Settings & monitoring`.
6. Ensure the `Status` for `Endpoint protection` is set to `On`.

### From Azure CLI

Ensure the output of the below command is `True`:

```sh
az account get-access-token --query "{subscription:subscription,accessToken:accessToken}" --out tsv | xargs -L1 bash -c 'curl -X GET -H "Authorization: Bearer $1" -H "Content-Type: application/json" https://management.azure.com/subscriptions/<subscriptionID>/providers/Microsoft.Security/settings?api-version=2021-06-01' | jq '.|.value[] | select(.name=="WDATP")'|jq '.properties.enabled'
```

### From PowerShell

Run the following commands to login and audit this check:

```ps
Connect-AzAccount Set-AzContext -Subscription <subscriptionID> Get-AzSecuritySetting | Select-Object name,enabled |where-object {$_.name -eq "WDATP"}
```

### PowerShell Output - Non-Compliant

|Name|Enabled|
|---|---|
|WDATP|False|

### PowerShell Output - Compliant

|Name|Enabled|
|---|---|
|WDATP|True|

## Default Value

By default, Endpoint protection is `off`.

## References

1. <https://docs.microsoft.com/en-in/azure/defender-for-cloud/integration-defender-for-endpoint?tabs=windows>
2. <https://docs.microsoft.com/en-us/rest/api/securitycenter/settings/list>
3. <https://docs.microsoft.com/en-us/rest/api/securitycenter/settings/update>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-endpoint-security#es-1-use-endpoint-detection-and-response-edr>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-endpoint-security#es-2-use-modern-anti-malware-software>

## Additional Information

**IMPORTANT**: When enabling integration between DfE & DfC it needs to be taken into account that this will have some side effects that may be undesirable.

1. For server 2019 & above if defender is installed (default for these server SKU's) this will trigger a deployment of the new unified agent and link to any of the extended configuration in the Defender portal.
2. If the new unified agent is required for server SKU's of Win 2016 or Linux and lower there is additional integration that needs to be switched on and agents need to be aligned.

**NOTE**: "Microsoft Defender for Endpoint (MDE)" was formerly known as "Windows Defender Advanced Threat Protection (WDATP)." There are a number of places (e.g. Azure CLI) where the "WDATP" acronym is still used within Azure.
