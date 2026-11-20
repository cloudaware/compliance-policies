# Description

Azure Application Gateway sets the minimum TLS version for client connections through its SSL policy, at the gateway and in each SSL profile. The Min protocol version selects TLSv1_2 or TLSv1_3 on a supported policy, and only a CustomV2 policy can select TLSv1_3. Prerequisites: Confirm from the gateway's Client TLS protocol metric that no client that must keep access still connects with TLS 1.2.

## Rationale

With TLS 1.2 enabled, the gateway's policy can permit cipher suites without forward secrecy, and TLS 1.2 handshakes send the server certificate unencrypted. If the certificate's private key is later exposed, traffic recorded under those suites can be decrypted. NIST SP 800-52 Revision 2 permits disabling TLS 1.2 on servers that support TLS 1.3 when interoperability does not require it.

## Audit

This policy marks an *Azure Application Gateway* as `INCOMPLIANT` if the collected gateway-level minimum SSL protocol is `TLSv1_0`, `TLSv1_1`, or `TLSv1_2`.

`TLSv1_3` is `COMPLIANT` within the collected gateway-level scope.
