# Description

An Azure NAT Gateway provides outbound connectivity only when it is associated with one or more subnets. A provisioned gateway without an active subnet association cannot route subnet traffic and can continue to incur NAT Gateway and public IP address or prefix charges.

## Rationale

An unassociated NAT Gateway is usually unused infrastructure or an incomplete network deployment. Identifying it helps reduce avoidable cost and keeps the Azure network configuration aligned with its intended outbound-connectivity design.

## Impact

Associating a NAT Gateway changes the outbound internet connectivity for resources in the selected subnet. Confirm the required outbound IP addresses, routing dependencies, and change window before associating or deleting the gateway.

## Audit

This policy marks an *Azure NAT Gateway* as `INCOMPLIANT` if its `Provisioning State` is `Succeeded` and it has no related *Azure Network Subnet* with a `Provisioning State` of `Succeeded`.

An eligible gateway with at least one successfully provisioned related subnet is `COMPLIANT`. A gateway that is not successfully provisioned is `INAPPLICABLE`; missing gateway or related-subnet provisioning-state data is `UNDETERMINED`.
