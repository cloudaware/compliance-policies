# Description

Network security group inbound rules decide whether a database engine on a virtual machine accepts connections from the Internet. This policy covers the default ports of SQL Server, Oracle, MySQL, PostgreSQL, Redis, and MongoDB on virtual machines. Managed database services are outside its scope.

## Rationale

A database port reachable from the Internet exposes the engine's authentication to password guessing and its listener to exploitation of unpatched vulnerabilities. An attacker who gets in can read, alter, or delete the data directly and use the virtual machine to reach other resources on the virtual network.

## Audit

This policy marks an *Azure Network Security Group* as `INCOMPLIANT` if a current Allow/Inbound TCP, UDP, or Any rule permits Internet, wildcard, or a global IPv4/IPv6 source to destination ports **1433, 1434, 1521, 3306, 5432, 6379, 27017**, any range containing them, or all ports.

No matching current rule is `COMPLIANT` within the collected rule scope.
