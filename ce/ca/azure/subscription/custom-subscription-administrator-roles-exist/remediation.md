# Remediation

## From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Subscriptions`.
3. Select `Access control (IAM)`.
4. Select `Roles`.
5. Click `Type` and select `CustomRole` from the drop down menu.
6. Check the box next to each role which grants subscription administrator privileges.
7. Select `Remove`.
8. Select `Yes`.

## From Azure CLI

List custom roles:

```sh
az role definition list --custom-role-only True
```

Check for entries with `assignableScope` of the `subscription`, and an action of `*`.

To remove a violating role:

```sh
az role definition delete --name <role name>
```

Note that any role assignments must be removed before a custom role can be deleted. Ensure impact is assessed before deleting a custom role granting subscription administrator privileges.
