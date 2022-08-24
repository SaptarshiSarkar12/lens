/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { getInjectable } from "@ogre-tools/injectable";
import type { ClusterId } from "../cluster-types";
import type { Cluster } from "../cluster/cluster";
import clusterStoreInjectable from "./cluster-store.injectable";

export type GetClusterById = (clusterId: ClusterId) => Cluster | undefined;

const getClusterByIdInjectable = getInjectable({
  id: "get-cluster-by-id",
  instantiate: (di): GetClusterById => {
    const store = di.inject(clusterStoreInjectable);

    return (clusterId) => store.getById(clusterId);
  },
});

export default getClusterByIdInjectable;
