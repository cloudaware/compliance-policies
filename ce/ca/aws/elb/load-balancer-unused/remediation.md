# Remediation

Consider whether the load balancer is still needed.

- If the load balancer is needed for future use or is temporarily inactive, configure it properly by adding listeners and registering healthy targets.
- If the load balancer is no longer needed, delete it to stop incurring unnecessary charges.

## Delete the Load Balancer

### From Command Line

- For Application, Network, or Gateway Load Balancers (`elbv2`):

```bash
aws elbv2 delete-load-balancer --load-balancer-arn {{load-balancer-arn}}
```

- For Classic Load Balancers (`elb`):

```bash
aws elb delete-load-balancer --load-balancer-name {{load-balancer-name}}
```

**Note**: After deletion, confirm that no resources are still pointing to the removed load balancer to avoid service disruptions.
