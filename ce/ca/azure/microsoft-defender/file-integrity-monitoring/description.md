# Description

File Integrity Monitoring (FIM) is a feature that monitors critical system files in Windows or Linux for potential signs of attack or compromise.

## Rationale

FIM provides a detection mechanism for compromised files. When FIM is enabled, critical system files are monitored for changes that might indicate a threat actor is attempting to modify system files for lateral compromise within a host operating system.

## Impact

File Integrity Monitoring requires licensing and is included in these plans:

- Defender for Servers plan 2

## Audit

### From Azure Portal

1. From the Azure Portal `Home` page, select `Microsoft Defender for Cloud`.
2. Under `Management` select `Environment Settings`.
3. Select a subscription.
4. Under `Settings` > `Defender Plans`, click `Settings & monitoring`.
5. Under the Component column, locate the row for `File Integrity Monitoring`.
6. Ensure that `On` is selected.

Repeat the above for any additional subscriptions.

## Default Value

By default, Agentless scanning for machines is `off`.

## References

1. <https://learn.microsoft.com/en-us/azure/defender-for-cloud/file-integrity-monitoring-overview>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-incident-response#ir-2-preparation---setup-incident-notification>
3. <https://learn.microsoft.com/en-us/azure/defender-for-cloud/file-integrity-monitoring-enable-defender-endpoint>
