# Remediation

## From Google Cloud Console

### Add privileges to enable Access Transparency

1. From the Google Cloud Home, within the project you want to check, open the Navigation menu in the top left. Hover over `IAM & Admin`. Select `IAM` at the top of the column that opens.
2. Click the blue button that says `+add` at the top of the screen.
3. In the `principals` field, select a user or group by typing in their associated email address.
4. Click the `role` field to expand it. In the filter field, enter `Access Transparency Admin` and select it.
5. Click `Save`.

### Verify that the Google Cloud project is associated with a billing account

1. From the Google Cloud Home, open the Navigation menu in the top left. Select `Billing`.
2. If you see `This project is not associated with a billing account`, you will need to enter billing information or switch to a project with a billing account.

### Enable Access Transparency

1. From the Google Cloud Home, open the Navigation menu in the top left. Hover over the IAM & Admin menu. Select `settings` in the middle of the column that opens.
2. Click the blue button labeled `Enable Access Transparency for Organization`.
