# AWS ACM Certificate Expired

Ensure that all the expired Secure Sockets Layer/Transport Layer Security (SSL/TLS) certificates managed by AWS Certificate Manager are removed in order to adhere to Amazon Security Best Practices. Certificate Manager is the AWS service that lets you easily provision, manage, and deploy SSL/TLS certificates for use with other Amazon services such as Elastic Load Balancing and CloudFront.

Removing expired AWS ACM certificates eliminates the risk that an invalid SSL/TLS certificate will be deployed accidentally to another resource such as Elastic Load Balancing (ELB), action that can trigger front-end errors and damage the credibility of the web application/website behind the ELB.

This policy will mark object as `INCOMPLIANT` if the `Status` is `EXPIRED`.

Empty `Status` indicates that there is a possible permission issue with `acm:DescribeCertificate` API call and the object will be marked as `UNDETERMINED`.
