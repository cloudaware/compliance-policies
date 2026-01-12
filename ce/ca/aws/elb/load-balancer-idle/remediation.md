# Remediation

## Decommission idle Elastic Load Balancers

Remove idle Application and Classic Load Balancers to eliminate unnecessary costs. Before deletion, verify that the load balancer is no longer required and is not associated with any active applications or dependencies.

### **From Command Line**

#### Application Load Balancers (ALB)

```sh
aws elbv2 delete-load-balancer \
    --region {{aws-region}} \
    --load-balancer-arn {{application-load-balancer-arn}}
```

#### Classic Load Balancers (CLB)

```sh
aws elb delete-load-balancer \
    --region {{aws-region}} \
    --load-balancer-name {{classic-load-balancer-name}}
```
