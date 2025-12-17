# Remediation

## From Azure Portal

1. Go to `Subscriptions`.
2. Click the name of a subscription.
3. Click `Access Controls (IAM)`.
4. Click `Role assignments`.
5. Click `Role : All`.
6. Click the arrow next to `All`.
7. Click `Owner`.
8. Check the box next to members from whom the owner role should be removed.
9. Click `Delete`.
10. Click `Yes`.
11. Repeat steps 1-10 for each subscription requiring remediation.

## From Azure CLI

Run the following command to delete role assignments by role assignment id:

```sh
az role assignment delete --ids {{id1 id2}}
```
