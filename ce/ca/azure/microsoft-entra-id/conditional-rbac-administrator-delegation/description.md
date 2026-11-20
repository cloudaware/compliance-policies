# Description

Role assignment management is delegated through User Access Administrator, or through Role Based Access Control Administrator with or without a role assignment condition that limits the roles and principals the delegate can assign. Root-scope assignments are covered by 'Ensure That Use of the 'User Access Administrator' Role is Restricted'. Prerequisites: Identify the roles and principal types each delegate assigns, including automation pipelines, so the condition does not block required assignments.

## Rationale

User Access Administrator and an unconstrained Role Based Access Control Administrator let the holder assign any role, including Owner, to any principal at their scope, themselves included. A compromised or careless delegate can therefore take full control of every resource in that scope and hand assignment rights to others, with no limit short of removing the assignment.

## Audit

This requirement needs manual assessment. The intended delegated administrators and approved condition boundaries require organizational review; role-name matching alone cannot establish correct delegation.
