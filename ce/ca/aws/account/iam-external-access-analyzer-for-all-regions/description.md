# Description

Enable IAM Access Analyzer for IAM policies about all resources in each active AWS region.

IAM Access Analyzer is a technology introduced at AWS re:Invent 2019. After the analyzer is enabled in IAM, scan results show the accessible resources. Scans show resources that other accounts and federated users can access, such as KMS keys and IAM roles. These results help you determine unintended access and make it easier for administrators to monitor least-privilege access. Access Analyzer analyzes only policies that are applied to resources in the same AWS Region.

## Rationale

AWS IAM Access Analyzer helps you identify the resources in your organization and accounts, such as Amazon S3 buckets or IAM roles, that are shared with an external entity. This lets you identify unintended access to your resources and data. Access Analyzer identifies resources that are shared with external principals by using logic-based reasoning to analyze the resource-based policies in your AWS environment. IAM Access Analyzer continuously monitors all policies for S3 bucket, IAM roles, KMS (Key Management Service) keys, AWS Lambda functions, and Amazon SQS(Simple Queue Service) queues.

## Audit

### From Console

1. Open the IAM console at <https://console.aws.amazon.com/iam/>.
2. Choose `Access analyzer`.
3. Click `Analyzers`.
4. Ensure that at least one analyzer is present.
5. Ensure that the `STATUS` is set to `Active`.
6. Repeat these step for each active region.

### From Command Line

1. Run the following command:

    ```sh
    aws accessanalyzer list-analyzers | grep status
    ```

2. Ensure that at least one analyzer has `status` set to `ACTIVE`.
3. Repeat the steps above for each active region.

If an Access Analyzer is not listed for each region or the status is not set to active refer
to the remediation procedure below.

## References

1. <https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html>
2. <https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-getting-started.html>
3. <https://docs.aws.amazon.com/cli/latest/reference/accessanalyzer/get-analyzer.html>
4. <https://docs.aws.amazon.com/cli/latest/reference/accessanalyzer/create-analyzer.html>

## Additional Information

Some regions in AWS are enabled by default and some are disabled by default. Regions introduced prior to March 20, 2019 are enabled by default and cannot be disabled. Regions introduced after can be disabled by default. For more information on managing AWS Regions, please see AWS's [documentation on managing AWS Regions](https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-regions.html).
