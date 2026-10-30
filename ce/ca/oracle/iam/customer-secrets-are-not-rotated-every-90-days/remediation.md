# Remediation

## Rotate Stale Customer Secret Keys

Create a replacement customer secret key, update every dependent workload to use the new key, and delete the stale key after confirming that it is no longer required. Because customer secret keys are long-term credentials, avoid extending the life of the stale key after the replacement has been validated.

### From OCI CLI

List the user's customer secret keys:

```sh
oci iam customer-secret-key list --user-id {{user-ocid}} --all
```

Create a replacement customer secret key:

```sh
oci iam customer-secret-key create \
    --user-id {{user-ocid}} \
    --display-name {{new-key-name}}
```

Update applications, integrations, and users to use the replacement key. After confirming that Object Storage access works with the replacement key and the stale key is no longer used, delete the stale key:

```sh
oci iam customer-secret-key delete \
    --user-id {{user-ocid}} \
    --customer-secret-key-id {{stale-key-id}}
```
