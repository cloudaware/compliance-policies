# Description

This policy identifies AWS GuardDuty Detectors that do not have Lambda Protection enabled.

GuardDuty monitors Lambda network activity logs generated when a Lambda function in your account is invoked. Enabling this feature allows you to detect potential security threats targeting your Lambda functions.

## Rationale

Enabling GuardDuty Lambda Protection ensures continuous monitoring of network activity logs from your Lambda functions. This helps identify malicious or anomalous behavior, such as a function communicating with known malicious IP addresses or other suspicious network activity.

## Impact

GuardDuty incurs charges based on the volume of Lambda network activity log data (in GB) processed to generate findings. To optimize costs, GuardDuty applies intelligent filtering and analyzes only a relevant subset of logs necessary for effective threat detection.

## Audit

This policy flags an *AWS GuardDuty Detector* as `INCOMPLIANT` if the **LAMBDA_NETWORK_LOGS** `Feature` is set to **DISABLED**.
