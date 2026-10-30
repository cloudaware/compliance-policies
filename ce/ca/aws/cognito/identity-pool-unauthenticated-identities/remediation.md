# Remediation

## Disable Unauthenticated Identities

Disable guest access for the identity pool after confirming that any application flows using unauthenticated sessions are no longer required:

### **From Command Line**

```sh
aws cognito-identity update-identity-pool \
    --identity-pool-id {{identity-pool-id}} \
    --identity-pool-name {{identity-pool-name}} \
    --no-allow-unauthenticated-identities
```

After the change, review the application and associated IAM role mappings to ensure that only authenticated identities retain access to AWS resources through the identity pool.
