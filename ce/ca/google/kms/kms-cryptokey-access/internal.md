
Relationship type: many-to-many

IAM Policy Binding.Name = CryptoKey.CA10__name__c

We cannot do this check automatically.

1. List all Cloud KMS Cryptokeys.

    ```sh
    gcloud kms keys list \
        --keyring={{key-ring-name}} \
        --location=global \
        --format=json | jq '.[].name'
    ```

2. Remove IAM policy binding for a KMS key to remove access to allUsers and allAuthenticatedUsers using the below command.

    ```sh
    gcloud kms keys remove-iam-policy-binding {{key-name}} \
        --keyring={{key-ring-name}} \
        --location=global \
        --member='allAuthenticatedUsers' \
        --role='{{role}}' gcloud kms keys remove-iam-policy-binding {{key-name}} \
        --keyring={{key-ring-name}} \
        --location=global \
        --member='allUsers' \
        --role='{{role}}'
    ```
