# Description

Ensure that any roles granting read, write, or owner permissions are removed from disabled Azure user accounts.

While an automated assessment procedure exists for this recommendation, the assessment status remains manual. Removing role assignments from disabled user accounts depends on the context and requirements of each organization and environment.

## Rationale

Disabled accounts should not retain access to resources, as this poses a security risk. Removing role assignments mitigates potential unauthorized access and enforces the principle of least privilege.

## Impact

Ensure disabled accounts are not relied on for break glass or automated processes before removing roles to avoid service disruption.

## Audit

### From Azure Portal

1. Go to `Microsoft Entra ID`.
2. Under `Manage`, click `Users`.
3. Click `Add filter`.
4. Click `Account enabled`.
5. Click the toggle switch to set the value to `No`.
6. Click `Apply`.
7. Click the `Display name` of a disabled user account.
8. Click `Azure role assignments`.
9. Ensure that no read, write, or owner roles are assigned to the user account.
10. Repeat steps 7-9 for each disabled user account.

### From PowerShell

Run the following command to connect to Microsoft Entra ID:

```ps
Connect-AzureAD
```

Run the following command to list users:

```ps
Get-AzureADUser
```

Run the following command to get a user:

```ps
$user = Get-AzureADUser -ObjectId <object-id>
```

Run the following command to get the AccountEnabled setting for the user:

```ps
 $user.AccountEnabled
```

If AccountEnabled is False, run the following command to get the role assignments for the user:

```ps
Get-AzRoleAssignment -ObjectId $user.ObjectId
```

Ensure that no read, write, or owner roles are assigned to the user.
Repeat for each user.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [0cfea604-3201-4e14-88fc-fae4c427a6c5](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F0cfea604-3201-4e14-88fc-fae4c427a6c5) - **Name**: `Blocked accounts with owner permissions on Azure resources should be removed`
- **Policy ID**: [8d7e1fde-fe26-4b5f-8108-f8e432cbc2be](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F8d7e1fde-fe26-4b5f-8108-f8e432cbc2be) - **Name**: `Blocked accounts with read and write permissions on Azure resources should be removed`

## Default Value

Disabled user accounts retain their prior role assignments.

## References

1. <https://learn.microsoft.com/en-us/powershell/module/az.resources/get-azaduser>
2. <https://learn.microsoft.com/en-us/powershell/module/az.resources/get-azroleassignment>
3. <https://learn.microsoft.com/en-us/powershell/module/az.resources/remove-azroleassignment>
