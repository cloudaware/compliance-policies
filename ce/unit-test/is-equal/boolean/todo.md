# TODO

Currently `false != null` and at the same time `true != null`.

In case of Salesforce field values, only Checkbox fields return Boolean values. 
And they do not return `null` as value, if the checkbox is unchecked the values is going to be `false`.
But in general and for future proofing, maybe current approach is not the best.

- [ ] Investigate whether moving from `false != null` to `false == null` is better. 