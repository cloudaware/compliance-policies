# Description

It is recommended that IAM policies on Cloud KMS `cryptokeys` restrict anonymous or public access.

## Rationale

Granting permissions to `allUsers` or `allAuthenticatedUsers` allows anyone to access the `cryptokey`. Such access might not be desirable if sensitive data is protected with that key. In this case, ensure that anonymous or public access to a Cloud KMS `cryptokey` is not allowed.

## Impact

Removing the binding for `allUsers` and `allAuthenticatedUsers` members denies access to `cryptokeys` for anonymous or public users.

## Audit

### From Google Cloud CLI

1. List all Cloud KMS `cryptokeys`.

    ```sh
    gcloud kms keys list \
        --keyring={{key-ring-name}} \
        --location=global \
        --format=json | jq '.[].name'
    ```

2. Ensure the below command's output does not contain `allUsers` or `allAuthenticatedUsers`.

    ```sh
    gcloud kms keys get-iam-policy {{key-name}} \
        --keyring={{key-ring-name}} \
        --location=global \
        --format=json | jq '.bindings[].members[]'
    ```

## Default Value

By default Cloud KMS does not allow access to `allUsers` or `allAuthenticatedUsers`.

## References

1. <https://cloud.google.com/sdk/gcloud/reference/kms/keys/remove-iam-policy-binding>
2. <https://cloud.google.com/sdk/gcloud/reference/kms/keys/set-iam-policy>
3. <https://cloud.google.com/sdk/gcloud/reference/kms/keys/get-iam-policy>
4. <https://cloud.google.com/kms/docs/object-hierarchy#key_resource_id>

## Additional Information

[key_ring_name] : is the resource ID of the key ring. This value is case-sensitive and in the form:

```txt
projects/PROJECT_ID/locations/LOCATION/keyRings/KEY_RING
```

You can retrieve the key ring resource ID using the Cloud Console:

1. Open the `Cryptographic Keys` page in the Cloud Console.
2. For the key ring whose resource ID you are retrieving, click the `More` icon (3 vertical dots).
3. Click `Copy Resource ID`. The resource ID for the key ring is copied to your clipboard.

[key_name] : is the resource ID of the key. This value is case-sensitive and in the form:

```txt
projects/PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY
```

You can retrieve the key resource ID using the Cloud Console:

1. Open the `Cryptographic Keys` page in the Cloud Console.
2. Click the name of the key ring that contains the key.
3. For the key whose resource ID you are retrieving, click the `More` icon (3 vertical dots).
4. Click `Copy Resource ID`. The resource ID for the key is copied to your clipboard.

[role] : The role to remove the member from.
