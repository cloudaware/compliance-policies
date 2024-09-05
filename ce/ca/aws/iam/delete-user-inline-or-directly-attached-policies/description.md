# Description

IAM users are granted access to services, functions, and data through IAM policies. There are four ways to define policies for a user:

1) Edit the user policy directly, aka an inline, or user, policy.
2) Attach a policy directly to a user.
3) Add the user to an IAM group that has an attached policy.
4) Add the user to an IAM group that has an inline policy.

Only the third implementation is recommended.

## Rationale

Assigning IAM policy only through groups unifies permissions management to a single, flexible layer consistent with organizational functional roles. By unifying permissions management, the likelihood of excessive permissions is reduced.

## Audit

Perform the following to determine if an inline policy is set or a policy is directly attached to users:

1. Run the following to get a list of IAM users:

```sh
aws iam list-users --query 'Users[*].UserName' --output text
```

2. For each user returned, run the following command to determine if any policies are attached to them:

```sh
aws iam list-attached-user-policies --user-name <iam_user>
```

```sh
aws iam list-user-policies --user-name <iam_user>
```

3. If any policies are returned, the user has an inline policy or direct policy attachment.

## References

1. <http://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html>
2. <http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html>
3. CCE-78912-3
