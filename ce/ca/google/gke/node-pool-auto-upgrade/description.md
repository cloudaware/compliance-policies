# Description

This policy identifies GKE cluster node pools that have the Auto-Upgrade feature disabled.

## Rationale

Node auto-upgrade ensures that nodes in the node pool remain current with the latest stable Kubernetes patch version and the underlying operating system. It uses the same update mechanism as manual node upgrades.

When enabled, node pools are automatically scheduled for upgrades when a new stable Kubernetes version becomes available. During the upgrade, node pools are updated to match the current cluster master version. This provides security benefits by automatically applying critical security patches to the Kubernetes Engine nodes.

## Impact

Enabling auto-upgrade does not trigger immediate upgrades; automatic upgrades occur at intervals determined by the Kubernetes Engine team.

To minimize disruption during peak usage periods, you can define a maintenance window, which is a four-hour timeframe during which upgrades may occur. Maintenance windows can be scheduled on any day of the week. To block upgrades during specific dates, you can define maintenance exclusions, which may span multiple days.

**Note**: During the auto-upgrade process, nodes are recreated and receive the latest node image. For Container-Optimized OS (COS) images, this serves as the primary OS upgrade mechanism.

## Audit

This policy marks a *Google GKE Cluster Node Pool* as `INCOMPLIANT` if `Node Management: Auto-Upgrade` is **not** set to **Enabled**.

## Default Value

Node auto-upgrade is enabled by default for the default node pool. Additional node pools created after the cluster’s creation do not have auto-upgrade enabled by default, even if the default node pool has auto-repair enabled.

## References

1. <https://cloud.google.com/kubernetes-engine/docs/concepts/node-auto-upgrades>
2. <https://cloud.google.com/kubernetes-engine/docs/how-to/maintenance-windowsand-exclusions>
3. <https://cloud.google.com/kubernetes-engine/docs/concepts/node-images>
4. <https://cloud.google.com/kubernetes-engine/docs/concepts/node-images>

## Additional Information

Node auto-upgrades is not available for Alpha Clusters.
