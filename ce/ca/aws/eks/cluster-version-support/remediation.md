# Remediation

Upgrade the EKS control plane to a Kubernetes minor version within AWS standard support.

1. Confirm the current Kubernetes version and cluster status with `aws eks describe-cluster`. For a version past final support, check whether AWS has already started or completed an automatic upgrade. Wait for any update to finish and confirm the cluster is **ACTIVE** before proceeding.
2. Choose a version in **STANDARD_SUPPORT** from `aws eks describe-cluster-versions --region {{region-name}} --include-all`, using the returned `versionStatus` and [support dates](https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-versions.html). Plan the path to that target one minor version at a time.
3. Review EKS upgrade insights, release notes, removed APIs, and workload compatibility. Check node, add-on, client, and admission webhook compatibility for each upgrade. Test the sequence in a representative environment and prepare application and data recovery procedures.
4. Upgrade to the next approved Kubernetes minor version:

    ```sh
    aws eks update-cluster-version \
        --region {{region-name}} \
        --name {{cluster-name}} \
        --kubernetes-version {{next-minor-version}}
    ```

5. Monitor the returned update ID:

    ```sh
    aws eks describe-update \
        --region {{region-name}} \
        --name {{cluster-name}} \
        --update-id {{update-id}}
    ```

    Wait for **Successful** and confirm the cluster returns to **ACTIVE** with the intended version. Verify workloads, networking, storage, admission controllers, and authentication. Resolve any failure before continuing.
6. Update nodes and add-ons in AWS's documented order, repeating the upgrade sequence until the control plane is within standard support. Managed node groups require separate upgrades; EKS Auto Mode manages its nodes and respects pod disruption budgets. Refresh Cloudaware collection and confirm that the recorded version matches AWS and the finding clears.

Review rollback eligibility before upgrading. Eligible in-place upgrades can roll back one minor version within seven days, subject to readiness and node/add-on compatibility checks. Returning to extended support requires the **EXTENDED** upgrade policy. Rollback after an automatic upgrade at final-support expiry is unavailable; retain recovery procedures for cases where rollback cannot be used.

If an upgrade is deferred during extended support, confirm support availability, the upgrade policy, and additional charges. Record an exception owner and deadline. The cluster remains noncompliant until upgraded to standard support. After final support expires, prioritize the upgrade rather than relying on AWS's automatic-upgrade timing.

See [AWS EKS cluster upgrade guidance](https://docs.aws.amazon.com/eks/latest/userguide/update-cluster.html) and [version rollback prerequisites](https://docs.aws.amazon.com/eks/latest/userguide/rollback-cluster.html).
