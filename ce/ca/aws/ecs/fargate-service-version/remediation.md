# Remediation

## Update the ECS Service to Use the `LATEST` Platform Version

Before applying the update in production, ensure that your application is tested with the new platform version in a staging environment to verify compatibility.

Changing the platform version triggers a new service deployment.

### **Using the AWS CLI**

```sh
aws ecs update-service \
    --cluster {{cluster-name}} \
    --service {{service-name}} \
    --platform-version LATEST
```
