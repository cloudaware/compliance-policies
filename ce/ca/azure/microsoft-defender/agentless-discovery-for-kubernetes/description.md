# Description

Enable automatic discovery and configuration scanning of the Microsoft Kubernetes clusters.

## Rationale

As with any compute resource, Container environments require hardening and run-time protection to ensure safe operations and detection of threats and vulnerabilities.

## Impact

Agentless discovery for Kubernetes requires licensing and is included in:

- Defender CSPM
- Defender for Containers plans.

## Audit

### From Azure Portal

1. From the Azure Portal `Home` page, select `Microsoft Defender for Cloud`.
2. Under `Management` select `Environment Settings`.
3. Select a subscription.
4. Under `Settings` > `Defender Plans`, click `Settings & monitoring`.
5. Locate the row for `Agentless discovery for Kubernetes`.
6. Ensure that `On` is selected.

Repeat the above for any additional subscriptions.

## Default Value

By default, Microsoft Defender for Containers is `Off`. If Defender for Containers is enabled from the Microsoft Defender for Cloud portal, auto provisioning will be enabled.

## References

1. <https://docs.microsoft.com/en-us/azure/defender-for-cloud/defender-for-containers-introduction>
2. <https://docs.microsoft.com/en-us/azure/defender-for-cloud/enable-data-collection?tabs=autoprovision-containers>
3. <https://msdn.microsoft.com/en-us/library/mt704062.aspx>
4. <https://msdn.microsoft.com/en-us/library/mt704063.aspx>
5. <https://docs.microsoft.com/en-us/rest/api/securitycenter/autoprovisioningsettings/list>
6. <https://docs.microsoft.com/en-us/rest/api/securitycenter/autoprovisioningsettings/create>
7. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-incident-response#ir-2-preparation---setup-incident-notification>
