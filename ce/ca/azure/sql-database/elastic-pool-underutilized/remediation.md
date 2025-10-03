# Remediation

Before performing any changes, review historical performance metrics to ensure the new configuration can accommodate periodic or seasonal peaks.

## Resize the Elastic Pool

### **From Azure CLI**

```sh
az sql elastic-pool update \
    --resource-group {{resource-group}} \
    --server {{server-name}} \
    --name {{pool-name}} \
    --edition {{Standard | GeneralPurpose}} \
    --capacity {{DTU or vCore count}} \
    --db-min-capacity {{min-capacity}} \
    --db-max-capacity {{max-capacity}} \
    --storage {{max-size}} \
    [--family {{Gen5}}]
```

- **DTU-based pools:**

  - `--edition Standard` (or Basic/Premium).
  - `--capacity` = total DTUs for the pool.
  - `--db-min-capacity` / `--db-max-capacity` = min/max DTU per database.
  - Omit `--family`.

- **vCore-based pools:**

  - `--edition GeneralPurpose` (or BusinessCritical).
  - `--capacity` = total vCores for the pool.
  - `--db-min-capacity` / `--db-max-capacity` interpreted as min/max vCores per database.
  - Add `--family Gen5`.

---

### **From PowerShell**

```ps
Set-AzSqlElasticPool `
    -ResourceGroupName "{{resource-group}}" `
    -ServerName "{{server-name}}" `
    -ElasticPoolName "{{pool-name}}" `
    -Edition "{{Standard | GeneralPurpose}}" `
    -DtuOrVCore {{DTU or vCore count}} `
    -DatabaseDtuMin {{min-dtu or vCore}} `
    -DatabaseDtuMax {{max-dtu or vCore}} `
    -StorageMB {{max-size}} `
    [-ComputeGeneration "{{Gen5}}"] `
```

- **DTU-based pools:**

  - `-Edition "Standard"` (or Basic/Premium).
  - `-DtuOrVCore` = total DTU count.
  - `-DatabaseDtuMin` / `-DatabaseDtuMax` = min/max DTU per database.
  - Do not set `-ComputeGeneration`.

- **vCore-based pools:**

  - `-Edition "GeneralPurpose"` (or BusinessCritical).
  - `-DtuOrVCore` = total vCore count.
  - `-DatabaseDtuMin` / `-DatabaseDtuMax` = min/max vCores per database.
  - Include `-ComputeGeneration "Gen5"`.
