# Description

Identify Azure Virtual Machines that exhibit signs of overutilization and initiate a scale-up (resize) action where appropriate. When a linked New Relic host is available, this policy also evaluates memory utilization. Otherwise, it falls back to CPU metrics only. A VM is classified as overutilized if, over a 14-day period, its average CPU utilization exceeds 80% and its maximum CPU utilization consistently surpasses 95%, with memory utilization above 80% when New Relic data is available.

## Rational

Proactively detecting and addressing overutilized VMs is essential for ensuring optimal application performance and minimizing latency for services hosted on Azure.

Sustained high CPU utilization and frequent peak usage indicate that the current VM size is inadequate for the workload demands. Scaling up or enabling auto-scaling mechanisms ensures sufficient resource availability, mitigates performance degradation, and enhances system stability.

## Impact

Resizing or scaling operations may incur additional Azure consumption costs. However, implementing auto scaling strategies provides the flexibility to respond to workload fluctuations, improving overall resource efficiency.

## Audit

This policy evaluates an *Azure Virtual Machine* over the last 14 days using CPU metrics and optional New Relic memory metrics.

Memory is evaluated as follows:

- If `New Relic Host` is present, use `New Relic Host: Memory Used, 14-Day`.
- If `New Relic Host` is empty, fall back to CPU only.

The VM is marked as `INCOMPLIANT` when all of these baseline conditions are true:

- `Monitor: CPU Average, 14-Day` is greater than 80%.
- `Monitor: CPU Max, 14-Day` is greater than 95%.

And this metric path applies if exists:

- `New Relic Host` is present and `New Relic Host: Memory Used, 14-Day` is greater than 80%.

The VM is flagged as `INAPPLICABLE` if it is not currently running or has been operational for fewer than 14 consecutive days.

The VM is marked as `UNDETERMINED` if either required CPU metric is empty, or if `New Relic Host` is present but `New Relic Host: Memory Used, 14-Day` is empty.
