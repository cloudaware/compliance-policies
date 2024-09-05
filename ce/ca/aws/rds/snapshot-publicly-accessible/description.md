# Description

Ensure that your AWS Relational Database Service (RDS) database snapshots are not publicly accessible (i.e., shared with all AWS accounts and users) to protect your private data.

## Rationale

RDS snapshots contain both the data and configurations of your database instances. If these snapshots are publicly accessible, unauthorized users can access sensitive information, leading to data breaches and other security issues. Keeping RDS snapshots private helps maintain the confidentiality and integrity of your data.

Publicly sharing an AWS RDS database snapshot grants another AWS account permission to copy the snapshot and create database instances from it. It is strongly recommended not to share your database snapshots with all AWS accounts. If necessary, you can share your RDS snapshots with specific AWS accounts without making them public.

## Audit

This policy marks an AWS RDS snapshot as `INCOMPLIANT` if the snapshot type is `public` or if the snapshot's `restore` attribute is set to `all`.

An AWS RDS snapshot is marked as `INAPPLICABLE` when:

- The snapshot type is set to `automated` or `awsbackup`.
- The RDS snapshot is encrypted.

The snapshot will be marked as `UNDETERMINED` if there is a potential permission issue with the `rds:DescribeDBSnapshotAttributes` API call.