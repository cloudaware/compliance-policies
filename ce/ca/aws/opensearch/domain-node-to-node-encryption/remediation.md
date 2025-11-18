# Remediation

## Enable Node-to-node Encryption

To enable Node-to-node encryption of data, the domain must be running **OpenSearch or Elasticsearch version 6.7 or later**.

```sh
aws opensearch update-domain-config \
    --domain-name {{domain-name}} \
    --node-to-node-encryption-options Enabled=true
```
