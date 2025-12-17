# Description

This policy identifies AWS ECS Task Definitions in which the `readonlyRootFilesystem` parameter is set to **false** or omitted (which defaults to **false**) for any container.

When enabled, this parameter mounts the container’s root file system as read-only.

## Rationale

Mounting the container’s root file system as read-only is a security best practice aligned with immutable infrastructure principles.

Key benefits include:

1. **Immutability:** Prevents application code and system files from being modified at runtime, reinforcing the expectation that containers are ephemeral and stateless.
2. **Malware Prevention:** Limits an attacker’s ability to download scripts, install packages, or persist malicious binaries in common system directories.
3. **Configuration Drift Prevention:** Ensures the running container cannot diverge from the original image definition.

If a container must write temporary data (e.g., logs, cache files), a dedicated `tmpfs` mount or a Docker volume should be used rather than allowing writes to the container’s root layer.

## Impact

Containers must be designed to write only to explicitly mounted volumes intended for temporary or persistent data. Applications that attempt to write to locations such as `/var/log` or `/tmp` will fail unless those paths are backed by writable mounts.

## Audit

This policy marks an *AWS ECS Task Definition* as `INCOMPLIANT` if any related *ECS Container Definition* has the `Readonly Root Filesystem` parameter set to **false**.

Inactive Task Definitions are marked as `INAPPLICABLE`.
