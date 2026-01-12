# Remediation

## Enable HTTP-to-HTTPS Redirection

Configure the Application Load Balancer to redirect all HTTP traffic to HTTPS (port 443). This can be achieved either by modifying the HTTP listener’s default action or by adding a high-priority listener rule.

An HTTPS listener on port 443 must already exist on your load balancer, configured with a valid SSL/TLS certificate

> **Note:** Apply these changes only to the **HTTP (port 80)** listener.

## Option 1: Modify the Listener Default Action (Recommended)

This approach changes the default behavior of the HTTP listener so that all requests are permanently redirected (HTTP 301) to HTTPS. Use this when the HTTP listener's sole purpose is redirection

### **From Command Line**

```sh
aws elbv2 modify-listener \
    --listener-arn {{listener-arn}} \
    --default-actions '[
        {
            "Type": "redirect",
            "RedirectConfig": {
                "Protocol": "HTTPS",
                "Port": "443",
                "StatusCode": "HTTP_301"
            }
        }
    ]'
```

> **Important**: The `modify-listener` command requires you to provide the entire new list of default actions, which will completely replace the existing ones

## Option 2: Add a High-Priority Listener Rule

Use this option if you must preserve the HTTP listener's existing default action (e.g., for legacy API endpoints, health checks, or other specific routing logic). Rules are evaluated in priority order (lowest number first), so a rule with priority 1 will be evaluated before any other existing rules

### **From Command Line**

```sh
aws elbv2 create-rule \
    --listener-arn {{listener-arn}} \
    --priority 1 \
    --conditions '[
        {
            "Field": "path-pattern",
            "Values": ["/*"]
        }
    ]' \
    --actions '[
        {
            "Type": "redirect",
            "RedirectConfig": {
                "Protocol": "HTTPS",
                "Port": "443",
                "StatusCode": "HTTP_301"
            }
        }
    ]'
```
