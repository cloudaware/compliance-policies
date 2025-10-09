# Remediation

To remediate this issue, you must configure at least one action for your CloudWatch alarm. The most common action is to send a notification to an Amazon SNS topic.

## Configure an Action

### **From Command Line**

Each action is specified as an Amazon Resource Name (ARN).

```sh
aws cloudwatch put-metric-alarm 
    --alarm-name cpu-mon 
    --alarm-description "{{alarm-description}}"
    --actions-enabled 
    [--ok-actions {{list-of-actions}}]
    [--alarm-actions {{list-of-actions}}]
    [--insufficient-data-actions {{list-of-actions}}]
    --evaluation-periods 2 
    --comparison-operator {{GreaterThanOrEqualToThreshold | LessThanLowerOrGreaterThanUpperThreshold }}
```

## Valid Actions

### **EC2 actions**

- `arn:aws:automate:*region* :ec2:stop`
- `arn:aws:automate:*region* :ec2:terminate`
- `arn:aws:automate:*region* :ec2:reboot`
- `arn:aws:automate:*region* :ec2:recover`
- `arn:aws:swf:*region* :*account-id* :action/actions/AWS_EC2.InstanceId.Stop/1.0`
- `arn:aws:swf:*region* :*account-id* :action/actions/AWS_EC2.InstanceId.Terminate/1.0`
- `arn:aws:swf:*region* :*account-id* :action/actions/AWS_EC2.InstanceId.Reboot/1.0`
- `arn:aws:swf:*region* :*account-id* :action/actions/AWS_EC2.InstanceId.Recover/1.0`

### **Autoscaling action**

- `arn:aws:autoscaling:region :account-id :scalingPolicy:policy-id :autoScalingGroupName/group-friendly-name :policyName/policy-friendly-name`

### **Lambda actions**

- Invoke the latest version of a Lambda function: `arn:aws:lambda:region :account-id :function:function-name`
- Invoke a specific version of a Lambda function: `arn:aws:lambda:region :account-id :function:function-name :version-number`
- Invoke a function by using an alias Lambda function: `arn:aws:lambda:region :account-id :function:function-name :alias-name`

### **SNS notification action**

- `arn:aws:sns:region :account-id :sns-topic-name`

### **SSM integration actions**

- `arn:aws:ssm:region :account-id :opsitem:severity #CATEGORY=*category-name*`
- `arn:aws:ssm-incidents::account-id :responseplan/response-plan-name`
