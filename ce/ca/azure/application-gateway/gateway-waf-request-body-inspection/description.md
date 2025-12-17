# Description

This policy identifies Azure Application Gateways whose WAF Policy does not have the request body inspection setting enabled.
Enable request body inspection so that the Web Application Firewall evaluates the contents of HTTP message bodies for potential threats.

## Rationale

Enabling request body inspection strengthens security by allowing the Web Application Firewall to detect common attacks, such as SQL injection and cross-site scripting.

## Impact

Minor performance impact on the Web Application Firewall. Additional effort may be required to monitor findings.

## Audit

This policy flags an *Azure Application Gateway* as `INCOMPLIANT` if any of its *WAF policy* has the `Request body inspection` property **Disabled**.

## Default Value

Request body inspection is enabled by default on Azure Application Gateways with Web Application Firewall.

## References

1. <https://learn.microsoft.com/en-gb/azure/web-application-firewall/ag/application-gateway-waf-request-size-limits#request-body-inspection>
2. <https://learn.microsoft.com/en-us/cli/azure/network/application-gateway>
3. <https://learn.microsoft.com/en-us/cli/azure/network/application-gateway/waf-policy>
