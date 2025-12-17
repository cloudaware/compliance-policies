# Description

The Defender for Servers plan in Microsoft Defender for Cloud reduces security risk by providing actionable recommendations to improve and remediate machine security posture. Defender for Servers also helps to protect machines against real-time security threats and attacks.

Defender for Servers offers two paid plans:

**Plan 1**

The following components are enabled by default:

- Log Analytics agent (deprecated)
- Endpoint protection

Plan 1 also offers the following components, disabled by default:

- Vulnerability assessment for machines
- Guest Configuration agent (preview)

**Plan 2**

The following components are enabled by default:

- Log Analytics agent (deprecated)
- Vulnerability assessment for machines
- Endpoint protection
- Agentless scanning for machines

Plan 2 also offers the following components, disabled by default:

- Guest Configuration agent (preview)
- File Integrity Monitoring

## Rationale

Enabling Microsoft Defender for Servers allows for greater defense-in-depth, with threat detection provided by the Microsoft Security Response Center (MSRC).

## Impact

Turning on Microsoft Defender for Servers in Microsoft Defender for Cloud incurs an additional cost per resource.

Two Defender for Servers plans exist:

- Plan 1: Subscription only
- Plan 2: Subscription and workspace

## Audit

This policy flags an *Azure Subscription* as `INCOMPLIANT` if the related `Azure Defender Plan` for **Virtual Machines** has its `Pricing Tier` set to **Free**.

A *Subscription* is also marked as `INCOMPLIANT` if the `Defender Plan` for **Virtual Machines** does **not** exist in the CMDB.

## Default Value

By default, Microsoft Defender plan is `off`.

## References

1. <https://learn.microsoft.com/en-us/azure/defender-for-cloud/plan-defender-for-servers>
2. <https://learn.microsoft.com/en-us/rest/api/defenderforcloud/pricings/list?view=rest-defenderforcloud-2024-01-01&tabs=HTTP>
3. <https://learn.microsoft.com/en-us/rest/api/defenderforcloud/pricings/update?view=rest-defenderforcloud-2024-01-01&tabs=HTTP>
4. <https://learn.microsoft.com/en-us/powershell/module/az.security/get-azsecuritypricing?view=azps-12.2.0>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-endpoint-security#es-1-use-endpoint-detection-and-response-edr>
