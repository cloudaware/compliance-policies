# Remediation

## Enable Managed Platform Updates for the Elastic Beanstalk Environment

Managed platform updates allow Elastic Beanstalk to automatically apply platform updates during a defined maintenance window using an immutable deployment strategy, helping ensure availability and safe rollback in the event of a failure.

### **From Command Line**

Run the `update-environment` command to enable managed platform updates and configure the maintenance window and update behavior for the selected environment:

```sh
aws elasticbeanstalk update-environment \
    --region {{region-name}} \
    --environment-name {{environment-name}} \
    --option-settings \
        Namespace=aws:elasticbeanstalk:managedactions,OptionName=ManagedActionsEnabled,Value=true \
        Namespace=aws:elasticbeanstalk:managedactions,OptionName=PreferredStartTime,Value={{day:hour:minute}} \
        Namespace=aws:elasticbeanstalk:managedactions,OptionName=ServiceRoleForManagedUpdates,Value={{service-role}} \
        Namespace=aws:elasticbeanstalk:managedactions:platformupdate,OptionName=UpdateLevel,Value={{major | minor | patch}} \
        Namespace=aws:elasticbeanstalk:managedactions:platformupdate,OptionName=InstanceRefreshEnabled,Value={{true | false}}
```

#### Considerations

- `PreferredStartTime` defines the weekly maintenance window in the format `DAY:HH:MM` (UTC). For example, `Tue:09:00`.
- `ServiceRoleForManagedUpdates` must reference an IAM role with the required permissions for Elastic Beanstalk managed actions. You can use either the same role that you specified for the `ServiceRole` option of the `aws:elasticbeanstalk:environment` namespace, or your account's managed updates service-linked role.
- `UpdateLevel` controls the scope of platform updates applied (major, minor, or patch).
- `InstanceRefreshEnabled` determines whether weekly instance replacement is enabled.
