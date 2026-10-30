# Remediation

Review peak and seasonal demand, autoscale settings, deployment slots, dependencies,
and rollback options before changing the plan. A plan is shared by its hosted apps,
so validate the proposed capacity with each application owner. Do not delete a
non-empty plan.

## Resize the plan

Choose a lower SKU or reduce the worker count only after confirming that the new
capacity supports peak demand.

### Azure CLI

```sh
az appservice plan update \
  --name {{app-service-plan-name}} \
  --resource-group {{resource-group-name}} \
  --sku {{target-sku}} \
  --number-of-workers {{target-worker-count}}
```

### PowerShell

```ps
Set-AzAppServicePlan `
  -Name "{{app-service-plan-name}}" `
  -ResourceGroupName "{{resource-group-name}}" `
  -Tier "{{target-tier}}" `
  -WorkerSize "{{target-worker-size}}" `
  -NumberofWorkers {{target-worker-count}}
```

Monitor application availability and response times after the change. Restore the
previous SKU or worker count if capacity is insufficient.
