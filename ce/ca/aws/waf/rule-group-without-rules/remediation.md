# Remediation

## Add Rules to the Rule Group

A rule group must contain at least one rule to filter or inspect web requests. If a rule group is empty, add rules that define how AWS WAF should evaluate and act on incoming requests.

Before applying changes to rule groups that are currently in use, test and tune the configuration in a staging or testing environment to evaluate its impact. Then, test the updated rules in count mode with production traffic before enabling them to enforce actions.

## **From Console**

1. Select the rule group you want to edit.

   - If the rule group is not visible, check the **Region** setting.
   - For rule groups used with **Amazon CloudFront**, select the **Global (CloudFront)** Region.
2. On the rule group page, choose **Edit** to modify its configuration.
3. Add one or more rules defining match conditions such as IP sets, string matches, or rate-based filters, and specify the desired action (Allow, Block, or Count).
4. Save the configuration. The console automatically applies your updates to any web ACLs using the rule group.
5. If you rename a rule and want the metric name to reflect the change, update the **metric name** manually in the rule’s JSON editor. AWS WAF does not automatically synchronize metric names with rule names.
