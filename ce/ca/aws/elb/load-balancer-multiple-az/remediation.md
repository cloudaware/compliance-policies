# Remediation

The Load Balancer should be configured to use subnets in at least two different Availability Zones.

## Configure Subnets

### **From Command Line**

#### For Application, Network and Gateway Load Balancers

```sh
aws elbv2 set-subnets \
    --load-balancer-arn {{load-balancer-arn}} \
    --subnets {{subnet-id1}} {{subnet-id2}}
```

#### For a Classic Load Balancer

```sh
aws elb attach-load-balancer-to-subnets \
    --load-balancer-name {{load-balancer-name}} \
    --subnets {{subnet-id1}} {{subnet-id2}}
```
