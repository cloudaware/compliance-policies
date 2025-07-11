# Description

This policy checks that AWS Database Migration Service (DMS) Replication Instances are **not** public.

A DMS replication instance performs data migration between source and target databases.

## Rationale

Public accessibility increases the attack surface and the likelihood of brute‑force or other intrusion attempts. Additionally, sensitive migration data could be intercepted if transmitted over the open internet.

To mitigate these risks, configure replication instances within private subnets and establish required connections using secure, private networking methods (e.g., VPC Peering, AWS Direct Connect, or VPN).

## Audit

This policy marks an *AWS DMS Replication Instance* as `INCOMPLIANT` if the `Publicly Accessible` checkbox is set to **true**.
