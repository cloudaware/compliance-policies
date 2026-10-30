# Remediation

## Remove Redundant Active API Keys

Keep only the active API key that is still required for the user. Delete redundant active keys after confirming that dependent workloads, scripts, or integrations no longer use them.

### From OCI CLI

List the user's API keys:

```sh
oci iam api-key list --user-id {{user-ocid}} --all
```

After identifying the redundant key fingerprint, delete the key:

```sh
oci iam api-key delete \
    --user-id {{user-ocid}} \
    --fingerprint {{fingerprint}}
```

Run the list command again and confirm that no more than one API key remains in the `ACTIVE` lifecycle state for the user.
