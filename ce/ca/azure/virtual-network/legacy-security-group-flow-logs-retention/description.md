# Description

Retain records from existing NSG flow logs still in use for at least 90 days, or indefinitely. NSG flow logs retire on September 30, 2027; new logs cannot be created after June 30, 2025.

## Audit

This policy marks an *Azure Network Watcher Flow Log* targeting an NSG as `INCOMPLIANT` if it is enabled and retention is a positive value below **90**, or nonzero retention is configured with its retention policy disabled. Enabled logs with retention **0**, or an enabled retention policy of **90 or more**, are `COMPLIANT`.

Virtual-network, subnet and interface targets are `INAPPLICABLE`.
