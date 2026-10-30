# Description

This policy identifies AWS Redshift Clusters that do not have **automatic major version upgrades** enabled. When enabled, this feature allows major engine version upgrades to be applied automatically during the cluster's scheduled maintenance window.

## Rationale

Keeping the database engine up to date is critical for the long-term health, performance, and security of your Redshift cluster. Major version upgrades often introduce new features, expanded SQL support, improved integrations, and performance optimizations that can reduce query execution times and resource usage. While minor versions primarily deliver security patches and bug fixes, major versions address architectural improvements and remove deprecated or insecure legacy behaviors.

Enabling automatic major version upgrades reduces the operational overhead of planning and executing version migrations manually.

## Impact

If automatic upgrades are not enabled, your team must track engine end-of-life dates and perform manual upgrades, increasing the risk of version lag, potential vulnerabilities, and operational errors.

## Audit

This policy flags an *AWS Redshift Cluster* as `INCOMPLIANT` if the `Version Upgrade` field is not set to **Allowed**.

*Clusters* that are **not in the available state** are marked as `INAPPLICABLE`.
