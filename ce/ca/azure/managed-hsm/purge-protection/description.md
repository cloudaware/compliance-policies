# Description

A deleted Managed HSM and its deleted keys stay recoverable for a soft-delete retention period of 7 to 90 days. The Purge protection setting, Enabled or Disabled, decides whether a deleted HSM or key can be purged, which deletes it permanently, before that period ends.

## Rationale

With purge protection disabled, a Managed HSM Contributor can delete and immediately purge the HSM, and a Managed HSM Crypto Officer can do the same to its keys. Unless a full HSM backup and its security domain are held, the key material is destroyed and all data encrypted with it becomes permanently unreadable, whether by mistake or sabotage.

## Audit

This requirement needs manual assessment. Managed HSM resources and enablePurgeProtection are not collected.
