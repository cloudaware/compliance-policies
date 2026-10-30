# Description

This policy identifies AWS Lambda functions with fewer than 10 invocations over the last 14 days for an ownership and continued-necessity review. It includes functions with no invocations, treating a null **2-Week Invocation Count** as zero under the established CMDB data contract. Functions with at least 10 recorded execution errors or throttled requests in the same period are excluded because these counters demonstrate activity that requires troubleshooting rather than an inactivity review.

## Rationale

Low or absent invocation activity can reveal obsolete deployments, unnecessary permissions, and unused integrations. One review covers both idle functions and functions that execute only occasionally, since both require the same ownership and dependency assessment.

The threshold of fewer than 10 invocations over 14 days is a review heuristic, not an AWS service limit or a capacity recommendation. It does not establish oversized memory or significant compute waste. A function with no executions does not incur request or execution charges; savings may come from separately billed resources, such as provisioned concurrency or retained logs.

## Impact

Weekly and monthly schedules, event-driven configuration or security checks, seasonal workloads, emergency functions, and recovery procedures can legitimately have fewer than 10 invocations for 14 days. Removing a required function or its triggers can interrupt applications, deployment workflows, or recovery procedures.

Use documented exceptions for intentionally infrequent functions. Findings are actionable review candidates; they do not establish that a function is obsolete or guarantee cost savings. The signal-to-noise ratio depends on expected workload frequency and the use of exceptions.

## Audit

This policy flags an *AWS Lambda Function* as `INCOMPLIANT` if:

- Its **Created Date** is strictly before UTC midnight 14 days before the evaluation date.
- Its **2-Week Invocation Count** is **null or between 0 and 9, inclusive**.
- Neither **2-Week Invocation Errors** nor **2-Week Invocation Throttled** is **10 or greater**.

An *AWS Lambda Function* is marked as:

- `DISAPPEARED` if it has been deleted from AWS.
- `UNDETERMINED` if its **Created Date** is unavailable.
- `INAPPLICABLE` if its **Created Date** is on or after UTC midnight 14 days before the evaluation date.
- `UNDETERMINED` if it passes the age gate but its **2-Week Invocation Count** is negative.
- `COMPLIANT` if it passes the age and validity checks and either its **2-Week Invocation Errors** or **2-Week Invocation Throttled** is **10 or greater**. This means it is outside the low-activity review scope, not that it is healthy.
- `COMPLIANT` if it passes the age gate and its **2-Week Invocation Count** is **10 or greater**.

The fields are `CA10__sumTwoWeekInvocationCount__c`, `CA10__sumTwoWeekInvocationErrors__c`, and `CA10__sumTwoWeekInvocationThrottled__c`. The CMDB is the source of truth; null counters represent zero. **Created Date** is the CMDB record creation date, not the AWS function creation date; the age gate conservatively excludes recently discovered functions.

## References

- [AWS Lambda invocation metrics](https://docs.aws.amazon.com/lambda/latest/dg/monitoring-metrics-types.html)
- [AWS Lambda metric dimensions](https://docs.aws.amazon.com/lambda/latest/dg/monitoring-metrics-view.html)
- [AWS Lambda pricing](https://aws.amazon.com/lambda/pricing/)
