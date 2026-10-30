# Description

Ensure that Amazon EKS managed node groups use a maintained EKS-optimized Linux AMI family and Kubernetes-specific AMI stream. The policy uses the node group's **AMI Type** and **Version** reported by `DescribeNodegroup`. It does not require the newest AMI or treat image age, deprecation, or availability as proof of end of support.

## Rationale

An unsupported AMI stream stops receiving AWS image updates, leaving nodes exposed to uncorrected vulnerabilities and reliability defects. Owners can resolve the finding by migrating to a maintained family or updating the node group's Kubernetes version and AMI. Extended support remains acceptable for this check; the separate Kubernetes-version policies identify versions outside standard support.

## Impact

Migration replaces nodes and can disrupt workloads. Test bootstrap configuration, networking, container runtime assumptions, architecture, and GPU/Neuron drivers. A supported family does not establish that an individual image revision, installed package, or driver is current or supported.

## Audit

This policy marks an *AWS EKS Cluster Node Group* as `INCOMPLIANT` if its **AMI Type** or Kubernetes **Version** meets a retirement rule below.

| AMI Type | INCOMPLIANT condition |
| --- | --- |
| `AL2_x86_64`, `AL2_x86_64_GPU`, `AL2_ARM_64` | Support ended on November 26, 2025. |
| `AL2023_x86_64_STANDARD`, `AL2023_ARM_64_STANDARD`, `AL2023_x86_64_NEURON`, `AL2023_x86_64_NVIDIA`, `AL2023_ARM_64_NVIDIA` | The date is after June 30, 2029, or **Version** has reached its retirement date below. |
| Other in-scope AMI types | **Version** has reached its retirement date below. |

| Kubernetes Version | Retirement date (UTC) |
| --- | --- |
| 1.29 | March 23, 2026 |
| 1.30 | July 23, 2026 |
| 1.31 | November 26, 2026 |
| 1.32 | March 23, 2027 |
| 1.33 | July 29, 2027 |
| 1.34 | December 2, 2027 |
| 1.35 | March 27, 2028 |
| 1.36 | August 2, 2028 |
| 1.37 | December 1, 2028 |

The group is `INAPPLICABLE` when:

- **Status** is `CREATING`, `CREATE_FAILED`, or `DELETING`.
- **AMI Type** is `CUSTOM` or a Windows Server 2019, 2022, or 2025 Core/Full type.
- **Status** is `UPDATING` or `DEGRADED`, unless AMI family retirement already establishes an `INCOMPLIANT` result.

The group is `COMPLIANT` when no retirement rule applies. Kubernetes extended support is allowed.

Missing required **Status**, **AMI Type**, or **Version** produces `UNDETERMINED`. **Version** is not required to establish AMI family retirement. Disappeared node groups receive `DISAPPEARED`.
