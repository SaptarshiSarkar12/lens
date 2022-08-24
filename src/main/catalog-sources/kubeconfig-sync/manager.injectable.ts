/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import directoryForKubeConfigsInjectable from "../../../common/app-paths/directory-for-kube-configs/directory-for-kube-configs.injectable";
import { KubeconfigSyncManager } from "./manager";
import { createClusterInjectionToken } from "../../../common/cluster/create-cluster-injection-token";
import catalogEntityRegistryInjectable from "../../catalog/entity-registry.injectable";
import clustersThatAreBeingDeletedInjectable from "../../clusters-that-are-being-deleted.injectable";
import getClusterByIdInjectable from "../../../common/cluster-store/get-by-id.injectable";
import loggerInjectable from "../../../common/logger.injectable";

const kubeconfigSyncManagerInjectable = getInjectable({
  id: "kubeconfig-sync-manager",

  instantiate: (di) => new KubeconfigSyncManager({
    directoryForKubeConfigs: di.inject(directoryForKubeConfigsInjectable),
    createCluster: di.inject(createClusterInjectionToken),
    entityRegistry: di.inject(catalogEntityRegistryInjectable),
    clustersThatAreBeingDeleted: di.inject(clustersThatAreBeingDeletedInjectable),
    getClusterById: di.inject(getClusterByIdInjectable),
    logger: di.inject(loggerInjectable),
  }),
});

export default kubeconfigSyncManagerInjectable;
