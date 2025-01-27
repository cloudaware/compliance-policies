# Remediation

## From Command Line

### Update the Availability Zones for the Auto Scaling Group

Use the `update-auto-scaling-group` command to modify the Availability Zones for your ASG:

```bash
aws autoscaling update-auto-scaling-group \
--auto-scaling-group-name {{your-auto-scaling-group-name}} \
--availability-zones {{AZ1}} {{AZ2}}
```

Replace `{{your-auto-scaling-group-name}}` with the name of your ASG and `{{AZ1}}`, `{{AZ2}}`, etc., with the list of Availability Zones you want to include.

### Update the Availability Zones for the Classic Load Balancer

Use the `enable-availability-zones-for-load-balancer` command to add Availability Zones to your CLB. Similarly, use `disable-availability-zones-for-load-balancer` to remove any unnecessary zones.

#### Enabling Availability Zones

```bash
aws elb enable-availability-zones-for-load-balancer \
--load-balancer-name {{your-load-balancer-name}} \
--availability-zones {{AZ1}} {{AZ2}}
```

#### Disabling Availability Zones (if needed)

```bash
aws elb disable-availability-zones-for-load-balancer \
--load-balancer-name {{your-load-balancer-name}} \
--availability-zones {{AZ1-to-remove}} {{AZ2-to-remove}}
```
