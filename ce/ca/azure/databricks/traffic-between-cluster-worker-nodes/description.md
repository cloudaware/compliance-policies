# Description

By default, data exchanged between worker nodes in an Azure Databricks cluster is not encrypted. To ensure that data is encrypted at all times, whether at rest or in transit, you can create an initialization script that configures your clusters to encrypt traffic between worker nodes using AES 256-bit encryption over a TLS 1.3 connection.

## Rationale

- Protects sensitive data during transit between cluster nodes, mitigating risks of data interception or unauthorized access.
- Aligns with organizational security policies and compliance requirements that mandate encryption of data in transit.
- Enhances overall security posture by ensuring that all inter-node communications within the cluster are encrypted.

## Impact

- Enabling encryption may introduce a performance penalty due to the computational overhead associated with encrypting and decrypting traffic. This can result in longer query execution times, especially for data-intensive operations.
- Implementing encryption requires creating and managing init scripts, which adds complexity to cluster configuration and maintenance.
- The shared encryption secret is derived from the hash of the keystore stored in DBFS. If the keystore is updated or rotated, all running clusters must be restarted to prevent authentication failures between Spark workers and drivers.

## Audit

### From Azure Portal

Review cluster init scripts:

1. Navigate to your Azure Databricks workspace, go to the "Clusters" section, select a cluster, and check the "Advanced Options" for any init scripts that configure encryption settings.

    Verify spark configuration:

2. Ensure that the following Spark configurations are set:

    ```json
        spark.authenticate true
        spark.authenticate.enableSaslEncryption true
        spark.network.crypto.enabled true
        spark.network.crypto.keyLength 256
        spark.network.crypto.keyFactoryAlgorithm PBKDF2WithHmacSHA1
        spark.io.encryption.enabled true
    ```

    These settings can be found in the cluster's Spark configuration properties. Check keystone management:

3. Verify that the Java KeyStore (JKS) file is securely stored in DBFS and that its integrity is maintained.
4. Ensure that the keystore password is securely managed and not hardcoded in scripts.

## Default Value

By default, traffic is not encrypted between cluster worker nodes.

## References

1. <https://learn.microsoft.com/en-us/azure/databricks/security/keys/encrypt-otw>
