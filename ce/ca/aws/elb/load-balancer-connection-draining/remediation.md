# Remediation

## Enable Connection Draining

Connection Draining ensures that in-flight requests are allowed to complete before instances are deregistered or terminated.

### **From Command Line**

Run the following AWS CLI command to enable Connection Draining and configure the timeout period (in seconds) for the selected Classic Load Balancer:

```sh
aws elb modify-load-balancer-attributes \
    --load-balancer-name {{lb-name}} \
    --load-balancer-attributes ConnectionDraining={Enabled=true,Timeout={{timeout-seconds}}}
```
