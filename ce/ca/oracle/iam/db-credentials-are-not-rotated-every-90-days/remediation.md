# Remediation

## Rotate Stale IAM Database Passwords

Create a replacement IAM database password for the affected user, update every dependent database client or access path, and delete the stale password after confirming that it is no longer required.

### From OCI Console

1. Open **Identity & Security**.
2. Select **Domains**.
3. Open the affected identity domain.
4. Open **Users** and select the affected user.
5. Open **Database Passwords**.
6. Create a replacement database password.
7. Update dependent database clients and connection configurations to use the replacement password.
8. Confirm that database authentication succeeds with the replacement password.
9. Delete database passwords older than 90 days after confirming they are no longer used.
