# Description

This policy identifies AWS Redshift Clusters that are associated with VPC security groups containing inbound rules that allow unrestricted access to the Redshift cluster port (**TCP 5439**) from the public internet (**0.0.0.0/0** or **::/0**).

## Rationale

Amazon Redshift clusters commonly store sensitive analytical data. Allowing unrestricted inbound connectivity to the database port increases the likelihood of unauthorized access attempts, credential stuffing, brute-force attacks, and accidental exposure. Even when authentication is required, internet-exposed database ports materially increase attack surface and monitoring burden.

Security group ingress to the Redshift port should be limited to:

- Trusted corporate/public egress IPs (specific CIDRs),
- Approved network paths (VPN, Direct Connect, bastion, private connectivity),
- Or internal VPC-only sources where appropriate.

## Impact

Restricting inbound access to TCP `5439` may disrupt workloads if applications, BI tools, or user networks currently connect from untracked or dynamic IP ranges. Before enforcing restrictions, confirm the legitimate client source ranges and ensure network paths (VPN/Direct Connect/VPC routing) are in place.

## Audit

This policy flags an *AWS Redshift Cluster* as `INCOMPLIANT` if its related *AWS EC2 Security Group* contains an Inbound rule with:

- `Source IP Range` set to **0.0.0.0/0** or **::/0**,
- `Protocol` set to **All** or **TCP**,
- `From Port` - `To Port` range containing **5439**.

*Clusters* that are not in the **available** state or with `Endpoint Port` set to a **non-default value** are marked as `INAPPLICABLE`.
