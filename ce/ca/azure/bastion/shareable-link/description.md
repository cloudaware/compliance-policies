# Description

Shareable Link lets anyone holding a Bastion-generated URL reach a virtual machine's RDP or SSH sign-in without signing in to the Azure portal. Each Standard or Premium Bastion host has Shareable Link Enabled or Disabled; Basic and Developer hosts lack the feature and are out of scope.

## Rationale

A shareable link exposes a virtual machine's RDP or SSH sign-in to anyone who obtains the URL, with no Microsoft Entra ID authentication, Conditional Access, or Azure role assignment in front of it. A leaked or forwarded link leaves only the virtual machine's local credentials between an attacker and an interactive session until the link expires or is deleted.

## Audit

This policy marks an *Azure Bastion Host* as `INCOMPLIANT` if the SKU is `Standard` or `Premium` and **Shareable Link State** is `Enabled`.

`Disabled` is `COMPLIANT`. Basic and Developer SKUs lack this feature and are `INAPPLICABLE`.
