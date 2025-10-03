# Remediation

When an Azure SQL Database is identified as underutilized, two primary remediation strategies can be considered:

- Resize the database to a lower service tier.
- Migrate the database into an Elastic Pool for consolidated resource management.
- Convert a vCore-based database to Serverless to optimize for intermittent or unpredictable workloads.

Before making changes, confirm that the workload does not have periodic spikes or upcoming growth that may require the current configuration.

## Resize the Database

### **From Azure CLI**

```sh
az sql db update \
    --resource-group {{resource-group}} \
    --server {{server-name}} \
    --name {{database-name}} \
    [--edition {{Standard}}] \
    [--capacity {{10}}] \
    [--max-size {{250GB}}]
    [--family {{Gen5}}] \
```

### **From PowerShell**

```ps
Set-AzSqlDatabase `
    -ResourceGroupName "{{resource-group}}" `
    -ServerName "{{server-name}}" `
    -DatabaseName "{{database-name}}" `
    [-Edition "{{Standard}}"] `
    [-RequestedServiceObjectiveName "{{S0}}"] `
    [-Capacity {{2}}] `
    [-MaxSizeBytes {{268435456000}}]
```

## Migrate the Database into an Elastic Pool

### **From Azure CLI**

#### (If required) Create an Elastic Pool

```sh
az sql elastic-pool create \
    --resource-group {{resource-group}} \
    --server {{server-name}} \
    --name {{pool-name}} \
    [--edition {{Standard}}] \
    [--capacity {{50}}] \
    [--db-dtu-min {{0}}] \
    [--db-dtu-max {{20}}] \
    [--storage {{250GB}}]
```

#### Add the Database to an Elastic Pool

```sh
az sql db update \
    --resource-group {{resource-group}} \
    --server {{server-name}} \
    --name {{database-name}} \
    --elastic-pool {{pool-name}}
```

### **From PowerShell**

#### (If required) Create an Elastic Pool

```ps
New-AzSqlElasticPool `
    -ResourceGroupName "{{resource-group}}" `
    -ServerName "{{server-name}}" `
    -ElasticPoolName "{{pool-name}}" `
    [-Edition "{{Standard}}"] `
    [-Dtu {{50}}] `
    [-DatabaseDtuMin {{0}}] `
    [-DatabaseDtuMax {{20}}] `
    [-VCore {{4}}] `
    [-ComputeGeneration "{{Gen5}}"] `
    [-StorageMB {{256000}}]
```

#### Add the Database to an Elastic Pool

```ps
Set-AzSqlDatabase `
    -ResourceGroupName "{{resource-group}}" `
    -ServerName "{{server-name}}" `
    -DatabaseName "{{database-name}}" `
    -ElasticPoolName "{{pool-name}}"
```

## Convert vCore-based Database to Serverless

### **From Azure CLI**

```sh
az sql db update \
    --resource-group {{resource-group}} \
    --server {{server-name}} \
    --name {{database-name}} \
    --edition {{GeneralPurpose}} \
    --compute-model Serverless \
    --family {{Gen5}} \
    --capacity {{2}} \
    --auto-pause-delay {{60}} \
    --min-capacity {{0.5}} \
    --max-size {{250GB}}
```

### **From PowerShell**

```ps
Set-AzSqlDatabase `
    -ResourceGroupName "{{resource-group}}" `
    -ServerName "{{server-name}}" `
    -DatabaseName "{{database-name}}" `
    -Edition "{{GeneralPurpose}}" `
    -ComputeModel "Serverless" `
    -VCore {{2}} `
    -ComputeGeneration "{{Gen5}}" `
    -AutoPauseDelay {{60}} `
    -MinVCore {{0.5}} `
    -MaxSizeBytes {{268435456000}}
```
