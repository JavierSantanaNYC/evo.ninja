return __wrap_subinvoke(
    "plugin/child_process",
    "runCommand",
    {command: `ping ${endpoint} -n 10` }
  ).value;