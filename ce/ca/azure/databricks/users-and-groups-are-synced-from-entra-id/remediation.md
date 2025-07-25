# Remediation

## From Azure Portal

Enable provisioning in Azure Portal:

1. Go to `Microsoft Entra ID`.
2. Under `Manage`, click `Enterprise applications`.
3. Click the name of the Azure Databricks SCIM application.
4. Under `Provisioning`, select `Automatic` and enter the SCIM endpoint and API token from Databricks.

    Enable provisioning in Databricks:

5. Navigate to `Admin Console > Identity and Access Management`.
6. Enable SCIM provisioning and generate an API token.

    Configure role assignments:

7. Ensure groups from Entra ID are mapped to appropriate Databricks roles.
8. Restrict administrative privileges to designated security groups.

    Regularly monitor sync logs:

9. Periodically review sync logs in Microsoft Entra ID and Databricks Admin Console.
10. Configure Azure Monitor alerts for provisioning failures.

    Disable manual user creation in Databricks:

11. Ensure that all user management is controlled via SCIM sync from Entra ID.
12. Disable personal access token usage for authentication.

## From Azure CLI

Enable SCIM User and Group Provisioning in Azure Databricks:

```sh
az ad app update --id <databricks-app-id> --set provisioning.provisioningMode=Automatic
```
