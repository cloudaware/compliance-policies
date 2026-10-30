# Remediation

## From Google Cloud CLI

1. List all Cloud KMS `cryptokeys`.

    ```sh
    gcloud kms keys list \
        --keyring={{key-ring-name}} \
        --location=global \
        --format=json | jq '.[].name'
    ```

2. Remove the IAM policy bindings to revoke access for `allUsers` and `allAuthenticatedUsers` by running the following commands.

    ```sh
    gcloud kms keys remove-iam-policy-binding {{key-name}} \
        --keyring={{key-ring-name}} \
        --location=global \
        --member='allAuthenticatedUsers' \
        --role='{{role}}'
    ```

    ```sh
    gcloud kms keys remove-iam-policy-binding {{key-name}} \
        --keyring={{key-ring-name}} \
        --location=global \
        --member='allUsers' \
        --role='{{role}}'
    ```
