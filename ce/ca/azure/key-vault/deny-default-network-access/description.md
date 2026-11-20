# Description

A key vault accepts data-plane connections from all networks, only from allowed virtual networks and IP addresses, or only through private endpoints. The Allow access from setting selects between Allow public access from all networks, Allow public access from specific virtual networks and IP addresses, and Disable public access. Prerequisites: Add a virtual network rule, an IP address rule, or a private endpoint for every client that needs data-plane access before setting the default action to deny.

## Rationale

With the default network access rule set to allow, the vault's data plane accepts connections from any internet address, and its virtual network and IP address rules have no effect, so the vault can appear network-restricted while it is not. A leaked token or a misassigned role can then be used against its keys, secrets, and certificates from anywhere.

## Audit

This policy marks an *Azure Key Vault* as `INCOMPLIANT` if public network access is `Enabled` or unset and **Network Rule Set Default Action** is `Allow` or unset.

A default action of `Deny` or public access of `Disabled` is `COMPLIANT`. An absent default action is assessed as allowing all networks.
