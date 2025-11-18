# Remediation

## Enable Encryption at Rest

To enable encryption of data at rest, the domain must be running **OpenSearch or Elasticsearch version 6.7 or later**.

Specify your preferred KMS key ARN.

```sh
aws opensearch update-domain-config \
    --domain-name {{domain-name}} \
    --encryption-at-rest-options Enabled=true,KmsKeyId={{kms-key-id}}
```
