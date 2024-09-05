# Description

With the creation of an AWS account, a root user is created that cannot be disabled or deleted. That user has unrestricted access to and control over all resources in the AWS account. It is highly recommended that the use of this account be avoided for everyday tasks.

## Rationale

The root user has unrestricted access to and control over all account resources. Use of it is inconsistent with the principles of least privilege and separation of duties, and can lead to unnecessary harm due to error or account compromise.

## Audit

### From Console

1. Login to the AWS Management Console at <https://console.aws.amazon.com/iam/>.
2. In the left pane, click `Credential Report`.
3. Click on `Download Report`.
4. Open of Save the file locally.
5. Locate the `<root account>` under the user column.
6. Review `password_last_used`, `access_key_1_last_used_date`, `access_key_2_last_used_date` to determine when the root user was last used.

### From Command Line

Run the following CLI commands to provide a credential report for determining the last time the root user was used:

```sh
aws iam generate-credential-report
```

```sh
aws iam get-credential-report --query 'Content' --output text | base64 -d | cut -d, -f1,5,11,16 | grep -B1 '<root_account>'
```

Review `password_last_used`, `access_key_1_last_used_date`, `access_key_2_last_used_date` to determine when the root user was last used.

### Note

There are a few conditions under which the use of the root user account is required. Please see the reference links for all of the tasks that require use of the root user.

## References

1. <https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html>
2. <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html>
3. <https://docs.aws.amazon.com/general/latest/gr/aws_tasks-that-require-root.html>

## Additional Information

The root user for us-gov cloud regions is not enabled by default. However, on request to AWS support, they can enable the root user and grant access only through access-keys (CLI, API methods) for us-gov cloud region. If the root user for us-gov cloud regions is enabled, this recommendation is applicable.

Monitoring usage of the root user can be accomplished by implementing recommendation 3.3 Ensure a log metric filter and alarm exist for usage of the root user.
