# Description

This policy identifies AWS ECS Task Definitions that are configured to use the **host** network mode while simultaneously allowing containers to run with root privileges (User ID 0).

When *Network Mode* is set to **host**, the container shares the network namespace of the underlying EC2 instance. If a process within such a container runs as root and an attacker gains the ability to escape the container runtime, they could potentially obtain unauthorized access to the host’s network interfaces, capture traffic, or modify network configurations.

## Rationale

Using the host network mode significantly reduces network isolation between the container and the host. When combined with root-level privileges, this creates a high-risk security scenario:

1. **Privilege Escalation:** If a container escape occurs, the attacker would inherit root privileges and direct access to the host’s network stack.
2. **Traffic Interception:** A compromised root-level container on the host network could inspect or intercept traffic intended for other services running on the same host.
3. **Service Spoofing:** An attacker could bind to other ports on the host or interfere with the operation of other services.

## Impact

Remediation typically requires modifying the user ID under which the container runs. This may also require adjusting file or directory permissions within the container image.

## Audit

This policy marks an *AWS ECS Task Definition* as `INCOMPLIANT` when the **Host** `Network Mode` is configured and any related *ECS Container Definition* has `Privileged` set to **true** and `User` defined as **root**, **0**, or **null**.

Task Definitions that are inactive or configured with other network modes are marked as `INAPPLICABLE`.
