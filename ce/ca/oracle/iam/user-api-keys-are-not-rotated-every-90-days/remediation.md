# Remediation

## Rotate Stale API Keys

Create a replacement API key, update every dependent workload to use the new key, and delete the stale key after confirming that the old key is no longer required.

### **From OCI CLI**

List the user's API keys:

```sh
oci iam api-key list --user-id {{user-ocid}} --all
```

Upload a replacement public key for the user:

```sh
oci iam api-key upload \
    --user-id {{user-ocid}} \
    --key-file {{public-key-file}}
```

Update dependent workloads to use the replacement key. After confirming that the stale key is no longer used, delete it by fingerprint:

```sh
oci iam api-key delete \
    --user-id {{user-ocid}} \
    --fingerprint {{stale-key-fingerprint}}
```
