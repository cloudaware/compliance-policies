# Description

AWS Config is a web service that performs configuration management of supported AWS resources within your account and delivers log files to you. The recorded information includes the configuration item (AWS resource), relationships between configuration items (AWS resources), any configuration changes between resources. It is recommended AWS Config be enabled in all regions.

## Rationale

The AWS configuration item history captured by AWS Config enables security analysis, resource change tracking, and compliance auditing.

## Impact

Enabling AWS Config in all regions provides comprehensive visibility into resource
configurations, enhancing security and compliance monitoring. However, this may incur
additional costs and require proper configuration management.

## Audit

Process to evaluate AWS Config configuration per region:

### From Console

1. Sign in to the AWS Management Console and open the AWS Config console at <https://console.aws.amazon.com/config/>.
2. On the top right of the console select target Region.
3. If a Config recorder is enabled in this region, you should navigate to the Settings page from the navigation menu on the left hand side. If a Config recorder is not yet enabled in this region then you should select `Get Started`.
4. Ensure `Record all resources supported in this region` is checked.
5. Ensure `Include global resources (e.g., AWS IAM resources)` is checked, unless it is enabled in another region (this is only required in one region)
6. Ensure the correct S3 bucket has been defined.
7. Ensure the correct SNS topic has been defined.
8. Repeat steps 2 to 7 for each region.

### From Command Line

1. Run this command to show all AWS Config recorders and their properties:

```sh
aws configservice describe-configuration-recorders
```

2. Evaluate the output to ensure that all recorders have a `recordingGroup` object which includes `"allSupported": true`. Additionally, ensure that at least one recorder has `"includeGlobalResourceTypes": true`.

**Note**: There is one more parameter `"ResourceTypes"` in recordingGroup object. We don't need to check the same as whenever we set `"allSupported": true`, AWS enforces resource types to be empty (`"ResourceTypes":[]`).

Sample Output:

```json
{ 
    "ConfigurationRecorders": [ 
        { 
            "recordingGroup": { 
                "allSupported": true, 
                "resourceTypes": [],
                "includeGlobalResourceTypes": true 
            },
            "roleARN": "arn:aws:iam::<AWS_Account_ID>:role/service-role/<config-role-name>", 
            "name": "default" 
        } 
    ] 
}
```

3. Run this command to show the status for all AWS Config recorders:

```sh
aws configservice describe-configuration-recorder-status
```

4. In the output, find recorders with `name` key matching the recorders that were evaluated in step 2. Ensure that they include `"recording": true` and `"lastStatus": "SUCCESS"`.

## References

1. CCE-78917-2
2. <https://docs.aws.amazon.com/cli/latest/reference/configservice/describe-configuration-recorder-status.html>
3. <https://docs.aws.amazon.com/cli/latest/reference/configservice/describe-configuration-recorders.html>
4. <https://docs.aws.amazon.com/config/latest/developerguide/gs-cli-prereq.html>
