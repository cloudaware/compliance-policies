# Description

Identify Azure Virtual Machines that exhibit signs of overutilization and initiate a scale-up (resize) action where appropriate. A VM is classified as overutilized if, over a 14-day period, its average CPU utilization exceeds 80% and its maximum CPU utilization consistently surpasses 95%.

## Rational

Proactively detecting and addressing overutilized VMs is essential for ensuring optimal application performance and minimizing latency for services hosted on Azure.

Sustained high CPU utilization and frequent peak usage indicate that the current VM size is inadequate for the workload demands. Scaling up or enabling auto-scaling mechanisms ensures sufficient resource availability, mitigates performance degradation, and enhances system stability.

## Impact

Resizing or scaling operations may incur additional Azure consumption costs. However, implementing auto scaling strategies provides the flexibility to respond to workload fluctuations, improving overall resource efficiency.

## Audit

This policy evaluates an *Azure Virtual Machine* based on CPU performance data collected over a 14-day period.

The VM is marked as `INCOMPLIANT` if both of the following conditions are met:

- `CPU Utilization, Average, %` field is greater than **80%**.
- `CPU Utilization, Max, %` field is greater than **95%**.

The VM is flagged as `INAPPLICABLE` if it is not currently running or has been operational for fewer than 14 consecutive days.

The VM is marked as `UNDETERMINED` if the required performance metrics are missing or incomplete, indicating insufficient data in the CMDB for evaluation.
