# Remediation

## From Azure Portal

1. In the Azure portal, open a subscription or resource group where you want the custom role to be assigned.
2. Select `Access control (IAM)`.
3. Click `Add`.
4. Select `Add custom role`.
5. In the `Custom Role Name` field enter `Resource Lock Administrator`.
6. In the `Description` field enter `Can Administer Resource Locks`.
7. For `Baseline permissions` select `Start from scratch`
8. Select `Next`.
9. Click `Add permissions`.
10. In the `Search for a permission` box, type `Microsoft.Authorization/locks`.
11. Click on the result.
12. Check the box next to `Permission`.
13. Click `Add`.
14. Click `Review + create`.
15. Click `Create`.
16. Click `OK`.
17. Click `+ Add`.
18. Click `Add role assignment`.
19. In the `Search by role name, description, permission, or ID` box, type `Resource Lock Administrator`.
20. Select the role.
21. Click `Next`.
22. Click `+ Select members`.
23. Select appropriate members.
24. Click `Select`.
25. Click `Review + assign`.
26. Click `Review + assign` again.
27. Repeat steps 1-26 for each subscription or resource group requiring remediation.

## From PowerShell

Below is a power shell definition for a resource lock administrator role created at an Azure Management group level:

```ps
Import-Module Az.Accounts Connect-AzAccount $role = Get-AzRoleDefinition "User Access Administrator" $role.Id = $null $role.Name = "Resource Lock Administrator" $role.Description = "Can Administer Resource Locks" $role.Actions.Clear() $role.Actions.Add("Microsoft.Authorization/locks/*") $role.AssignableScopes.Clear() * Scope at the Management group level Management group $role.AssignableScopes.Add("/providers/Microsoft.Management/managementGroups/MG-Name") New-AzRoleDefinition -Role $role Get-AzureRmRoleDefinition "Resource Lock Administrator"
```
