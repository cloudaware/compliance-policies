# Remediation

## From Azure Portal

1. Go to `Microsoft Entra ID`.
2. Under `Monitoring`, click `Diagnostic settings`.
3. Click `+ Add diagnostic setting`.
4. Provide a `Diagnostic setting name`.
5. Under `Logs > Categories`, check the box next to each of the following logs:

    - `AuditLogs`
    - `SignInLogs`
    - `NonInteractiveUserSignInLogs`
    - `ServicePrincipalSignInLogs`
    - `ManagedIdentitySignInLogs`
    - `ProvisioningLogs`
    - `ADFSSignInLogs`
    - `RiskyUsers`
    - `UserRiskEvents`
    - `NetworkAccessTrafficLogs`
    - `RiskyServicePrincipals`
    - `ServicePrincipalRiskEvents`
    - `EnrichedOffice365AuditLogs`
    - `MicrosoftGraphActivityLogs`
    - `RemoteNetworkHealthLogs`
    - `NetworkAccessAlerts`

6. Configure an appropriate destination for the logs.
7. Click `Save`.
