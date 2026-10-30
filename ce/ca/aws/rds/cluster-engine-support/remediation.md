# Remediation

Plan and test a cluster engine upgrade to a major version within AWS standard support. Automatic minor version upgrades alone do not resolve an expired major-version support period.

## Plan and perform the upgrade

1. **Confirm the current configuration.** Check the cluster's actual engine, major version, AWS support dates, and available upgrade targets in its Region. Reconcile stale CMDB data with the live AWS cluster before making changes.

2. **Review compatibility and the upgrade path.** Read the engine's AWS upgrade documentation and release notes. Check application SQL, drivers, extensions, parameter groups, readers, replicas, and global database dependencies. Follow supported intermediate upgrades when a direct upgrade is unavailable.

3. **Test and prepare for recovery.** Test the upgrade and application behavior on a restored copy or in a staging environment. Take and verify suitable backups, define recovery procedures, and schedule the production change within an agreed maintenance window.

4. **Upgrade the cluster.** Use the Amazon RDS console or your normal infrastructure deployment process, following the procedure for Aurora or a Multi-AZ DB cluster as appropriate. Coordinate global database members and verify Serverless capacity compatibility where applicable.

5. **Verify the result.** Confirm cluster health, readers, replication, application behavior, and the actual engine version. Refresh Cloudaware collection and confirm that the new engine version is within AWS standard support.

**An in-place major-version downgrade is generally unavailable.** Plan recovery by restoring a pre-upgrade snapshot into a separate cluster, redirecting application connections, and reconciling writes made after the snapshot.

## If an upgrade must be deferred

While the version remains eligible for RDS Extended Support, verify enrollment, applicable charges, and the minor version required to receive Extended Support patches. Published support dates alone do not establish coverage for the installed minor release.

Obtain a time-limited exception and set an upgrade deadline before Extended Support ends. An exception does not make a version outside standard support compliant with this policy. Stopping the cluster does not resolve the finding.

**Disabling Extended Support after standard support has ended can trigger an automatic major-version upgrade.** Do not use this setting as an unplanned way to remove charges.

If the final published support date has passed, prioritize migration or upgrade. Confirm the cluster's actual state and AWS's automatic upgrade behavior before scheduling the change.
