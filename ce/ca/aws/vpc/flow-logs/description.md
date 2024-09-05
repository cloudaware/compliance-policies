# Description

VPC Flow Logs is a feature that enables you to capture information about the IP traffic going to and from network interfaces in your VPC. After you've created a flow log, you can view and retrieve its data in Amazon CloudWatch Logs. It is recommended that VPC Flow Logs be enabled for packet "Rejects" for VPCs.

## Rationale

VPC Flow Logs provide visibility into network traffic that traverses the VPC and can be used to detect anomalous traffic or insight during security workflows.

## Impact

By default, CloudWatch Logs will store Logs indefinitely unless a specific retention period is defined for the log group. When choosing the number of days to retain, keep in mind the average days it takes an organization to realize they have been breached is 210 days (at the time of this writing). Since additional time is required to research a breach, a minimum 365 day retention policy allows time for detection and research. You may also wish to archive the logs to a cheaper storage service rather than simply deleting them. See the following AWS resource to manage CloudWatch Logs retention periods:

1. <https://docs.aws.amazon.com/AmazonCloudWatch/latest/DeveloperGuide/SettingLogRetention.html>

## Audit

Perform the following to determine if VPC Flow logs are enabled:

### From Console

1. Sign into the management console.
2. Select `Services` then `VPC`.
3. In the left navigation pane, select `Your VPCs`.
4. Select a VPC.
5. In the right pane, select the `Flow Logs` tab.
6. Ensure a Log Flow exists that has `Active` in the `Status` column.

### From Command Line

1. Run `describe-vpcs` command (OSX/Linux/UNIX) to list the VPC networks available in the current AWS region:

```sh
aws ec2 describe-vpcs --region <region> --query Vpcs[].VpcId
```

2. The command output returns the `VpcId` available in the selected region.
3. Run `describe-flow-logs` command (OSX/Linux/UNIX) using the VPC ID to determine if the selected virtual network has the Flow Logs feature enabled:

```sh
aws ec2 describe-flow-logs --filter "Name=resource-id,Values=<vpc-id>"
```

4. If there are no Flow Logs created for the selected VPC, the command output will return an `empty list []`.
5. Repeat step 3 for other VPCs available in the same region.
6. Change the region by updating `--region` and repeat steps 1 - 5 for all the VPCs.

## References

1. CCE-79202-8
2. <https://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/flow-logs.html>
