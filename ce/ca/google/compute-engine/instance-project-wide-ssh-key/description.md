# Description

It is recommended to use instance-specific SSH keys instead of common or shared project-wide SSH keys to access instances.

## Rationale

Project-wide SSH keys are stored in Compute project metadata. Project-wide SSH keys can be used to log in to all instances within a project. Using project-wide SSH keys eases SSH key management, but if compromised, it poses a security risk that can impact all instances within the project. It is recommended to use instance-specific SSH keys to limit the attack surface if SSH keys are compromised.

## Impact

Users who already have project-wide SSH key pairs and use third-party SSH clients will lose access to affected instances. For project users using gcloud or the GCP Console-based SSH option, no manual key creation and distribution is required and will be handled by GCE (Google Compute Engine). To access instances using third-party SSH clients, instance-specific SSH key pairs need to be created and distributed to the required users.

## Audit

### From Google Cloud Console

1. Go to the `VM instances` page by visiting <https://console.cloud.google.com/compute/instances>. It will list all the instances in your project.
2. For each instance, click the instance name.
3. Under `SSH Keys`, ensure `Block project-wide SSH keys` is selected.

### From Google Cloud CLI

1. List the instances in your project and get details on each instance:

    ```sh
    gcloud compute instances list \
        --format=json
    ```

2. Ensure `key: block-project-ssh-keys` is set to `value: 'true'`.

## Default Value

By default, `Block Project-wide SSH keys` is not enabled.

## References

1. <https://cloud.google.com/compute/docs/instances/adding-removing-ssh-keys>
2. <https://cloud.google.com/sdk/gcloud/reference/topic/formats>

## Additional Information

If OS Login is enabled, SSH keys in instance metadata are ignored, and therefore blocking project-wide SSH keys is not necessary.
