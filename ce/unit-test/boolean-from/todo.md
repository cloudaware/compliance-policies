# TODO

Currently `undeterminedIf.isEmpty` is a required property for this operation.
This means that for the use case where specific value is considered `true` and anything else, including `''` considered false,
instead of producing `false` for `''` we will emit `UNDETERMINED`

This is possibly an unwanted behaviour, and we should switch `undeterminedIf.isEmpty` to be optional instead of required. 