# Remediation

Configuring an alert monitoring and response process ensures that alerts are actioned in a timely manner. Integrate with SIEM solutions like Microsoft Sentinel, or configure email/webhook notifications to security teams.

In **Microsoft Defender for Cloud > Environment settings**, select each subscription and open **Continuous export**. Enable export of at least **Medium** and **High** severity security alerts to the approved Log Analytics workspace, event hub, or both. Confirm that the destination feeds the security monitoring workflow and that exported alerts reach the responsible security team.

Automated assessment is unavailable: Defender automation/export configuration, subscription-wide alert scope, and SIEM destination are not collected through a verified relationship.
