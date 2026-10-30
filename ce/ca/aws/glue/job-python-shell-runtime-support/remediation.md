# Remediation

## Migrate the Python shell job to a supported runtime

1. **Confirm the job owner**, triggers, schedules, data sources, downstream dependencies, Python
   runtime, and whether the definition is still needed. Retire an obsolete job through the
   organization's normal change process.

2. **Review** the current [AWS Glue support
   policy](https://docs.aws.amazon.com/glue/latest/dg/glue-version-support-policy.html) and [Python
   shell migration guidance](https://docs.aws.amazon.com/glue/latest/dg/add-job-python.html). Select
   a supported runtime compatible with the workload; Python shell 3.9 is the reviewed migration
   target.

   Changing `GlueVersion` alone does not migrate a Python shell runtime.

3. **Preserve the complete job configuration**, script, dependencies, and trigger configuration.
   Create a separate test job with the target Python version, compatible dependencies, IAM
   permissions, connections, security configuration, and capacity.

   Avoid overlapping production writes while testing. Coordinate scheduled and external invocations,
   and allow in-flight runs to finish before cutover.

4. **Update Python 2 syntax and behavior for Python 3**, including string/bytes handling, division,
   imports, and dependency versions. Python shell 3.9 requires compatible `.whl` packages instead of
   `.egg` packages. Review the common analytics library set and pin compatible dependency versions.

   Validate representative inputs, output correctness, retries, logging, performance, and downstream
   consumers.

5. **In the AWS Glue console**, open the production job, choose **Job details**, set the **Python
   version** to the tested supported version, and save it during the planned change window. Set
   `Command.PythonVersion` explicitly to `3.9` when using that target.

   If using [UpdateJob](https://docs.aws.amazon.com/glue/latest/webapi/API_UpdateJob.html),
   construct a complete `JobUpdate` from the supported existing settings: **AWS overwrites the
   previous job definition.** Preserve the role, command name and script location, arguments,
   connections, security configuration, capacity, timeout, retries, and other applicable settings; a
   runtime-only update can discard configuration.

   Prefer updating the existing infrastructure-as-code definition when it owns the job.

6. **Run and monitor the migrated workload**. Confirm successful output and the collected Python
   version, then reevaluate this policy.

   Retain a tested recovery plan on a supported runtime
   because EOL runtimes cannot be assumed available for rollback.
