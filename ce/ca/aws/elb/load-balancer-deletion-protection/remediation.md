# Remediation

## Enable Deletion Protection for an Elastic Load Balancer

Deletion Protection helps prevent accidental removal of critical load balancing resources and reduces the risk of unintended service outages.

### **From Command Line**

Run the following command to update the load balancer attributes and enable Deletion Protection:

```sh
aws elbv2 modify-load-balancer-attributes \
    --load-balancer-arn {{load-balancer-arn}} \
    --attributes Key=deletion_protection.enabled,Value=true
```
