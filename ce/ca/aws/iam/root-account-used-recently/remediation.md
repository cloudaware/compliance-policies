# Remediation

Ensure all root account usage is necessary, logged, and secured. For any non-critical tasks, use IAM roles or users.

Consider implementing these steps to effectively minimize the use of root account credentials and enhance the security of your AWS account.

## From Command Line

### Enable MFA for the root account (if not already enabled)

Create the virtual device entity in IAM to represent a virtual MFA device:

```sh
aws iam create-virtual-mfa-device \
--virtual-mfa-device-name {{mfa-device-name}} \
--outfile {{filepath}} \
--bootstrap-method {{bootstrap-method}}
```

Enable an MFA device for use with AWS:

```sh
aws iam enable-mfa-device \
--user-name root \
--serial-number {{mfa-device-arn}} \
--authentication-code1 123456 \
--authentication-code2 789012
```

### Create and use IAM roles for administrative tasks

Define and assign roles with specific permissions instead of relying on root user credentials:

```sh
aws iam create-role --role-name {{admin-role}} --assume-role-policy-document file://{{trust-policy}}.json
aws iam attach-role-policy --role-name {{admin-role}} --policy-arn {{arn:aws:iam::aws:policy/admin-access}}
```

### Disable root account access keys

If root account access keys exist, delete them:

**NOTE**: You must sign in as the AWS account root user, which requires no additional AWS IAM permissions. You can't perform this step as an IAM user or role.

```sh
aws iam delete-access-key --access-key-id {{key-id}}
```
