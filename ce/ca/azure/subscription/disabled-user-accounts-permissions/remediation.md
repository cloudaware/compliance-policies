# Remediation

## From Azure Portal

1. Go to `Microsoft Entra ID`.
2. Under `Manage`, click `Users`.
3. Click `Add filter`.
4. Click `Account enabled`.
5. Click the toggle switch to set the value to `No`.
6. Click `Apply`.
7. Click the `Display name` of a disabled user account with read, write, or owner roles assigned.
8. Click `Azure role assignments`.
9. Click the name of a read, write, or owner role.
10. Click `Assignments`.
11. Click `Remove` in the row for the disabled user account.
12. Click `Yes`.
13. Repeat steps 7-12 for disabled user accounts requiring remediation.

## From PowerShell

For each account requiring remediation, run the following command to remove an assigned role:

```ps
Remove-AzRoleAssignment -ObjectId $user.ObjectId -RoleDefinitionName <role-definition-name>
```
