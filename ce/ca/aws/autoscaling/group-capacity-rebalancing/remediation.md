# Remediation

## Enable Capacity Rebalancing

Enable Capacity Rebalancing for the Auto Scaling Group using the `update-auto-scaling-group` command:

### **From Command Line**

```bash
aws autoscaling update-auto-scaling-group \
    --auto-scaling-group-name {{asg-name}} \
    --capacity-rebalance
```
