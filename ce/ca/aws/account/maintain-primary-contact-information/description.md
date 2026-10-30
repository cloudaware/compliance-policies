# Description

Ensure contact email and telephone details for AWS accounts are current and map to
more than one individual in your organization.

An AWS account supports a number of contact details, and AWS will use these to
contact the account owner if activity judged to be in breach of the Acceptable Use Policy
or indicative of a likely security compromise is observed by the AWS Abuse team.
Contact details should not be for a single individual, as circumstances may arise where
that individual is unavailable. Email contact details should point to a mail alias which
forwards email to multiple individuals within the organization; where feasible, phone
contact details should point to a PABX hunt group or other call-forwarding system.

## Rationale

If an AWS account is observed to be behaving in a prohibited or suspicious manner,
AWS will attempt to contact the account owner by email and phone using the contact
details listed. If this is unsuccessful and the account behavior needs urgent mitigation,
proactive measures may be taken, including throttling of traffic between the account
exhibiting suspicious behavior and the AWS API endpoints and the Internet. This will
result in impaired service to and from the account in question, so it is in both the
customers' and AWS's best interests that prompt contact can be established. This is
best achieved by setting AWS account contact details to point to resources which have
multiple individuals as recipients, such as email aliases and PABX hunt groups.

## Audit

Verify the current contact information using the AWS account API. The principal must have permission to read and write billing contact information (`aws-portal:*Billing`).

### From Command Line

Run the following command:

```sh
aws account get-contact-information
```

## References

1. <https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/manage-account-payment.html#contact-info>
