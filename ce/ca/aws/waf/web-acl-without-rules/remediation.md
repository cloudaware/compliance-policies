# Remediation

## Add Rules to the Web ACL

A Web ACL must have at least one rule or rule group to provide effective protection. If a Web ACL currently has no rules, you need to add rules to enforce security policies and filter web traffic.

**Testing and deployment:**
Before making changes in production, test them in a staging environment to understand their impact. Once you are confident, use count mode with production traffic to monitor the effect of the rules before enabling full enforcement. This approach helps prevent unintended disruptions to live traffic.

**Note:**
Using more than 1,500 WCUs in a Web ACL incurs costs beyond the basic Web ACL price.

### **From Console**

1. In the navigation pane, choose **Resources & protection packs (web ACLs)**.

2. Select the Web ACL you want to edit. The main Web ACL card will become editable, and a side pane will open with additional details you can modify.

3. Add or remove rules as needed, or make other configuration changes. While updating a Web ACL, AWS WAF continues to provide coverage to the resources associated with it.

4. For production traffic, first test your changes in a staging or testing environment. Then, apply count mode to monitor the impact on live traffic before enabling full enforcement.
