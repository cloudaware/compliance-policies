# Description

Identify Azure Virtual Machines that are potentially underutilized and rightsize (downsize) them to optimize cloud expenditure. When a linked New Relic host is available, this policy also evaluates memory utilization. Otherwise, it falls back to CPU metrics only. A VM is classified as underutilized if, over a 14-day period, its average CPU utilization remains below 40% and its maximum CPU utilization does not exceed 50%, with memory utilization below 40% when New Relic data is available. Persistently underutilized VMs indicate over-provisioning, leading to inefficient resource usage and elevated operational costs.

## Rationale

Detecting and addressing underutilized VMs is a key cost optimization strategy in cloud environments. By rightsizing or decommissioning over-provisioned VMs, you can reduce unnecessary spending, improve overall resource utilization, and reallocate compute capacity to higher-priority workloads.

## Impact

Downsizing actions must be carefully evaluated to avoid negatively impacting performance, particularly for workloads that may experience occasional bursts or are stateful in nature.

## Audit

This policy evaluates an *Azure Virtual Machine* over the last 14 days using CPU metrics and optional New Relic memory metrics, while excluding VMs already classified by the [**Azure Virtual Machine is idle**](../virtual-machine-idle) policy.

Memory is evaluated as follows:

- If `New Relic Host` is present, use `New Relic Host: Memory Used, 14-Day`.
- If `New Relic Host` is empty, fall back to CPU only.

The VM is marked as `INCOMPLIANT` when all of these baseline conditions are true:

- `Monitor: CPU Average, 14-Day` is less than 40%.
- `Monitor: CPU Max, 14-Day` is less than 50%.

And this metric path applies if exists:

- `New Relic Host` is present and `New Relic Host: Memory Used, 14-Day` is less than 40%.

A VM is marked as `INAPPLICABLE` under any of the following conditions:

- The VM is not currently in a running state.
- The VM has been active for less than 14 days.
- The VM is categorized as idle by the [**Azure Virtual Machine is idle**](../virtual-machine-idle) policy.

The VM is marked as `UNDETERMINED` if either required CPU metric is empty, or if `New Relic Host` is present but `New Relic Host: Memory Used, 14-Day` is empty.
