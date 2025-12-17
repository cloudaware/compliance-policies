# Description

This policy identifies AWS ECS Task Definitions where the `pidMode` parameter is configured as **host**.

When `pidMode` is set to `host`, containers within the task share the process ID (PID) namespace of the underlying EC2 host instance. This effectively allows containerized processes to behave as though they are running directly on the host instead of within an isolated container environment.

## Rationale

Process isolation is a core security feature of containerized workloads. Under normal operation, containers have their own dedicated PID namespace, limiting visibility to processes running solely within that container.

Enabling **host** PID mode removes this isolation and allows containerized processes to:

1. View all processes running on the host system, including system daemons and processes from other containers.
2. Interact with host-level processes, potentially sending signals (e.g., `kill`) to critical system components if elevated privileges are present.
3. Access sensitive information that may be exposed through process listings, such as command-line arguments or environment variables.

## Impact

If an attacker compromises a container running with host PID mode, they gain increased insight into the host system and may have the ability to interfere with other services or escalate privileges, significantly increasing the attack surface.

## Audit

This policy marks an *AWS ECS Task Definition* as `INCOMPLIANT` when the `PID Mode` is set to **host**.

Inactive Task Definitions are marked as `INAPPLICABLE`.
