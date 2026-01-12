# Remediation

## Enable Amazon EMR Cluster Logging

Amazon EMR does not support enabling or modifying logging configuration after a cluster has been launched. Ensure that **all new EMR clusters** are created with logging explicitly enabled.

Cluster logs must be delivered to Amazon S3 to support troubleshooting, operational analysis, and long-term retention.

### **From Command Line**

When creating a new EMR cluster, include the `--log-uri` parameter to specify the Amazon S3 location where logs will be stored:

```sh
aws emr create-cluster \
    --name {{cluster-name}} \
    --log-uri s3://{{bucket-name}}/{{prefix}} \
    # ... other properties
```

Replace the placeholders with values appropriate for your environment.

### **Using AWS CloudFormation**

When provisioning EMR clusters using AWS CloudFormation, configure the `LogUri` property in the `AWS::EMR::Cluster` resource definition:

```yaml
Resources:
  MyEmrCluster:
    Type: AWS::EMR::Cluster
    Properties:
      LogUri: s3://{{bucket-name}}/{{prefix}}
      # ... other properties
```

## Considerations

- **Centralized Logging**: Use a standardized, dedicated Amazon S3 bucket to store EMR logs across all clusters and environments.
- **Access Control**: Ensure the EMR service role has the required permissions to write logs to the specified S3 bucket.
- **Lifecycle Management**: Configure S3 Lifecycle policies to transition older logs to lower-cost storage (for example, Amazon S3 Glacier) or to delete logs after the required retention period.
