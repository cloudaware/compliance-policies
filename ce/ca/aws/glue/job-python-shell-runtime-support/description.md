# Description

This policy identifies AWS Glue Python shell job definitions configured with an unambiguously identified runtime that has passed AWS end of support (EOS). Migrate these workloads to a supported Python shell runtime or retire definitions that are no longer needed.

## Rationale

AWS does not provide security patches or technical support for runtimes past EOS and may not honor their SLAs. At EOL, AWS prevents new jobs and job runs and stops existing runs. Reviewing retained job definitions helps prevent failures when scheduled or infrequently used workloads are needed again.

## Impact

Runtime migration can change Python behavior and dependency compatibility. Test the script, libraries, permissions, input data, and output correctness before changing production jobs. A finding describes the collected configuration; it does not prove that the job recently executed on the retired runtime.

## Audit

This policy marks an *AWS Glue Job* as `INCOMPLIANT` if `Command: Name` is **pythonshell** and `Command: Python Version` is **2** or **3.6**. AWS has already ended support for these runtimes. `Glue Version` does not determine Python shell runtime support: AWS documents that this setting is ignored for Python shell jobs. Comparisons use the engine's normal case and whitespace normalization.

| Runtime | End of support | End of life |
| --- | --- | --- |
| Python shell 2 | June 1, 2022 | April 1, 2026 |
| Python shell 3.6 | March 31, 2026 | June 1, 2026 |

The *Job* is marked as `COMPLIANT` for other nonempty Python runtime values, including `3.9` and future versions, except for ambiguous value `3`. This policy uses a list of known unsupported runtimes reviewed on October 27, 2026, rather than an allowlist of supported versions. New versions therefore pass by default; the list must be updated when AWS retires another runtime. The policy relies on the collected AWS runtime field and does not validate version syntax. Upstream Python lifecycle dates and the availability of newer Python versions do not determine AWS Glue service support.

The *Job* is marked as `INAPPLICABLE` for ambiguous version `3`. Current AWS guidance says newly created jobs with `PythonVersion: "3"` use Python 3.9; this does not establish the runtime of retained job definitions carrying `3`. The policy therefore does not treat `3` as either expired Python 3.6 or confirmed Python 3.9. The current JobCommand API pattern permits `2`, `3`, and `3.9`; a literal `3.6` is not a documented API encoding, but is recognized as unsupported if explicitly collected. Python shell 3.6 detection remains incomplete for definitions carrying only `3`.

The *Job* is marked as `INAPPLICABLE` for `glueetl`, `gluestreaming`, and `glueray`, before its Python version is inspected. Missing or unrecognized commands and missing Python shell runtime values are `UNDETERMINED`. Deleted jobs are `DISAPPEARED`.
