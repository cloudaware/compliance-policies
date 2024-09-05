# Description

CloudTrail log file validation creates a digitally signed digest file containing a hash of each log that CloudTrail writes to S3. These digest files can be used to determine whether a log file was changed, deleted, or unchanged after CloudTrail delivered the log. It is recommended that file validation be enabled on all CloudTrails.

## Rationale

Enabling log file validation will provide additional integrity checking of CloudTrail logs.

## Audit

Perform the following on each trail to determine if log file validation is enabled:

### From Console

1. Sign in to the AWS Management Console and open the IAM console at <https://console.aws.amazon.com/cloudtrail>.
2. Click on `Trails` on the left navigation pane.
3. For Every Trail:

- Click on a trail via the link in the Name column.
- Under the `General details` section, ensure `Log file validation` is set to `Enabled`.

### From Command Line

```sh
aws cloudtrail describe-trails
```

Ensure `LogFileValidationEnabled` is set to `true` for each trail.

## Default Value

Not Enabled.

## References

1. <https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-enabling.html>
2. CCE-78914-9
