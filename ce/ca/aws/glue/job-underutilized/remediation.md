# Remediation

Review the workload before changing capacity. An `INCOMPLIANT` result identifies a tuning opportunity; it does not establish a specific safe reduction.

1. Review representative and peak-input runs over the last 14 days. Compare processing duration, input volume, CPU and memory peaks, disk pressure, failures, and completion deadlines. For `UNDETERMINED` results, first establish the required task activity and positive utilization measurements.
2. Identify the cause of low utilization. Address I/O bottlenecks, insufficient parallelism, or skew when those limit useful processing. Low JVM heap usage alone does not establish that a smaller worker has enough total memory or disk space.
3. Record the existing job configuration, including worker type/count, Glue version, arguments, and run-level overrides. Preserve a rollback copy.
4. In the AWS Glue console, open the job's **Job details**. For supported workloads, evaluate **Automatically scale the number of workers**. If already enabled, inspect actual DPU usage and executor demand before changing **Maximum number of workers**. Otherwise, test a smaller worker type or worker count where the workload supports it.
5. Benchmark one change at a time with representative and peak input data. Compare total DPU consumption, runtime, output correctness, retries, and failures. A smaller allocation that runs longer may not save money. Prioritize changes with a material demonstrated benefit.
6. Deploy an improvement that meets delivery requirements. Monitor subsequent runs and restore the previous configuration if cost, reliability, or completion times regress.
