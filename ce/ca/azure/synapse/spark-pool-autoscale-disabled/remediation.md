# Remediation

## Before you begin

Confirm that the pool's workloads can tolerate node scaling and establish approved
minimum and maximum node counts. Review subscription quotas, cost limits, job
concurrency, startup requirements, and any fixed-capacity exception.

## Azure portal

1. Open the affected Azure Synapse workspace in Synapse Studio.
2. Select **Manage**, then **Apache Spark pools**.
3. Select the affected Spark pool and choose **Edit**.
4. Enable **Autoscale** and set minimum and maximum node counts that meet the
   approved workload and cost requirements and Azure service limits.
5. Save the configuration, then validate representative scheduled and interactive
   jobs after the change.
6. Confirm that Cloudaware reports `Auto Scale: State` as `Enabled` and populated
   node-count bounds after the next collection.

## Automation

For infrastructure-as-code or API remediation, update the
`Microsoft.Synapse/workspaces/bigDataPools` resource so that
`properties.autoScale.enabled` is `true`. Set
`properties.autoScale.minNodeCount` and `properties.autoScale.maxNodeCount` to
approved values, with the minimum no greater than the maximum. Preserve the
existing Spark version, node size, library settings, and other approved pool
properties when updating the resource. Validate the updated configuration and
representative jobs before closing the finding.
