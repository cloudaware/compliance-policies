# Description

This policy identifies Oracle IAM User API keys that are older than 90 days. Oracle API keys are long-term credentials used to sign programmatic requests to Oracle Cloud Infrastructure APIs.

## Rationale

Long-lived API keys increase the exposure window for credential theft, accidental disclosure, and misuse. Rotating API keys at least every 90 days limits the time a compromised key can be used and supports a predictable credential lifecycle for users, scripts, and integrations.

## Impact

Rotating an API key can disrupt applications, scripts, integrations, or users that still depend on the old key. Before deleting the stale key, create a replacement key, update all dependent workloads, and confirm that Oracle API access works with the new key.

## Audit

This policy flags an *Oracle IAM User API Key* as `INCOMPLIANT` if  the `Time Created` field is older than 90 days.

API keys with a `Time Created` value within the last 90 days are marked as `COMPLIANT`.
