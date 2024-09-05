# Description

The TLS (Transport Layer Security) protocol secures transmission of data over the internet using standard encryption technology. Encryption should be set with the latest version of TLS. App service allows TLS 1.2 by default, which is the recommended TLS level by industry standards such as PCI DSS.

## Rationale

App service currently allows the web app to set TLS versions 1.0, 1.1 and 1.2. It is highly recommended to use the latest TLS 1.2 version for web app secure connections.

## Audit

### From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `App Services`.
3. Click on each App.
4. Under `Setting` section, Click on `TLS/SSL settings`.
5. Under the `Bindings` pane, ensure that `Minimum TLS Version` set to `1.2` under `Protocol Settings`.

### From Azure CLI

To check TLS Version for an existing app, run the following command:

```sh
az webapp config show --resource-group <RESOURCE_GROUP_NAME> --name <APP_NAME> --query minTlsVersion
```

The output should return `1.2` if TLS Version is set to `1.2` (Which is currently the latest version).

### From PowerShell

List all web apps:

```ps
Get-AzWebApp
```

For each web app run the following command:

```ps
Get-AzWebApp -ResourceGroupName <RESOURCE_GROUP_NAME> -Name <APP_NAME> |Select-Object -ExpandProperty SiteConfig
```

Make sure the `minTlsVersion` is set to at least `1.2`.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [f9d614c5-c173-4d56-95a7-b4437057d193](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Ff9d614c5-c173-4d56-95a7-b4437057d193) - **Name**: `Function apps should use the latest TLS version`
- **Policy ID**: [f0e6e85b-9b9f-4a4b-b67b-f730d42f1b0b](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Ff0e6e85b-9b9f-4a4b-b67b-f730d42f1b0b) - **Name**: `App Service apps should use the latest TLS version`

## Default Value

By default, TLS Version feature will be set to 1.2 when a new app is created using the command-line tool or Azure Portal console.

## References

1. <https://docs.microsoft.com/en-us/azure/app-service/app-service-web-tutorial-custom-ssl#enforce-tls-versions>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-3-encrypt-sensitive-data-in-transit>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-network-security#ns-8-detect-and-disable-insecure-services-and-protocols>
4. <https://docs.microsoft.com/en-us/powershell/module/az.websites/set-azwebapp?view=azps-8.1.0>
