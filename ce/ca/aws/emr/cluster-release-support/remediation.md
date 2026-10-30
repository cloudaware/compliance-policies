# Remediation

## Migrate to a supported EMR release

Migrate workloads to a replacement EMR on EC2 cluster running a supported release. EMR does not automatically upgrade existing clusters; updating a cluster creation template does not migrate a running cluster.

1. **Verify the current cluster.** Confirm the cluster's release label and state in the correct AWS account and Region using `aws emr describe-cluster`. Refresh Cloudaware discovery if the inventory is stale.

2. **Choose a supported target release.** Consult the [AWS support lifecycle calendar](https://docs.aws.amazon.com/emr/latest/ReleaseGuide/emr-standard-support.html). Review compatibility with applications, Java, Python, the operating system, bootstrap actions, and cluster configuration.

3. **Create and test the replacement cluster.** Use the selected release and reproduce the required networking, security configuration, IAM roles, logging, applications, and job settings. Run representative workloads and validate their outputs.

4. **Preserve data and prepare recovery.** Back up or migrate required HDFS data and other data stored on the original cluster. Plan the transition for scheduled jobs, streaming checkpoints, and dependent clients. Retain a recovery path until the replacement produces validated results.

5. **Move workloads to the replacement cluster.** Perform a controlled cutover and verify successful operation. Coordinate writers to prevent duplicate or conflicting output during cutover or rollback.

6. **Retire the original cluster.** Terminate the original cluster only after confirming that migration and data retention requirements are satisfied. Update cluster creation templates and scheduled jobs so they do not recreate the release that triggered the finding.

7. **Verify the policy result.** Refresh Cloudaware discovery, confirm the replacement cluster's release label, and reassess this policy.

## Verify a conditional migration extension

For releases **5.36**, **6.6-6.15**, and **7.0-7.10**, migrate to a release within its original AWS support period. A conditional extension may provide time to complete the migration, but the policy remains `INCOMPLIANT` after the original or bridge support end date.

If relying on a conditional migration extension:

1. Contact AWS Support with the migration plan and confirm approval for the affected account and release.

2. Record the support ticket, approved terms, expiration date, and workload owner. The CMDB release label alone does not establish approval.

3. Complete the migration before the approved extension expires.
