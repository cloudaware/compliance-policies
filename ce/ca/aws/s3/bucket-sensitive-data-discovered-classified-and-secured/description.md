# Description

Amazon S3 buckets can contain sensitive data, that for security purposes should be discovered, monitored, classified and protected. Macie along with other 3rd party tools can automatically provide an inventory of Amazon S3 buckets.

## Rationale

Using a Cloud service or 3rd Party software to continuously monitor and automate the process of data discovery and classification for S3 buckets using machine learning and pattern matching is a strong defense in protecting that information.
Amazon Macie is a fully managed data security and data privacy service that uses machine learning and pattern matching to discover and protect your sensitive data in AWS.

## Impact

There is a cost associated with using Amazon Macie. There is also typically a cost associated with 3rd Party tools that perform similar processes and protection.

## Audit

Perform the following steps to determine if Macie is running:

### From Console

1. Login to the Macie console at <https://console.aws.amazon.com/macie/>.
2. In the left hand pane click on By job under findings.
3. Confirm that you have a Job setup for your S3 Buckets.

When you log into the Macie console if you aren't taken to the summary page and you don't have a job setup and running then refer to the remediation procedure below. If you are using a 3rd Party tool to manage and protect your s3 data you meet this recommendation.

## References

1. <https://aws.amazon.com/macie/getting-started/>
2. <https://docs.aws.amazon.com/workspaces/latest/adminguide/data-protection.html>
3. <https://docs.aws.amazon.com/macie/latest/user/data-classification.html>
