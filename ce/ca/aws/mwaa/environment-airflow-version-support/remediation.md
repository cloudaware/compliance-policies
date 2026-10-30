# Remediation

1. **Confirm the current version and status.**

   Check **Status** and **Airflow Version** in the MWAA console or run:

   ```sh
   aws mwaa get-environment \
     --name ENVIRONMENT_NAME \
     --region REGION \
     --query 'Environment.{Status:Status,AirflowVersion:AirflowVersion}'
   ```

   Wait for any update or rollback to finish. If the status is `UPDATE_FAILED`, investigate the
   previous failure before retrying.

2. **Choose a supported target release.**

   Select an exact release supported by Amazon MWAA and available in the environment's AWS Region.
   Review the release notes, AWS Health notices, and any required intermediate upgrade steps. The
   target need not be the latest release.

3. **Test compatibility and prepare for recovery.**

   Test DAGs, provider packages, plugins, configuration, startup scripts, and Python dependencies
   using the matching MWAA local runner. Update the `requirements.txt` constraint URL for the target
   Airflow and Python versions. Back up workflow resources, configuration, and metadata, and retain
   the previous S3 object versions.

   **Version changes terminate running tasks and can make the environment unavailable for up to
   two hours.** Schedule a maintenance window and allow running tasks to finish before upgrading.

4. **Upgrade or migrate the environment.**

   **Within the same major version:** For a supported in-place upgrade, upload the tested workflow
   resources to S3. In the MWAA console, open **Environments**, select the environment, and choose
   **Edit**. Select the target **Airflow version** and the tested dependency and plugin object
   versions, then review and save.

   **Between major versions:** For a change such as Airflow 1 to 2 or 2 to 3, create a replacement
   environment using the AWS migration guide. MWAA does not support in-place major-version upgrades.
   Recreate connections, variables, permissions, and integrations, and migrate compatible metadata.
   Validate the replacement before cutover.

   **Pause schedules on the original environment before enabling them on the replacement to prevent
   duplicate workflow execution.** Retain the original environment until recovery and cutover checks
   are complete.

5. **Verify the result.**

   Wait for `AVAILABLE`, confirm **Airflow Version**, and validate DAG parsing, schedules, task
   execution, integrations, logs, and alerting. Refresh Cloudaware inventory and confirm that the
   finding is resolved.

   If an in-place upgrade fails, AWS attempts to restore the previous environment and requirements.
   Investigate `UPDATE_FAILED` or `UNAVAILABLE` before retrying. If a replacement cutover fails, pause
   the replacement's schedules before restoring workflow execution on the original environment.
   Returning to an unsupported version does not resolve the finding.
