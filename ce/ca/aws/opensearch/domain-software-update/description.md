# Description

This policy identifies AWS OpenSearch Service domains for which a newer compatible service software version is available but has not yet been installed.

Service software updates are released and managed by AWS. These updates can include security patches, reliability fixes, operational improvements, and performance enhancements for the managed OpenSearch platform.

## Rationale

Keeping OpenSearch service software current helps reduce exposure to known service-side defects and ensures domains benefit from the latest improvements delivered by AWS. Applying updates in a controlled manner also gives teams better change-management control than waiting for a later forced or automated rollout.

## Impact

Starting a service software update causes the domain to enter a processing state while the update is being deployed. Plan the change during an approved maintenance window and validate domain health, application connectivity, and cluster behavior before and after the update.

## Audit

This policy flags an *AWS OpenSearch Domain* as `INCOMPLIANT` if the `Service Software: Update Available` field is set to **true**.

*Domains* that are still being created are marked as `INAPPLICABLE`.
