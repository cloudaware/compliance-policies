# Remediation

1. Confirm the node group's Kubernetes version and the cluster control plane version against current AWS data:

   ```sh
   aws eks describe-nodegroup \
     --cluster-name <cluster> \
     --nodegroup-name <node-group> \
     --region <region>

   aws eks describe-cluster \
     --name <cluster> \
     --region <region>
   ```

   Inspect `nodegroup.version`, `nodegroup.status`, `cluster.version`, and `cluster.status`. Wait for any ongoing update to finish before starting another. Resolve inventory discrepancies before proceeding.

2. Choose a Kubernetes version within AWS EKS standard or extended support that is no newer than the control plane and no more than three minor versions behind it. Prefer matching the control plane and remaining within standard support. If the node group is newer than the control plane, verify both versions before planning a control plane upgrade or replacing the group with compatible nodes.

3. Test workload and add-on compatibility, review EKS upgrade insights and deprecated APIs, and reserve sufficient rollout capacity. Check Pod disruption budgets and draining requirements. If a control plane upgrade is necessary, advance one minor version at a time and follow the AWS upgrade sequence for nodes and add-ons. Plan recovery with compatible replacement capacity; do not rely on an in-place node group downgrade.

4. Update the managed node group to the selected version through the EKS console or AWS CLI:

   ```sh
   aws eks update-nodegroup-version \
     --cluster-name <cluster> \
     --nodegroup-name <node-group> \
     --kubernetes-version <target-version> \
     --region <region>
   ```

   For a group using a launch template, follow the launch template update workflow and retain the same template identity. If the target requires a different AMI family, create a replacement group that preserves the existing access, networking, scaling, and workload placement settings. Validate it before removing the old group.

5. Monitor the returned update ID:

   ```sh
   aws eks describe-update \
     --name <cluster> \
     --nodegroup-name <node-group> \
     --update-id <update-id> \
     --region <region>
   ```

   Resolve drain failures before considering a force update, which can bypass Pod disruption budgets.

6. Confirm the Kubernetes context, then use `kubectl get nodes -o wide` to verify node readiness and actual kubelet versions. Check application health and the version reported by `DescribeNodegroup`. Refresh Cloudaware inventory and rerun the policy.

See [managed node group updates](https://docs.aws.amazon.com/eks/latest/userguide/update-managed-node-group.html), [UpdateNodegroupVersion API constraints](https://docs.aws.amazon.com/eks/latest/APIReference/API_UpdateNodegroupVersion.html), and [launch template requirements](https://docs.aws.amazon.com/eks/latest/userguide/launch-templates.html).
