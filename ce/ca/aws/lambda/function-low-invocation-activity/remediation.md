# Remediation

1. Identify the function owner and confirm the expected invocation frequency. Review invocation history, schedules, event source mappings, triggers, aliases, function URLs, resource policies, and upstream dependencies. Use the CMDB application and owner information when available.
2. Compare the finding with the `AWS/Lambda` `Invocations` metric in CloudWatch using the **Sum** statistic over the same 14-day period. Use the function-level dimension covering all versions and aliases in the correct account and Region. For Lambda@Edge, review the Regions where replicas execute. The CMDB represents no invocation activity as a null count.
3. Extend the review beyond 14 days when weekly, monthly, seasonal, recovery, or standby use is expected. If the function is intentionally infrequent, record its business justification and use the organization's policy exception process.
   Review recorded execution errors and throttled requests before retiring a function. Even activity below the exclusion threshold can indicate a failed integration or concurrency issue. Reserved concurrency controls capacity; it is not billed provisioned concurrency and should not be counted as savings.
4. If the owner confirms that the function is obsolete, preserve its code and deployment configuration for rollback, remove its triggers, and decommission it through the existing deployment process after approval.
5. Review provisioned concurrency, retained logs, and other associated resources separately before removing them. Verify dependencies and actual charges before claiming savings.

Do not delete a function solely because this policy identifies it. Do not increase invocation frequency or reduce configured memory merely to avoid a low-activity finding.

