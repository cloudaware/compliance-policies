# Remediation

## Move Azure Database for MySQL Server to Another Region with Geo-Redundant Restore

### **Workflow Summary**

1. Ensure geo-redundancy is enabled on the source server.
2. In the `Azure portal`, navigate to the source server's `Overview` page.
3. Select `Restore` and choose the `Geo-redundant restore` option.
4. Provide a new server name and configure networking settings as needed.
5. Review the configuration and initiate the restore process.
6. Once the restore is complete, verify the new server's functionality.
7. If desired, delete the source server to avoid unnecessary charges.

### **1. Ensure Geo-Redundancy is Enabled**

- Verify that geo-redundancy is enabled on the source server. This can be done by checking the server's backup configuration in the Azure portal.
- If geo-redundancy is not enabled, you may need to enable it and wait for the configuration to take effect. Note that for Zone-redundant High Availability servers, geo-redundancy can only be enabled during server creation.

### **2. Navigate to the Source Server's Overview Page**

- In the Azure portal, go to `Azure Database for MySQL Flexible Server`.
- Select the source server that you wish to move to another region.
- Click on the `Overview` tab to access the server's details.

### **3. Initiate the Restore Process**

- On the `Overview` page, click on the `Restore` button.
- In the restore options, select the `Geo-redundant restore` checkbox. This option is available if your server has geo-redundant backups enabled.

### **4. Configure the New Server**

- Enter a new server name for the restored instance.
- Configure networking settings, such as virtual network integration and firewall rules, as needed for the new region.
- Review other settings to ensure they align with your requirements.

### **5. Review and Initiate the Restore**

- Click on `Review + Create` to review your selections.
- After reviewing, click on `Create` to initiate the restore process.
- The restore operation will create a new server in the geo-paired region with the same data as the source server.

### **6. Verify the New Server's Functionality**

- Once the restore is complete, navigate to the new server's `Overview` page.
- Verify that the server is operational and that all databases are intact.
- Test connectivity and application functionality to ensure a successful migration.

### **7. Clean Up the Source Server (Optional)**

- If you no longer need the source server, you can delete it to avoid unnecessary charges.
- To delete the source server, go to its `Overview` page, click on `Delete`, and follow the prompts to confirm the deletion.

### **Considerations:**

- The `Geo-redundant restore` option restores the server to the latest UTC timestamp, so point-in-time restore options cannot be selected simultaneously.
- The new server created by geo-restore has the same server admin sign-in name and password that were valid for the existing server at the time the restore was initiated.
- During the restore process, networking settings such as virtual network settings and firewall rules can be configured as described in the Azure portal.
