# Description

Identify Azure Virtual Machines with minimal activity over the past 14 days and address them to reduce unnecessary costs. When a linked New Relic host is available, this policy combines Azure Monitor CPU and network metrics with New Relic memory, disk read utilization, and disk write utilization. Otherwise, it falls back to Azure Monitor CPU and network metrics only. VMs are classified as idle if they meet the applicable criteria:

- Average CPU utilization below 5%
- Maximum CPU utilization below 15%
- Average network I/O less than 100 MB

Additionally, when New Relic data is available:

- Memory utilization below 20%
- Disk read utilization below 5%
- Disk write utilization below 5%

## Rationale

Idle Azure VMs continue to consume compute and network resources, resulting in unnecessary operational expenses. Incorporating a threshold for maximum CPU utilization ensures that VMs with brief, transient workloads are not misclassified as idle. This enhanced detection methodology balances cost efficiency with service continuity, enabling more precise identification of optimization opportunities. Proactively managing idle VMs contributes to reduced waste and improved overall performance of the Azure infrastructure.

## Audit

This policy evaluates an *Azure Virtual Machine* over the last 14 days using CPU, network, and optional New Relic memory and disk metrics.

New Relic metrics are evaluated as follows:

- If `New Relic Host` is present, use `New Relic Host: Memory Used, 14-Day`, `New Relic Host: Disk Read Utilization`, and `New Relic Host: Disk Write Utilization`.
- If `New Relic Host` is empty, fall back to CPU and network only.

The VM is marked as `INCOMPLIANT` when all of these baseline conditions are true:

- `Monitor: CPU Average, 14-Day` is less than 5%.
- `Monitor: CPU Max, 14-Day` is less than 15%.
- `Monitor: Network In, Sum, MB, 14-Day` is less than 100 MB.
- `Monitor: Network Out, Sum, MB, 14-Day` is less than 100 MB.

And this metric path applies if exists:

- `New Relic Host: Memory Used, 14-Day` is less than 20%,
- `New Relic Host: Disk Read Utilization` is less than 5%, and
- `New Relic Host: Disk Write Utilization` is less than 5%.

The VM is marked as `INAPPLICABLE` if it is not currently running or it has been running for less than 14 days.

The VM is marked as `UNDETERMINED` if any required CPU or network metric is empty, or if `New Relic Host` is present but a required New Relic memory or disk metric is empty.
