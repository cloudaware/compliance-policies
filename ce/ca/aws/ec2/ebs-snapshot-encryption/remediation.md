# Remediation

## Encrypt existing EBS Snapshot

### **From Console**

1. Sign in to the AWS Management Console.
2. Navigate to the **Amazon EC2** dashboard.
3. In the left navigation pane, under **Elastic Block Store**, choose **Snapshots**.
4. Select the unencrypted EBS snapshot to be encrypted.
5. Choose **Actions** from the top menu and select **Copy snapshot**.
6. In the **Copy snapshot** dialog, perform the following:

   - Select the **Destination Region** where the encrypted copy will be created.
   - (Optional) Update the snapshot **Description**.
   - Select **Encrypt this snapshot**.
   - Choose the KMS key to use for encryption.

     - If no customer-managed KMS keys are available, select the default key **(default) aws/ebs**.
   - Choose **Copy snapshot** to start the encryption process.
7. Once the encrypted snapshot copy is created, verify its status on the **Snapshots** page.
8. After confirming the encrypted snapshot is available, delete the original unencrypted snapshot:

   - Select the unencrypted snapshot.
   - Choose **Actions** → **Delete snapshot**.
   - Confirm the deletion.
9. Repeat Steps 4–8 for all unencrypted EBS snapshots in the current AWS Region.
10. Switch AWS Regions and repeat the remediation process as needed.

### **From Command Line**

1. Use the `copy-snapshot` command (OSX/Linux/UNIX) to create an encrypted copy of an unencrypted EBS snapshot:

    ```sh
    aws ec2 copy-snapshot \
        --region {{us-east-1}} \
        --source-region {{us-east-1}} \
        --source-snapshot-id {{unencrypted-snapshot-id}} \
        --description "Encrypted copy of EBS snapshot" \
        --encrypted
    ```

2. After verifying that the encrypted snapshot has been successfully created, delete the original unencrypted snapshot:

    ```sh
    aws ec2 delete-snapshot \
        --region {{us-east-1}} \
        --snapshot-id {{unencrypted-snapshot-id}}
    ```
