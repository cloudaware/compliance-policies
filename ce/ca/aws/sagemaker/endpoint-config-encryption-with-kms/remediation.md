# Remediation

## Enable Encryption for SageMaker Endpoints Using Customer-Managed KMS Keys

Existing SageMaker endpoint configurations cannot be directly modified to add encryption. To enable encryption with a customer-managed KMS key, create a new endpoint configuration with the desired KMS key and update the endpoint to use it.

### **From Command Line**

1. **Retrieve the existing endpoint configuration to obtain the `ProductionVariants` details.** 

    Save the `ProductionVariants` array to a file named `production-variants.json`:

    ```sh
    aws sagemaker describe-endpoint-config \
        --endpoint-config-name {{old-config-name}} \
        --query 'ProductionVariants' \
        --output json > production-variants.json
    ```

   *Example `production-variants.json` content:*

    ```json
    [
        {
            "VariantName": "AllTraffic",
            "ModelName": "model-name",
            "InitialInstanceCount": 1,
            "InstanceType": "ml.t2.medium",
            "InitialVariantWeight": 1.0
        }
    ]
    ```

2. **Create a new endpoint configuration with the KMS key:**

    ```sh
    aws sagemaker create-endpoint-config \
        --endpoint-config-name {{new-encrypted-config-name}} \
        --production-variants file://production-variants.json \
        --kms-key-id {{kms-key-arn}}
    ```

3. **Update the endpoint to use the new configuration.** 

    The endpoint will enter the `Updating` state and may experience brief downtime during the transition:

    ```sh
    aws sagemaker update-endpoint \
        --endpoint-name {{endpoint-name}} \
        --endpoint-config-name {{new-encrypted-config-name}}
    ```

4. After confirming that the endpoint is functioning with the new configuration, delete the old, unencrypted endpoint configuration to prevent accidental reuse:

    ```sh
    aws sagemaker delete-endpoint-config \
        --endpoint-config-name {{old-config-name}}
    ```
