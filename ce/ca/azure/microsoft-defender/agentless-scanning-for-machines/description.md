# Description

Using disk snapshots, the agentless scanner scans for installed software, vulnerabilities, and plain text secrets.

## Rationale

The Microsoft Defender for Cloud agentless machine scanner provides threat detection, vulnerability detection, and discovery of sensitive information.

## Impact

Agentless scanning for machines requires licensing and is included in these plans:

- Defender CSPM
- Defender for Servers plan 2

## Audit

### From Azure Portal

1. From the Azure Portal `Home` page, select `Microsoft Defender for Cloud`.
2. Under `Management` select `Environment Settings`.
3. Select a subscription.
4. Under `Settings` > `Defender Plans`, click `Settings & monitoring`.
5. Under the Component column, locate the row for `Agentless scanning for machines`.
6. Ensure that `On` is selected.

Repeat the above for any additional subscriptions.

## Default Value

By default, Agentless scanning for machines is `off`.

## References

1. <https://learn.microsoft.com/en-us/azure/defender-for-cloud/concept-agentless-data-collection>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-incident-response#ir-2-preparation---setup-incident-notification>
3. <https://learn.microsoft.com/en-us/azure/defender-for-cloud/enable-agentless-scanning-vms>
