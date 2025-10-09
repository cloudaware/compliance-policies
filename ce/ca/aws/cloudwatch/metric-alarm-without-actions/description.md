# Description

This policy identifies AWS CloudWatch Metric Alarms that do not have at least one action configured for any of the following states: `ALARM`, `INSUFFICIENT_DATA`, or `OK`.

AWS CloudWatch alarms monitor a single metric over a defined time period and can trigger one or more actions based on the metric’s value relative to a specified threshold. Actions typically include sending notifications (for example, to an Amazon SNS topic) or initiating automated responses (such as an EC2 Auto Scaling policy).

## Rationale

Alarms without configured actions are ineffective because they do not generate notifications or trigger automated responses when their state changes. This lack of response increases the risk of critical performance issues, security events, or system failures going undetected, potentially resulting in prolonged downtime or security breaches.

## Impact

Without actions, there is an increased risk of critical performance issues, security events, or system failures going undetected, potentially resulting in prolonged downtime or security breaches.

## Audit

This policy flags an *AWS CloudWatch Metric Alarm* as `INCOMPLIANT` if **Actions Enabled** is set to **false**, or if any of the following fields are empty: **Alarm Actions**, **OK Actions**, or **Insufficient Data Actions**.
