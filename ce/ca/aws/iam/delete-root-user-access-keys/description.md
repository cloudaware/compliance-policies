# Description

The root user account is the most privileged user in an AWS account. AWS Access Keys provide programmatic access to a given AWS account. It is recommended that all access keys associated with the root user account be deleted.

## Rationale

Deleting access keys associated with the root user account limits vectors by which the account can be compromised. Additionally, deleting the root access keys encourages the creation and use of role based accounts that are least privileged.

## Audit

Perform the following to determine if the root user account has access keys:

### From Console

1. Login to the AWS Management Console.
2. Click `Services`.
3. Click `IAM`.
4. Click on `Credential Report`.
5. This will download a `.csv` file which contains credential usage for all IAM users within an AWS Account - open this file.
6. For the `<root_account>` user, ensure the `access_key_1_active` and `access_key_2_active` fields are set to `FALSE`.

### From Command Line

Run the following command:

```sh
aws iam get-account-summary | grep "AccountAccessKeysPresent"
```

If no `root` access keys exist the output will show `"AccountAccessKeysPresent": 0,`. If the output shows a `1`, then `root` keys exist and should be deleted.

## References

1. <http://docs.aws.amazon.com/general/latest/gr/aws-access-keys-best-practices.html>
2. <http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html>
3. <http://docs.aws.amazon.com/IAM/latest/APIReference/API_GetAccountSummary.html>
4. CCE-78910-7
5. <https://aws.amazon.com/blogs/security/an-easier-way-to-determine-the-presence-of-aws-account-access-keys/>

## Additional Information

Root User account for us-gov cloud regions is not enabled by default. However, on request to AWS support enables root access only through access-keys (CLI, API methods) for us-gov cloud region.
