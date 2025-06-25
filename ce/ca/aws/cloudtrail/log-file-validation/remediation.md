# Remediation

Perform one the following to enable log file validation on a given trail:

## Using AWS CloudFormation

- CloudFormation template (YAML):

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Enables log file validation on an existing CloudTrail trail.

Parameters:
  TrailName:
    Type: String
    Description: Name of the existing CloudTrail trail

Resources:
  EnableLogFileValidation:
    Type: AWS::CloudTrail::Trail
    Properties:
      TrailName: !Ref TrailName
      EnableLogFileValidation: true
```

## From Console

1. Sign in to the AWS Management Console and open the IAM console at <https://console.aws.amazon.com/cloudtrail>.
2. Click on `Trails` on the left navigation pane.
3. Click on target trail.
4. Within the `General details` section click `edit`.
5. Under the `Advanced settings` section.
6. Check the enable box under `Log file validation`.
7. Click `Save changes`.

## From Command Line

Enable log file validation on a trail:

```sh
aws cloudtrail update-trail --name <trail_name> --enable-log-file-validation
```

**Note**: periodic validation of logs using these digests can be performed by running the following command:

```sh
aws cloudtrail validate-logs --trail-arn <trail_arn> --start-time <start_time> --end-time <end_time>
```
