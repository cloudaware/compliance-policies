# Description

The Endpoint protection component enables Microsoft Defender for Endpoint (formerly 'Advanced Threat Protection' or 'ATP' or 'WDATP' - see additional info) to communicate with Microsoft Defender for Cloud.

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

This policy flags an *Azure Subscription* as `INCOMPLIANT` if the related `Azure Defender Plan` for **Endpoint** has its `Endpoint protection` (`WDATP`) is not enabled.

## Default Value

By default, Endpoint protection is `off`.

## References

1. <https://learn.microsoft.com/en-us/azure/defender-for-cloud/integration-defender-for-endpoint>
2. <https://learn.microsoft.com/en-us/rest/api/defenderforcloud/settings/list>
3. <https://learn.microsoft.com/en-us/rest/api/defenderforcloud/settings/update>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-endpoint-security#es-1-use-endpoint-detection-and-response-edr>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-endpoint-security#es-2-use-modern-anti-malware-software>

## Additional Information

**IMPORTANT**: When enabling integration between DfE & DfC it needs to be taken into account that this will have some side effects that may be undesirable.

1. For server 2019 & above if defender is installed (default for these server SKU's) this will trigger a deployment of the new unified agent and link to any of the extended configuration in the Defender portal.
2. If the new unified agent is required for server SKU's of Win 2016 or Linux and lower there is additional integration that needs to be switched on and agents need to be aligned.

**NOTE**: "Microsoft Defender for Endpoint (MDE)" was formerly known as "Windows Defender Advanced Threat Protection (WDATP)." There are a number of places (e.g. Azure CLI) where the "WDATP" acronym is still used within Azure.
