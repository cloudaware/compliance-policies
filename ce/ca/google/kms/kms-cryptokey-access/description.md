# Description

It is recommended that the IAM policy on Cloud KMS `cryptokeys` should restrict anonymous and/or public access.

## Rationale

Granting permissions to `allUsers` or `allAuthenticatedUsers` allows anyone to access the dataset. Such access might not be desirable if sensitive data is stored at the location. In this case, ensure that anonymous and/or public access to a Cloud KMS `cryptokey` is not allowed.

## Impact

Removing the binding for `allUsers` and `allAuthenticatedUsers` members denies accessing `cryptokeys` to anonymous or public users.

## Audit

### From Google Cloud CLI

1. List all Cloud KMS `Cryptokeys`.

     gcloud kms keys list --keyring=[key_ring_name] --location=global --format=json | jq '.[].name'

2. Ensure the below command's output does not contain `allUsers` or `allAuthenticatedUsers`.

     gcloud kms keys get-iam-policy [key_name] --keyring=[key_ring_name] --location=global --format=json | jq '.bindings[].members[]'

## Default Value

By default Cloud KMS does not allow access to `allUsers` or `allAuthenticatedUsers`.

## References

1. <https://cloud.google.com/sdk/gcloud/reference/kms/keys/remove-iam-policy-binding>
2. <https://cloud.google.com/sdk/gcloud/reference/kms/keys/set-iam-policy>
3. <https://cloud.google.com/sdk/gcloud/reference/kms/keys/get-iam-policy>
4. <https://cloud.google.com/kms/docs/object-hierarchy#key_resource_id>

## Additional Information

[key_ring_name] : Is the resource ID of the key ring, which is the fully-qualified Key ring name. This value is case-sensitive and in the form:

     projects/PROJECT_ID/locations/LOCATION/keyRings/KEY_RING

You can retrieve the key ring resource ID using the Cloud Console:

1. Open the `Cryptographic Keys` page in the Cloud Console.
2. For the key ring whose resource ID you are retrieving, click the `More` icon (3 vertical dots).
3. Click `Copy Resource ID`. The resource ID for the key ring is copied to your clipboard.

[key_name] : Is the resource ID of the key, which is the fully-qualified CryptoKey name. This value is case-sensitive and in the form:

     projects/PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY

You can retrieve the key resource ID using the Cloud Console:

1. Open the `Cryptographic Keys` page in the Cloud Console.
2. Click the name of the key ring that contains the key.
3. For the key whose resource ID you are retrieving, click the `More` icon (3 vertical dots).
4. Click `Copy Resource ID`. The resource ID for the key is copied to your clipboard.

[role] : The role to remove the member from.
