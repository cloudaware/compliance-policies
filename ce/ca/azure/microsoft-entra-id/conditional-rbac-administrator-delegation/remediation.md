# Remediation

Role assignment management is delegated through User Access Administrator, or through Role Based Access Control Administrator with or without a role assignment condition that limits the roles and principals the delegate can assign. Root-scope assignments are covered by 'Ensure That Use of the 'User Access Administrator' Role is Restricted'. Prerequisites: Identify the roles and principal types each delegate assigns, including automation pipelines, so the condition does not block required assignments.

Assign **Role Based Access Control Administrator** at the required scope with a role assignment condition limiting the roles and principals the delegate may manage. Cover both assignment creation and removal in the condition. Remove broader assignments, including inherited assignments at their source scope, while retaining an independently authorized administrator who can recover access. Verify that the delegate can perform approved operations and is blocked from unapproved operations.

Automated assessment is unavailable: The intended delegated administrators and approved condition boundaries require organizational review; role-name matching alone cannot establish correct delegation.
