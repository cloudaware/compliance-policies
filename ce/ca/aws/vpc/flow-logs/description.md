# Description

VPC Flow Logs capture information about IP traffic going to and from network interfaces in your VPC. After you create a flow log, you can view and retrieve its data in Amazon CloudWatch Logs. It is recommended that VPC Flow Logs be enabled for packet rejects for VPCs.

## Rationale

VPC Flow Logs provide visibility into network traffic that traverses the VPC and can be used to detect anomalous traffic or support security investigations.

## Impact

By default, CloudWatch Logs stores logs indefinitely unless a specific retention period is defined for the log group. When choosing a retention period, keep in mind that the average time to detect a breach is 210 days (at the time of this writing). Because additional time is required to investigate a breach, a minimum 365-day retention policy allows time for detection and research. You may also wish to archive logs to a lower-cost storage service rather than deleting them. See the following AWS resource to manage CloudWatch Logs retention periods:

1. <https://docs.aws.amazon.com/AmazonCloudWatch/latest/DeveloperGuide/SettingLogRetention.html>

## Audit

Perform the following to determine if VPC Flow Logs are enabled:

### From Console

1. Sign in to the management console.
2. Select `Services` then `VPC`.
3. In the left navigation pane, select `Your VPCs`.
4. Select a VPC.
5. In the right pane, select the `Flow Logs` tab.
6. Ensure a flow log exists that has `Active` in the `Status` column.

### From Command Line

1. Run `describe-vpcs` command to list the VPC networks available in the current AWS region:

    ```sh
    aws ec2 describe-vpcs --region <region> --query Vpcs[].VpcId
    ```

2. The command output returns the `VpcId` available in the selected region.
3. Run `describe-flow-logs` command using the VPC ID to determine if the selected virtual network has the Flow Logs feature enabled:

    ```sh
    aws ec2 describe-flow-logs --filter "Name=resource-id,Values=<vpc-id>"
    ```

4. If there are no Flow Logs created for the selected VPC, the command output will return an `empty list []`.
5. Repeat step 3 for other VPCs available in the same region.
6. Change the region by updating `--region` and repeat steps 1-5 for all VPCs.

## References

1. CCE-79202-8
2. <https://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/flow-logs.html>
