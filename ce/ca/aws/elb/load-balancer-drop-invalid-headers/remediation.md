# Remediation

## Enable Drop Invalid Header Fields Attribute

Configure the Application Load Balancer to drop HTTP header fields that do not conform to protocol specifications. This ensures that only well-formed requests are forwarded to backend target groups.

### **From Command Line**

Run the following AWS CLI command, replacing the placeholder with the ARN of the Application Load Balancer:

```sh
aws elbv2 modify-load-balancer-attributes \
    --load-balancer-arn {{load-balancer-arn}} \
    --attributes Key=routing.http.drop_invalid_header_fields.enabled,Value=true
```

After the command completes successfully, the load balancer will reject requests containing invalid HTTP headers.
