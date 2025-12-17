# Description

This policy identifies Azure Application Gateways that do not have a Web Application Firewall Policy.
Azure WAF helps protect applications from common exploits and attacks by inspecting and filtering incoming traffic.

## Rationale

Using Azure Web Application Firewall with Azure Application Gateway reduces exposure to external threats by mitigating attacks on public facing applications.

## Impact

The `WAF V2` tier for Azure Application Gateways costs more than the `Basic` and `Standard V2` tiers. Pricing includes a fixed hourly charge plus a charge per capacity-unit hour. Refer to <https://azure.microsoft.com/en-gb/pricing/details/application-gateway/> for details.

## Audit

This policy flags an *Azure Application Gateway* as `INCOMPLIANT` if its `WAF Policy` is **not** Enabled.

## Default Value

Azure Web Application Firewall is enabled by default for the `WAF V2` tier of Azure Application Gateway. It is not available in the `Basic` tier. Application gateways deployed using the `Standard V2` tier can be upgraded to the `WAF V2` tier to enable Azure Web Application Firewall.

## References

1. <https://learn.microsoft.com/en-us/azure/application-gateway/features>
2. <https://learn.microsoft.com/en-us/cli/azure/network/application-gateway>
3. <https://azure.microsoft.com/en-us/pricing/details/application-gateway>
