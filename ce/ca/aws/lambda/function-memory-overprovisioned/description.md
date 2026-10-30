# Description

This policy identifies AWS Lambda functions whose current **$LATEST** configuration has an AWS Compute Optimizer memory overprovisioning recommendation and a valid smaller memory option. Review these functions for potential cost savings and benchmark the proposed configuration before reducing memory.

## Rationale

Excess memory can increase Lambda compute costs. Compute Optimizer provides workload-based recommendations that distinguish memory overprovisioning from underprovisioning. Using the specific **MemoryOverprovisioned** reason avoids treating every **NotOptimized** finding as a downsizing opportunity.

The policy identifies candidates for review, rather than guaranteed savings. Prioritize functions with positive estimated savings and enough usage to justify the testing and deployment effort. A zero or unavailable savings estimate should not be treated as a confirmed financial benefit.

The 14-day analysis period, minimum invocation count, and supported memory range are eligibility checks, not a formula for calculating the recommended memory size. AWS bases Lambda sizing recommendations on workload history, including CPU time, duration, and memory usage. The Lambda recommendation API does not expose fixed utilization thresholds, memory headroom settings, or a maximum permitted duration increase. This policy therefore validates the recommendation and its smaller memory option without inventing a memory-utilization cutoff. Observed memory usage, projected duration, and savings provide evidence for reviewing the recommendation; they do not reproduce AWS's sizing model.

## Impact

Leaving an oversized function unchanged can retain unnecessary compute costs. Reducing memory also reduces allocated CPU and can increase execution duration, cause timeouts or memory errors, and raise total cost. Validate performance and cost under representative workloads and retain a rollback configuration.

## Audit

This policy evaluates an *AWS Lambda Function* and its related *AWS Compute Optimizer Lambda Function Recommendations* for the current **$LATEST** version. Published-version recommendations and deleted recommendations are excluded.

The current CloudAware dataset is treated as the authoritative source. Recommendation age and function modification age do not determine the result; the policy validates the recommendation's analysis coverage, invocation count, version, and memory consistency instead.

The function is marked as `INCOMPLIANT` when a related recommendation meets all of these conditions:

- `Lambda Function Version` is **$LATEST**.
- `Lookback Period In Days` is **14**.
- `Number Of Invocations` is at least **50** for that recommendation's analysis window.
- `Current Memory Size` equals the function's `Memory Size MB`.
- `Finding` is **NotOptimized** and `Finding Reason Codes` is **MemoryOverprovisioned**, without other reason codes.
- `Memory Size Recommendation Options JSON` contains a rank **1** option with a numeric memory size of at least **128 MB** and less than the current memory size.

The function is marked as `INAPPLICABLE` if its version is not **$LATEST** or its configured memory exceeds **1,792 MB**.

The function is marked as `COMPLIANT` if usable evidence reports **Optimized** with no reason code, or **NotOptimized** with **MemoryUnderprovisioned**, and no related recommendation is undetermined or confirms overprovisioning. This status only means that this policy did not identify memory overprovisioning; underprovisioning may require separate performance remediation.

The function is marked as `UNDETERMINED` if required data is missing, configured memory is below **128 MB**, or there is no usable recommendation for **$LATEST**. Unsupported analysis windows, fewer than **50** analyzed invocations, inconsistent memory sizes, unavailable or unrecognized findings, and missing, invalid, or non-reducing memory options cannot establish overprovisioning. A confirmed overprovisioning recommendation takes precedence over other uncertain evidence.

To verify a finding, open **AWS Compute Optimizer → Lambda functions** in the function's account and Region. Select the function and confirm its version, finding reason, analysis window, analyzed invocation count, analyzed memory, and recommended memory. Compare memory and version with the Lambda configuration. Review projected duration, estimated savings, and the analysis-period workload before accepting the recommendation. Use the recommendation's invocation count, rather than the function's separate rolling two-week count, because they describe different measurement windows. Absent recommendations do not establish compliance.

## References

- [AWS Lambda recommendation classifications](https://docs.aws.amazon.com/compute-optimizer/latest/ug/view-lambda-recommendations.html)
- [Compute Optimizer resource requirements](https://docs.aws.amazon.com/compute-optimizer/latest/ug/requirements.html)
- [AWS Lambda recommendation inputs](https://aws.amazon.com/compute-optimizer/faqs/)
- [Lambda recommendation preferences API](https://docs.aws.amazon.com/compute-optimizer/latest/APIReference/API_LambdaEffectiveRecommendationPreferences.html)
