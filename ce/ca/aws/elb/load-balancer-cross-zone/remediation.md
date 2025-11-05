# Remediation

## Enable Cross-Zone Load Balancing

### **From Command Line**

#### For Network and Gateway Load Balancers

Enable cross-zone load balancing by updating the load balancer attributes:

```sh
aws elbv2 modify-load-balancer-attributes \
    --load-balancer-arn {{load-balancer-arn}} \
    --attributes "Key=load_balancing.cross_zone.enabled,Value=true"
```

#### For Classic Load Balancers

```sh
aws elb modify-load-balancer-attributes \
    --load-balancer-name {{load-balancer-name}} \
    --load-balancer-attributes "{\"CrossZoneLoadBalancing\":{\"Enabled\":true}}"
```

#### For Application Load Balancers

Since cross-zone load balancing is always enabled at the load balancer level, enable it for associated target groups instead:

```sh
aws elbv2 modify-target-group-attributes \
    --target-group-arn {{target-group-arn}} \
    --attributes "Key=load_balancing.cross_zone.enabled,Value=true"
```
