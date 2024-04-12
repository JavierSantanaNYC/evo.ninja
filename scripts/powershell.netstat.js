return __wrap_subinvoke(
    "plugin/child_process",
    "runCommand",
    {command: `netstat -ano` }
  ).value;