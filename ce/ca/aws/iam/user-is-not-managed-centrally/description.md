# Description

In multi-account environments, IAM user centralization facilitates greater user control. User access beyond the initial account is then provided via role assumption. Centralization of users can be accomplished through federation with an external identity provider or through the use of AWS Organizations.

## Rationale

Centralizing IAM user management to a single identity store reduces complexity and thus the likelihood of access management errors.

## Audit

For multi-account AWS environments with an external identity provider:

1. Determine the master account for identity federation or IAM user management.
2. Login to that account through the AWS Management Console.
3. Click `Services`.
4. Click `IAM`.
5. Click `Identity providers`.
6. Verify the configuration.

For multi-account AWS environments with an external identity provider, as well as for
those implementing AWS Organizations without an external identity provider:

1. Determine all accounts that should not have local users present.
2. Log into the AWS Management Console.
3. Switch role into each identified account.
4. Click `Services`.
5. Click `IAM`.
6. Click `Users`.
7. Confirm that no IAM users representing individuals are present.
