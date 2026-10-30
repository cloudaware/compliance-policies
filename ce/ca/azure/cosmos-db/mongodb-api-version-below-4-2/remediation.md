# Remediation

Treat this finding as a planned migration, not an in-place account update. The
appropriate migration method depends on the application, data volume, availability
requirements, and target account configuration.

## Plan and execute the migration

1. Confirm the account uses MongoDB API version `3.2`, `3.6`, or `4.0` and identify
   the applications, drivers, queries, indexes, integrations, and data dependencies
   that use it.
2. Define an approved target version and create a separate Azure Cosmos DB account
   with equivalent network, backup, availability, encryption, monitoring, and access
   controls.
3. Migrate representative data and validate application behavior, data integrity,
   performance, and cost in a non-production environment.
4. Prepare a production cutover plan with an approved maintenance window,
   communications, monitoring, and a tested rollback procedure.
5. Migrate production data and cut over application traffic only after validation
   succeeds. Retain the source account until the rollback window closes.

## Cost and operational safeguards

- Estimate the cost of running both accounts during migration and include it in the
  approval decision.
- Preserve required networking, access controls, backups, observability, and
  availability settings on the target account before migration.
- Do not decommission the source account until data integrity, application health,
  and post-cutover cost are verified.
