# Description

This policy identifies recurring Apache Spark batch ETL jobs with positive completed-task activity and 14-day average driver and executor CPU and JVM heap utilization all below 20%. Findings identify workloads for performance and cost-optimization review.

## Rationale

Consistently low observed resource use during recurring processing can indicate oversized workers, insufficient parallelism, skew, or I/O bottlenecks. Reviewing these jobs can reveal opportunities to reduce DPU consumption or improve processing efficiency. Requiring task activity in both halves of the observation period excludes jobs observed only during one isolated part of that period.

## Impact

Reducing capacity can increase runtime, cause memory or disk failures, or miss delivery deadlines. Averages can hide demanding stages, and JVM heap usage excludes other memory use. Confirm actual resource consumption and benchmark changes before reducing capacity. Findings do not prescribe a specific worker type or count or guarantee savings.

## Audit

This policy evaluates an *AWS Glue Job* using its collected 7-day task total and 14-day task and utilization metrics. Collected values are treated as current and authoritative.

The *Job* is marked as `INCOMPLIANT` when all the following conditions hold:

- `Command: Name` is `glueetl`.
- `Created On` is strictly before UTC midnight 14 days before evaluation.
- `CloudWatch: Num Completed Tasks 7-Day` is greater than zero.
- `CloudWatch: Num Completed Tasks 14-Day` is greater than the 7-day total, establishing completed-task activity in the preceding seven days as well.
- Each of these 14-day percentages is greater than 0% and less than 20%:
  - `CloudWatch: All CPU System Load 14-Day`.
  - `CloudWatch: All JVM Heap Usage 14-Day`.
  - `CloudWatch: Driver CPU SystemLoad 14-Day`.
  - `CloudWatch: Driver JVM Heap Usage 14-Day`.

The *Job* is marked as `INAPPLICABLE` if its command is not `glueetl` or its creation date does not meet the age requirement. Python shell and streaming jobs are outside scope.

The *Job* is marked as `UNDETERMINED` if an evaluated field is missing, either task total is nonpositive, the 14-day task total is not greater than the 7-day total, or a utilization percentage is zero or outside 0% to 100%. Zero is a valid measured value, but this policy requires positive resource-use evidence before classifying an active workload. An inconsistent 7-day total exceeding the 14-day total is also inconclusive.

The *Job* is marked as `COMPLIANT` if the activity and validity requirements are satisfied and at least one utilization average is 20% or higher. This means only that this policy's low-utilization criterion is not met. Deleted jobs are `DISAPPEARED`.

For manual verification:

1. In the AWS Glue console, open **Job run monitoring** and review representative runs within the last 14 days. Verify completed work, input volume, duration, failures, and delivery requirements.
2. In CloudWatch, select the **Glue** namespace and the correct job and run dimensions. Review driver and executor CPU and heap time series, peaks, and Spark stages. Investigate skew, low parallelism, disk pressure, and I/O waits.
3. Where available, use **All Executors 14-Day**, **Max Needed Executors 14-Day**, **Num Failed Tasks 14-Day**, and **Driver Disk Space, MB 14-Day** as supporting evidence. Average allocated executors and maximum executor demand are different statistics; do not interpret their ratio as utilization.
4. Check effective run arguments and actual worker allocation. For Auto Scaling, the configured worker maximum is a ceiling. Review executor demand and DPU usage before reducing it.

The 20% threshold is a screening heuristic. Activity in both weeks establishes recurring processing, not a minimum run duration or low utilization in every stage. Recurring short runs can still warrant review; confirm that a proposed change produces a material benefit.

## References

- [AWS Glue CloudWatch metric definitions](https://docs.aws.amazon.com/glue/latest/dg/monitoring-awsglue-with-cloudwatch-metrics.html)
- [AWS Glue Auto Scaling](https://docs.aws.amazon.com/glue/latest/dg/auto-scaling.html)
- [AWS Glue job argument precedence](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-glue-arguments.html)
