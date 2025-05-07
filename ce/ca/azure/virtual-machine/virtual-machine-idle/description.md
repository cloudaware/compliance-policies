# Description

Identify Azure Virtual Machines with minimal activity over the past 14 days and address them to reduce unnecessary costs. VMs are classified as idle if they meet all the following criteria:

- Average CPU utilization below 5%
- Maximum CPU utilization below 15%
- Average network I/O less than 100 MB

## Rationale

Idle Azure VMs continue to consume compute and network resources, resulting in unnecessary operational expenses. Incorporating a threshold for maximum CPU utilization ensures that VMs with brief, transient workloads are not misclassified as idle. This enhanced detection methodology balances cost efficiency with service continuity, enabling more precise identification of optimization opportunities. Proactively managing idle VMs contributes to reduced waste and improved overall performance of the Azure infrastructure.

## Audit

This policy evaluates an *Azure Virtual Machine* based on its 14-day performance metrics.

The VM is marked as `INCOMPLIANT` if all the following criteria are met:

- `CPU Utilization, Average, %` field is less than 5%.
- `CPU Utilization, Max, %` field is less than 15%.
- `Network In, Sum, Megabytes` field is less than 100 MB.
- `Network Out, Sum, Megabytes` field is less than 100 MB.

The VM is marked as `INAPPLICABLE` if it is not currently running or it has been running for less than 14 days.

The VM is marked as `UNDETERMINED` if any of the evaluated metrics are empty, indicating insufficient data in the CMDB to assess whether the VM is idle.
