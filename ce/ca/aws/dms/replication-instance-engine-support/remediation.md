# Remediation

Select an engine version that is available for the instance class and Region and has not reached its published AWS DMS EOL date. Review its release notes and test migration tasks, source and target compatibility, validation, and change data capture behavior.

First compare the live instance with the finding. If the current version has already been upgraded, refresh Cloudaware inventory instead of scheduling another upgrade. Use the current [AWS DMS lifecycle calendar](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_ReleaseNotes.html); availability for new instances and EOL are different milestones. Check valid upgrade targets with `describe-engine-versions` as well as the class and Region offerings.

## Using the AWS Console

1. Open **AWS DMS**, select the instance's Region, and choose **Replication instances**.
2. Select the instance and review its current version, pending changes, and maintenance window.
3. Record instance configuration, task settings, table mappings, and recovery checkpoints. Schedule an interruption and ensure source logs remain available throughout the CDC outage. Stop active tasks immediately before the agreed upgrade window and verify they have stopped.
4. Choose **Modify**, select the tested **Engine version**, and apply the change during the agreed maintenance window.
5. Wait for **available** status and verify the current engine version. Resume tasks that you stopped manually, then check replication, validation, and latency. Refresh Cloudaware inventory and confirm the finding clears.

## Using the AWS CLI

Use the instance's AWS account/profile and Region for every command. Inspect the current version separately from pending changes:

```sh
aws dms describe-replication-instances \
  --region {{region}} \
  --filters Name=replication-instance-arn,Values={{replication-instance-arn}} \
  --query 'ReplicationInstances[*].{Status:ReplicationInstanceStatus,Class:ReplicationInstanceClass,Current:EngineVersion,Pending:PendingModifiedValues,MaintenanceWindow:PreferredMaintenanceWindow}'
```

Find versions offered for the instance class in the selected Region:

```sh
aws dms describe-orderable-replication-instances \
  --region {{region}} \
  --query 'OrderableReplicationInstances[*].[ReplicationInstanceClass,EngineVersion]'
```

Check valid upgrade paths and lifecycle information, and select the entry matching the current version:

```sh
aws dms describe-engine-versions \
  --region {{region}} \
  --query '{EngineVersions:EngineVersions[*].{Version:Version,Lifecycle:Lifecycle,AvailableUpgrades:AvailableUpgrades,DeprecationDate:DeprecationDate,ForceUpgradeDate:ForceUpgradeDate},Marker:Marker}'
```

If `Marker` is nonempty, repeat this command with `--marker {{marker}}` to inspect the remaining pages.

After completing compatibility checks and reviewing all pending modifications, schedule the upgrade. Coordinate stopping tasks immediately before the maintenance window; scheduling a future upgrade does not require leaving tasks stopped while waiting:

```sh
aws dms modify-replication-instance \
  --region {{region}} \
  --replication-instance-arn {{replication-instance-arn}} \
  --engine-version {{tested-supported-version}} \
  --allow-major-version-upgrade \
  --no-apply-immediately
```

Confirm the current version after maintenance and resume manually stopped tasks. Refresh Cloudaware inventory and verify the finding clears. If immediate application is required during the agreed outage, use `--apply-immediately` after reviewing the pending queue; AWS applies other queued changes as well.

AWS DMS does not support engine downgrades. Retain a tested recovery plan for recreating the prior migration configuration on an available version and restoring tasks from appropriate checkpoints if necessary. Preserve the source logs needed for recovery and avoid running duplicate tasks against the same target. Enabling automatic version upgrades can help with future maintenance but does not resolve a finding until the current version changes.

See [Working with replication engine versions](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_ReplicationInstance.EngineVersions.html) and [Modifying a replication instance](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_ReplicationInstance.Modifying.html).
