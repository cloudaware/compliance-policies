# Notes

- For some reason, similar policies mention only `mysql` and `postgres` engines in the policy `audit` and `remediation` sections. However, AWS documentation tells that `AutoMinorVersionUpgrade` attribute is supported on `ALL` DB engines: [docs](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.Modifying.html#USER_ModifyInstance.Settings)

- We've modified the `ssh` commands to include all engines (see [remediation.md](remediation.md)).

- Our policy document also accepts all engines (doesn't filter any).
