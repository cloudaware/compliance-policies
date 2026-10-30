# Description

The TLS (Transport Layer Security) protocol secures transmission of data over the internet using standard encryption technology. Encryption should be set to the latest version of TLS. App Service allows TLS 1.2 by default, which is the recommended TLS level by industry standards such as PCI DSS.

## Rationale

App Service currently allows the web app to set TLS versions 1.0, 1.1, and 1.2. It is highly recommended to use the latest TLS 1.2 version for web app secure connections.

## Audit

### From Azure Portal

1. Log in to the Azure portal using <https://portal.azure.com>.
2. Go to `App Services`.
3. Select each app.
4. Under `Settings`, select `TLS/SSL settings`.
5. Under the `Bindings` pane, ensure `Minimum TLS Version` is set to `1.2` under `Protocol Settings`.

### From Azure CLI

To check the TLS version for an existing app, run the following command:

```sh
az webapp config show \
    --resource-group {{resource-group-name}} \
    --name {{app-name}} \
    --query minTlsVersion
```

The output should return `1.2` if the TLS version is set to `1.2` (which is currently the latest version).

### From PowerShell

List all web apps:

```ps
Get-AzWebApp
```

For each web app, run the following command:

```ps
Get-AzWebApp `
    -ResourceGroupName {{resource-group-name}} `
    -Name {{app-name}} |
    Select-Object -ExpandProperty SiteConfig
```

Make sure the `minTlsVersion` is set to at least `1.2`.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [f9d614c5-c173-4d56-95a7-b4437057d193](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Ff9d614c5-c173-4d56-95a7-b4437057d193) - **Name**: `Function apps should use the latest TLS version`
- **Policy ID**: [f0e6e85b-9b9f-4a4b-b67b-f730d42f1b0b](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Ff0e6e85b-9b9f-4a4b-b67b-f730d42f1b0b) - **Name**: `App Service apps should use the latest TLS version`

## Default Value

By default, the TLS version is set to 1.2 when a new app is created using the command-line tool or the Azure portal.

## References

1. <https://docs.microsoft.com/en-us/azure/app-service/app-service-web-tutorial-custom-ssl#enforce-tls-versions>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-3-encrypt-sensitive-data-in-transit>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-network-security#ns-8-detect-and-disable-insecure-services-and-protocols>
4. <https://docs.microsoft.com/en-us/powershell/module/az.websites/set-azwebapp?view=azps-8.1.0>
