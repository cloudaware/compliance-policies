# Remediation

## Rotate Stale Customer Managed Keys

Rotate each enabled customer managed key that is older than 365 days and does not have automatic rotation enabled. Where supported and appropriate for the workload, enable automatic rotation to keep the key on a consistent rotation schedule.

### From OCI CLI

Rotate the key:

```sh
oci kms management key rotate \
    --key-id {{key-ocid}} \
    --endpoint {{management-endpoint-url}}
```

Confirm the key remains enabled after rotation:

```sh
oci kms management key get \
    --key-id {{key-ocid}} \
    --endpoint {{management-endpoint-url}}
```
