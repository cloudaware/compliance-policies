# Description

Ensure that Azure VM Scale set Instances are not configured to allow unrestricted inbound access to the Remote Procedure Call (RPC) port (TCP 135). Network Security Group (NSG) rules should explicitly restrict inbound traffic to this port to only trusted IP ranges to enhance security posture and prevent unauthorized communication.

## Rational

RPC (port 135) is frequently targeted by threat actors due to its role in enabling remote administration and inter-process communication between distributed systems. Unrestricted access to this port can lead to unauthorized system access, remote code execution, and lateral movement across the network. Restricting inbound RPC traffic to known, trusted sources helps mitigate risks associated with protocol exploitation, unauthorized data exposure, and the propagation of malware within the environment.

## Impact

Before implementing restrictions, validate that all dependent applications and services relying on RPC functionality are identified and accounted for. Failure to properly evaluate dependencies may result in service disruptions or degraded functionality.

## Audit

This policy flagged an *Azure VM Scale set Instance* as `INCOMPLIANT` if it is associated with a *Network Interface* that is connected to an *NSG* containing at least one **Inbound Security Rule** that meets all of the following conditions:

- `Direction` is **Inbound**.
- `Access` is **Allow**.
- `Protocol` is either **Tcp**, **Udp** `*`, or `null`.
- `Source Address Prefix` is either **Internet**, `*` **0.0.0.0**, **/0**, or **Any**.
- `Destination Port` is **135**.

If the `Direction`, `Access`, `Protocol`, or `Source Address Prefix` fields do not match the criteria above, the VM is marked as `INAPPLICABLE`.

If the `Destination Port` does not match, the VM is considered `COMPLIANT`.
