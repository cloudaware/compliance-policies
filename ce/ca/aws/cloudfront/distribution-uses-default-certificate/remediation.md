# Remediation

## From Console

### Prerequisites

Before updating your CloudFront distribution to include an alternate domain name, complete the following:

- Register the desired domain name with Amazon Route 53 or a third‑party registrar.
- Get a valid TLS certificate from an approved Certificate Authority (CA) that covers your domain. Add the certificate to your distribution to validate that you are authorized to use the domain.

### Add an Alternate Domain Name

1. Select your domain in the AWS Console and click **Add Domain** on the **General** tab.
2. Enter up to five alternate domain names (CNAMEs).
3. Under TLS Certificate, choose an existing ACM certificate or automatically or manually create a new certificate in ACM.
4. Validate certificate ownership:
    - Update your DNS provider’s records with the CNAME entries displayed in the CloudFront console to demonstrate domain ownership.
    - click **Validate Certificate** in the console.
5. Upon successful validation, click Next, review your configuration, and then choose **Add Domains**.

### DNS Routing

1. In your DNS service (Route 53 or other), create an alias or CNAME record that points your alternate domain (e.g., <www.example.com>) to the CloudFront distribution domain name (e.g., d111111abcdef8.cloudfront.net).

2. Use a DNS lookup tool (e.g., `dig`) to confirm your alternate domain resolves to the CloudFront distribution’s domain name.
