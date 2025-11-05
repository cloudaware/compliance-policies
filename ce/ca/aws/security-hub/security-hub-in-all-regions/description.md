# Description

Security Hub collects security data from across AWS accounts, services, and supported third-party partner products and helps you analyze your security trends and identify the highest priority security issues. When you enable Security Hub, it begins to consume, aggregate, organize, and prioritize findings from AWS services that you have enabled, such as Amazon GuardDuty, Amazon Inspector, and Amazon Macie. You can also enable integrations with AWS partner security products.

## Rationale

AWS Security Hub provides you with a comprehensive view of your security state in AWS and helps you check your environment against security industry standards and best practices - enabling you to quickly assess the security posture across your AWS accounts.

## Impact

It is recommended AWS Security Hub be enabled in all regions. AWS Security Hub requires AWS Config to be enabled.

## Audit

The process to evaluate AWS Security Hub configuration per region

### From Console

1. Sign in to the AWS Management Console and open the AWS Security Hub console at <https://console.aws.amazon.com/securityhub/>.
2. On the top right of the console, select the target Region.
3. If presented with the Security Hub > Summary page then Security Hub is set-up for the selected region.
4. If presented with Setup Security Hub or Get Started With Security Hub - follow the online instructions.
5. Repeat steps 2 to 4 for each region.

### From Command Line

Run the following to list the Securityhub status:

```sh
aws securityhub describe-hub
```

This will list the Securityhub status by region. Audit for the presence of a `SubscribedAt` value

Example output:

```json
{
  "HubArn": "<Securityhub ARN>",
  "SubscribedAt": "2022-08-19T17:06:42.398Z",
  "AutoEnableControls": true
}
```

An error will be returned if Securityhub is not enabled.

Example error:

```txt
An error occurred (InvalidAccessException) when calling the DescribeHub operation: Account <Account ID> is not subscribed to AWS Security Hub
```

## References

1. <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-get-started.html>
2. <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-enable.html#securityhub-enable-api>
3. <https://awscli.amazonaws.com/v2/documentation/api/latest/reference/securityhub/enable-security-hub.html>
