# Description

Ensure that Azure VM Scale Set Instances are not configured to allow unrestricted inbound access to the Secure Shell (SSH) port (TCP 22). SSH is widely used for remote management of Linux-based systems. Leaving SSH ports open to the public internet increases the risk of brute-force attacks, credential theft, and unauthorized system access.

## Rationale

Restricting SSH access through NSGs is a critical step in reducing the attack surface of Azure VM Scale Set Instances. Public exposure of SSH enables malicious actors to attempt automated attacks, exploit misconfigurations, or leverage stolen credentials. Access to SSH should be limited to trusted IP ranges or secured through bastion hosts or private connectivity methods.

## Impact

Blocking public access to SSH may disrupt workflows that involve direct internet-based remote management. It is important to transition to secure access alternatives, such as VPN tunnels or Azure Bastion, to maintain administrative capabilities without exposing sensitive management ports to external threats.

## Audit

This policy flags an *Azure VM Scale Set Instance* as `INCOMPLIANT` if it is associated with a *Network Interface* that is connected to an *NSG* containing at least one **Inbound Security Rule** that meets all of the following conditions:

- `Direction` is **Inbound**.
- `Access` is **Allow**.
- `Protocol` is either **Tcp**, **Udp**, `*`, or `null`.
- `Source Address Prefix` is either **Internet**, `*` **0.0.0.0**, **/0**, or **Any**.
- `Destination Port` is **22**.

If the `Direction`, `Access`, `Protocol`, or `Source Address Prefix` fields do not match the criteria above, the VM is marked as `INAPPLICABLE`.

If the `Destination Port` does not match, the VM is considered `COMPLIANT`.
