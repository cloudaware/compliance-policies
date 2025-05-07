# Description

Ensure that each Azure App Service Plan is actively utilized and has assigned at least one App to it. App Service Plans provide the necessary infrastructure for hosting Apps, and unassigned plans represent idle resources that clutter the inventory and are still incurring costs.

## Rationale

App Service Plans consume computing resources, generate costs, and increase complexity in managing cloud resources even in the absence of active Apps. Identifying and remediating unassigned App Service Plans optimizes resource allocation, reduces unnecessary expenditures.

## Audit

This policy flags an *Azure App Service Plan* as `INCOMPLIANT` if the `Number Of Sites` field is either **empty** or has a value of **0**.
