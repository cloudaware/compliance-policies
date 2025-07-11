# Description

Ensure that all AWS Database Migration Service (DMS) Replication Instances have the **Auto Minor Version Upgrade** feature enabled.

## Rationale

Enabling auto minor version upgrades ensures that your DMS replication instances automatically receive the latest minor engine updates from AWS. These upgrades can include security patches, bug fixes, and performance improvements without requiring manual intervention.

## Impact

Updates are deployed during the instance’s defined maintenance window, which may incur a brief service interruption. Schedule this setting during periods of low traffic to minimize impact on ongoing migrations.

## Audit

This policy marks an *AWS DMS Replication Instance* as `INCOMPLIANT` if the `Minor Version Automatic Update` checkbox is set to **false**.
