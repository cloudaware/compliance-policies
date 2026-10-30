# Description

Azure Web Apps allow sites to run under both HTTP and HTTPS by default. Web apps can be accessed by anyone using non-secure HTTP links. Non-secure HTTP requests can be restricted and redirected to the secure HTTPS port. It is recommended to enforce HTTPS-only traffic.

## Rationale

Enabling HTTPS-only traffic redirects all non-secure HTTP requests to HTTPS ports. HTTPS uses the TLS/SSL protocol to provide a secure connection that is both encrypted and authenticated. It is therefore important to support HTTPS for the security benefits.

## Impact

When it is enabled, every incoming HTTP request is redirected to the HTTPS port. This adds an extra level of security to the HTTP requests made to the app.

## Audit

### From Azure Portal

1. Log in to the Azure portal using <https://portal.azure.com>.
2. Go to `App Services`.
3. Select each app.
4. Under `Settings`, select `Configuration`.
5. Under the `General Settings` tab, ensure that `HTTPS Only` is set to `On` under `Platform Settings`.

### From Azure CLI

To check HTTPS-only traffic value for an existing app, run the following command:

```sh
az webapp show \
    --resource-group {{resource-group-name}} \
    --name {{app-name}} \
    --query httpsOnly
```

The output should return `true` if HTTPS-only traffic value is set to `On`.

### From PowerShell

List all the web apps configured within the subscription:

```ps
Get-AzWebApp | Select-Object ResourceGroup, Name, HttpsOnly
```

For each web app, review the `HttpsOnly` setting and make sure it is set to `True`.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [a4af4a39-4135-47fb-b175-47fbdf85311d](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fa4af4a39-4135-47fb-b175-47fbdf85311d) - **Name**: `App Service apps should only be accessible over HTTPS`

## Default Value

By default, the HTTPS-only feature is disabled when a new app is created using the command-line tool or the Azure portal.

## References

1. <https://learn.microsoft.com/en-us/azure/app-service/overview-security?source=recommendations#https-and-certificates>
2. <https://docs.microsoft.com/en-us/security/benchmark/azure/security-controls-v3-data-protection#dp-3-encrypt-sensitive-data-in-transit>
3. <https://learn.microsoft.com/en-us/powershell/module/az.websites/set-azwebapp>
4. <https://techcommunity.microsoft.com/t5/azure-paas-blog/enable-https-setting-on-azure-app-service-using-azure-policy/ba-p/3286603>
