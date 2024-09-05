# Description

AWS CloudShell is a convenient way of running CLI commands against AWS services. AWSCloudShellFullAccess managed IAM policy provides full access to CloudShell, which allows file upload and download capability between a user's local system and the CloudShell environment. Within the CloudShell environment a user has sudo permissions, and can access the internet. So it is feasible to install file transfer software (for example) and move data from CloudShell to external internet servers.

## Rationale

Access to this policy should be restricted as it presents a potential channel for data exfiltration by malicious cloud admins that are given full permissions to the service. AWS documentation describes how to create a more restrictive IAM policy which denies file transfer permissions.

## Audit

### From Console

1. Open the IAM console at <https://console.aws.amazon.com/iam/>.
2. In the left pane, select `Policies`.
3. Search for and select `AWSCloudShellFullAccess`.
4. On the `Entities` attached tab, ensure that there are no entities using this policy.

### From Command Line

1. List IAM policies, filter for the `AWSCloudShellFullAccess` managed policy, and note the `Arn` element value:

```sh
aws iam list-policies --query "Policies[?PolicyName == 'AWSCloudShellFullAccess']"
```

2. Check if the `AWSCloudShellFullAccess` policy is attached to any role:

```sh
aws iam list-entities-for-policy --policy-arn arn:aws:iam::aws:policy/AWSCloudShellFullAccess
```

3. In Output, Ensure `PolicyRoles` returns empty.

Example:

```
PolicyRoles: [ ]
```

**Note**: Keep in mind that other policies may grant access.

## References

1. <https://docs.aws.amazon.com/cloudshell/latest/userguide/sec-auth-with-identities.html>
