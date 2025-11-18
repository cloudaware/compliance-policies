# Description

This policy identifies AWS OpenSearch Domains that do not have node-to-node encryption enabled.

Node-to-node encryption in AWS OpenSearch Service adds an additional layer of security by using TLS for all communication between nodes in a cluster. This prevents potential attackers from intercepting or reading data as it moves between nodes.

## Rationale

Encrypting data in transit between nodes protects against man-in-the-middle and eavesdropping attacks, even within your VPC. While network-level controls such as security groups provide a first line of defense, node-to-node encryption ensures that traffic between OpenSearch nodes remains unreadable if an unauthorized party gains network access. This is especially important in environments handling sensitive or regulated data.

## Audit

This policy flags an *AWS OpenSearch Domain* as `INCOMPLIANT` if the `Node To Node Encryption Enabled` checkbox is set to **false**.
