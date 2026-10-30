# Remediation

## Confirm the installed version and support dates

In the Amazon RDS console, select the standalone DB instance and confirm its engine, installed version,
AWS Region, and status. Use the AWS CLI to inspect its configuration, lifecycle calendar, and valid
upgrade targets:

```sh
aws rds describe-db-instances \
    --db-instance-identifier <database-id> \
    --region <region>

aws rds describe-db-major-engine-versions \
    --engine <engine> \
    --region <region>

aws rds describe-db-engine-versions \
    --engine <engine> \
    --engine-version <installed-version> \
    --include-all \
    --region <region> \
    --query 'DBEngineVersions[].{Engine:Engine,Version:EngineVersion,UpgradeTargets:ValidUpgradeTarget}'
```

Use `Engine` and `EngineVersion` from the instance response to identify the installed major version.
Match these values to `Engine` and `MajorEngineVersion` in the lifecycle calendar response, then inspect
`SupportedEngineLifecycles` by `LifecycleSupportName` for standard and Extended Support dates.

Major-version numbering differs by engine:

- **PostgreSQL:** One component for version 10 and later; two components for earlier releases.
- **MySQL and MariaDB:** Two components.

RDS-specific patch suffixes do not define a new major version. `EngineLifecycleSupport` indicates
Extended Support enrollment, not the current lifecycle phase. Pending modifications, instance classes,
and parameter group families do not establish the installed version.

If the instance belongs to a DB cluster, follow the cluster upgrade procedure. If CMDB lifecycle data
is missing or inconsistent, reconcile it with AWS before changing the database.

## Prepare the upgrade

1. Select a target version within AWS standard support and confirm a valid upgrade path from the
   installed version. Review engine release notes, extensions, clients, parameters, replicas, and any
   required intermediate upgrades. If an intermediate version is also outside standard support,
   continue to the intended supported target.
2. Create a manual DB snapshot, verify backup retention and restoration, and test the upgrade in a
   representative non-production environment. Agree on a maintenance window and recovery plan.
3. Review pending modifications. Wait for an existing upgrade or incompatible instance state to
   resolve, and start a stopped instance when ready to perform its planned upgrade.

**Database upgrades can cause downtime, including for Multi-AZ DB instances. An in-place major-version
downgrade might not be available.** Recovery can require restoring the pre-upgrade snapshot to a separate
instance and redirecting clients. Plan how to reconcile writes made after the snapshot before cutting
over to a restored instance. Preserve the original database and recovery artifacts until the migration
is verified.

## Upgrade the instance

### Using the AWS Management Console

1. Open **RDS → Databases** and select the instance.
2. Choose **Modify**, then select the tested **DB engine version** and a compatible parameter group.
3. Choose **Continue** and review the summary, including any pending modifications.
4. Select **Apply during the next scheduled maintenance window**, then confirm the modification.

### Using the AWS CLI

Schedule the tested major-version upgrade for the next maintenance window:

```sh
aws rds modify-db-instance \
    --db-instance-identifier <database-id> \
    --engine-version <tested-target-version> \
    --allow-major-version-upgrade \
    --no-apply-immediately \
    --region <region>
```

Include the tested target parameter group when required by the engine's upgrade procedure. Consider
staged migration or RDS Blue/Green Deployments when supported and appropriate.

## Verify the upgrade

After the upgrade completes, confirm the installed engine version and validate application health,
extensions, replication, monitoring, and backups. Refresh Cloudaware discovery and confirm that the
instance's lifecycle calendar places it within AWS standard support.

Scheduling an upgrade or enabling automatic minor-version upgrades does not complete this remediation.

## If an upgrade must be deferred

For eligible MySQL or PostgreSQL versions, verify Extended Support enrollment, supported patch releases,
the final support deadline, and current pricing for the AWS Region. Include primary instances, read
replicas, and any billable Multi-AZ standby capacity in cost planning. MariaDB does not offer RDS
Extended Support.

Record an owner, upgrade deadline, support coverage, and a time-limited organizational exception.
Extended Support enrollment does not satisfy this policy.

**Disabling enrollment after standard support ends can trigger an automatic major-version upgrade.**
Do not use this setting as an untested cost-only change or delete a database merely to clear a finding.
