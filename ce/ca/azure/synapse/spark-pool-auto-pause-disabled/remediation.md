# Remediation

## Before you begin

Review scheduled and interactive workloads, dependencies, and acceptable resume
latency. Choose a delay that avoids pausing the pool between expected jobs.

## Azure portal

1. Open the Synapse workspace in the Azure portal.
2. Select **Manage** and then **Apache Spark pools**.
3. Select the affected pool, enable **Auto-pause**, and set an appropriate idle delay.
4. Save the change.

## Azure CLI

```sh
az synapse spark pool update \
  --name <spark-pool-name> \
  --workspace-name <workspace-name> \
  --resource-group <resource-group-name> \
  --enable-auto-pause true \
  --delay <idle-delay-in-minutes>
```

Run representative scheduled and interactive workloads after the change. Confirm that
the pool resumes within the accepted startup window and that the next Cloudaware
collection reports auto-pause as enabled.
