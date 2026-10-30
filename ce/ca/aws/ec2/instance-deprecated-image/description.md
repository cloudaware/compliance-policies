# Description

Identify EC2 instances whose source Amazon Machine Image (AMI) has passed its scheduled deprecation date. AMI deprecation is a deployment lifecycle signal that warrants reviewing the image and planning replacement where appropriate.

Deprecation does not prove that the instance's installed operating system is unsupported. Public AMIs receive a default deprecation date two years after creation, and owners can deprecate private or public images for other reasons. Existing instances continue to operate after their source AMI is deprecated. Users, launch templates, and Auto Scaling groups can still launch instances from a deprecated AMI by specifying its ID.

## Rationale

Reviewing instances associated with deprecated images helps prevent new deployments and recovery procedures from repeatedly using a baseline that its publisher has retired or superseded. The finding is actionable through the deployment configuration and a tested instance replacement. It also applies when an AMI becomes deprecated after the instance was launched.

This is a reliability best practice for baseline review, not proof of a vulnerability or imminent instance failure. Public-image defaults and organizational image-retention practices can produce findings for otherwise maintained workloads. Validate the publisher's reason for deprecation, current guest OS and software support, and any approved exception before replacing an instance.

## Impact

Replacing an instance can interrupt workloads and requires compatibility testing, data protection, and a controlled rollout. This policy does not require immediate termination of an otherwise healthy instance.

## Audit

This policy marks an *AWS EC2 Instance* as `INCOMPLIANT` if its **State Name** is neither `terminated` nor `shutting-down`, its **Image** relationship resolves to a non-disappeared AMI whose **State** is `available`, and that image's **Deprecation Time** is before the current UTC day.

An instance is `COMPLIANT` when the resolved AMI's **State** is `available` and its **Deprecation Time** is empty or falls after the current UTC day. Compliance concerns AMI deprecation only; it does not establish guest OS support, AMI age, or launch permissions.

Instances in `terminated` or `shutting-down` states are `INAPPLICABLE`.

Only AMIs whose **State** is `available` are evaluated for deprecation. Any other nonempty AMI state is `INAPPLICABLE`, even when a past **Deprecation Time** is present.
