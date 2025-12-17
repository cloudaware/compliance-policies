# Description

This policy identifies AWS ECS Task Definitions that contain one or more containers configured with the `privileged` parameter set to **true**.

When a container is run in privileged mode, it is granted access to all host devices and bypasses most isolation mechanisms provided by the container runtime. In effect, a privileged container can perform nearly any operation that the underlying host can.

## Rationale

Running containers in privileged mode significantly weakens the security boundaries that normally protect the host system.

Key risks include:

1. **Device Access:** Privileged containers gain unrestricted access to all host devices (`/dev`).
2. **Expanded Kernel Capabilities:** They inherit all Linux kernel capabilities, enabling actions such as modifying kernel modules, altering system time, or manipulating network configurations.
3. **Host Escalation Risk:** If an attacker compromises a privileged container, they can often break out of the container environment and obtain root-level access to the EC2 host.

Privileged mode should only be enabled when absolutely necessary, typically for workloads requiring direct hardware access or low-level system manipulation. For most application workloads, it should remain disabled to maintain strong security isolation.

## Impact

Compromise of a privileged container frequently leads to complete compromise of the underlying host instance.

## Audit

This policy marks an *AWS ECS Task Definition* as `INCOMPLIANT` if any related *ECS Container Definition* has the `Privileged` parameter set to **true**.

Inactive Task Definitions are marked as `INAPPLICABLE`.
