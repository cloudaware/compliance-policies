# Remediation

A Managed HSM is reached through its public endpoint or through private endpoints that connect a virtual network to it over Azure Private Link. Each private endpoint connection is Pending, Approved, Rejected, or Disconnected, and only an Approved connection carries traffic.

Create a private endpoint targeting the Managed HSM and approve its connection. Configure the private DNS zone `privatelink.managedhsm.azure.net` with the HSM record and link it to the client virtual network. Verify private DNS resolution and a successful HSM connection from each required client network.

Automated assessment is unavailable: Managed HSM resources and approved private endpoint connections are not collected.
