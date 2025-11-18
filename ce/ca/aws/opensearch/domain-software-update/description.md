# Description

This policy identifies AWS OpenSearch Domains that are not configured to run the latest compatible service software version. Service software updates include essential security patches, bug fixes, and performance enhancements that help maintain a secure, reliable, and optimized OpenSearch environment.

## Rationale

Applying the latest service software updates on a regular basis helps safeguard OpenSearch domains against known vulnerabilities, improves stability by resolving bugs, and provides access to new features and performance improvements.

## Impact

Failing to install the latest updates can expose OpenSearch domains to security risks, reduce performance efficiency, and cause operational instability due to unresolved defects. Additionally, outdated domains may lack access to new capabilities that enhance functionality and reliability.

## Audit

This policy flags an *AWS OpenSearch Domain* as `INCOMPLIANT` if `Service Software: Update Available` field is set to **false**.
