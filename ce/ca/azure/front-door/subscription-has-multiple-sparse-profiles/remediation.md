# Remediation

Treat this finding as a consolidation review, not an automatic change request. Do not merge profiles solely because this policy reports a finding.

## Review compatibility

For each candidate profile, inventory its endpoints, routes, custom domains, origin groups, rule sets, Web Application Firewall policies, managed identities, diagnostic settings, ownership, tier, and capacity requirements. Consolidate only workloads with compatible security, routing, availability, and operational requirements.

## Migrate safely

Azure Front Door endpoints are created under a profile and should be migrated by creating and validating the required configuration in the target profile. Validate custom-domain ownership, certificates, DNS, routing, health probes, WAF coverage, logging, and rollback before switching traffic. Keep the source profile until the migrated workload is verified in production.

After validation, remove the unused endpoints and profile according to the change-management process. Monitor availability, latency, and security telemetry after the change.
