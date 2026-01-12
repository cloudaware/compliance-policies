# Remediation

## Configure HTTP Desync Mitigation Mode

Update the HTTP desync mitigation mode to `defensive` or `strictest` to prevent malformed or ambiguous HTTP requests from reaching backend targets. This helps protect applications from HTTP Request Smuggling–related attacks.

> **Recommendation**: For most environments, the default `defensive` mode provides strong protection while maintaining application availability. Choose `strictest` for maximum security, but validate that your application can function with RFC-strict traffic, as it blocks all "Acceptable" and "Ambiguous" requests

### **From Command Line**

#### **For Application Load Balancers**

Run the following command to set the desync mitigation mode to `defensive` (recommended for most environments):

```sh
aws elbv2 modify-load-balancer-attributes \
    --load-balancer-arn {{load-balancer-arn}} \
    --attributes Key=routing.http.desync_mitigation_mode,Value=defensive
```

To enforce the highest level of protection, you may optionally use `strictest` instead of `defensive` after validating application compatibility.

#### **For Classic Load Balancers**

Run the following command to update the desync mitigation mode for a Classic Load Balancer:

```sh
aws elb modify-load-balancer-attributes \
    --load-balancer-name {{load-balancer-name}} \
    --load-balancer-attributes '{
        "AdditionalAttributes": [
            {
                "Key": "elb.http.desyncmitigationmode",
                "Value": "defensive"
            }
        ]
    }'
```
