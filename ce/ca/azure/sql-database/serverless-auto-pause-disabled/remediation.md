# Remediation

## Before you begin

Review connection patterns, scheduled jobs, and the acceptable resume latency. Choose
an idle delay that keeps the database active between expected workloads. Confirm that
the database is eligible for auto-pause and that pausing is compatible with its
replication, backup, and application requirements.

## Azure portal

1. Open **SQL databases** and select the affected database.
2. Select **Compute + storage**.
3. Select **Configure database**.
4. Set **Auto-pause delay** to an appropriate value instead of **Disabled**.
5. Select **Apply**.

## Azure CLI

```sh
az sql db update \
  --resource-group <resource-group-name> \
  --server <server-name> \
  --name <database-name> \
  --auto-pause-delay <idle-delay-in-minutes>
```

## PowerShell

```ps
Set-AzSqlDatabase `
  -ResourceGroupName "<resource-group-name>" `
  -ServerName "<server-name>" `
  -DatabaseName "<database-name>" `
  -AutoPauseDelay <idle-delay-in-minutes>
```

## Verify the change

```sh
az sql db show \
  --resource-group <resource-group-name> \
  --server <server-name> \
  --name <database-name> \
  --query autoPauseDelay \
  --output tsv
```

The command must return a value other than `-1`. Test the first connection after an
idle period, then confirm that the next Cloudaware collection reports an `Auto Pause
Delay` other than `-1`.
