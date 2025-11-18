# Description

This policy identifies AWS OpenSearch Domains that are configured with a public endpoint, making them accessible from the internet instead of being deployed within a VPC, which provides an additional layer of network security.

## Rationale

Hosting OpenSearch domains within a VPC isolates them from the public internet and allows you to control access using security groups and network ACLs. Conversely, exposing an OpenSearch domain through a public endpoint increases its attack surface, making it more susceptible to unauthorized access, data exfiltration, and denial-of-service (DoS) attacks.

## Impact

Even when protected by fine-grained access control policies, a public endpoint remains a less secure configuration compared to VPC isolation.

Remediation requires re-creating the domain within a VPC and migrating data from the existing public domain to the new, VPC-based one.

## Audit

This policy flags an *AWS OpenSearch Domain* as `INCOMPLIANT` if the `Endpoint` field is not empty, indicating that the domain is configured with a public endpoint and does not reside within a VPC.
