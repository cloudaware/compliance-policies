# Description

This policy identifies Google GCE Instances that appear to be underutilized. By default, an instance is considered underutilized if its average CPU utilization remains below 40% and its maximum CPU utilization does not exceed 50% over a 14-day evaluation period.

## Rationale

Underutilized instances contribute to unnecessary cloud expenditure. By identifying and rightsizing these resources, organizations can optimize their infrastructure and achieve cost savings without negatively affecting application performance.

## Impact

Resizing an instance may require the instance to be stopped and restarted, resulting in a brief downtime.

## Audit

This policy evaluates a *Google GCE Instance* based on its 14-day performance metrics.

The *Instance* is marked as `INCOMPLIANT` if all the following criteria are met:

- `CPU Utilization, Average, %` field is less than 40%.
- `CPU Utilization, Max, %` field is less than 50%.

The *Instance* is marked as `INAPPLICABLE` if it is not currently running, it has been running for less than 14 days, or this instance is idle and evaluated by the **Google GCE Instance is idle** [policy](../instance-idle/).

The *Instance* is marked as `UNDETERMINED` if any of the evaluated metrics are empty, indicating insufficient data in the CMDB to assess whether the instance is underutilized.
