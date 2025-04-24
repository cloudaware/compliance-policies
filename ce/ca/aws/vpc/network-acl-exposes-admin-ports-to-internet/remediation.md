# Remediation

## From Console

Perform the following:

1. Login to the AWS Management Console at <https://console.aws.amazon.com/vpc/home>.
2. In the left pane, click `Network ACLs`.
3. For each network ACL to remediate, perform the following:
   - Select the network ACL.
   - Click the `Inbound Rules` tab.
   - Click `Edit inbound rules`.
   - Either:
     - A. update the Source field to a range other than 0.0.0.0/0, or,
     - B. Click `Delete` to remove the offending inbound rule.
   - Click `Save`.
