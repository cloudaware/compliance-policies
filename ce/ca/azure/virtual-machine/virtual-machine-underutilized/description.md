# Description

Identify Azure Virtual Machines that are potentially underutilized and rightsize (downsize) them to optimize cloud expenditure. A VM is classified as underutilized if, over a 14-day period, its average CPU utilization remains below 40% and its maximum CPU utilization does not exceed 50%. Persistently underutilized VMs indicate over-provisioning, leading to inefficient resource usage and elevated operational costs.

## Rationale

Detecting and addressing underutilized VMs is a key cost optimization strategy in cloud environments. By rightsizing or decommissioning over-provisioned VMs, you can reduce unnecessary spending, improve overall resource utilization, and reallocate compute capacity to higher-priority workloads.

## Impact

Downsizing actions must be carefully evaluated to avoid negatively impacting performance, particularly for workloads that may experience occasional bursts or are stateful in nature.

## Audit

This policy evaluates an *Azure Virtual Machine* based on their performance over the preceding 14 days.

The VM is flagged as `INCOMPLIANT` if both of the following conditions are met:

- `CPU Utilization, Average, %` field is less than 40%.
- `CPU Utilization, Max, %` field is less than 50%.

A VM is marked as `INAPPLICABLE` under any of the following conditions:

- The VM is not currently in a running state.
- The VM has been active for less than 14 days.
- The VM is categorized as idle by the `Azure Virtual Machine is idle` policy.

The VM is marked as `UNDETERMINED` if any of the evaluated metrics are missing, indicating insufficient data in the CMDB to assess whether the VM is underutilized.
