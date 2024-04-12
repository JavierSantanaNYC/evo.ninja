return __wrap_subinvoke(
    "plugin/child_process",
    "runCommand",
    {command: `tracert -d ${endpoint}` }
  ).value;