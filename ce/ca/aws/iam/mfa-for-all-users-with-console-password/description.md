# Description

Multi-Factor Authentication (MFA) adds an extra layer of authentication assurance beyond traditional credentials. With MFA enabled, when a user signs in to the AWS Console, they will be prompted for their user name and password as well as for an authentication code from their physical or virtual MFA token. It is recommended that MFA be enabled for all accounts that have a console password.

## Rationale

Enabling MFA provides increased security for console access as it requires the authenticating principal to possess a device that displays a time-sensitive key and have knowledge of a credential.

## Impact

AWS will soon end support for SMS multi-factor authentication (MFA). New customers are not allowed to use this feature. We recommend that existing customers switch to one of the following alternative methods of MFA.

## Audit

Perform the following to determine if a MFA device is enabled for all IAM users having a console password:

### From Console

1. Open the IAM console at <https://console.aws.amazon.com/iam/>.
2. In the left pane, select `Users`.
3. If the `MFA` or `Password age` columns are not visible in the table, click the gear icon at the upper right corner of the table and ensure a checkmark is next to both, then click `Close`.
4. Ensure that for each user where the `Password age` column shows a password age, the `MFA` column shows `Virtual, U2F Security Key`, or `Hardware`.

### From Command Line

1. Run the following command (OSX/Linux/UNIX) to generate a list of all IAM users along with their password and MFA status:

```sh
aws iam generate-credential-report
```

```sh
aws iam get-credential-report --query 'Content' --output text | base64 -d | cut -d, -f1,4,8
```

2. The output of this command will produce a table similar to the following:

|user|password_enabled|mfa_active|
|---|---|---|
|elise|false|false|
|brandon|true|true|
|rakesh|false|false|
|helene|false|false|
|paras|true|true|
|anitha|false|false|

3. For any column having `password_enabled` set to `true` , ensure `mfa_active` is also set to `true`.

## References

1. <https://tools.ietf.org/html/rfc6238>
2. <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html>
3. <https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#enable-mfa-for-privileged-users>
4. <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html>
5. CCE-78901-6
6. <https://blogs.aws.amazon.com/security/post/Tx2SJJYE082KBUK/How-to-Delegate-Management-of-Multi-Factor-Authentication-to-AWS-IAM-Users>

## Additional Information

### Forced IAM User Self-Service Remediation

Amazon has published a pattern that forces users to self-service setup MFA before they have access to their complete permissions set. Until they complete this step, they cannot access their full permissions. This pattern can be used on new AWS accounts. It can also be used on existing accounts - it is recommended users are given instructions and a grace period to accomplish MFA enrollment before active enforcement on existing AWS accounts.
