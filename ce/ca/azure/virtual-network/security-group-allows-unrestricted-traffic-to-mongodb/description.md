# Description

Ensure that Azure Network Security Groups hosting MongoDB instances are not exposed to unrestricted public access on ports 27017 through 27020.

Network Security Group (NSG) rules should be configured to block inbound traffic to these ports from untrusted sources, and access should be limited to specific, authorized IP address ranges or internal networks. This minimizes the potential for unauthorized access and reduces the risk of data breaches.

## Rational

MongoDB is a widely used NoSQL database that, when exposed to the public internet (e.g., via `0.0.0.0/0`), presents significant security vulnerabilities. Unrestricted access to MongoDB ports allows malicious actors to perform unauthorized operations, such as data exfiltration, unauthorized modifications, or exploitation of known vulnerabilities. By restricting MongoDB access to trusted IP addresses or internal networks, organizations can limit exposure and ensure that only authorized systems and users are able to interact with the database, significantly reducing the attack surface.

## Impact

Implementing these access restrictions may require adjustments to firewall or application configurations to ensure legitimate users and systems maintain connectivity to the MongoDB instance. It is essential to carefully plan and test these changes to avoid service disruptions for authorized clients.

## Audit

This policy flags an *Azure Network Security Group* as `INCOMPLIANT` if it contains at least one **Inbound Security Rule** that meets all of the following conditions:

- `Direction` is **Inbound**.
- `Access` is **Allow**.
- `Protocol` is either **Tcp**, `*`, or `null`.
- `Source Address Prefix` is either **Internet**, `*` **0.0.0.0**, **/0**, or **Any**.
- `Destination Port` is **27017 - 27020**.

If the `Direction`, `Access`, `Protocol`, or `Source Address Prefix` fields do not match the criteria above, the VM is marked as `INAPPLICABLE`.

If the `Destination Port` does not match, the VM is considered `COMPLIANT`.
