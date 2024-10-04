# Description

Use Microsoft Entra authentication for authentication with SQL Database to manage credentials in a single place.

## Rationale

Microsoft Entra authentication is a mechanism to connect to Microsoft Azure SQL Database and SQL Data Warehouse by using identities in the Microsoft Entra ID directory. With Entra ID authentication, identities of database users and other Microsoft services can be managed in one central location. Central ID management provides a single place to manage database users and simplifies permission management.

- It provides an alternative to SQL Server authentication.
- Helps stop the proliferation of user identities across database servers.
- Allows password rotation in a single place.
- Customers can manage database permissions using external (Entra ID) groups.
- It can eliminate storing passwords by enabling integrated Windows authentication and other forms of authentication supported by Microsoft Entra.
- Entra ID authentication uses contained database users to authenticate identities at the database level.
- Entra ID supports token-based authentication for applications connecting to SQL Database.
- Entra ID authentication supports ADFS (domain federation) or native user/password authentication for a local Active Directory without domain synchronization.
- Entra ID supports connections from SQL Server Management Studio that use Active Directory Universal Authentication, which includes Multi-Factor Authentication (MFA). MFA includes strong authentication with a range of easy verification options — phone call, text message, smart cards with pin, or mobile app notification.

## Impact

This will create administrative overhead with user account and permission management. For further security on these administrative accounts, you may want to consider licensing which supports features like Multi Factor Authentication.

## Audit

### From Azure Portal

1. Go to `SQL servers`.
2. For each SQL server, under `Settings`, click `Microsoft Entra ID`.
3. Under `Microsoft Entra admin`, ensure a value has been set for `Admin Name`.

### From Azure CLI

To list SQL Server Admins on a specific server:

```sh
az sql server ad-admin list --resource-group <resource-group> --server <server>
```

### From PowerShell

Print a list of all SQL Servers to find which one you want to audit:

```ps
Get-AzSqlServer
```

Audit a list of Administrators on a Specific Server:

```ps
Get-AzSqlServerActiveDirectoryAdministrator -ResourceGroupName <resource group name> -ServerName <server name>
```

Ensure Output shows `DisplayName` set to `AD account`.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [1f314764-cb73-4fc9-b863-8eca98ac36e9](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F1f314764-cb73-4fc9-b863-8eca98ac36e9) - **Name**: `An Azure Active Directory administrator should be provisioned for SQL servers`

## Default Value

Entra ID Authentication for SQL Database/Server is not enabled by default.

## References

1. <https://learn.microsoft.com/en-us/azure/azure-sql/database/authentication-aad-configure>
2. <https://docs.microsoft.com/en-us/azure/sql-database/sql-database-aad-authentication>
3. <https://docs.microsoft.com/en-us/powershell/module/azurerm.sql/get-azurermsqlserveractivedirectoryadministrator?view=azurermps-5.2.0>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-identity-management#im-1-use-centralized-identity-and-authentication-system>
5. <https://docs.microsoft.com/en-us/cli/azure/sql/server/ad-admin?view=azure-cli-latest#az_sql_server_ad_admin_list>

## Additional Information

**NOTE** - Assigning an Administrator in Entra ID is just the first step. When using Entra ID for central authentication there are many other groups and roles that need to be configured base on the needs of your organization. The How-to Guides should be used to determine what roles should be assigned and what groups should be created to manage permissions and access to resources.
