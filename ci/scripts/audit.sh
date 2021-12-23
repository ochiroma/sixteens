#!/bin/bash -eux

pushd sixteens
  npm install --unsafe-perm
  npm audit --audit-level=high
popd