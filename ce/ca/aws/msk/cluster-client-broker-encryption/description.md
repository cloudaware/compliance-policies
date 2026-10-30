# Description

This policy identifies AWS Managed Streaming for Apache Kafka (MSK) Clusters that are not configured to enforce TLS encryption for data in transit between clients and brokers.

## Rationale

Encryption in transit protects data from unauthorized access, including eavesdropping and man-in-the-middle attacks. Enforcing TLS for client-to-broker communication ensures that sensitive Kafka data remains secure while traversing the network.

## Audit

This policy flags an *AWS MSK Cluster* as `INCOMPLIANT` when the **Encryption: Client Broker** field is set as **PLAINTEXT** or **TLS_PLAINTEXT**.
