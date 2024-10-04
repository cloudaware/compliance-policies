# Description

Enable automatic provisioning of the monitoring agent to collect security data.

**DEPRECATION PLANNED**: The Log Analytics Agent is slated for deprecation in August 2024. The Microsoft Defender for Endpoint agent, in tandem with new agentless capabilities will be providing replacement functionality. More detail is available here: <https://techcommunity.microsoft.com/t5/microsoft-defender-for-cloud/microsoft-defender-for-cloud-strategy-and-plan-towards-log/ba-p/3883341>.

## Rationale

When `Log Analytics agent for Azure VMs` is turned on, Microsoft Defender for Cloud provisions the Microsoft Monitoring Agent on all existing supported Azure virtual machines and any new ones that are created. The Microsoft Monitoring Agent scans for various security-related configurations and events such as system updates, OS vulnerabilities, endpoint protection, and provides alerts.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Defender for Cloud`.
3. Under `Management`, select `Environment Settings`.
4. Select a subscription.
5. Click on `Settings & monitoring`.
6. Ensure that `Log Analytics agent` is set to `On`.

Repeat the above for any additional subscriptions.

### From Azure CLI

Ensure the output of the below command is `On`:

```sh
az account get-access-token --query "{subscription:subscription,accessToken:accessToken}" --out tsv | xargs -L1 bash -c 'curl -X GET -H "Authorization: Bearer $1" -H "Content-Type: application/json" https://management.azure.com/subscriptions/<subscriptionID>/providers/Microsoft.Security/autoProvisioningSettings?api-version=2017-08-01-preview' | jq '.|.value[] | select(.name=="default")'|jq '.properties.autoProvision'
```

### From PowerShell

```ps
Connect-AzAccount Get-AzSecurityAutoProvisioningSetting | Select-Object Name, AutoProvision
```

Ensure output for `Id`, `Name`, `AutoProvision` is `/subscriptions/providers/Microsoft.Security/autoProvisioningSettings/default`, `default`, `On`.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [475aae12-b88a-4572-8b36-9b712b2b3a17](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F475aae12-b88a-4572-8b36-9b712b2b3a17) - **Name**: `Auto provisioning of the Log Analytics agent should be enabled on your subscription`

## Default Value

By default, `Automatic provisioning of monitoring agent` is set to `On`.

## References

1. <https://docs.microsoft.com/en-us/azure/security-center/security-center-data-security>
2. <https://docs.microsoft.com/en-us/azure/security-center/security-center-enable-data-collection>
3. <https://msdn.microsoft.com/en-us/library/mt704062.aspx>
4. <https://msdn.microsoft.com/en-us/library/mt704063.aspx>
5. <https://docs.microsoft.com/en-us/rest/api/securitycenter/autoprovisioningsettings/list>
6. <https://docs.microsoft.com/en-us/rest/api/securitycenter/autoprovisioningsettings/create>
7. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-5-centralize-security-log-management-and-analysis>
8. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>
9. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-incident-response#ir-2-preparation---setup-incident-notification>

## Additional Information

- Excluding any of the entries in `input.json` may disable the specific setting by default.
- Microsoft has recently changed APIs to get and Update Automatic Provisioning Setting. This recommendation is updated accordingly.

**DEPRECATION PLANNED**: The Log Analytics Agent is slated for deprecation in August 2024. The Microsoft Defender for Endpoint agent, in tandem with new agentless capabilities will be providing replacement functionality. More detail is available here: <https://techcommunity.microsoft.com/t5/microsoft-defender-for-cloud/microsoft-defender-for-cloud-strategy-and-plan-towards-log/ba-p/3883341>.
