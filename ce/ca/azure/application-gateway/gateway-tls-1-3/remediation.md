# Remediation

Review client TLS 1.3 compatibility and the gateway SKU before changing protocol requirements. TLS 1.3 requires a supported v2 gateway and compatible SSL policy.

In **Application gateways > Listeners / SSL Policy**, configure the gateway minimum protocol as **TLSv1_3**. Review **SSL settings** and every SSL profile with a listener-specific policy; set each minimum to TLSv1_3 or let it inherit the compliant gateway policy. Preserve required cipher configuration when modifying a custom policy.

Verify the gateway policy and all profile policies using `az network application-gateway show`, and test each HTTPS listener with required clients. Retain the previous policy configuration for rollback if critical clients fail.
