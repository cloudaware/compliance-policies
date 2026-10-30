# Remediation

## Update SageMaker Endpoint Instance Count

To remediate this finding, ensure that each production variant associated with an AWS SageMaker endpoint has **at least two instances**. There are two approaches to achieve this:

### **Option 1: Scale the Variant's Capacity**

You can increase the number of instances for the endpoint without creating a new endpoint configuration.

#### **From Command Line**

```sh
aws sagemaker update-endpoint-weights-and-capacities \
    --endpoint-name {{endpoint-name}} \
    --desired-weight-and-capacities '[
        {
            "VariantName": "{{variant-name}}",
            "DesiredInstanceCount": 2
        }
    ]'
```

**Notes:**

- Set `DesiredInstanceCount` to **2 or more** to meet high-availability requirements.
- SageMaker dynamically adjusts capacity and routes traffic automatically.
- Monitor endpoint status and CloudWatch metrics to confirm the scaling operation completes successfully.

### **Option 2: Update the Endpoint with a New Configuration**

You can create a new endpoint configuration specifying multiple instances per variant and update the endpoint to use this configuration. This method leverages SageMaker's rolling update or blue/green deployment for minimal disruption.

#### **Step 1: Create a New Endpoint Configuration**

```sh
aws sagemaker create-endpoint-config \
    --endpoint-config-name {{new-endpoint-config-name}} \
    --production-variants '[
        {
            "VariantName": "{{variant-name}}",
            "ModelName": "{{model-name}}",
            "InitialInstanceCount": 2,
            "InstanceType": "{{instance-type}}"
        }
    ]'
```

#### **Step 2: Update the Endpoint to Use the New Configuration**

```sh
aws sagemaker update-endpoint \
    --endpoint-name {{endpoint-name}} \
    --endpoint-config-name {{new-endpoint-config-name}}
```

#### **Step 3 (Optional): Delete Old Configuration**

```sh
aws sagemaker delete-endpoint-config \
    --endpoint-config-name {{old-endpoint-config-name}}
```

**Notes:**

- `InitialInstanceCount` must be **2 or greater** to ensure high availability.
- Verify that all instances in the new configuration are in service and that traffic is correctly routed.
