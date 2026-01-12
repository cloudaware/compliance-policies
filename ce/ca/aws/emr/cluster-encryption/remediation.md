# Remediation

## Associate an EMR Cluster with a Security Configuration

Amazon EMR security configurations define encryption settings for **data at rest** and **data in transit**, as well as other security controls such as Kerberos authentication. Ensure that all new clusters are launched with a security configuration applied.

> **Note:** Security configurations **cannot be applied to an existing cluster** after it is launched. This remediation applies only to new clusters.

### **From Command Line**

1. Create or identify an existing security configuration:

    ```sh
    aws emr list-security-configurations
    ```

    ```sh
    aws emr create-security-configuration --name "{{security-config}}" --security-configuration '{
        "EncryptionConfiguration": {
            "EnableInTransitEncryption": true,
            "EnableAtRestEncryption": true,
            "InTransitEncryptionConfiguration": {
                "TLSCertificateConfiguration": {
                    "CertificateProviderType": "PEM",
                    "S3Object": "arn:aws:s3:::{{MyConfigStore}}/{{artifacts}}/{{MyCerts}}.zip"
                }
            },
            "AtRestEncryptionConfiguration": {
                "S3EncryptionConfiguration": {
                    "EncryptionMode": "SSE-KMS",
                    "AwsKmsKey": "{{kms-key-arn}}"
                },
                "LocalDiskEncryptionConfiguration": {
                    "EncryptionKeyProviderType": "AwsKms",
                    "AwsKmsKey": "{{kms-key-arn}}"
                }
            }
        }
    }'    
    ```

1. Launch a new EMR cluster with the security configuration applied:

    ```sh
    aws emr create-cluster \
        --name {{cluster-name}} \
        --release-label {{emr-version}} \
        --security-configuration {{security-config-name}} \
        # ... other properties
    ```

### **Using AWS CloudFormation**

Set the `SecurityConfiguration` property in the `AWS::EMR::Cluster` resource:

```yaml
Resources:
  MyEmrCluster:
    Type: AWS::EMR::Cluster
    Properties:
      Name: {{cluster-name}}
      ReleaseLabel: {{emr-version}}
      SecurityConfiguration: {{security-config}}
      # ... other properties
```

### Considerations

- **Standardized Security Configurations**: Maintain a centralized, pre-approved security configuration for consistency across all clusters.
- **Encryption Compliance**: Verify that encryption settings meet organizational and regulatory requirements for both data at rest and in transit.
