# Description

This policy identifies AWS RDS Clusters that are configured with a **master username** matching common or default values provided by database engines or the cloud platform.

When creating an Amazon RDS cluster, the master username should be set to a unique, non-default value. Default or commonly used administrative usernames are widely known and frequently targeted by attackers. Using a unique master username helps reduce the risk of unauthorized access and improves the overall security posture of the cluster.

## Rationale

Many database engines and AWS examples reference usernames such as `admin` for the RDS master account. Consequently, several production clusters may use these predictable values. Malicious actors can exploit this information during brute-force or credential-stuffing attacks, targeting well-known administrative usernames. Avoiding default or common master usernames decreases the cluster's exposure to such attacks.

## Impact

Requires recreating the database cluster with a custom master username and migrating the existing data to the new cluster.

## Audit

This policy flags an **AWS RDS Cluster** as `INCOMPLIANT` if the **Master Username** matches any of the following common or default values:

* `root`
* `admin`
* `administrator`
* `adminuser`
* `superuser`
* `sa`
* `sysadmin`
* `dbadmin`
* `user`
* `dbuser`
* `sys`
* `system`
* `awsuser`
* `mysql`
* `oracle`
* `postgres`

Clusters that are **not in the available** `State` or use **Amazon DocumentDB** or **Amazon Neptune** are marked as `INAPPLICABLE`.
