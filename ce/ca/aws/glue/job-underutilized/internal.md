# Implementation notes

## Production decision

Collected CloudAware data is current and authoritative, as specified by the user. Freshness, collector timestamps, and sample-count metadata are not activation prerequisites. This policy is a production utilization-review heuristic; it does not calculate recoverable savings or prescribe an automatic capacity reduction.

The policy applies to established Spark batch ETL jobs. All four 14-day averages must be positive and below 20%, and completed tasks must be observed in both halves of the 14-day window. The 7-day total must be positive and less than the 14-day total. This excludes activity confined to either week without introducing an arbitrary minimum task count. Missing, zero-utilization, invalid, and insufficient-activity evidence remains UNDETERMINED.

The recurrence guard does not impose a minimum run duration. No run-duration field exists on the job table. Recurring short runs can be valid review candidates; remediation must establish a material benefit before changing capacity.

## Complete MCP field review

Reviewed all 151 fields in `cloudaware-lincoln.sobjects.CA10__CaAwsGlueJob__c` on October 13, 2026 using `search_types`, unfiltered `search_fields`, and a SQL profile of every discovered field across active objects. Profiled populated counts, distinct values, and numeric extrema. Analyzed relevant field distributions and retrieved representative task, utilization, allocation, demand, failure, and disk values.

The full inventory and actual-value profiles are saved in `tmp/llm-context/glue-job-field-review.json`.

| Field group | Fields | Policy use |
| --- | ---: | --- |
| Current CloudWatch metrics | 54 | Four utilization averages, completed tasks, and supporting executor/disk/failure evidence across 1/7/14/30/60/90 days |
| Deprecated metrics | 24 | All unpopulated; use current PERCENT fields instead |
| Cost metrics | 8 | Prioritize review; 30-day/MTD cost totals do not quantify savings from 14-day utilization |
| Tag fields | 14 | Ownership and workload context |
| Configuration and metadata | 51 | Command, creation date, worker configuration, arguments, identifiers, relationships, and application context |

The full profile contained 9,430 active jobs. The two 14-day driver averages and task totals were populated for 2,147 jobs, executor averages for 2,069, and allocation/demand metrics for 1,264. Supporting metrics are not mandatory because their absence does not invalidate populated task and utilization evidence. No elapsed-time, run-count, total-memory, peak-CPU, or peak-heap field exists on this table.

A follow-up candidate query found 761 batch jobs with positive completed tasks and four averages below 20%, before age filtering. 599 had completed tasks in both weeks. 225 candidates had zero executor CPU; 30 had failed tasks and 22 had nonzero disk averages. No batch job had a 7-day task total greater than its 14-day total. Counts are observations from separate live queries, not a fixed production baseline.

Representative recurring low-utilization job `a3vHo000000wqJyIAI` had 9,138,471 completed tasks over seven days and 19,019,025 over 14 days, with approximately 7.27% executor CPU, 5.52% executor heap, 6.95% driver CPU, and 2.88% driver heap. Average active executors were 1.78 and peak needed executors were 9. Another low-average job had average active executors 11.93 but peak demand 449, illustrating why averages alone do not establish a safe worker reduction.

The source describes default arguments as newline-separated name/value pairs. Effective run overrides and non-overridable arguments are not exposed on the job table. Therefore no Auto Scaling filter is inferred from defaults. Auto Scaling remains applicable to a utilization review, with actual allocation and demand checked during remediation.

The deprecated Job Run table had no active records during the earlier review. Production logic requires no relationship or deprecated run data. Configuration timeout is a limit, not observed execution duration; job creation and modification dates are definition metadata.

## Validation

Run `repo-manager --no-auto-update policies test ce/ca/aws/glue/job-underutilized/prod.logic.yaml`. Fixtures cover utilization boundaries, zero/missing/invalid metrics, task recurrence and inconsistent totals, unsupported commands, UTC age boundaries, disappeared jobs, and representative low-utilization observations.

Final validation: all 47 regression cases passed. The JUnit report contains 48 checks including generation, with zero failures and zero errors.

A final read-only MCP query applying the production eligibility and detection conditions found 436 review candidates among 8,856 established batch jobs. The creation-date column is a BigQuery TIMESTAMP and was compared directly with UTC midnight 14 days before evaluation. These are utilization-review findings, not verified savings.
