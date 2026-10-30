# Remediation

1. Confirm the finding against current AWS inventory. Inspect the node group's `amiType`, `releaseVersion`, `version`, `status`, `launchTemplate`, and backing Auto Scaling groups:

   ```sh
   aws eks describe-nodegroup \
       --region {{region-name}} \
       --cluster-name {{cluster-name}} \
       --nodegroup-name {{node-group-name}}

   aws eks describe-cluster \
       --region {{region-name}} \
       --name {{cluster-name}} \
       --query 'cluster.{Version:version,Status:status}'

   aws eks describe-cluster-versions \
       --region {{region-name}} \
       --include-all
   ```

   Use the Auto Scaling group names from `nodegroup.resources.autoScalingGroups` to identify its EC2 instances. Inspect their actual `ImageId` values and Kubernetes node versions, particularly after an interrupted rollout. A private or deregistered AMI and missing CMDB enrichment do not establish end of support. For a custom launch-template AMI, verify its base OS, build provenance, patch process, and owner support separately.

2. Select a maintained EKS-optimized AL2023 or Bottlerocket family and AMI release compatible with the node-group Kubernetes version, instance architecture, and workload drivers. If the Kubernetes-specific AMI stream has reached final support, plan a compatible control-plane upgrade first where necessary, then update the managed nodes. A newer control plane alone does not fix the node image. Updating within AL2 cannot restore its retired family support.

3. Test with representative workloads. For AL2023, review `nodeadm` user data, VPC CNI compatibility, IMDSv2, cgroupv2, and GPU/Neuron drivers. For Bottlerocket, review its container configuration and administration model. Reserve adequate surge capacity and respect Pod disruption budgets and storage/availability-zone constraints.

4. Use the appropriate migration path:

   - **Change a managed AMI family:** create a replacement node group, including when a customer launch template is used without an explicit AMI ID. Preserve IAM roles, subnets, security groups, labels, taints, scaling/update settings, user data, tags, and workload placement requirements. EKS does not accept an `amiType` change in `UpdateNodegroupVersion`.
   - **Update the Kubernetes-specific stream within a maintained family:** use the EKS managed node-group update workflow, selecting a version compatible with the control plane and a maintained AMI release. Monitor the update and resolve drain failures before proceeding.
   - **Custom AMI:** when the group was created with a launch template containing an AMI ID, build and test a replacement image, create a new version of the same launch template, and update the group to that version. Do not also specify EKS `version` or `releaseVersion` for that custom-AMI update.

5. Migrate workloads gradually and verify that replacement nodes join, become Ready, and run healthy workloads with the intended images. Keep the previous group available during a blue/green migration until the replacement is validated. EKS managed node-group updates cannot roll back to an earlier Kubernetes or AMI version; plan recovery with a separately tested group rather than relying on an in-place downgrade. Do not force eviction past disruption budgets without assessing the workload impact.

6. Delete the obsolete group only after migration and verification. Refresh Cloudaware inventory and rerun this policy. Check the separate node-group and cluster Kubernetes-version policies, and verify patch currency independently.

## References

- [Migrate EKS AL2 node groups to AL2023](https://docs.aws.amazon.com/eks/latest/userguide/al2023.html)
- [EKS Bottlerocket AMIs](https://docs.aws.amazon.com/eks/latest/userguide/eks-optimized-ami-bottlerocket.html)
- [Update a managed node group](https://docs.aws.amazon.com/eks/latest/userguide/update-managed-node-group.html)
- [UpdateNodegroupVersion API and restrictions](https://docs.aws.amazon.com/eks/latest/APIReference/API_UpdateNodegroupVersion.html)
