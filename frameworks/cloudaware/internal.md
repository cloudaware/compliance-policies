# Cloudaware Framework Mapping Guide

## Purpose

- Keep policy-to-framework mappings consistent across providers and services.
- Minimize overlap between similar sections.
- Make mappings deterministic and easy to audit.
- Preserve complete coverage of relevant compliance categories.

## Authoritative Inputs

Use only:

- `policy.yaml`: `names.full`, `description`
- `prod.logic.yaml`: `remediationMessage`
- `description.md`

Do not use:

- External framework mappings
- `similarPolicies` metadata

## Hard Rules

1. Map every policy to at least one Cloudaware leaf section.
2. Never map to top-level categories (for example, `/frameworks/cloudaware/resource-security`).
3. Assign exactly one primary section per policy.
4. Never assign more than one leaf section within the same top-level category.
5. If a policy spans multiple top-level categories, add one mapping per category unless the policy is already fully represented by one of these categories:
   - `logging-and-monitoring`
   - `identity-and-access-governance`
   - `secret-and-certificate-governance`

## Mapping Workflow

1. Identify the main control outcome in the policy statement.
2. Pick the best-fit leaf section for that outcome (this is the primary mapping).
3. Check whether the policy has additional outcomes in other top-level categories.
4. Add one mapping for each uncovered top-level category.
5. Run tie-breakers and boundary checks before finalizing.

## Section Boundaries

### Resource Security

- `/frameworks/cloudaware/resource-security/public-data-access`
  - Use for public or anonymous access to data-bearing resources.
  - Includes: public buckets, public snapshots, public images, publicly readable file systems.
  - Excludes: pure network reachability issues (`network-exposure`).

- `/frameworks/cloudaware/resource-security/network-exposure`
  - Use for internet exposure and unrestricted reachability.
  - Includes: open ingress ports, public IPs, public endpoints, public network access flags, unrestricted DB port access.
  - Excludes: data-level access policy issues (`public-data-access` or `secure-access`).

- `/frameworks/cloudaware/resource-security/secure-access`
  - Use for private-access hardening and policy-based access controls.
  - Includes: IAM/resource/KMS policies, RBAC on resources, service-to-service authorization, network isolation controls.
  - Excludes: public ingress/reachability (`network-exposure`).

- `/frameworks/cloudaware/resource-security/data-encryption`
  - Use for encryption at rest or in transit.
  - Includes: storage encryption, mandatory TLS/HTTPS for transport encryption.
  - Excludes: TLS versions/cipher policies (`cryptographic-configuration`) and access controls (`secure-access`).

- `/frameworks/cloudaware/resource-security/data-protection-and-recovery`
  - Use for backup, restore, and recovery posture.
  - Includes: backups, snapshots, PITR, disaster recovery readiness.
  - Excludes: encryption-only controls (`data-encryption`).

- `/frameworks/cloudaware/resource-security/microsoft-defender-configuration`
  - Use for Microsoft Defender-specific settings and enablement gaps.
  - Includes: Defender plan settings, Defender coverage/configuration checks.
  - Excludes: non-Defender detection/prevention tooling (`threat-protection`).

- `/frameworks/cloudaware/resource-security/threat-protection`
  - Use for general detection and prevention tooling.
  - Includes: WAF, IDS/IPS, threat analytics, malware/runtime scanning, Inspector/GuardDuty-style controls.
  - Excludes: Defender-specific configuration gaps (`microsoft-defender-configuration`).

### Logging and Monitoring

- `/frameworks/cloudaware/logging-and-monitoring/logging-and-monitoring-configuration`
  - Use when required logging or telemetry collection is missing/incomplete.
  - Includes: audit logs, access logs, execution logs, telemetry pipelines.
  - Excludes: alarm routing or escalation logic (`alerting-and-notification`).

- `/frameworks/cloudaware/logging-and-monitoring/alerting-and-notification`
  - Use when alerts, notifications, or escalations are missing/ineffective.
  - Includes: alarms without actions, missing notification channels, escalation failures.
  - Excludes: log capture completeness (`logging-and-monitoring-configuration`).

### Resource Reliability

- `/frameworks/cloudaware/resource-reliability/system-configuration`
  - Use for operational or baseline configuration hygiene affecting stability/availability.
  - Includes: unsafe defaults, missing health-related settings, configuration drift.
  - Excludes: legacy platform or version retirement (`infrastructure-modernization`).

- `/frameworks/cloudaware/resource-reliability/infrastructure-modernization`
  - Use for outdated platform, runtime, or architecture upgrades.
  - Includes: legacy instance models, deprecated runtimes, migration-to-modern-baseline controls.
  - Excludes: current-platform tuning/hardening (`system-configuration`).

### Cost Efficiency and Optimization

- `/frameworks/cloudaware/cost-efficiency-and-optimization/waste-reduction`
  - Use for unused or idle resources that should be removed.
  - Includes: unattached disks, idle instances, obsolete snapshots, unused IP allocations.
  - Excludes: rightsizing decisions (`resource-right-sizing`).

- `/frameworks/cloudaware/cost-efficiency-and-optimization/resource-right-sizing`
  - Use for capacity mismatch with workload demand.
  - Includes: persistent over/under-provisioning requiring size changes.
  - Excludes: pure idle/unused cleanup (`waste-reduction`).

- `/frameworks/cloudaware/cost-efficiency-and-optimization/resource-optimization`
  - Use for cost optimization that is not primarily rightsizing or waste cleanup.
  - Includes: plan/commitment/config optimization choices.
  - Excludes: explicit size mismatch (`resource-right-sizing`) and unused resources (`waste-reduction`).

### Resource Performance

- `/frameworks/cloudaware/resource-performance/performance-tuning`
  - Use for direct performance improvements and latency/throughput tuning.
  - Includes: tuning parameters and configuration changes for better performance.
  - Excludes: generic utilization efficiency without a clear performance bottleneck (`workload-efficiency`).

- `/frameworks/cloudaware/resource-performance/workload-efficiency`
  - Use for inefficient resource usage patterns impacting workload efficiency.
  - Includes: inefficiency patterns where the fix is better workload-resource alignment.
  - Excludes: cost-only optimization (`cost-efficiency-and-optimization`).

### Identity and Access Governance

- `/frameworks/cloudaware/identity-and-access-governance/mfa-implementation`
  - Use for missing or weak MFA enforcement.
  - Includes: MFA requirements, factor enforcement gaps.
  - Excludes: non-MFA access baselines (`general-access-controls`).

- `/frameworks/cloudaware/identity-and-access-governance/credential-lifecycle-management`
  - Use for identity credential issuance, rotation, expiry, and retirement.
  - Includes: password policy lifecycle, access key and SSH key age/rotation, API key and service account credential lifecycle controls.
  - Excludes: certificate/secret/KMS key validity and rotation controls (`secret-and-certificate-governance`) and role/permission model design (`rbac-management`).

- `/frameworks/cloudaware/identity-and-access-governance/rbac-management`
  - Use for role and permission model correctness.
  - Includes: excessive role permissions, unsafe role assignments, privilege scope issues.
  - Excludes: user lifecycle administration (`user-account-management`).

- `/frameworks/cloudaware/identity-and-access-governance/user-account-management`
  - Use for user account lifecycle and account state controls.
  - Includes: inactive users, stale accounts, account provisioning/deprovisioning hygiene.
  - Excludes: role policy design (`rbac-management`).

- `/frameworks/cloudaware/identity-and-access-governance/general-access-controls`
  - Use for baseline tenancy/org guardrails and default privileged access posture.
  - Includes: baseline access constraints, organization guardrails, default permission boundaries.
  - Excludes: MFA-only controls (`mfa-implementation`).

### Secret and Certificate Governance

- `/frameworks/cloudaware/secret-and-certificate-governance/cryptographic-configuration`
  - Use for crypto strength and protocol configuration.
  - Includes: key type/length, TLS versions, cipher suites, certificate algorithms/policies.
  - Excludes: expiration or rotation timing (`expiration-management`).

- `/frameworks/cloudaware/secret-and-certificate-governance/expiration-management`
  - Use for expiration windows, renewal, and rotation cadence.
  - Includes: secret/certificate expiry monitoring, maximum validity periods, renewal and rotation controls.
  - Excludes: cryptographic parameter quality (`cryptographic-configuration`).

## Tie-Breakers

Use these when a policy could reasonably fit multiple Cloudaware leaf sections.

### Resource Security (Apply in Order)

1. Public/anonymous access to data-bearing resources -> `public-data-access` (even if network exposure also exists).
2. Internet/public reachability and open ingress -> `network-exposure`.
3. Resource-level authorization or private-access enforcement -> `secure-access`.
4. Microsoft Defender-specific configuration gaps -> `microsoft-defender-configuration`.
5. Other detection/prevention tooling gaps -> `threat-protection`.
6. Data encryption requirement (at rest/in transit) -> `data-encryption`.
7. Backup/recovery controls -> `data-protection-and-recovery`.

### Logging and Monitoring

1. Missing log capture/telemetry -> `logging-and-monitoring-configuration`.
2. Missing or ineffective alerts/escalation -> `alerting-and-notification`.

### Secret and Certificate Governance (Apply in Order)

1. TLS/cipher/key-strength configuration -> `cryptographic-configuration`.
2. Expiration windows, renewal, and rotation cadence -> `expiration-management`.

### Cost Efficiency and Optimization (Apply in Order)

1. Idle/unused resources to remove -> `waste-reduction`.
2. Persistent over/under-provisioning requiring size changes -> `resource-right-sizing`.
3. Other cost optimization choices -> `resource-optimization`.

### Resource Performance (Apply in Order)

1. Direct tuning to improve throughput/latency or performance diagnostics -> `performance-tuning`.
2. Inefficient utilization or scaling misalignment -> `workload-efficiency`.

### Identity and Access Governance (Apply in Order)

1. Missing or weak MFA enforcement -> `mfa-implementation`.
2. Credential issuance/rotation/expiry/retirement -> `credential-lifecycle-management`.
3. Role and permission model correctness -> `rbac-management`.
4. User account lifecycle and account state controls -> `user-account-management`.
5. Baseline tenancy/org guardrails -> `general-access-controls`.

## Quality Checklist

Before finalizing, confirm all of the following:

1. Mapping points to leaf section(s), not top-level categories.
2. Exactly one primary Cloudaware leaf mapping is selected.
3. No category contains more than one mapped leaf.
4. Additional categories are mapped only when they add distinct control coverage.
5. Tie-breakers were applied to the final selection.
