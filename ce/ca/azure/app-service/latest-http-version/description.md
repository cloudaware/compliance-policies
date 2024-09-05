# Description

Periodically, newer versions are released for HTTP either due to security flaws or to include additional functionality. Using the latest HTTP version for web apps to take advantage of security fixes, if any, and/or new functionalities of the newer version.

## Rationale

Newer versions may contain security enhancements and additional functionality. Using the latest version is recommended in order to take advantage of enhancements and new capabilities. With each software installation, organizations need to determine if a given update meets their requirements. They must also verify the compatibility and support provided for any additional software against the update revision that is selected.

HTTP 2.0 has additional performance improvements on the head-of-line blocking problem of old HTTP version, header compression, and prioritization of requests. HTTP 2.0 no longer supports HTTP 1.1's chunked transfer encoding mechanism, as it provides its own, more efficient, mechanisms for data streaming.

## Audit

### From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `App Services`.
3. Click on each App.
4. Under `Setting` section, Click on `Configuration`.
5. Ensure that `HTTP Version` set to `2.0` version under `General settings`.

**NOTE**: Most modern browsers support HTTP 2.0 protocol over TLS only, while non-encrypted traffic continues to use HTTP 1.1. To ensure that client browsers connect to your app with HTTP/2, either buy an App Service Certificate for your app's custom domain or bind a third party certificate.

### From Azure CLI

To check HTTP 2.0 version status for an existing app, run the following command:

```sh
az webapp config show --resource-group <RESOURCE_GROUP_NAME> --name <APP_NAME> --query http20Enabled
```

The output should return `true` if HTTPS 2.0 traffic value is set to `On`.

### From PowerShell

For each application, run the following command:

```ps
Get-AzWebApp -ResourceGroupName <app resource group> -Name <app name> |Select-Object -ExpandProperty SiteConfig
```

If the value of the `Http20Enabled` setting is `true`, the application is compliant.

Otherwise, if the value of the `Http20Enabled` setting is `false`, the application is non-compliant.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [e2c1c086-2d84-4019-bff3-c44ccd95113c](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fe2c1c086-2d84-4019-bff3-c44ccd95113c) - **Name**: `Function apps should use latest 'HTTP Version'`
- **Policy ID**: [8c122334-9d20-4eb8-89ea-ac9a705b74ae](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F8c122334-9d20-4eb8-89ea-ac9a705b74ae) - **Name**: `App Service apps should use latest 'HTTP Version'`

## References

1. <https://docs.microsoft.com/en-us/azure/app-service/web-sites-configure#general-settings>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-posture-vulnerability-management#pv-3-define-and-establish-secure-configurations-for-compute-resources>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-posture-vulnerability-management#pv-6-rapidly-and-automatically-remediate-vulnerabilities>
