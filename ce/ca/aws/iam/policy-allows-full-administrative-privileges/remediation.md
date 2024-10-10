# Remediation

## From Console

Perform the following to detach the policy that has full administrative privileges:

1. Sign in to the AWS Management Console and open the IAM console at <https://console.aws.amazon.com/iam/>.
2. In the navigation pane, click Policies and then search for the policy name found in the audit step.
3. Select the policy that needs to be deleted.
4. In the policy action menu, select first `Detach`.
5. Select all Users, Groups, Roles that have this policy attached.
6. Click `Detach Policy`.
7. Select the newly detached policy and select `Delete`.

## From Command Line

Perform the following to detach the policy that has full administrative privileges as found in the audit step:

1. Lists all IAM users, groups, and roles that the specified managed policy is attached to.

```sh
aws iam list-entities-for-policy --policy-arn <policy_arn>
```

2. Detach the policy from all IAM Users:

```sh
aws iam detach-user-policy --user-name <iam_user> --policy-arn <policy_arn>
```

3. Detach the policy from all IAM Groups:

```sh
aws iam detach-group-policy --group-name <iam_group> --policy-arn <policy_arn>
```

4. Detach the policy from all IAM Roles:

```sh
aws iam detach-role-policy --role-name <iam_role> --policy-arn <policy_arn>
```
