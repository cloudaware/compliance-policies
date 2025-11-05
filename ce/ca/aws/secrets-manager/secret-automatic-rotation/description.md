# Description

Static, long-lived credentials pose a significant security risk if compromised. Enabling automatic rotation limits credential lifespan, reducing the window of opportunity for unauthorized access. Implementing this policy helps automate credential lifecycle management, strengthens your overall security posture, and minimizes the operational burden associated with manual secret rotation.

## Rationale

Long-lived, static credentials increase the risk of unauthorized access if they are compromised. Automatic rotation limits the lifespan of a credential, significantly reducing the window of opportunity for an attacker to use it. By enforcing this policy, you can automate a crucial part of your credential lifecycle management, improve your security posture, and reduce the operational overhead of manual rotation.

## Audit

This policy flags an *AWS Secrets Manager Secret* as `INCOMPLIANT` if the `Rotation Enabled` checkbox is set to **false**.
