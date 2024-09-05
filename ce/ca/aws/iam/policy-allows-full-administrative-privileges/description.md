# Description

IAM policies are the means by which privileges are granted to users, groups, or roles. It is recommended and considered a standard security advice to grant least privilege -that is, granting only the permissions required to perform a task. Determine what users need to do and then craft policies for them that let the users perform only those tasks, instead of allowing full administrative privileges.

## Rationale

It's more secure to start with a minimum set of permissions and grant additional permissions as necessary, rather than starting with permissions that are too lenient and then trying to tighten them later.
Providing full administrative privileges instead of restricting to the minimum set of permissions that the user is required to do exposes the resources to potentially unwanted actions.
IAM policies that have a statement with `"Effect": "Allow"` with `"Action": "*"` over `"Resource": "*"` should be removed.

## Audit

Perform the following to determine what policies are created:

### From Command Line

1. Run the following to get a list of IAM policies:

```sh
aws iam list-policies --only-attached --output text
```

2. For each policy returned, run the following command to determine if any policies is allowing full administrative privileges on the account:

```sh
aws iam get-policy-version --policy-arn <policy_arn> --version-id <version>
```

3. In output ensure policy should not have any Statement block with `"Effect": "Allow"` and `Action` set to `"*"` and `Resource` set to `"*"`.

## References

1. <https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html>
2. <https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html>
3. CCE-78912-3
4. <https://docs.aws.amazon.com/cli/latest/reference/iam/index.html#cli-aws-iam>
