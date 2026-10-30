# Description

This policy identifies Application, Network, and Gateway Load Balancers that do not have deletion protection enabled.

Deletion Protection should be enabled for all ELBv2 load balancers to help prevent accidental deletion and unintended service disruption.

## Rationale

Load balancers often serve as the primary entry point for application traffic. Accidental deletion can result in immediate and complete service outages for dependent applications. Even in environments managed through automation or Infrastructure as Code (IaC), manual actions performed through the AWS Management Console or AWS CLI can introduce human error.

Enabling Deletion Protection adds an explicit safeguard by requiring an additional verification step before a load balancer can be deleted, helping ensure that critical infrastructure is not decommissioned unintentionally.

## Audit

This policy flags an *AWS ELB Load Balancer* as `INCOMPLIANT` if the `Additional Attributes` include **deletion_protection.enabled: false**.

*Classic Load Balancers* are marked as **INAPPLICABLE**.
