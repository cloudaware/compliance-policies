# Description

Ensure that Azure VM Scale Set Instances hosting MySQL instances are not configured to allow unrestricted inbound access to port 3306.

Network Security Group (NSG) rules should be reviewed and adjusted to limit traffic to only trusted IP addresses or internal networks, reducing the risk of unauthorized access and exposure to external threats.

## Rational

Unrestricted access to MySQL on port 3306 significantly increases the risk of unauthorized access, brute-force attacks, data exfiltration, and exploitation of SQL injection vulnerabilities. MySQL instances exposed to the internet without appropriate access controls are prime targets for malicious actors, who may attempt to exploit weak authentication mechanisms or known vulnerabilities in the MySQL server. By restricting access to trusted IP addresses or internal networks, only authorized users and systems can interact with the database, safeguarding sensitive data and reducing the attack surface.

## Impact

Restricting access to MySQL may require careful configuration of Security Groups to ensure that legitimate applications and users retain necessary access to the database. Proper planning and testing are essential to maintain service availability while ensuring security.

## Audit

This policy flags an *Azure VM Scale Set Instance* as `INCOMPLIANT` if it is associated with a *Network Interface* that is connected to an *NSG* containing at least one **Inbound Security Rule** that meets all of the following conditions:

- `Direction` is **Inbound**.
- `Access` is **Allow**.
- `Protocol` is either **Tcp**, `*`, or `null`.
- `Source Address Prefix` is either **Internet**, `*` **0.0.0.0**, **/0**, or **Any**.
- `Destination Port` is **3306**.

If the `Direction`, `Access`, `Protocol`, or `Source Address Prefix` fields do not match the criteria above, the VM is marked as `INAPPLICABLE`.

If the `Destination Port` does not match, the VM is considered `COMPLIANT`.
