# Description

This policy identifies enabled Oracle Key Vault keys that are older than 365 days and do not have automatic rotation enabled. Oracle Cloud Infrastructure Vault stores master encryption keys that protect encrypted data.

## Rationale

Rotating customer managed keys annually limits the amount of data encrypted by one key version and reduces the impact of a potential key compromise. Automatic rotation provides a consistent rotation schedule and reduces the chance that long-lived key material remains in use.

## Impact

Rotating a key creates new cryptographic material while retaining prior key versions for decrypting existing data. Review dependent services and operational procedures before rotating production keys. If automatic rotation is enabled, confirm that the setting aligns with the organization's key management standard.

## Audit

This policy flags an enabled *Oracle Key Vault Key* as `INCOMPLIANT` when `Auto Rotation Status` is not `Enabled` and the `Time Created` field is older than 365 days.

Enabled keys are marked as `COMPLIANT` when `Auto Rotation Status` is `Enabled` or when the `Time Created` value is within the last 365 days. Keys that are not in the `ENABLED` lifecycle state are marked as `INAPPLICABLE`.
