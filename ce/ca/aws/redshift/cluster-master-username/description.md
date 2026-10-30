# Description

This policy identifies AWS Redshift Clusters that are using the default master username.

AWS Redshift clusters should be configured with custom master usernames instead of the default `awsuser`.

## Rationale

Using a custom master username adds an additional layer of defense against generic or non-targeted attacks. While changing the default master username improves security, it does not fully prevent attackers who may obtain database usernames through social engineering or other means. For comprehensive Redshift security, restrict the root account to privileged users, enforce strong and complex passwords, and grant database-level permissions only to trusted users.

## Impact

Requires recreating the database cluster with a custom master username and migrating the existing data to the new cluster.

## Audit

This policy flags an *Amazon Redshift Cluster* as `INCOMPLIANT` if the **Master Username** is set to `awsuser`.
