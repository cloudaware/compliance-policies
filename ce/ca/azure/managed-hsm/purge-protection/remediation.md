# Remediation

A deleted Managed HSM and its deleted keys stay recoverable for a soft-delete retention period of 7 to 90 days. The Purge protection setting, Enabled or Disabled, decides whether a deleted HSM or key can be purged, which deletes it permanently, before that period ends.

Enable **Purge protection** on the Managed HSM using an account with Azure Resource Manager write access, such as the **Managed HSM Contributor** role. Verify that purge protection is enabled and that the soft-delete retention period meets the organization's recovery requirements.

**Enabling purge protection is irreversible.** Confirm the retention requirements before applying the change.

Automated assessment is unavailable: Managed HSM resources and enablePurgeProtection are not collected.
