# Description

The AWS support portal allows account owners to establish security questions that can
be used to authenticate individuals calling AWS customer service for support. It is
recommended that security questions be established.

## Rationale

When creating a new AWS account, a default super user is automatically created. This
account is referred to as the 'root user' or 'root' account. It is recommended that the use
of this account be limited and highly controlled. During events in which the 'root'
password is no longer accessible or the MFA token associated with 'root' is
lost/destroyed it is possible, through authentication using secret questions and
associated answers, to recover 'root' user login access.

## Audit

### From Console

1. Login to the AWS account as the root user.
2. On the top right you will see the `Root_Account_Name`.
3. Click on the `Root_Account_Name`.
4. From the drop-down menu Click `My Account`.
5. In the `Configure Security Challenge Questions` section on the `Personal Information` page, configure three security challenge questions.
6. Click `Save questions`.
