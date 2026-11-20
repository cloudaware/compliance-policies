# Description

Set an explicit TLS 1.2 minimum on each storage account. An unset configuration relies on platform behavior and does not satisfy this policy.

## Rationale

TLS 1.0 has known vulnerabilities and has been replaced by later versions of the TLS protocol. Continued use of this legacy protocol affects the security of data in transit.

## Impact

When set to TLS 1.2 all requests must leverage this version of the protocol. Applications leveraging legacy versions of the protocol will fail.

## Audit

This policy marks an *Azure Storage Account* as `INCOMPLIANT` if `Minimum TLS Version` is unset, **TLS1_0**, or **TLS1_1**. **TLS1_2** is `COMPLIANT`.

This checks an explicit account setting. Azure Storage rejects TLS 1.0 and 1.1 at the platform level after February 3, 2026.

## Default Value

If a storage account is created through the portal, the MinimumTlsVersion property for that storage account will be set to TLS 1.2.

PowerShell, CLI and templates may leave MinimumTlsVersion unset. The historical unset-property interpretation was TLS 1.0; platform rejection of legacy TLS now overrides that behavior. Configure TLS1_2 explicitly.

## References

1. <https://docs.microsoft.com/en-us/azure/storage/common/transport-layer-security-configure-minimum-version?tabs=portal>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-3-encrypt-sensitive-data-in-transit>
