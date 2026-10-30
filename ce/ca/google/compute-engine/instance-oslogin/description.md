# Description

This policy checks whether OS Login is enabled at the Google Cloud project level for projects with running Google Compute Engine instances. OS Login links SSH access to Cloud IAM identities and reduces reliance on SSH keys stored in project or instance metadata.

## Rationale

Enabling OS Login centralizes SSH access management through IAM. When access is removed from an IAM user, the associated SSH access is also removed. This helps manage SSH access consistently and reduces the operational risk of unmanaged or stale SSH keys.

Project-level OS Login can be overridden by instance metadata. A running instance that sets `enable-oslogin` to `FALSE` disables the project-level control for that instance.

## Impact

Enabling OS Login at the project level disables metadata-based SSH key configurations for instances in the project. If OS Login is later disabled, SSH keys configured in project or instance metadata are restored.

## Audit

This policy flags a *Google Project* as `INCOMPLIANT` when both of the following conditions are met:

- The project has at least one running non-GKE *Google GCE Instance*, and
- Project common metadata does not set `enable-oslogin` to `TRUE`.

This policy also flags a *Google Project* as `INCOMPLIANT` when at least one running non-GKE *Google GCE Instance* has instance metadata that sets `enable-oslogin` to `FALSE`.

Projects with no running applicable GCE instances are marked as `INAPPLICABLE`.

GKE-created instances are marked as `INAPPLICABLE`. These instances usually have names that start with `gke-`.

## Default Value

By default, `enable-oslogin` is not set, which is equivalent to `FALSE`.

## References

1. <https://cloud.google.com/compute/docs/instances/managing-instance-access>
2. <https://cloud.google.com/compute/docs/oslogin/set-up-oslogin>
