# Description

This policy identifies Amazon OpenSearch Service domains whose OpenSearch or legacy Elasticsearch engine is outside AWS standard support. It evaluates the domain's current engine family and minor version, not whether the engine is the latest release. Engine lifecycle is independent of service software updates and the OpenSearch Dashboards version. Serverless collections and self-managed clusters are outside this resource type.

## Rationale

Standard support provides AWS bug fixes and security updates. Extended support provides a narrower security-fix commitment and incurs additional charges. Planning engine upgrades before standard support ends reduces support costs and migration pressure.

## Impact

An engine upgrade can introduce incompatible API, index, plugin, and client behavior. Assess compatibility and recovery before changing a production domain. A finding during extended support does not mean all AWS support has ended.

## Audit

This policy marks an *AWS OpenSearch Domain* as `INCOMPLIANT` if its **Created** field is `true`, its **Deleted** field is `false`, and its **Engine Version** belongs to a release group whose AWS standard-support cutoff in the table below is before today.

Domains with **Deleted** equal to `true` or **Created** equal to `false` are `INAPPLICABLE` because they are deleted or have not completed creation. Missing or unexpected creation/deletion flags and missing engine versions on created domains are `UNDETERMINED`.

Applicable domains with a nonempty **Engine Version** that does not match an expired release group are `COMPLIANT`.

The calendar and release identifiers were verified on 27 October 2026:

| Engine releases | Standard support cutoff | Updated final support cutoff |
| --- | --- | --- |
| Elasticsearch 1.5, 2.3, 5.1, 5.3, 5.5, 6.0, 6.2, 6.3, 6.4, 6.5, 6.7, 7.1, 7.4, 7.7, 7.8; OpenSearch 1.0, 1.1, 1.2, 2.3, 2.5, 2.7, 2.9 | 7 November 2025 | 7 November 2027 |
| Elasticsearch 5.6 | 7 November 2025 | 7 November 2028 |
| Elasticsearch 6.8, 7.10; OpenSearch 1.3, 2.19 | 7 November 2027 | 7 November 2030 |
| Elasticsearch 7.9; OpenSearch 2.11, 2.13, 2.15, 2.17 | 7 November 2027 | 7 November 2028 |
