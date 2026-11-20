# Description

Network security groups should be periodically evaluated for port misconfigurations. Where Windows Remote Management (WinRM) access (TCP ports 5985 and 5986) is not explicitly required and narrowly configured for resources attached to a network security group, Internet-level access to Azure resources should be restricted or eliminated.

## Rationale

Windows Server enables PowerShell Remoting over WinRM by default and accepts remoting connections only from administrators, so a WinRM port reachable from the Internet exposes administrator remote command execution to password guessing. A compromised virtual machine can then be used to attack other resources on the virtual network or outside Azure.

## Audit

This policy marks an *Azure Network Security Group* as `INCOMPLIANT` if a current Allow/Inbound TCP or Any rule permits Internet, wildcard, or a global IPv4/IPv6 source to destination ports **5985, 5986**, any range containing them, or all ports.

No matching current rule is `COMPLIANT` within the collected rule scope. This checks permissive rule configuration across all NSGs; it does not simulate priority-based effective routing or approved exceptions. Augmented port rules require manual review when the collector cannot provide usable destination port bounds.
