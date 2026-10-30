# Description

This policy identifies paid Azure App Service Plans that may be oversized for the
applications they host. A plan is underutilized when its 30-day average CPU usage is
below 20% and its average memory usage is below 40%.

## Rationale

App Service Plan charges are driven by the selected SKU and worker capacity, whether
or not that capacity is used. Rightsizing consistently underutilized plans can reduce
costs without changing application code.

## Impact

Changing a plan SKU or worker count affects every app and deployment slot hosted by
the plan. Review peak and seasonal demand, autoscale settings, application
dependencies, and the rollback plan before making a change.

## Audit

This policy evaluates an *Azure App Service Plan* based on its 30-day performance
metrics.

The *App Service Plan* is marked as `INCOMPLIANT` if:

- `Monitor: CPU, 30-Day` < 20%.

    and `Monitor: Memory, 30-Day` < 40%.

The *App Service Plan* is marked as `INAPPLICABLE` if it is in a Free, Shared,
Dynamic, WorkflowStandard, or FlexConsumption tier, or if `Number Of Sites` is 0.

The *App Service Plan* is marked as `UNDETERMINED` if its tier, site count, CPU
metric, or memory metric is empty, indicating insufficient CMDB data to assess
utilization.
