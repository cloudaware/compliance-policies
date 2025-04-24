# Description

GCP Access Approval enables you to require your organizations' explicit approval whenever Google support try to access your projects. You can then select users within your organization who can approve these requests through giving them a security role in IAM. All access requests display which Google Employee requested them in an email or Pub/Sub message that you can choose to Approve. This adds an additional control and logging of who in your organization approved/denied these requests.

## Rationale

Controlling access to your information is one of the foundations of information security. Google Employees do have access to your organizations' projects for support reasons. With Access Approval, organizations can then be certain that their information is accessed by only approved Google Personnel.

## Impact

To use Access Approval your organization will need have enabled Access Transparency and have at one of the following support level: Enhanced or Premium. There will be subscription costs associated with these support levels, as well as increased storage costs for storing the logs. You will also not be able to turn the Access Transparency which Access Approval depends on, off yourself. To do so you will need to submit a service request to Google Cloud Support. There will also be additional overhead in managing user permissions. There may also be a potential delay in support times as Google Personnel will have to wait for their access to be approved.

## Audit

### From Google Cloud Console

#### Determine if Access Transparency is Enabled as it is a Dependency

1. From the Google Cloud Home inside the project you wish to audit, click on the Navigation hamburger menu in the top left. Hover over the `IAM & Admin` Menu. Select `settings` in the middle of the column that opens.
2. The status should be `Enabled` under the heading `Access Transparency`

#### Determine if Access Approval is Enabled

1. From the Google Cloud Home, within the project you wish to check, click on the Navigation hamburger menu in the top left. Hover over the `Security` Menu. Select `Access Approval` in the middle of the column that opens.
2. The status will be displayed here. If you see a screen saying you need to enroll in Access Approval, it is not enabled.

### From Google Cloud CLI

#### Determine if Access Approval is Enabled

1. From within the project you wish to audit, run the following command.

            gcloud access-approval settings get

2. The status will be displayed in the output.

IF Access Approval is not enabled you should get this output:

            API [accessapproval.googleapis.com] not enabled on project [-----]. Would you like to enable and retry (this will take a few minutes)? (y/N)?

After entering `Y` if you get the following output, it means that `Access Transparency` is not enabled:

            ERROR: (gcloud.access-approval.settings.get) FAILED_PRECONDITION: Precondition check failed.

## Default Value

By default Access Approval and its dependency of Access Transparency are not enabled.

## References

1. <https://cloud.google.com/cloud-provider-access-management/access-approval/docs>
2. <https://cloud.google.com/cloud-provider-access-management/access-approval/docs/overview>
3. <https://cloud.google.com/cloud-provider-access-management/access-approval/docs/quickstart-custom-key>
4. <https://cloud.google.com/cloud-provider-access-management/access-approval/docs/supported-services>
5. <https://cloud.google.com/cloud-provider-access-management/access-approval/docs/view-historical-requests>

## Additional Information

The recipients of Access Requests will also need to be logged into a Google Cloud account associated with an email address in this list. To approve requests they can click approve within the email. Or they can view requests at the the Access Approval page within the Security submenu.
