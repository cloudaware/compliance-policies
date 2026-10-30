# Description

Identify Google GCE Instances operating at high utilization levels that may require scaling or resizing to maintain stable application performance. When a linked New Relic host is available, this policy also evaluates memory utilization. Otherwise, it falls back to CPU metrics only. An instance is considered overutilized if, over a 14-day period, its average CPU utilization exceeds 80% and its maximum CPU utilization exceeds 95%, with memory utilization above 80% when New Relic data is available.

## Rationale

Overutilized instances can cause degraded response times, increased latency, and reduced workload stability. Identifying these instances helps ensure that compute capacity remains aligned with workload demand and supports timely scaling decisions.

## Impact

Resizing or scaling an instance can increase infrastructure cost and may require a brief service interruption, depending on the workload and deployment model.

## Audit

This policy evaluates a *Google GCE Instance* over the last 14 days using CPU metrics and optional New Relic memory metrics.

Memory is evaluated as follows:

- If `New Relic Host` is present, use `New Relic Host: Memory Used, 14-Day`.
- If `New Relic Host` is empty, fall back to CPU only.

The *Instance* is marked as `INCOMPLIANT` when all of these baseline conditions are true:

- `CPU Utilization, Average, %` is greater than 80%.
- `CPU Utilization, Max, %` is greater than 95%.

And this metric path applies if exists:

- `New Relic Host` is present and `New Relic Host: Memory Used, 14-Day` is greater than 80%.

The *Instance* is marked as `INAPPLICABLE` if it is not currently running or it has been running for less than 14 days.

The *Instance* is marked as `UNDETERMINED` if either required CPU metric is empty, or if `New Relic Host` is present but `New Relic Host: Memory Used, 14-Day` is empty.
