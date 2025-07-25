# Remediation

## From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Subscriptions`.
3. Select a subscription.
4. Select `Access control (IAM)`.
5. Look for the following banner at the top of the page: `Action required: X users have elevated access in your tenant. You should take immediate action and remove all role assignments with elevated access.`
6. Click `View role assignments`.
7. Click `Remove`.

## From Azure CLI

Run the following command:

```sh
az role assignment delete --role "User Access Administrator" --scope "/"
```
