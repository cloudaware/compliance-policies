# Remediation

## Remove API Keys From Tenancy Administrator Users

Delete active API keys from users in the tenancy `Administrators` group. If programmatic access is required, move the workload to a dedicated least-privileged identity, such as a scoped IAM user, instance principal, resource principal, or dynamic group.

### From Oracle Cloud Console

1. Open `Identity & Security`.
2. Open `Domains`, select the relevant identity domain if applicable, and open `Users`.
3. Select the reported administrator user.
4. Open `API Keys`.
5. Delete each active API key that is no longer required.
6. Confirm that required automation has been moved to a least-privileged identity.

### From OCI CLI

List the user's API keys:

```sh
oci iam api-key list --user-id {{user-ocid}} --all
```

Delete each active key by fingerprint after confirming that it is no longer required:

```sh
oci iam api-key delete \
    --user-id {{user-ocid}} \
    --fingerprint {{fingerprint}}
```

Run the list command again and confirm that no API keys remain in the `ACTIVE` lifecycle state for the tenancy administrator user.
