# Remediation

## Create a Secure Listener for an AWS Load Balancer

### Prerequisites

Before creating a secure listener, ensure you have the following resources configured in the same AWS Region as your load balancer:

1. **A Validated SSL/TLS Certificate**: A certificate issued by **AWS Certificate Manager (ACM)** and in the **ISSUED** state.
2. **Backend Target**: An existing target group (for ALB/NLB) or registered instances (for CLB) to forward traffic to.
3. **Certificate ARN**: The Amazon Resource Name (ARN) of your certificate.
    * For **Application and Network Load Balancers**, use the certificate's **ACM ARN**.
    * For **Classic Load Balancers**, you can use the certificate's **IAM Server Certificate ARN**. You can find this in the IAM console or via the AWS CLI (`aws iam list-server-certificates`).

### Create a Secure Listener

Use the appropriate command based on the load balancer type.

#### **Application Load Balancer**

```sh
aws elbv2 create-listener \
    --load-balancer-arn {{load-balancer-arn}} \
    --protocol HTTPS \
    --port 443 \
    --certificates CertificateArn={{certificate-arn}} \
    --ssl-policy ELBSecurityPolicy-TLS13-1-3-2021-06 \
    --default-actions Type=forward,TargetGroupArn={{existing-target-group-arn}}
```

The `--ssl-policy` parameter enforces a current, secure TLS configuration.

---

#### **Network Load Balancer**

```sh
aws elbv2 create-listener \
    --load-balancer-arn {{load-balancer-arn}} \
    --protocol TLS \
    --port 443 \
    --certificates CertificateArn={{certificate-arn}} \
    --ssl-policy ELBSecurityPolicy-TLS13-1-3-2021-06 \
    --default-actions Type=forward,TargetGroupArn={{existing-target-group-arn}}
```

---

#### **Classic Load Balancer**

Creating a secure listener for a Classic Load Balancer is a two-step process. First, create the listener, then create and attach a specific security policy.

1. **Create the HTTPS Listener**

    Use the following command to create the listener with your certificate. Note that the `--listeners` argument must be a single, quoted string.

    ```sh
    aws elb create-load-balancer-listeners \
        --load-balancer-name {{load-balancer-name}} \
        --listeners "Protocol=HTTPS,LoadBalancerPort=443,InstanceProtocol=HTTP,InstancePort=80,SSLCertificateId={{certificate-arn}}"
    ```

2. **Create and Attach the Security Policy**

    This step creates an SSL negotiation policy using the predefined `ELBSecurityPolicy-TLS-1-2-2017-01` and applies it to the listener on port 443 to replace `ELBSecurityPolicy-2016-08`.

    ```sh
    # Create the policy referencing the predefined one
    aws elb create-load-balancer-policy \
        --load-balancer-name {{load-balancer-name}} \
        --policy-name my-SSLNegotiation-policy \
        --policy-type-name SSLNegotiationPolicyType \
        --policy-attributes AttributeName=Reference-Security-Policy,AttributeValue=ELBSecurityPolicy-TLS-1-2-2017-01

    # Attach the new policy to the listener on port 443
    aws elb set-load-balancer-policies-of-listener \
        --load-balancer-name {{load-balancer-name}} \
        --load-balancer-port 443 \
        --policy-names my-SSLNegotiation-policy
    ```
