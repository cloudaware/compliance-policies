# Remediation

Perform the following to implement the prescribed state:

1. Login to the AWS Management Console at <https://console.aws.amazon.com/vpc/home>.
2. In the left pane, click `Security Groups`.
3. For each security group, perform the following:

- Select the security group.
- Click the `Inbound Rules` tab.
- Click the `Edit inbound rules` button.
- Identify the rules to be edited or removed.
- Either:
  - A. update the Source field to a range other than ::/0, or,
  - B. Click `Delete` to remove the offending inbound rule.

- Click `Save rules`.
