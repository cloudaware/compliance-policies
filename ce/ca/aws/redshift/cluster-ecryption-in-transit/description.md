# Description

This policy identifies AWS Redshift Clusters that are not configured to enforce SSL/TLS encryption for all client connections.

## Rationale

Enforcing encryption in transit ensures that all data transmitted between clients and the Redshift cluster is protected from interception and unauthorized access. This control is critical for maintaining data confidentiality and integrity, as well as for meeting organizational and regulatory security requirements.

## Audit

This policy flags an *AWS Redshift Cluster* as `INCOMPLIANT` if its related *AWS Redshift Cluster Parameter Group* contains the `require_ssl` *Parameter* set to **false**.

The *Cluster* is marked as `UNDETERMINED` if the *Cluster Parameter Group* or the `require_ssl` *Parameter* is not present in the CMDB.
