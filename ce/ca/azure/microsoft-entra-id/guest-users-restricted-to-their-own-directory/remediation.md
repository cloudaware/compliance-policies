# Remediation

## From Azure Portal

1. From Azure Home select the Portal Menu
2. Select `Microsoft Entra ID`
3. Under `Manage`, select `External Identities`
4. Select `External collaboration settings`
5. Under `Guest user access`, set `Guest user access restrictions` to `Guest user access is restricted to properties and memberships of their own directory objects`
6. Click `Save`

## From PowerShell

1. Enter the following to update the policy ID:

    ```ps
    Update-MgPolicyAuthorizationPolicy -GuestUserRoleId "2af84b1e-32c8-42b7-82bc-daa82404023b"
    ```

2. Check the GuestUserRoleId again:

    ```ps
    (Get-MgPolicyAuthorizationPolicy).GuestUserRoleId
    ```

3. Ensure that the `GuestUserRoleId` is equal to the earlier entered value of `2af84b1e-32c8-42b7-82bc-daa82404023b`.
