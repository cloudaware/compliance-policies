# Description

Ensure that Azure Virtual Machines hosting Microsoft SQL Server (MSSQL) are not configured to allow unrestricted inbound access to the default MSSQL port (1433). Network Security Group (NSG) rules should be reviewed and adjusted to restrict inbound traffic on port 1433 to authorized IP addresses or trusted networks, thereby minimizing the risk of unauthorized access and potential exploitation of the database.

## Rational

Unrestricted access to MSSQL on port 1433 significantly increases the attack surface of the database server. This exposure can lead to security threats such as brute-force attacks, unauthorized data access, and data exfiltration. MSSQL servers are often targeted by malicious actors, particularly when weak authentication or unpatched vulnerabilities exist. By limiting access to trusted sources, you can mitigate these risks and ensure that only authorized systems and users can interact with the database, thereby enhancing its overall security posture.

## Impact

Configuring the NSG to restrict access may require adjustments to application and network configurations to ensure continued access for authorized users and services. It is critical to implement and test these changes carefully to avoid service disruptions while maintaining security.

## Audit

This policy flags an *Azure Virtual Machine* as `INCOMPLIANT` if it is associated with a *Network Interface* that is connected to an *NSG* containing at least one **Inbound Security Rule** that meets all of the following conditions:

- `Direction` is **Inbound**.
- `Access` is **Allow**.
- `Protocol` is either **Tcp**, `*`, or `null`.
- `Source Address Prefix` is either **Internet**, `*` **0.0.0.0**, **/0**, or **Any**.
- `Destination Port` is **1433**.

If the `Direction`, `Access`, `Protocol`, or `Source Address Prefix` fields do not match the criteria above, the VM is marked as `INAPPLICABLE`.

If the `Destination Port` does not match, the VM is considered `COMPLIANT`.
