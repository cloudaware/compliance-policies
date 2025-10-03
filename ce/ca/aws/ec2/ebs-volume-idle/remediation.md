# Remediation

The remediation process depends on whether the idle EBS volume is **unattached** or **attached but inactive**. In all cases, the goal is to confirm the volume is no longer needed, archive data if required, and then securely remove the volume to avoid unnecessary costs.

## Unattached and Idle Volume

### From Command Line

#### **Create a Final Snapshot (Recommended)**

Snapshots provide a cost-effective way to retain the volume data before deletion.

```bash
aws ec2 create-snapshot \
  --volume-id {{volume-id}} \
  --description "{{Archival of idle EBS volume}}" \
```

#### **Delete the Volume**

Once the snapshot status is `completed`, the volume can be safely deleted:

```bash
aws ec2 delete-volume --volume-id {{volume-id}}
```

## Attached but Idle Volume

If the volume is in the **"in-use"** state but shows no I/O activity, further investigation is required before taking action.

Consult with the application or resource owner to confirm whether the volume is still required.

### From Command Line

#### **Detach the Volume**

If confirmed unnecessary, detach the volume from the instance:

```bash
aws ec2 detach-volume --volume-id {{volume-id}}
```

Wait until the volume status changes from `in-use` to `available`.

#### **Archive and Delete**

Once detached, the volume is now considered unattached. Follow the same steps outlined in **Unattached and Idle Volume** to create a snapshot and delete the volume.
