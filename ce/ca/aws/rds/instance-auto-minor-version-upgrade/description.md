# Description

Ensure that RDS database instances have the Auto Minor Version Upgrade flag enabled in order to receive automatically minor engine upgrades during the specified maintenance window. So, RDS instances can get the new features, bug fixes, and security patches for their database engines.

## Rationale

AWS RDS will occasionally deprecate minor engine versions and provide new ones for an upgrade. When the last version number within the release is replaced, the version changed is considered minor. With Auto Minor Version Upgrade feature enabled, the version upgrades will occur automatically during the specified maintenance window so your RDS instances can get the new features, bug fixes, and security patches for their database engines.

## Audit

### From Console

1. Log in to the AWS management console and navigate to the RDS dashboard at <https://console.aws.amazon.com/rds/>.
2. In the left navigation panel, click on `Databases`.
3. Select the RDS instance that wants to examine.
4. Click on the `Maintenance and backups` panel.
5. Under the `Maintenance` section, search for the Auto Minor Version Upgrade status.

- If the current status is set to `Disabled`, means the feature is not set and the minor engine upgrades released will not be applied to the selected RDS instance.

### From Command Line

1. Run `describe-db-instances` command to list all RDS database names, available in the selected AWS region:

```sh
aws rds describe-db-instances --region <regionName> --query 'DBInstances[*].DBInstanceIdentifier'
```

2. The command output should return each database instance identifier.
3. Run again `describe-db-instances` command using the RDS instance identifier returned earlier to determine the Auto Minor Version Upgrade status for the selected instance:

```sh
aws rds describe-db-instances --region <regionName> --db-instance-identifier <dbInstanceIdentifier> --query 'DBInstances[*].AutoMinorVersionUpgrade'
```

4. The command output should return the feature current status. If the current status is set to `true`, the feature is enabled and the minor engine upgrades will be applied to the selected RDS instance.

## References

1. <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_RDS_Managing.html>
2. <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_UpgradeDBInstance.Upgrading.html>
3. <https://aws.amazon.com/rds/faqs/>
