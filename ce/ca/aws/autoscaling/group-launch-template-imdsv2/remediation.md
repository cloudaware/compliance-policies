# Remediation

To enforce IMDSv2, you must publish a new Launch Template version with `HttpTokens` set to `required` and then point your Auto Scaling Group at that version.

## From Command Line

### Create a New Launch Template Version

Execute the following AWS CLI command to clone the latest Launch Template version and require IMDSv2:

```sh
aws ec2 create-launch-template-version \
    --launch-template-id {{launch-template-id}} \
    --version-description "{{Enforcing IMDSv2}}" \
    --source-version {{latest-version-number}} \
    --launch-template-data '{"MetadataOptions":{"HttpTokens":"required"}}'
```

After running, note the new `new-version-number` from the command output.

### Update the Auto Scaling Group

Point your ASG at the newly created template version:

```sh
aws autoscaling update-auto-scaling-group \
    --auto-scaling-group-name {{auto-scaling-group-name}} \
    --launch-template LaunchTemplateId={{launch-template-id}},Version={{new-version-number}}
```

Replace `new-version-number` with the version number created in the first step.

## Using AWS CloudFormation

The CloudFormation stack:

- Re-publishes your existing Launch Template with `HttpEndpoint: enabled` and `HttpTokens: required`.
- Updates your Auto Scaling Group to point at the new template version.

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Enforce IMDSv2 on EC2 instances launched by an Auto Scaling Group

Parameters:
  LaunchTemplateId:
    Type: String
    Description: The ID of the existing EC2 Launch Template
  AutoScalingGroupName:
    Type: String
    Description: The name of the existing Auto Scaling Group

Resources:

  EnforcedIMDSLaunchTemplate:
    Type: AWS::EC2::LaunchTemplate
    Properties:
      LaunchTemplateId: !Ref LaunchTemplateId
      LaunchTemplateData:
        MetadataOptions:
          HttpEndpoint: enabled
          HttpTokens: required

  UpdatedAutoScalingGroup:
    Type: AWS::AutoScaling::AutoScalingGroup
    Properties:
      AutoScalingGroupName: !Ref AutoScalingGroupName
      LaunchTemplate:
        LaunchTemplateId: !Ref EnforcedIMDSLaunchTemplate
        Version: !GetAtt EnforcedIMDSLaunchTemplate.LatestVersionNumber

Outputs:
  NewLaunchTemplateVersion:
    Description: Version number of the newly enforced IMDSv2 launch template
    Value: !GetAtt EnforcedIMDSLaunchTemplate.LatestVersionNumber
```
