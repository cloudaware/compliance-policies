# Description

Application Insights within Azure act as an Application Performance Monitoring solution providing valuable data into how well an application performs and additional information when performing incident response. The types of log data collected include application metrics, telemetry data, and application trace logging data providing organizations with detailed information about application activity and application transactions. Both data sets help organizations adopt a proactive and retroactive means to handle security and performance related metrics within their modern applications.

## Rationale

Configuring Application Insights provides additional data not found elsewhere within Azure as part of a much larger logging and monitoring program within an organization's Information Security practice. The types and contents of these logs will act as both a potential cost saving measure (application performance) and a means to potentially confirm the source of a potential incident (trace logging). Metrics and Telemetry data provide organizations with a proactive approach to cost savings by monitoring an application's performance, while the trace logging data provides necessary details in a reactive incident response scenario by helping organizations identify the potential source of an incident within their application.

## Impact

Because Application Insights relies on a Log Analytics Workspace, an organization will incur additional expenses when using this service.

## Audit

### From Azure Portal

1. Navigate to `Application Insights`.
2. Ensure an `Application Insights` service is configured and exists.

### From Azure CLI

**Note**: The `application-insights` extension to Azure CLI is currently in `Preview`. Add the `application-insights` extension:

```sh
az extension add --name application-insights az monitor app-insights component show --query "[].{ID:appId, Name:name, Tenant:tenantId, Location:location, Provisioning_State:provisioningState}"
```

Ensure the above command produces output, otherwise `Application Insights` has not been configured.

## From PowerShell

```ps
Get-AzApplicationInsights|select location,name,appid,provisioningState,tenantid
```

## From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [fa9cd53d-cb8f-464e-84f1-7b1490fd21c6](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Ffa9cd53d-cb8f-464e-84f1-7b1490fd21c6) - **Name**: `Deploy Diagnostic Settings for Application Insights to Log Analytics workspace`

## Default Value

Application Insights are not enabled by default.

## References

1. <https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview>
