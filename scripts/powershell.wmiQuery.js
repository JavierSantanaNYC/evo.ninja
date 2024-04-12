return __wrap_subinvoke(
    "plugin/child_process",
    "runCommand",
    {command: `Get-WmiObject -Class ${className}` }
  ).value;