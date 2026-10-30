# Description

This policy identifies Google GCE Instances that appear to be underutilized. When a linked New Relic host is available, this policy also evaluates memory utilization. Otherwise, it falls back to CPU metrics only. By default, an instance is considered underutilized if its average CPU utilization remains below 40% and its maximum CPU utilization does not exceed 50% over a 14-day evaluation period, with memory utilization below 40% when New Relic data is available.

## Rationale

Underutilized instances contribute to unnecessary cloud expenditure. By identifying and rightsizing these resources, organizations can optimize their infrastructure and achieve cost savings without negatively affecting application performance.

## Impact

Resizing an instance may require the instance to be stopped and restarted, resulting in a brief downtime.

## Audit

This policy evaluates a *Google GCE Instance* over the last 14 days using CPU metrics and optional New Relic memory metrics, while excluding instances already classified by the [**Google GCE Instance is idle**](../instance-idle) policy.

Memory is evaluated as follows:

- If `New Relic Host` is present, use `New Relic Host: Memory Used, 14-Day`.
- If `New Relic Host` is empty, fall back to CPU only.

The *Instance* is marked as `INCOMPLIANT` when all of these baseline conditions are true:

- `CPU Utilization, Average, %` is less than 40%.
- `CPU Utilization, Max, %` is less than 50%.

And this metric path applies if exists:

- `New Relic Host` is present and `New Relic Host: Memory Used, 14-Day` is less than 40%.

The *Instance* is marked as `INAPPLICABLE` if it is not currently running, it has been running for less than 14 days, or this instance is idle and evaluated by the **Google GCE Instance is idle** [policy](../instance-idle/).

The *Instance* is marked as `UNDETERMINED` if either required CPU metric is empty, or if `New Relic Host` is present but `New Relic Host: Memory Used, 14-Day` is empty.
