# Description

Ensure that all non-default AWS VPC Network ACLs are actively associated with at least one subnet. Unused NACLs should be identified and removed to maintain a secure and well-managed network environment.

## Rationale

Network ACLs that are not associated with any subnets are considered unused. While unused NACLs do not incur direct costs, they present a potential security risk. If such a NACL contains overly permissive or misconfigured rules and is later associated with a subnet, it could unintentionally expose resources to unauthorized traffic. Regularly identifying and removing unused NACLs reduces the potential attack surface and streamlines network management.

## Impact

Removing unused NACLs has no operational impact on existing resources. However, it strengthens the overall security posture and simplifies audits by eliminating unnecessary configurations.

## Audit

This policy flags an *AWS VPC Network ACL* as `INCOMPLIANT` if it has no related *AWS VPC Network ACL Associations*.
