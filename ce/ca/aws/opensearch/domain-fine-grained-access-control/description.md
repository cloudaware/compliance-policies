# Description

This policy identifies AWS OpenSearch Domains that do not have fine-grained access control enabled.

Fine-grained access control in Amazon OpenSearch Service adds authentication and authorization controls at the index, document, field, and API level. It allows you to define a master user, map users and backend roles to OpenSearch roles, and limit what identities can view or modify within the domain. This provides stronger protection than relying only on network placement or coarse domain access policies.

## Rationale

Enabling fine-grained access control helps enforce least-privilege access to search clusters that often contain sensitive operational, application, or business data. Without it, users and applications that can reach the domain may receive broader access than necessary, increasing the risk of unauthorized data exposure, destructive changes, and privilege misuse.

## Impact

Enabling fine-grained access control is a security architecture change and should be planned carefully. It requires HTTPS, encryption at rest, and node-to-node encryption. Existing access policies, Dashboards access, and application authentication flows might need to be updated to avoid access disruptions. After fine-grained access control is enabled, it cannot be disabled on the existing domain.

## Audit

This policy flags an *AWS OpenSearch Domain* as `INCOMPLIANT` when `Advanced Security: Enabled` is set to **false**.
