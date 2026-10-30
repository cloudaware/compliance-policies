# Description

This policy identifies AWS Redshift Clusters that are configured with the **Publicly Accessible** setting enabled. When this flag is set to `true`, the cluster is internet-facing and assigned a publicly resolvable DNS name that maps to a public IP address.

## Rationale

Publicly accessible databases and data warehouses significantly increase the attack surface of your cloud environment. Exposing a Redshift cluster to the Internet allows unauthorized actors to attempt exploitation of vulnerabilities or perform brute-force attacks against the cluster endpoint. Configuring clusters as private supports a defense-in-depth strategy by ensuring that access to the data warehouse is restricted to trusted networks within your VPC.

## Audit

This policy flags an *AWS Redshift Cluster* as `INCOMPLIANT` if `Publicly Accessible` is set to **Yes**.

*Clusters* that are not in the **available** state are marked as `INAPPLICABLE`.
