# Description

This policy identifies successfully provisioned Azure API Management services in
non-Consumption tiers that are older than 30 days and have no active related API
records in Cloudaware CMDB.

## Rationale

Non-Consumption API Management tiers reserve capacity and continue to incur service
costs even when the service contains no APIs. Consumption-tier services are excluded
because they use a consumption-based cost model.

## Impact

An empty capacity-based service creates avoidable cost and inventory overhead.
Deleting it without review can disrupt planned deployments or dependencies involving
networking, identities, certificates, policies, custom domains, or DNS.

## Audit

This policy flags an *Azure API Management Service* as `INCOMPLIANT` if it is in
the `Succeeded` provisioning state, uses a non-Consumption SKU, was created more
than 30 days ago, and has no non-disappeared related *Azure API Management API*
records.
