# Description

Identify Azure Virtual Machine Scale Sets that may be over-provisioned. A Scale Set is considered underutilized when it has been provisioned for at least 30 days, has non-zero capacity, and its 30-day average CPU utilization is below 20% while both inbound and outbound network traffic are below 100 MB.

## Rationale

Persistent low utilization can indicate that a Scale Set has more instances or a larger VM SKU than its workload requires. Reviewing these Scale Sets can reduce compute costs while preserving the capacity needed for expected demand.

## Impact

Reducing capacity or changing a VM SKU can affect availability, performance, zone distribution, and autoscale behavior. Review peak demand, scheduled workloads, instance health, upgrade policy, and rollback options before making a change.

## Audit

This policy marks an *Azure Virtual Machine Scale Set* as `INCOMPLIANT` if its `Provisioning State` is `Succeeded`, its `SKU Capacity` is greater than zero, its `Time Created` is at least 30 days before the evaluation time, and all of the following are true:

- `Monitor: CPU, 30-Day` is below 20%.
- `Monitor: Network In, MB, 30-Day` is below 100 MB.
- `Monitor: Network Out, MB, 30-Day` is below 100 MB.

Scale Sets that are not successfully provisioned, have zero capacity, or are less than 30 days old are `INAPPLICABLE`. Missing state, capacity, creation-time, or utilization data is `UNDETERMINED`; all other eligible Scale Sets are `COMPLIANT`.

## References

1. <https://learn.microsoft.com/en-us/azure/virtual-machine-scale-sets/overview>
2. <https://learn.microsoft.com/en-us/azure/azure-monitor/autoscale/autoscale-overview>
