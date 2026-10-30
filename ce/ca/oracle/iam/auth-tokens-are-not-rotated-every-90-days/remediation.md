# Remediation

## Rotate Stale Auth Tokens

Create a replacement auth token for the affected user, update every dependent workload to use the new token, and delete the stale token after confirming that it is no longer required.

### From OCI Console

1. Open **Identity & Security**.
2. Open the affected identity domain.
3. Open **Users** and select the affected user.
4. Open **Auth tokens**.
5. Generate a replacement auth token and store the token value securely.
6. Update dependent applications, scripts, or integrations to use the replacement token.
7. Delete auth tokens older than 90 days after confirming they are no longer used.

### From OCI CLI

List the user's auth tokens:

```sh
oci iam auth-token list --user-id {{user-ocid}} --all
```

Create a replacement auth token:

```sh
oci iam auth-token create \
    --user-id {{user-ocid}} \
    --description {{new-token-description}}
```

Update dependent workloads to use the replacement token. After confirming that the stale token is no longer used, delete it:

```sh
oci iam auth-token delete \
    --user-id {{user-ocid}} \
    --auth-token-id {{stale-token-id}}
```
