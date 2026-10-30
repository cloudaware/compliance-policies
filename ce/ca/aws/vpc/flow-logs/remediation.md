# Remediation

## Using AWS CloudFormation

- CloudFormation template (YAML):

**Note**: The IAM role used in `DeliverLogsPermissionArn` must exist before deploying this template.

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Enables flow logging for rejected traffic on a specified VPC, publishing to CloudWatch Logs.

Parameters:
  VPCId:
    Type: String
    Description: ID of the existing VPC
  LogGroupName:
    Type: String
    Default: /vpc/flow-logs
  FlowLogRoleArn:
    Type: String
    Description: >
      ARN of an existing IAM role that grants permission to publish flow logs to CloudWatch Logs.

Resources:
  VPCFlowLog:
    Type: AWS::EC2::FlowLog
    Properties:
      ResourceId: !Ref VPCId
      ResourceType: VPC
      TrafficType: REJECT
      DeliverLogsPermissionArn: !Ref FlowLogRoleArn
      LogGroupName: !Ref LogGroupName
      LogDestinationType: cloud-watch-logs
```

## From Console

1. Sign in to the AWS Management Console.
2. Select `Services`, then `VPC`.
3. In the left navigation pane, select `Your VPCs`.
4. Select a VPC.
5. In the right pane, select the `Flow Logs` tab.
6. If no flow log exists, click `Create Flow Log`.
7. For `Filter`, select `Reject`.
8. Enter a `Role` and `Destination Log Group`.
9. Click `Create flow log`.
10. Click `CloudWatch Logs Group`.

**Note**: Setting the filter to `Reject` will significantly reduce log volume while still providing sufficient information for breach detection, investigation, and remediation. During periods of least-privilege security group engineering, setting the filter to `All` can be helpful in discovering existing traffic flows required for proper operation of a running environment.

## From Command Line

1. Create a policy document and name it as `role_policy_document.json` and paste the following content:

    ```json
    { 
        "Version": "2012-10-17", 
        "Statement": [ 
            { 
                "Sid": "test", 
                "Effect": "Allow", 
                "Principal": { 
                    "Service": "ec2.amazonaws.com" 
                }, 
            "Action": "sts:AssumeRole" 
            } 
        ] 
    }
    ```

2. Create another policy document and name it as `iam_policy.json` and paste the following content:

    ```json
    { 
        "Version": "2012-10-17", 
        "Statement": [ 
            { 
                "Effect": "Allow", 
                "Action":[ 
                    "logs:CreateLogGroup", 
                    "logs:CreateLogStream", 
                    "logs:DescribeLogGroups", 
                    "logs:DescribeLogStreams", 
                    "logs:PutLogEvents", 
                    "logs:GetLogEvents", 
                    "logs:FilterLogEvents" 
                ], 
                "Resource": "*" 
            } 
        ] 
    }
    ```

3. Run the following command to create an IAM role:

    ```sh
    aws iam create-role \
        --role-name {{aws_support_iam_role}} \
        --assume-role-policy-document file://{{file-path}}role_policy_document.json
    ```

4. Run the following command to create an IAM policy:

    ```sh
    aws iam create-policy --policy-name {{ami-policy-name}} --policy-document file://{{file-path}}iam-policy.json
    ```

5. Run the `attach-group-policy` command, using the IAM policy ARN returned in the previous step, to attach the policy to the IAM role (if the command succeeds, no output is returned):

    ```sh
    aws iam attach-group-policy \
        --policy-arn arn:aws:iam::{{aws-account-id}}:policy/{{iam-policy-name}} \
        --group-name {{group-name}}
    ```

    - If the command succeeds, no output is returned.

6. Run `describe-vpcs` to get the VPC ID available in the selected region:

    ```sh
    aws ec2 describe-vpcs --region {{region}}
    ```

    - The command output should return a list of VPCs in the selected region.

7. Run `create-flow-logs` to create a flow log for the VPC:

    ```sh
    aws ec2 create-flow-logs \
        --resource-type VPC \
        --resource-ids {{vpc-id}} \
        --traffic-type REJECT \
        --log-group-name {{log-group-name}} \
        --deliver-logs-permission-arn {{iam-role-arn}}
    ```

8. Repeat step 7 for other VPCs available in the selected region.
9. Change the region by updating `--region` and repeat the remediation procedure for other VPCs.
