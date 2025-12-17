# Remediation

## Enable Diagnostic Logging

### **From Azure Portal**

1. Navigate to your Azure Databricks workspace.
2. Select **Monitoring** > **Diagnostic settings** from the left-hand menu.
3. Click **+ Add diagnostic setting**.
4. Under **Category details**, select the log categories you want to capture, such as:

   - `AuditLogs`
   - `Clusters`
   - `Notebooks`
   - `Jobs`
   - `Workspace`
5. Choose a destination for the logs:

   - **Log Analytics workspace** - for advanced querying and monitoring.
   - **Storage account** : for long-term retention.
   - **Event Hub** : for integration with third-party systems.
6. Provide a **Name** for the diagnostic setting and click **Save**.

### **From Azure CLI**

```sh
az monitor diagnostic-settings create \
    --name "DatabricksLogging" \
    --resource {{databricks-resource-id}} \
    --logs '[{"category": "AuditLogs", "enabled": true}, {"category": "Clusters", "enabled": true}, {"category": "Notebooks", "enabled": true}, {"category": "Jobs", "enabled": true}, {"category": "Workspace", "enabled": true}]' \
    --workspace {{log-analytics-id}}
```

## Configure Log Retention

### **From Azure Portal**

1. Navigate to the associated **Log Analytics workspace**.
2. Under **General**, select **Usage and estimated costs** > **Data Retention**.
3. Adjust the retention period slider (up to 730 days).
4. Click **OK**.

### **From Azure CLI**

```sh
az monitor log-analytics workspace update \
    --resource-group {{resource-group}} \
    --name {{log-analytics-name}} \
    --retention-time 365
```

## Monitor Logs for Anomalies

### **From Azure Portal**

1. Go to **Azure Monitor** > **Alerts** > **+ New alert rule**.
2. Under **Scope**, select the Databricks workspace.
3. Define a **Condition** using log queries (e.g., unauthorized access attempts).
4. Configure **Actions** to notify stakeholders or trigger automated responses.
5. Provide a **Name** and **Description** for the alert.
6. Click **Create alert rule**.

### **From Azure CLI**

```bash
az monitor activity-log alert create \
    --name "DatabricksAnomalyAlert" \
    --resource-group {{resource-group}} \
    --scopes {{databricks-resource-id}} \
    --condition "contains 'UnauthorizedAccess'"
```

## Notes

- Diagnostic logging requires the **Premium Azure Databricks plan**.
- Log retention and alert rules should be reviewed periodically to address evolving security threats and operational needs.
- Ensure all required log categories are enabled for comprehensive auditing and compliance.
