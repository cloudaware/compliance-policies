# Remediation

## Rotate IAM SSH Public Key

Rotate IAM SSH public keys that have exceeded the recommended rotation period by creating a new key, updating dependent configurations, and removing the outdated key.

### **From Command Line**

1. **Generate and upload a new SSH public key**

   Run the `upload-ssh-public-key` command to upload the new SSH public key (PEM or SSH-RSA format) for the specified IAM user:

   ```sh
   aws iam upload-ssh-public-key \
       --region {{region}} \
       --user-name {{user-name}} \
       --ssh-public-key-body file://{{sshkey.pub}}
       --query SSHPublicKey.SSHPublicKeyId
   ```

   Note the **SSH Public Key ID** returned by this command. It will be required in subsequent steps.

2. **Update AWS CodeCommit SSH configuration**

   Replace the existing SSH Key ID in your CodeCommit SSH configuration with the newly generated key ID, then validate access to your repositories.

   Example configuration:

   ```txt
   Host git-codecommit.*.amazonaws.com
       User {{ssh-key-id}}
       IdentityFile {{private-key-file}}
   ```

3. **Deactivate the old SSH public key**

   Deactivate the previous SSH public key:

   ```sh
   aws iam update-ssh-public-key \
       --region {{region}} \
       --user-name {{user-name}} \
       --ssh-public-key-id {{old-key-id}} \
       --status Inactive
   ```

4. **Delete the old SSH public key**

   After confirming that the new key is working as expected, permanently remove the old key:

   ```sh
   aws iam delete-ssh-public-key \
       --region {{region}} \
       --user-name {{user-name}} \
       --ssh-public-key-id {{old-key-id}}
   ```
