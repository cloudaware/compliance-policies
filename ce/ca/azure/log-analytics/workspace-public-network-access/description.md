# Description

A Log Analytics workspace accepts ingestion and queries from any network, or only from networks connected through an Azure Monitor Private Link Scope (AMPLS). The Allow public network access for ingestion and Allow public network access for queries settings select between them; each is Enabled (Yes), Disabled (No), or SecuredByPerimeter. Prerequisites: Link the workspace to an Azure Monitor Private Link Scope reached through a private endpoint with private DNS from every network whose agents, clients, or users send data to or query it.

## Rationale

With public access enabled, the workspace answers queries and accepts ingestion from any internet-connected client that holds a valid credential. A stolen credential therefore exposes the security evidence collected in the workspace to bulk reading from anywhere, and lets an attacker write fabricated records into it, with no network boundary behind authentication to contain either.

## Audit

This policy marks an *Azure Log Analytics Workspace* as `INCOMPLIANT` if either public network access setting is `Enabled` or `SecuredByPerimeter`.

Both **Public Network Access For Ingestion** and **Public Network Access For Query** must be `Disabled` for `COMPLIANT`. Perimeter mode does not satisfy this policy.
