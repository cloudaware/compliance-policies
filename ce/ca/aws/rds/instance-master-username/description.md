# Description

This policy identifies Amazon RDS Instances that are configured with a **master username** matching common or default values provided by database engines or the cloud platform.

When creating an Amazon RDS database, the master username should be set to a unique, non-default value. Default or commonly used administrative usernames are widely known and frequently targeted by attackers. Using a unique master username reduces the risk of unauthorized access and strengthens the overall security posture of the database.

## Rationale

Database engines and AWS documentation examples commonly reference usernames such as `admin` for the RDS master account. As a result, many production RDS instances are deployed using these predictable values. Malicious actors can exploit this knowledge during brute-force or credential-stuffing attacks by targeting well-known administrative usernames. Avoiding default or common master usernames significantly reduces the attack surface.

## Impact

Requires recreating the database instance with a custom master username and migrating the existing data to the new instance.

## Audit

This policy flags an *Amazon RDS Instance* as `INCOMPLIANT` if the `Master Username` matches any of the following common or default values:

- `root`
- `admin`
- `administrator`
- `adminuser`
- `superuser`
- `sa`
- `sysadmin`
- `dbadmin`
- `user`
- `dbuser`
- `sys`
- `system`
- `awsuser`
- `mysql`
- `oracle`
- `postgres`

*RDS Instances* that are part of a **DB Cluster**, are not in the **available** `State`, or use **Amazon DocumentDB** or **Amazon Neptune** engine types are marked as `INAPPLICABLE`.
