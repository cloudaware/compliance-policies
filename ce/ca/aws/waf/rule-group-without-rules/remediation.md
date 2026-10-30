# Remediation

## Add Rules to the Rule Group

A rule group must contain at least one rule to inspect or filter requests. If the rule group is empty, add rules that define how AWS WAF evaluates requests and applies actions.

Before applying changes to rule groups that are currently in use, validate changes in a staging environment. Then test the updated rules in count mode against production traffic before enforcing actions.

## **From Console**

1. Select the rule group you want to edit.
If the rule group is not visible, check the **Region** setting. For rule groups used with **Amazon CloudFront**, select the **Global (CloudFront)** Region.
2. On the rule group page, choose **Edit** to modify its configuration.
3. Add one or more rules with match conditions such as IP sets, string matches, or rate-based filters, and specify the desired action (Allow, Block, or Count).
4. Save the configuration. The console applies your updates to any Web ACLs using the rule group.
5. If you rename a rule and want the metric name to reflect the change, update the **metric name** manually in the rule JSON editor. AWS WAF does not automatically synchronize metric names with rule names.
