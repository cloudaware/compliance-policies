# Remediation

## Change Availability Zones

### **From Command Line**

To configure your Auto Scaling Group to span multiple Availability Zones, update it with subnets that belong to different AZs using the `update-auto-scaling-group` command:

```sh
aws autoscaling update-auto-scaling-group \
    --auto-scaling-group-name {{asg-name}} \
    --vpc-zone-identifier "subnet-xxxxxxxx,subnet-yyyyyyyy,subnet-zzzzzzzz"
```

After updating the Auto Scaling Group, ensure the associated load balancer is also configured to use subnets from multiple Availability Zones:

```sh
aws elbv2 set-subnets \
    --load-balancer-arn {{lb-arn}} \
    --subnets "subnet-xxxxxxxx" "subnet-yyyyyyyy" "subnet-zzzzzzzz"
```
