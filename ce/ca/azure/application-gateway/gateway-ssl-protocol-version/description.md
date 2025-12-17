# Description

This policy identifies Azure Application Gateways that utilize outdated TLS protocols.
The TLS (Transport Layer Security) protocol secures the transmission of data over the internet using standard encryption technology. Application gateways use TLS 1.2 for the `Min protocol version` by default and allow for the use of TLS versions 1.0, 1.1, and 1.3. NIST strongly suggests the use of TLS 1.2 and recommends the adoption of TLS 1.3.

## Rationale

TLS 1.0 and 1.1 are outdated and vulnerable to security risks. Since TLS 1.2 and TLS 1.3 provide enhanced security and improved performance, it is highly recommended to use TLS 1.2 or higher whenever possible.

## Impact

Using the latest TLS version may affect compatibility with clients and backend services.

## Audit

This policy flags an *Azure Application Gateway* as `INCOMPLIANT` if it `Min protocol version` is **less** than **TLSv1_2**.

## Default Value

`Min protocol version` is set to `TLSv1_2` by default.

## References

1. <https://learn.microsoft.com/en-us/azure/application-gateway/application-gateway-ssl-policy-overview>
2. <https://learn.microsoft.com/en-us/cli/azure/network/application-gateway>
