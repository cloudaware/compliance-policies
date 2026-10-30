# Description

This policy identifies Oracle IAAS Instances where Secure Boot is disabled when platform configuration data is available.

## Rationale

Secure Boot helps verify the integrity of the boot process by allowing the instance to start only trusted boot components. Enabling Secure Boot reduces exposure to bootkits, rootkits, and other boot-level tampering that can compromise an instance before the operating system security controls are fully active.

Secure Boot is part of OCI shielded instance platform configuration. Where this platform configuration is available, Secure Boot should be enabled unless the workload has a documented compatibility exception, such as a dependency on unsigned boot components or drivers.

## Audit

This policy flags an *Oracle IAAS Instance* as `INCOMPLIANT` when the `Platform Config JSON` field does not contain `isSecureBootEnabled` set to **true**.

Instances where `Platform Config JSON` contains `isSecureBootEnabled` set to **true** are marked as `COMPLIANT`.

Instances where the platform configuration JSON is empty, malformed, or does not contain a boolean Secure Boot value are marked as `UNDETERMINED`.

## Impact

Enabling Secure Boot can prevent an instance from starting if the operating system, bootloader, kernel modules, or drivers are not compatible with Secure Boot verification. Review workload compatibility and create a recovery plan before changing production instances.

## References

1. <https://docs.oracle.com/iaas/Content/Compute/References/shielded-instances.htm>
2. <https://docs.oracle.com/en-us/iaas/tools/oci-cli/latest/oci_cli_docs/cmdref/compute/instance/update.html>
