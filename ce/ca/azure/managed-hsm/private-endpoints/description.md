# Description

A Managed HSM is reached through its public endpoint or through private endpoints that connect a virtual network to it over Azure Private Link. Each private endpoint connection is Pending, Approved, Rejected, or Disconnected, and only an Approved connection carries traffic.

## Rationale

Without a private endpoint, every client reaches the HSM's data plane over its public endpoint, so public network access cannot be disabled without cutting off every client; Managed HSM supports no virtual network service endpoints as an alternative. Key operations then cross public networks to an endpoint that any internet address can reach and probe.

## Audit

This requirement needs manual assessment. Managed HSM resources and approved private endpoint connections are not collected.
