# Description

This policy identifies AWS ElastiCache Replication Groups that are not configured to enforce encryption of data in-transit. Encryption in-transit ensures that all communication to and from the Redis cluster is protected using Transport Layer Security (TLS).

## Rationale

Enabling in-transit encryption protects data while it moves over the network. Without it, sensitive information exchanged between your applications and the Redis cluster could be intercepted by unauthorized parties.

Enforcing TLS mitigates the risk of eavesdropping and man-in-the-middle (MITM) attacks, ensuring both the confidentiality and integrity of your data, especially in environments where network traffic traverses untrusted networks.

## Audit

This policy flags an *AWS ElastiCache Replication Group* as `INCOMPLIANT` if the `Transit Encryption Enabled` checkbox is set to **false**.

The *Replication Group* is marked as `INAPPLICABLE` if its `Status` is not **available**.
