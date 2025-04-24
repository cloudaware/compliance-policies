# Remediation

## From Google Cloud CLI

1. List all Cloud KMS `Cryptokeys`.

    gcloud kms keys list --keyring=[key_ring_name] --location=global --format=json | jq '.[].name'

2. Remove IAM policy binding for a KMS key to remove access to `allUsers` and `allAuthenticatedUsers` using the below command.

    gcloud kms keys remove-iam-policy-binding [key_name] --keyring=[key_ring_name] --location=global --member='allAuthenticatedUsers' --role='[role]'

    gcloud kms keys remove-iam-policy-binding [key_name] --keyring=[key_ring_name] --location=global --member='allUsers' --role='[role]'
