# Description

AWS IAM users can access AWS resources using different types of credentials, such as passwords or access keys. It is recommended that all credentials that have been unused in 45 or greater days be deactivated or removed.

## Rationale

Disabling or removing unnecessary credentials will reduce the window of opportunity for credentials associated with a compromised or abandoned account to be used.

## Audit

Perform the following to determine if unused credentials exist:

### From Console

1. Login to the AWS Management Console.
2. Click `Services`.
3. Click `IAM`.
4. Click on `Users`.
5. Click the `Settings` (gear) icon.
6. Select `Console last sign-in`, `Access key last used`, and `Access Key Id`.
7. Click on `Close`.
8. Check and ensure that `Console last sign-in` is less than 45 days ago.

**Note**: `Never` means the user has never logged in.

9. Check and ensure that `Access key age` is less than `45` days and that `Access key last used` does not say `None`.

If the user hasn't signed into the Console in the last `45` days or Access keys are over 45 days old refer to the remediation.

### From Command Line

#### Download Credential Report

1. Run the following commands:

```sh
aws iam generate-credential-report
```

```sh
aws iam get-credential-report --query 'Content' --output text | base64 -d | cut -d, -f1,4,5,6,9,10,11,14,15,16 | grep -v '^<root_account>'
```

#### Ensure unused credentials do not exist

2. For each user having `password_enabled` set to `TRUE` , ensure `password_last_used_date` is less than `45` days ago.

- When `password_enabled` is set to `TRUE` and `password_last_used` is set to `No_Information` , ensure `password_last_changed` is less than `45` days ago.

3. For each user having an `access_key_1_active` or `access_key_2_active` to `TRUE` , ensure the corresponding `access_key_n_last_used_date` is less than `45` days ago.

- When a user having an `access_key_x_active` (where x is 1 or 2) to `TRUE` and corresponding `access_key_x_last_used_date` is set to `N/A`, ensure `access_key_x_last_rotated` is less than `45` days ago.

## References

1. CCE-78900-8
2. <https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#remove-credentials>
3. <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_finding-unused.html>
4. <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_passwords_admin-change-user.html>
5. <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html>

## Additional Information

`root_account` is excluded in the audit since the root account should not be used for day to day business and would likely be unused for more than 45 days.
