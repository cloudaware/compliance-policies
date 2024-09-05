# Description

AWS provides a support center that can be used for incident notification and response, as well as technical support and customer services. Create an IAM Role, with the appropriate policy assigned, to allow authorized users to manage incidents with AWS Support.

## Rationale

By implementing least privilege for access control, an IAM Role will require an appropriate IAM Policy to allow Support Center Access in order to manage Incidents with AWS Support.

## Impact

All AWS Support plans include an unlimited number of account and billing support cases, with no long-term contracts. Support billing calculations are performed on a per-account basis for all plans. Enterprise Support plan customers have the option to include multiple enabled accounts in an aggregated monthly billing calculation. Monthly charges for the Business and Enterprise support plans are based on each month's AWS usage charges, subject to a monthly minimum, billed in advance.

When assigning rights, keep in mind that other policies may grant access to Support as well. This may include AdministratorAccess and other policies including customer managed policies. Utilizing the AWS managed 'AWSSupportAccess' role is one simple way of ensuring that this permission is properly granted.

To better support the principle of separation of duties, it would be best to only attach this role where necessary.

## Audit

### From Command Line

1. List IAM policies, filter for the `AWSSupportAccess` managed policy, and note the `Arn` element value:

```sh
aws iam list-policies --query "Policies[?PolicyName == 'AWSSupportAccess']"
```

2. Check if the `AWSSupportAccess` policy is attached to any role:

```sh
aws iam list-entities-for-policy --policy-arn arn:aws:iam::aws:policy/AWSSupportAccess
```

3. In Output, Ensure `PolicyRoles` does not return empty.

Example:

```
PolicyRoles: [ ]'
```

If it returns empty refer to the remediation.

## References

1. <https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html>
2. <https://aws.amazon.com/premiumsupport/pricing/>
3. <https://docs.aws.amazon.com/cli/latest/reference/iam/list-policies.html>
4. <https://docs.aws.amazon.com/cli/latest/reference/iam/attach-role-policy.html>
5. <https://docs.aws.amazon.com/cli/latest/reference/iam/list-entities-for-policy.html>

## Additional Information

AWSSupportAccess policy is a global AWS resource. It has same ARN as arn:aws:iam::aws:policy/AWSSupportAccess for every account.
