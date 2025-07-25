# Remediation

## From Command Line

### Option 1: Enable Auto Scaling for Provisioned Mode

#### Register a Scalable Target

Use the following command to register a scalable target for the specified read or write capacity of your DynamoDB table:

```sh
aws application-autoscaling register-scalable-target \
    --service-namespace dynamodb \
    --resource-id "table/{{dynamodb-table-name}}" \
    --scalable-dimension "{{dynamodb:table:WriteCapacityUnits/ReadCapacityUnits}}" \
    --min-capacity 5 \
    --max-capacity 10
```

#### Define a Scaling Policy

Create a JSON file named `{{scaling-policy}}.json` that defines the target tracking scaling policy. The policy configuration should include:

- `PredefinedMetricSpecification` - Specifies the predefined metric to be tracked. The valid values include:
  - DynamoDBReadCapacityUtilization
  - DynamoDBWriteCapacityUtilization
- `ScaleOutCooldown` - Cooldown period (in seconds) to wait after a scale-out event.
- `ScaleInCooldown` - Cooldown period (in seconds) to wait after a scale-in event.
- `TargetValue` - Desired utilization percentage.

Example `scaling-policy.json`:

```json
{
    "PredefinedMetricSpecification": {
        "PredefinedMetricType": "{{DynamoDBWriteCapacityUtilization / DynamoDBWriteCapacityUtilization}}"
    },
    "ScaleOutCooldown": 60,
    "ScaleInCooldown": 60,
    "TargetValue": 50.0
}  
```

#### Attach the Scaling Policy

Apply the policy using the following command:

```sh
aws application-autoscaling put-scaling-policy \
    --service-namespace dynamodb \
    --resource-id "table/{{dynamodb-table-name}}" \
    --scalable-dimension "{{dynamodb:table:WriteCapacityUnits/ReadCapacityUnits}}" \
    --policy-name "{{policy-name}}" \
    --policy-type "TargetTrackingScaling" \
    --target-tracking-scaling-policy-configuration file://{{scaling-policy}}.json
```

### Option 2: Switch to On-Demand (PAY_PER_REQUEST) Mode

Alternatively, you can change the billing mode of the DynamoDB table to On-Demand, which automatically manages throughput capacity.

```sh
aws dynamodb update-table \
    --table-name {{dynamodb-table-name}} \
    --billing-mode "PAY_PER_REQUEST"
```

## Using AWS CloudFormation

- CloudFormation template (YAML):

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Enable Auto Scaling for an existing DynamoDB table

Parameters:
  TableName:
    Type: String
    Description: Name of the existing DynamoDB table
  MinCapacity:
    Type: Number
    Default: 5
    Description: Minimum provisioned capacity units
  MaxCapacity:
    Type: Number
    Default: 10
    Description: Maximum provisioned capacity units
  TargetUtilization:
    Type: Number
    Default: 50
    Description: Target utilization percentage for Auto Scaling
  AccountId:
    Type: String
    Description: AWS account ID where the DynamoDB table resides

Resources:

  DynamoDBReadScalableTarget:
    Type: AWS::ApplicationAutoScaling::ScalableTarget
    Properties:
      MaxCapacity: !Ref MaxCapacity
      MinCapacity: !Ref MinCapacity
      ResourceId: !Sub table/${TableName}
      RoleARN: !Sub arn:aws:iam::${AccountId}:role/aws-service-role/dynamodb.application-autoscaling.amazonaws.com/AWSServiceRoleForApplicationAutoScaling_DynamoDBTable
      ScalableDimension: dynamodb:table:ReadCapacityUnits
      ServiceNamespace: dynamodb

  DynamoDBWriteScalableTarget:
    Type: AWS::ApplicationAutoScaling::ScalableTarget
    Properties:
      MaxCapacity: !Ref MaxCapacity
      MinCapacity: !Ref MinCapacity
      ResourceId: !Sub table/${TableName}
      RoleARN: !Sub arn:aws:iam::${AccountId}:role/aws-service-role/dynamodb.application-autoscaling.amazonaws.com/AWSServiceRoleForApplicationAutoScaling_DynamoDBTable
      ScalableDimension: dynamodb:table:WriteCapacityUnits
      ServiceNamespace: dynamodb

  DynamoDBReadScalingPolicy:
    Type: AWS::ApplicationAutoScaling::ScalingPolicy
    Properties:
      PolicyName: !Sub ${TableName}-ReadAutoScalingPolicy
      PolicyType: TargetTrackingScaling
      ScalingTargetId: !Ref DynamoDBReadScalableTarget
      TargetTrackingScalingPolicyConfiguration:
        PredefinedMetricSpecification:
          PredefinedMetricType: DynamoDBReadCapacityUtilization
        TargetValue: !Ref TargetUtilization
        ScaleInCooldown: 60
        ScaleOutCooldown: 60

  DynamoDBWriteScalingPolicy:
    Type: AWS::ApplicationAutoScaling::ScalingPolicy
    Properties:
      PolicyName: !Sub ${TableName}-WriteAutoScalingPolicy
      PolicyType: TargetTrackingScaling
      ScalingTargetId: !Ref DynamoDBWriteScalableTarget
      TargetTrackingScalingPolicyConfiguration:
        PredefinedMetricSpecification:
          PredefinedMetricType: DynamoDBWriteCapacityUtilization
        TargetValue: !Ref TargetUtilization
        ScaleInCooldown: 60
        ScaleOutCooldown: 60
```
