# Description

This policy identifies Oracle IAAS Instances where legacy Instance Metadata Service (IMDS) endpoints are enabled.

## Rationale

The instance metadata service provides runtime information that applications and agents can use from inside a compute instance. Legacy metadata endpoints support older IMDS behavior and can increase the risk of metadata or credential exposure if a workload is affected by Server-Side Request Forgery (SSRF), open proxy behavior, or similar request-forwarding flaws.

Disabling legacy IMDS endpoints helps enforce the newer metadata service behavior and reduces the attack surface for instance metadata access.

## Audit

This policy flags an *Oracle IAAS Instance* as `INCOMPLIANT` when the `Instance Options: Legacy IMDS Endpoints` field is set to **Enabled**.

Instances where `Instance Options: Legacy IMDS Endpoints` is set to **Disabled** are marked as `COMPLIANT`.

Instances where the field is empty or contains an unexpected value are marked as `UNDETERMINED`.
