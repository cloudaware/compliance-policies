# Remediation

## Update the SSL/TLS Security Policy for a Load Balancer Listener

Applying an up-to-date security policy ensures that only secure protocol versions and strong cryptographic ciphers are used for client connections.

### **From Command Line**

Run the following command to update the SSL/TLS policy associated with the HTTPS listener:

```sh
aws elbv2 modify-listener \
    --listener-arn {{listener-arn}} \
    --ssl-policy ELBSecurityPolicy-TLS13-1-3-2021-06
```
