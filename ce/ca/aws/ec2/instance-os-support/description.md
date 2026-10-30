# Description

Ensure that an EC2 instance's installed operating system remains maintained and within its ordinary security-support lifecycle. This policy uses Cloudaware's optional **OS Info** lifecycle enrichment. It does not identify an OS release from EC2 platform labels, AMI names, image age, or AMI deprecation.

## Rationale

An OS past its ordinary end of life can stop receiving security fixes, exposing applications and data to vulnerabilities and increasing operational risk. Findings identify instances that need an OS migration or a documented, time-limited support exception. A catalog's extended-support availability does not establish that a particular instance has the required entitlement, enrollment, or update repositories.

Ending active or mainstream support alone does not establish the end of security support. For example, normal Windows Server Extended Support and the maintenance phase of Amazon Linux 2023 remain within this policy's ordinary security-support lifecycle. Paid Windows Extended Security Updates (ESU) and RHEL Extended Life Cycle Support (ELS) require separate verification.

## Impact

Upgrading or replacing an instance can require application testing, downtime, deployment changes, and a rollback plan. Extended-support arrangements can add cost and have narrower coverage. This policy checks the collected release lifecycle; it does not verify patch installation, individual package support, or subscription compliance.

## Audit

This policy marks an *AWS EC2 Instance* as `INCOMPLIANT` if its collected OS lifecycle information shows that **OS Info: Maintained** is `No`, or that **OS Info: EOL From** or **OS Info: EOES From** falls before the current UTC day. Evaluation is subject to the scope and data checks below. A future extended-support date does not suppress an ordinary-EOL finding or establish support entitlement; verify any extended-support arrangement and document an exception separately.

The policy evaluates instances whose **State Name** is populated and is neither `terminated` nor `shutting-down`, and whose **OS Info: Source** is populated. Any nonempty lifecycle source is accepted. Stopped instances remain in scope because they can be restarted.

Other results are interpreted as follows:

- `COMPLIANT`: **OS Info: Maintained** is `Yes`, **OS Info: EOL From** is after the current UTC day, and **OS Info: EOES From** is either empty or also after the current UTC day.
- `INAPPLICABLE`: The instance is `terminated` or `shutting-down`; **OS Info: Source** is empty or whitespace-only; a maintained release has no ordinary EOL date and no expired EOES date; or ordinary EOL falls on the current UTC day without other evidence establishing a violation. These exclusions do not establish that the OS is supported.
- `UNDETERMINED`: **State Name** is missing; **OS Info: Maintained** is missing after a lifecycle source is available or contains a value other than `Yes` or `No`; or a release marked as maintained has an EOES date on or before the current UTC day while its ordinary EOL date is in the future. Disappeared instances are handled automatically by the engine.

**OS Info: Maintained** indicates that some level of support is available, potentially including extended support. It does not establish ordinary support or purchased entitlement. **OS Info: EOAS From** is not evaluated because the end of active support alone does not establish the end of security support.

EOL and EOES are optional dates whose metadata does not specify an exact vendor cutoff or timezone. Date-based expiry is therefore assessed only after the recorded UTC day. An explicit `Maintained: No` still establishes a finding on a transition day. An ordinary EOL date already in the past remains a finding when EOES falls today.

Results reflect the collected lifecycle information. Before remediation, confirm the installed OS name and release against current guest inventory and the vendor's lifecycle schedule, and reconcile stale or conflicting data.
