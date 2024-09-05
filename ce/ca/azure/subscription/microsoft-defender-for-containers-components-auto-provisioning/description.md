# Description

Enable automatic provisioning of the Microsoft Defender for Containers components.

## Rationale

As with any compute resource, Container environments require hardening and run-time protection to ensure safe operations and detection of threats and vulnerabilities.

## Impact

Microsoft Defender for Containers will require additional licensing.

## Audit

### From Azure Portal

1. From the Azure Portal `Home` page, select `Microsoft Defender for Cloud`.
2. Under `Management` select `Environment Settings`.
3. Select a subscription.
4. Ensure that `Containers` is set to `On`.

Repeat the above for any additional subscriptions.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [1c988dd6-ade4-430f-a608-2a3e5b0a6d38](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F1c988dd6-ade4-430f-a608-2a3e5b0a6d38) - **Name**: `Microsoft Defender for Containers should be enabled`

## Default Value

By default, Microsoft Defender for Containers is disabled. If Defender for Containers is enabled from the Microsoft Defender for Cloud portal, auto provisioning will be enabled.

## References

1. <https://docs.microsoft.com/en-us/azure/defender-for-cloud/defender-for-containers-introduction>
2. <https://docs.microsoft.com/en-us/azure/defender-for-cloud/enable-data-collection?tabs=autoprovision-containers>
3. <https://msdn.microsoft.com/en-us/library/mt704062.aspx>
4. <https://msdn.microsoft.com/en-us/library/mt704063.aspx>
5. <https://docs.microsoft.com/en-us/rest/api/securitycenter/autoprovisioningsettings/list>
6. <https://docs.microsoft.com/en-us/rest/api/securitycenter/autoprovisioningsettings/create>
7. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-incident-response#ir-2-preparation---setup-incident-notification>
