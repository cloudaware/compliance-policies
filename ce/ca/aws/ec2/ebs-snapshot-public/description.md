# Description

Ensure that AWS EBS snapshots are not publicly accessible. By default, EBS snapshots are private and should remain so unless there is a specific, justified use case for sharing. Public access to snapshots is generally considered a security risk and is rarely appropriate.

## Rational

When an EBS snapshot is marked as public, it becomes accessible to all AWS accounts, allowing any user to create volumes based on its data. If the snapshot contains confidential or sensitive information, this misconfiguration can result in unintended data exposure and potentially severe security breaches. In most cases, publicly sharing a snapshot is accidental or the result of a misunderstanding of the implications.

## Audit

This policy flags an *AWS EBS Snapshot* as `INCOMPLIANT` if the `Public Accessible` field is set to **Yes**.
