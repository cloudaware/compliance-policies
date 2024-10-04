# Remediation

## From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Subscriptions`.
3. Select a subscription.
4. Select `Access control (IAM)`.
5. Select `Roles`.
6. Click `Type` and select `Custom role` from the drop-down menu.
7. Check the box next to each role which grants subscription administrator privileges.
8. Select `Delete`.
9. Select `Yes`.

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
