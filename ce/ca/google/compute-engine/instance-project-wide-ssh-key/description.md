# Description

It is recommended to use Instance specific SSH key(s) instead of using common/shared project-wide SSH key(s) to access Instances.

## Rationale

Project-wide SSH keys are stored in Compute/Project-meta-data. Project wide SSH keys can be used to login into all the instances within project. Using project-wide SSH keys eases the SSH key management but if compromised, poses the security risk which can impact all the instances within project. It is recommended to use Instance specific SSH keys which can limit the attack surface if the SSH keys are compromised.

## Impact

Users already having Project-wide ssh key pairs and using third party SSH clients will lose access to the impacted Instances. For Project users using gcloud or GCP Console based SSH option, no manual key creation and distribution is required and will be handled by GCE (Google Compute Engine) itself. To access Instance using third party SSH clients Instance specific SSH key pairs need to be created and distributed to the required users.

## Audit

### From Google Cloud Console

1. Go to the `VM instances` page by visiting <https://console.cloud.google.com/compute/instances>. It will list all the instances in your project.
2. For every instance, click on the name of the instance.
3. Under `SSH Keys`, ensure `Block project-wide SSH keys` is selected.

### From Google Cloud CLI

1. List the instances in your project and get details on each instance:

            gcloud compute instances list --format=json

2. Ensure `key: block-project-ssh-keys` is set to `value: 'true'`.

## Default Value

By Default `Block Project-wide SSH keys` is not enabled.

## References

1. <https://cloud.google.com/compute/docs/instances/adding-removing-ssh-keys>
2. <https://cloud.google.com/sdk/gcloud/reference/topic/formats>

## Additional Information

If OS Login is enabled, SSH keys in instance metadata are ignored, and therefore blocking project-wide SSH keys is not necessary.
