# Remediation

## Disable Legacy IMDS Endpoints

Update each affected OCI compute instance so `areLegacyImdsEndpointsDisabled` is set to `true`. If the instance is managed through Terraform, Resource Manager, or another infrastructure-as-code workflow, update the source configuration before applying the change so future deployments keep legacy IMDS endpoints disabled.

### **From OCI CLI**

Update the affected instance:

```sh
oci compute instance update \
    --instance-id {{instance-id}} \
    --instance-options '{"areLegacyImdsEndpointsDisabled": true}'
```

Repeat the update for each incompliant instance and verify that legacy IMDS endpoints are disabled after the change is applied.
