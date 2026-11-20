# Description

A Managed HSM accepts data-plane connections from public networks, or only through private endpoints and trusted Microsoft services. The Public network access setting, Enabled or Disabled, selects between them. Prerequisites: Give every client that needs data-plane access an approved private endpoint with private DNS resolution before disabling public network access.

## Rationale

With public network access enabled, the HSM's data-plane endpoint is reachable from the internet, limited at most by an IP address allowlist and guarded otherwise only by Microsoft Entra authentication and local role assignments. A stolen token or an over- broad role assignment can then be used from anywhere to run cryptographic operations with the HSM's keys.

## Audit

This requirement needs manual assessment. Managed HSM resources and publicNetworkAccess are not collected.
