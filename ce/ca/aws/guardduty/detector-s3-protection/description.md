# Description

This policy identifies AWS GuardDuty Detectors that do not have S3 Protection enabled.

S3 Protection helps detect potential security risks to your data, such as exfiltration or destruction, in Amazon Simple Storage Service (Amazon S3) buckets. GuardDuty monitors AWS CloudTrail S3 data events, including object-level API operations, to identify these risks across all S3 buckets in your account.

## Rationale

GuardDuty S3 Protection analyzes AWS CloudTrail S3 data events (e.g., `GetObject`, `ListObjects`, `DeleteObject`) to detect suspicious activity targeting your S3 buckets. It can identify threats such as data exfiltration from unusual geolocations, API calls from known malicious IP addresses, or actions performed by compromised credentials.

## Impact

CloudTrail S3 data event analysis is charged per 1 million events per month, is prorated, and is discounted based on volume.

## Audit

This policy flags an *AWS GuardDuty Detector* as `INCOMPLIANT` if the **S3_DATA_EVENTS** `Feature` is set to **DISABLED**.
