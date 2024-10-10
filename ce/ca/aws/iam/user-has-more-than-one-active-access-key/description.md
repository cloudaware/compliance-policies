# Description

Access keys are long-term credentials for an IAM user or the AWS account root user. You can use access keys to sign programmatic requests to the AWS CLI or AWS API (directly or using the AWS SDK)

## Rationale

One of the best ways to protect your account is to not allow users to have multiple
access keys.

## Audit

### From Console

1. Sign in to the AWS Management Console and navigate to IAM dashboard at <https://console.aws.amazon.com/iam/>.
2. In the left navigation panel, choose `Users`.
3. Click on the IAM user name that you want to examine.
4. On the IAM user configuration page, select `Security Credentials` tab.
5. Under `Access Keys`section, in the Status column, check the current status for each access key associated with the IAM user. If the selected IAM user has more than one access key activated then the users access configuration does not adhere to security best practices and the risk of accidental exposures increases.

- Repeat steps no. 3 – 5 for each IAM user in your AWS account.

### From Command Line

1. Run `list-users` command to list all IAM users within your account:

```sh
aws iam list-users --query "Users[*].UserName"
```

The command output should return an array that contains all your IAM user names.

2. Run `list-access-keys` command using the IAM user name list to return the current status of each access key associated with the selected IAM user:

```sh
aws iam list-access-keys --user-name <user-name>
```

The command output should expose the metadata `("Username", "AccessKeyId", "Status", "CreateDate")` for each access key on that user account.

3. Check the `Status` property value for each key returned to determine each keys current state. If the `Status` property value for more than one IAM access key is set to `Active`, the user access configuration does not adhere to this recommendation, refer to the remediation below.

- Repeat steps no. 2 and 3 for each IAM user in your AWS account.

## References

1. <https://docs.aws.amazon.com/general/latest/gr/aws-access-keys-best-practices.html>
2. <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html>
