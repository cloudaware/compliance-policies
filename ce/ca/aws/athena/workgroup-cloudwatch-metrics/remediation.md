# Remediation

## From Command Line

To enable CloudWatch metrics for an AWS Athena Workgroup, use the `update-work-group` command and set `PublishCloudWatchMetricsEnabled` to true:

```sh
aws athena update-work-group 
--work-group-name {{work-group-name}} 
--configuration-updates '{"PublishCloudWatchMetricsEnabled": true}'
```
