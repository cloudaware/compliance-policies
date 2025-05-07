# Description

Ensure that Azure Virtual Machines are not configured to allow unrestricted inbound access to NetBIOS ports (TCP/UDP 137, 138, 139). These ports are commonly associated with legacy file-sharing and network management protocols in Windows environments. Exposing NetBIOS ports to the public internet can present substantial security risks.

## Rational

Restricting NetBIOS traffic through NSGs significantly reduces the attack surface of Azure Virtual Machines (VMs) and enhances the overall security posture. NetBIOS has been a target for exploitation due to its known vulnerabilities, and its use in modern cloud environments is rare. Minimizing the exposure of these ports reduces the likelihood of unauthorized access, data exfiltration, and the spread of malicious payloads through legacy network protocols.

## Impact

Implementing these restrictions may affect systems that rely on NetBIOS for legacy network communication. Therefore, it is crucial to plan and test these changes carefully to ensure that critical business functions are not disrupted while mitigating the associated security risks.

## Audit

This policy flagged an *Azure Virtual Machine* as `INCOMPLIANT` if it is associated with a *Network Interface* that is connected to an *NSG* containing at least one **Inbound Security Rule** that meets all of the following conditions:

- `Direction` is **Inbound**.
- `Access` is **Allow**.
- `Protocol` is either **Tcp**, **Udp**, `*`, or `null`.
- `Source Address Prefix` is either **Internet**, `*` **0.0.0.0**, **/0**, or **Any**.
- `Destination Port` is **137-139**.

If the `Direction`, `Access`, `Protocol`, or `Source Address Prefix` fields do not match the criteria above, the VM is marked as `INAPPLICABLE`.

If the `Destination Port` does not match, the VM is considered `COMPLIANT`.
