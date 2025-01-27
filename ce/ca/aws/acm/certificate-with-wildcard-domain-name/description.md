# Description

Ensure to use AWS ACM single domain name certificates rather than wildcard certificates. Single domain certificates provide a unique private key for each domain or subdomain, which improves security by limiting the impact of any potential compromise.

## Rationale

Wildcard certificates can match any first-level subdomain, including those that may not be actively managed or monitored. This broad coverage can create vulnerabilities; if the private key for a wildcard certificate is compromised, all subdomains using that certificate could be at risk, leading to a potential breach of sensitive data or services. Additionally, the complexity of managing wildcard certificates can result in operational challenges, especially in larger environments.

By employing single domain name certificates, organizations can minimize their attack surface and improve security posture. This strategy also allows for more granular control and management of certificates, making it easier to revoke or update individual certificates as needed without affecting all subdomains under a wildcard certificate.

## Audit

This policy will mark a certificate as `INCOMPLIANT` if the `Status` is `ISSUED` and the `Domain Name` starts with an asterisk (`*`), indicating a wildcard certificate.

If the `Status` field is empty, this might indicate a permission issue with the `acm:DescribeCertificate` API call, and the certificate will be marked as `UNDETERMINED`.
