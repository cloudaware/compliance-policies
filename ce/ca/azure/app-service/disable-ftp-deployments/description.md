# Description

By default, Azure Functions, Web, and API Services can be deployed over FTP. If FTP is required for an essential deployment workflow, FTPS should be required for FTP login for all App Service Apps and Functions.

## Rationale

Azure FTP deployment endpoints are public. An attacker listening to traffic on a wifi network used by a remote employee or a corporate network could see login traffic in clear-text which would then grant them full control of the code base of the app or service. This finding is more severe if User Credentials for deployment are set at the subscription level rather than using the default Application Credentials which are unique per App.

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
{ 
    "publishUrl": <URL_FOR_WEB_APP>, 
    "userName": <USER_NAME>, 
    "userPWD": <USER_PASSWORD>, 
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

1. [Azure Web Service Deploy via FTP](https://docs.microsoft.com/en-us/azure/app-service/deploy-ftp)
2. [Azure Web Service Deployment](https://docs.microsoft.com/en-us/azure/app-service/overview-security)
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-3-encrypt-sensitive-data-in-transit>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-posture-vulnerability-management#pv-6-rapidly-and-automatically-remediate-vulnerabilities>
