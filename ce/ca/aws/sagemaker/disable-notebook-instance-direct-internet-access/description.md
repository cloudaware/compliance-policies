# Description

This policy identifies AWS SageMaker Notebook Instances that have **Direct Internet Access** enabled. When this setting is enabled, SageMaker attaches a default network interface that allows the notebook instance to access the internet through a public IP address.

## Rationale

By default, SageMaker notebook instances are configured with direct internet access. While convenient, this configuration introduces security risks. It increases the attack surface by allowing unrestricted outbound connectivity, complicates monitoring and control of data egress, and bypasses VPC-level security controls such as Security Groups, Network ACLs, and centralized traffic inspection mechanisms.

Disabling direct internet access ensures that all network traffic is routed through the customer-managed VPC. This enables the use of NAT Gateways, firewalls, and proxy services to enforce security policies, inspect traffic, and maintain stronger governance over data movement.

## Impact

Remediation requires provisioning a new SageMaker notebook instance with **Direct Internet Access** disabled, as this setting cannot be modified after the instance is created. As part of this process, data and configurations from the existing notebook instance may need to be migrated to the newly created instance.

## Audit

This policy marks an *AWS SageMaker Notebook Instance* as `INCOMPLIANT` when the `Direct Internet Access` field is set to **Enabled**.
