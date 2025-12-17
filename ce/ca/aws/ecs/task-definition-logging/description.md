# Description

This policy identifies AWS ECS Task Definitions in which container definitions do not include a `logConfiguration`, specifically where a `logDriver` is not specified.

Without a proper log configuration, container logs (stdout/stderr) may be lost or only accessible through ephemeral methods, such as `docker logs` on the host, if accessible.

## Rationale

Application logs are essential for diagnosing errors, monitoring performance, and supporting post-incident analysis. They provide a historical record of application activity and are critical for compliance and auditing purposes.

Proper log configuration allows log streams to be analyzed in real time (e.g., using **CloudWatch Logs Metric Filters**) to detect error patterns and trigger alerts.

The `awslogs` driver is commonly used to send logs to Amazon CloudWatch Logs. Other supported drivers, such as Splunk or Fluentd, are also valid.

## Audit

This policy marks an *AWS ECS Task Definition* as `INCOMPLIANT` if any associated *AWS ECS Container Definition* does not include a **Log Configuration Driver**.

Inactive Task Definitions are marked as `INAPPLICABLE`.
