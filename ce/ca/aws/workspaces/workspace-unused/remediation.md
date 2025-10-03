# Remediation

Terminate unused AWS WorkSpaces to reduce costs and minimize security risks. Before proceeding, ensure that any important data is backed up, as termination is irreversible.

## Terminate a WorkSpace

### **Warning**

Terminating a WorkSpace is a permanent action. All associated user data will be destroyed and cannot be recovered. To safeguard important information, ensure user data is backed up prior to termination. For help with backing up user data, contact AWS Support.

### **From AWS CLI**

```sh
aws workspaces terminate-workspaces \
    --terminate-workspace-requests {{workspace-ids}}
```
