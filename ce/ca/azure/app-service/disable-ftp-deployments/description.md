# Description

By default, App Services can be deployed over FTP. If FTP is required for an essential deployment workflow, FTPS should be required for FTP login for all App Services.

If FTPS is not expressly required for the App, the recommended setting is `Disabled`.

## Rationale

FTP is an unencrypted network protocol that will transmit data - including passwords - in clear-text. The use of this protocol can lead to both data and credential compromise, and can present opportunities for exfiltration, persistence, and lateral movement.

## Impact

Any deployment workflows that rely on FTP or FTPs rather than the WebDeploy or HTTPs endpoints may be affected.

## Audit

### From Azure Portal

1. Go to the Azure Portal.
2. Select `App Services`.
3. Click on an app.
4. Select `Settings` and then `Configuration`.
5. Under `General Settings`, for the `Platform Settings`, the `FTP state` should not be set to `All allowed`.

### From Azure CLI

List webapps to obtain the ids:

```sh
az webapp list
```

List the publish profiles to obtain the username, password and ftp server url:

```sh
az webapp deployment list-publishing-profiles --ids <ids>
```

```json
{ 
    "publishUrl": "<URL_FOR_WEB_APP>", 
    "userName": "<USER_NAME>", 
    "userPWD": "<USER_PASSWORD>", 
}
```

### From PowerShell

List all Web Apps:

```ps
Get-AzWebApp
```

For each app:

```ps
Get-AzWebApp -ResourceGroupName <resource group name> -Name <app name> | Select-Object -ExpandProperty SiteConfig
```

In the output, look for the value of `FtpsState`. If its value is `AllAllowed` the setting is out of compliance. Any other value is considered in compliance with this check.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [399b2637-a50f-4f95-96f8-3a145476eb15](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F399b2637-a50f-4f95-96f8-3a145476eb15) - **Name**: `Function apps should require FTPS only`
- **Policy ID**: [4d24b6d4-5e53-4a4f-a7f4-618fa573ee4b](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F4d24b6d4-5e53-4a4f-a7f4-618fa573ee4b) - **Name**: `App Service apps should require FTPS only`

## Default Value

By default, FTP based deployment is `All allowed`.

## References

1. <https://docs.microsoft.com/en-us/azure/app-service/deploy-ftp>
2. <https://docs.microsoft.com/en-us/azure/app-service/overview-security>
3. <https://docs.microsoft.com/en-us/security/benchmark/azure/security-controls-v3-data-protection#dp-4-encrypt-sensitive-information-in-transit>
4. <https://docs.microsoft.com/en-us/security/benchmark/azure/security-controls-v3-posture-vulnerability-management#pv-7-rapidly-and-automatically-remediate-software-vulnerabilities>
5. <https://learn.microsoft.com/en-us/rest/api/appservice/web-apps/create-or-update-configuration#ftpsstate>
