# Remediation

## Migrate Network Security Group (NSG) Flow Logs to Virtual Network Flow Logs

Azure Network Security Group (NSG) flow logs must be migrated to Azure Virtual Network flow logs. This process disables existing NSG flow logs and creates equivalent virtual network flow logs.

## Generate Migration Files

1. In the Azure portal, navigate to **Network Watcher**.
2. Under **Logs**, select **Migrate flow logs**.
3. Select the subscriptions and regions containing the NSG flow logs to migrate.
4. Select **Download script and JSON file**.

A ZIP file named `MigrateFlowLogs.zip` is downloaded.

## Run the Migration Script

1. Extract `MigrateFlowLogs.zip` locally. The archive contains:

   * `MigrationFromNsgToAzureFlowLogging.ps1`
   * `RegionSubscriptionConfig.json`
2. Run the migration script:

```ps
.\MigrationFromNsgToAzureFlowLogging.ps1
```

4. Select **Run analysis** by entering `1`.
5. When prompted, provide the path to the configuration file:

```text
.\RegionSubscriptionConfig.json
```

6. Enter the number of threads to use, or press **Enter** to accept the default value (`16`).

## Review Analysis Results

After the analysis completes:

* A summary is displayed in the console.
* A detailed HTML report is generated in the same directory:

  ```
  AnalysisReport-<subscriptionId>-<region>-<timestamp>.html
  ```

The report identifies:

* NSG flow logs that will be disabled
* Virtual network flow logs that will be created
* The impact of migration **with aggregation** or **without aggregation**

## Perform the Migration

1. Choose one of the following options:

   * `2` – Proceed with migration **with aggregation**
   * `3` – Proceed with migration **without aggregation**
2. Review the migration summary.
3. Confirm the migration when prompted:

```text
Do you want to rollback? You won't get the option to revert the actions done now again (y/n): n
```

> **Warning**
> Once the migration proceeds, the changes cannot be reverted.

## Validation

After the migration completes:

* Confirm that the original **NSG flow logs are disabled**
* Confirm that new **Virtual Network flow logs** have been created and are enabled
* Validate storage accounts, retention, and traffic analytics settings as required

## Optional Cleanup

After successful validation:

1. In **Network Watcher**, filter NSG flow logs by the migrated subscriptions and regions.
2. Select the migrated NSG flow logs.
3. Delete the flow logs to complete cleanup.
