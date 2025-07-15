# Remediation

It is recommended to transition from **Launch Configurations** to **Launch Templates** rather than modifying the existing launch configuration. The migration process to launch templates is outlined in [/ce/ca/aws/autoscaling/group-uses-launch-configuration](../group-uses-launch-configuration/policy.gen.md).

If immediate migration is not feasible, you may choose to modify the current launch configuration as outlined below.

## From Command Line

### Create a New Launch Configuration

Launch configurations cannot be modified once created. To update the launch configuration for an Auto Scaling group, you must create a new launch configuration based on the existing one.

*Optionally*, you can retrieve the settings of the current launch configuration using the following command:

```sh
aws autoscaling describe-launch-configurations \
    --launch-configuration-names {{existing-launch-configuration-name}}
```

Once you have the configuration details, create a new launch configuration using the `create-launch-configuration` command. Set the `--associate-public-ip-address` parameter to **true** in the new configuration:

```sh
aws autoscaling create-launch-configuration \
    --launch-configuration-name {{new-launch-configuration-name}} \
    --image-id {{image-id}} \
    --instance-type {{instance-type}} \
    --associate-public-ip-address true
```

### Update the Auto Scaling Group to Use the New Launch Configuration

After creating the new launch configuration, update the associated Auto Scaling group to use it:

```sh
aws autoscaling update-auto-scaling-group \
    --auto-scaling-group-name {{auto-scaling-group-name}} \
    --launch-configuration-name {{new-launch-configuration-name}}
```
