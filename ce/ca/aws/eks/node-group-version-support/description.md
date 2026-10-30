# Description

This policy checks whether an AWS EKS managed node group's configured Kubernetes minor version remains within the AWS EKS support lifecycle and is compatible with its cluster control plane. It allows versions in standard or extended support and supported version differences.

## Rationale

Managed node groups are not automatically upgraded when the control plane is upgraded, including AWS automatic upgrades after extended support ends. Nodes can retain a version beyond its final support deadline or fall outside the supported control plane compatibility range. These conditions warrant a planned node replacement to restore access to maintained Kubernetes releases and avoid API incompatibilities or workload failures.

AWS EKS provides 14 months of standard support followed by 12 months of extended support. Upstream Kubernetes end of life does not override AWS's support calendar. For the covered versions, kubelets must not be newer than the control plane and may be at most three minor versions older. Matching versions is an upgrade best practice, rather than a requirement for this check.

## Impact

Remediation replaces nodes and can disrupt workloads. Plan spare capacity, Pod disruption budgets, application compatibility, and a tested recovery path. A support-lifecycle result does not establish image patch currency, AMI family support, support entitlement, or billing.

## Audit

This policy marks an *AWS EKS Cluster Node Group* as `INCOMPLIANT` if its **Version** has reached the AWS EKS end of extended support date, or if its **Version** is newer than the linked **Cluster**'s **Version** or more than three minor versions older. Version-skew findings require a resolved, non-disappeared cluster with **Status** equal to **ACTIVE** and both versions within the verified calendar.

Groups in **ACTIVE**, **DEGRADED**, or **DELETE_FAILED** are evaluated. Other nonempty node-group statuses are `INAPPLICABLE`. **AMI Type** equal to **CUSTOM** is also `INAPPLICABLE`: EKS does not validate the Kubernetes version embedded in a custom AMI, so its actual kubelets require separate assessment.

A group is `COMPLIANT` when final EKS support has not ended for its mapped version and it is between zero and three minor versions behind an active control plane. A version in extended support is allowed.

| Kubernetes version | End of extended support (UTC) |
| --- | --- |
| 1.29 | 2026-03-23 |
| 1.30 | 2026-07-23 |
| 1.31 | 2026-11-26 |
| 1.32 | 2027-03-23 |
| 1.33 | 2027-07-29 |
| 1.34 | 2027-12-02 |
| 1.35 | 2028-03-27 |
| 1.36 | 2028-08-02 |
| 1.37 | 2028-12-01 |
