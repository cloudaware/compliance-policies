# Description

Evaluate and remove Azure Public IP Addresses that are not currently associated with any Azure resource to minimize unnecessary costs and reduce resource clutter.

## Rational

Unassociated Public IP Addresses in Azure incur charges on an hourly basis despite not being attached to any active service. Proactively identifying and deallocating these unused IPs is an effective cost-optimization strategy.

Beyond cost implications, unassociated Public IPs may represent residual network exposure. While they do not directly expose a running workload, their presence can complicate network visibility, increase the attack surface, and hinder security posture management. Eliminating unused public IPs contributes to a cleaner, more secure, and manageable cloud environment.

## Audit

This policy marks an *Azure Public IP Address* as `INCOMPLIANT` if the `Associated Resource ID` field is **empty**, indicating no active associations with IP Configurations.
