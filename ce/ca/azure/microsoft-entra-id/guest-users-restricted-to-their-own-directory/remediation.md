# Remediation

## From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID`.
3. Then `External Identities`.
4. Select `External collaboration settings`.
5. Under `Guest user access`, change `Guest user access restrictions` to be `Guest user access is restricted to properties and memberships of their own directory objects`.

## From PowerShell

1. From a PowerShell session enter:

```ps
Set-AzureADMSAuthorizationPolicy -GuestUserRoleId '2af84b1e-32c8-42b7-82bc-daa82404023b'
```

2. Check that the setting was applied by entering:

```ps
Get-AzureADMSAuthorizationPolicy
```

3. Make certain that the `GuestUserRoleId` is equal to the earlier entered value of `2af84b1e-32c8-42b7-82bc-daa82404023b`.
