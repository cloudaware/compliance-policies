# Remediation

## From Azure Portal

1. Go to `Intune`.
2. Click `Reports`.
3. Under `Azure monitor`, click `Diagnostic settings`.
4. Click `+ Add diagnostic setting`.
5. Provide a `Diagnostic setting name`.
6. Under `Logs > Categories`, check the box next to each of the following logs:

    - `AuditLogs`
    - `OperationalLogs`
    - `DeviceComplianceOrg`
    - `Devices`
    - `Windows365AuditLogs`

7. Under `Destination details`, check the box next to `Send to Log Analytics workspace`.
8. Select a `Subscription`.
9. Select a `Log Analytics workspace`.
10. Click `Save`.
