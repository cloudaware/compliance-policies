# Description

This policy identifies AWS RDS Clusters that are not configured with **Deletion Protection**.

When Deletion Protection is enabled, an RDS cluster cannot be deleted through the AWS Management Console, AWS CLI, or API calls. To delete the cluster, Deletion Protection must first be explicitly disabled by modifying the cluster configuration.

## Rationale

Accidental deletion of a database cluster poses a significant risk to data availability and business continuity. Administrators or automated processes may inadvertently target the wrong cluster, resulting in irreversible data loss.

Deletion Protection introduces a mandatory safeguard that requires deliberate action before a destructive operation can be performed. This additional control reduces the likelihood of human error and prevents unintended deletions initiated by automation.

When infrastructure-as-code tools such as Terraform or AWS CloudFormation are used, misconfigurations or unexpected changes can trigger resource replacement or deletion. Enabling Deletion Protection prevents the AWS API from executing such destructive commands without prior, intentional configuration changes.

## Audit

This policy flags an *Amazon RDS cluster* as `INCOMPLIANT` if `Deletion Protection` is set to **false**.
