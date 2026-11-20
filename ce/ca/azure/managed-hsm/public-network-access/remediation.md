# Remediation

A Managed HSM accepts data-plane connections from public networks, or only through private endpoints and trusted Microsoft services. The Public network access setting, Enabled or Disabled, selects between them. Prerequisites: Give every client that needs data-plane access an approved private endpoint with private DNS resolution before disabling public network access.

On the Managed HSM, open **Settings > Networking > Public access** and set **Public network access** to **Disabled**. Save the change, confirm that public connections are blocked, and verify that required clients can still connect through their approved private endpoints.

Automated assessment is unavailable: Managed HSM resources and publicNetworkAccess are not collected.
