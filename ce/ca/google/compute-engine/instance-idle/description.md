# Description

This policy identifies Google Compute Engine (GCE) instances that appear to be idle. When a linked New Relic host is available, this policy combines CPU and network metrics with New Relic memory, disk read utilization, and disk write utilization. Otherwise, it falls back to CPU and network metrics only. An instance is considered idle if it consistently meets the applicable low-utilization criteria over a 14-day period:

- Average CPU utilization below 5%
- Maximum CPU utilization below 15%

Additionally, when New Relic data is available:

- Memory utilization below 20% when New Relic data is available
- Disk read utilization below 5% when New Relic data is available
- Disk write utilization below 5% when New Relic data is available
- Average network I/O less than 100 MB

## Rationale

Idle instances generate costs without delivering business value. By identifying and addressing these instances, organizations can reduce unnecessary GCP spending and improve overall resource efficiency.

## Impact

Before terminating an instance, verify that it is not required for periodic tasks, disaster recovery, or other non-continuous workloads.

## Audit

This policy evaluates a *Google GCE Instance* over the last 14 days using CPU, network, and optional New Relic memory and disk metrics.

New Relic metrics are evaluated as follows:

- If `New Relic Host` is present, use `New Relic Host: Memory Used, 14-Day`, `New Relic Host: Disk Read Utilization`, and `New Relic Host: Disk Write Utilization`.
- If `New Relic Host` is empty, fall back to CPU and network only.

The *Instance* is marked as `INCOMPLIANT` when all of these baseline conditions are true:

- `CPU Utilization, Average, %` is less than 5%.
- `CPU Utilization, Max, %` is less than 15%.
- `Network In, Sum, Megabytes` is less than 100 MB.
- `Network Out, Sum, Megabytes` is less than 100 MB.

And this metric path applies if exists:

- `New Relic Host` is present, `New Relic Host: Memory Used, 14-Day` is less than 20%, `New Relic Host: Disk Read Utilization` is less than 5%, and `New Relic Host: Disk Write Utilization` is less than 5%.

The *Instance* is marked as `INAPPLICABLE` if it is not currently running or it has been running for less than 14 days.

The *Instance* is marked as `UNDETERMINED` if any required CPU or network metric is empty, or if `New Relic Host` is present but a required New Relic memory or disk metric is empty.
