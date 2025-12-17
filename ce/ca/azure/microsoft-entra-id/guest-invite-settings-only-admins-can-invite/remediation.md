# Remediation

## From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID`.
3. Under `Manage`, select `External Identities`
4. Select `External collaboration settings`
5. Under `Guest invite settings`, set `Guest invite restrictions` to either `Only users assigned to specific admin roles can invite guest users` or `No one in the organization [...]`
6. Click `Save`

## From Powershell

Enter the following:

```ps
Connect-MgGraph Update-MgPolicyAuthorizationPolicy -AllowInvitesFrom "adminsAndGuestInviters"
```

Alternatively, to set this to the most restrictive `No one in the organization [...]` enter the following:

```ps
Connect-MgGraph Update-MgPolicyAuthorizationPolicy -AllowInvitesFrom "none"
```
