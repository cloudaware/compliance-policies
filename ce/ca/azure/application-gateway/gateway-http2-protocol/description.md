# Description

This policy identifies Azure Application Gateways that do not utilize HTTP/2.
Consider enabling HTTP/2 for improved performance, efficiency, and security.
HTTP/2 protocol support is available to clients that connect to application gateway listeners **only**. Communication with backend server pools is **always** HTTP/1.1.

## Rationale

Enabling HTTP/2 supports use of modern encrypted connections.

## Impact

Clients and backend services that do not support HTTP/2 will fall back to HTTP/1.1.

## Audit

This policy flags an *Azure Application Gateway* as `INCOMPLIANT` if it `HTTP/2` traffic is not **Enabled**.

## Default Value

HTTP2 is enabled by default.

## References

1. <https://learn.microsoft.com/en-us/azure/application-gateway/features#websocket-and-http2-traffic>
2. <https://learn.microsoft.com/en-us/cli/azure/network/application-gateway>
3. <https://learn.microsoft.com/en-us/powershell/module/az.network/get-azapplicationgateway>
4. <https://learn.microsoft.com/en-us/powershell/module/az.network/set-azapplicationgateway>
