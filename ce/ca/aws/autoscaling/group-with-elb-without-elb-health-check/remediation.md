# Remediation

## From Command Line

By default, Amazon EC2 Auto Scaling relies on EC2 status checks to determine instance health.

1. To configure the ASG to use ELB health checks to ensure that instances failing load balancer health criteria are automatically replaced use `update-auto-scaling-group` command:

```sh
aws autoscaling update-auto-scaling-group \
--auto-scaling-group-name {{auto-scaling-group-name}} \
--health-check-type ELB
```

2. (*Optional but recommended*) Configure a health check grace period (in seconds) to allow instances sufficient time to initialize before being evaluated by health checks:

```sh
aws autoscaling update-auto-scaling-group \
  --auto-scaling-group-name {{auto-scaling-group-name}} \
  --health-check-grace-period 300
```  
