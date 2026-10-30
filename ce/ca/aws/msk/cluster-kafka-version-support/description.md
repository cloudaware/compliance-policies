# Description

This policy checks an Amazon MSK Provisioned cluster's **Current Broker: Kafka Version** against the AWS MSK support calendar. It preserves AWS identifiers such as `.kraft` and `.tiered`. **Current Version** is a cluster revision token and is not assessed as a Kafka release. A supported version does not have to be the latest version.

## Rationale

Using supported broker software reduces security and maintenance risk. AWS can automatically upgrade clusters after a version's end of support without advance notification. Findings let owners verify discovery and schedule a tested upgrade instead of relying on that automatic upgrade. Kafka's upstream lifecycle does not establish Amazon MSK's support status.

## Impact

Upgrades can change client compatibility, configuration requirements, and metadata management. Plan and test the upgrade rather than relying on an automatic service upgrade. A retained CMDB version is not proof that AWS still runs that version after its automatic upgrade window.

## Audit

This policy marks an *AWS MSK Cluster* as `INCOMPLIANT` if its **State** is **ACTIVE**, **UPDATING**, **HEALING**, **MAINTENANCE**, or **REBOOTING_BROKER** and its **Current Broker: Kafka Version** matches one of the versions below, whose published AWS **End of support date** has passed.

| AWS Kafka identifier | End of support date |
| --- | --- |
| `1.1.1`, `2.1.0` | 2024-06-05 |
| `2.2.1`, `2.3.1`, `2.4.1`, `2.4.1.1`, `2.5.1` | 2024-06-08 |
| `2.6.0`, `2.6.1`, `2.6.2`, `2.6.3`, `2.7.0`, `2.7.1`, `2.7.2`, `2.8.0`, `2.8.1`, `3.1.1`, `3.2.0`, `3.3.1`, `3.3.2` | 2024-09-11 |
| `2.8.2.tiered`, `2.8.2-tiered` | 2025-01-14 |
| `3.4.0` | 2025-08-04 |
| `3.5.1` | 2025-10-23 |
| `3.6.0` | 2026-06-01 |
| `3.7.x`, `3.7.x.kraft` | 2026-09-01 |

An operational cluster with a nonempty **Current Broker: Kafka Version** outside the expired-version list is `COMPLIANT`

Clusters in **DELETING**, **CREATING**, or **FAILED** state are `INAPPLICABLE`.
