# Remediation

Follow these steps to migrate an Auto Scaling Group from a legacy Launch Configuration to a Launch Template.

## From Command Line

### Export the Existing Launch Configuration

```sh
aws autoscaling describe-launch-configurations \
    --launch-configuration-names {{launch-configuration-name}} \
    --query 'LaunchConfigurations[0]' \
    --output json > {{lc-export.json}}
```

**Note**: Modify the JSON schema to match the Launch TempTemplate since the configuration object includes extra fields that EC2’s `create-launch-template` will reject, and some keys need renaming.

### Create the Launch Template

```sh
aws ec2 create-launch-template \
    --launch-template-name {{launch-template-name}} \
    --version-description {{version-description}}  \
    --launch-template-data file://{{lc-export.json}}
```

### Update the Auto Scaling Group to Use the Launch Template

```sh
aws autoscaling update-auto-scaling-group \
    --auto-scaling-group-name {{asg-name}} \
    --launch-template LaunchTemplateId={{launch-template-id}},Version='$Latest'
```

After this update, any new instances will be provisioned using the new Launch Template.

### Replace Existing Instances (Optional)

To roll out the new template across all running instances, initiate an Instance Refresh:

1. Create a JSON file (`{{config.json}}`) with your preferences.

    Example of `config.json`:

```json{
    "AutoScalingGroupName": "asg-name",
    "Preferences": {
      "InstanceWarmup": 60,
      "MinHealthyPercentage": 50,
      "AutoRollback": true,
      "ScaleInProtectedInstances": Ignore,
      "StandbyInstances": Terminate
    }
}
```

2. Start the instance refresh:

```sh
aws autoscaling start-instance-refresh \
    --cli-input-json file://{{config.json}}
```
