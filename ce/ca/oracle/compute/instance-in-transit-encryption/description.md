# Description

This policy identifies Oracle IAAS Instances that do not have in-transit encryption enabled for the attached boot volume.

## Rationale

In-transit encryption protects storage traffic between an Oracle compute instance and its boot volume. Without this protection, data moving between the instance and the storage service may be exposed to interception or unauthorized inspection within the network path.

Enabling in-transit encryption for boot volume attachments helps maintain confidentiality for workload data and supports consistent encryption controls across compute storage connections.

## Audit

This policy flags an *Oracle IAAS Instance* as `INCOMPLIANT` when the `Boot Volume: PV Encryption In Transit` field is set to **Disabled**.

Instances where `Boot Volume: PV Encryption In Transit` is set to **Enabled** are marked as `COMPLIANT`.

Instances where the field is empty or contains an unexpected value are marked as `UNDETERMINED`.
