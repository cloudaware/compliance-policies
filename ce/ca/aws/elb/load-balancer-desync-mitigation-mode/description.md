# Description

This policy identifies AWS ELB Classic and Application Load Balancers that are not configured with an HTTP desync mitigation mode of `defensive` (default) or `strictest`.

> **Note**:
The `routing.http.drop_invalid_header_fields.enabled` attribute ([`AWS ELB Application Load Balancer is not configured to drop invalid HTTP headers`](ce\ca\aws\elb\load-balancer-drop-invalid-headers)) was introduced to provide baseline protection against HTTP desync by dropping malformed HTTP headers. The `routing.http.desync_mitigation_mode` attribute was later added to offer more comprehensive and configurable protection against HTTP desync attacks. You are not required to enable both attributes; instead, you should select the option that best aligns with your application’s security and compatibility requirements.

## Rationale

HTTP desync occurs when a load balancer and its backend targets interpret HTTP request boundaries differently. This condition can be exploited through **HTTP Request Smuggling** attacks, enabling an attacker to:

- Bypass security controls such as Web Application Firewalls (WAF).
- Gain unauthorized access to other users’ data.
- Poison shared or intermediary caches.

When the desync mitigation mode is set to `monitor`, the load balancer continues to forward malformed or ambiguous requests to backend targets while only logging the events. This behavior leaves backend applications exposed.

The `defensive` mode provides a balance between security and application compatibility by actively blocking suspicious requests, while the `strictest` mode enforces full HTTP standards compliance and offers the highest level of protection.

## Audit

This policy flags an *AWS ELB Load Balancer* as `INCOMPLIANT` under the following conditions:

- **Classic Load Balancers:** The `Additional Attributes` include **elb.http.desyncmitigationmode: monitor**.
- **Application Load Balancers:** The `Additional Attributes` include **routing.http.desync_mitigation_mode: monitor**.

*Network and Gateway Load Balancers* are marked as **INAPPLICABLE**.
