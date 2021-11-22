/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import { KubeObject } from "../../../../../../common/k8s-api/kube-object";
import { parseKubeApi } from "../../../../../../common/k8s-api/kube-api-parse";
import type { AsyncResult } from "../../../../../../common/utils/async-result";
import { getErrorMessage } from "../../../../../../common/utils/get-error-message";
import apiKubeInjectable from "../../../../../k8s/api-kube.injectable";

export type CallForResource = (
  selfLink: string
) => Promise<AsyncResult<KubeObject>>;

const callForResourceInjectable = getInjectable({
  id: "call-for-resource",

  instantiate: (di): CallForResource => {
    const apiKube = di.inject(apiKubeInjectable);

    return async (apiPath: string) => {
      const parsed = parseKubeApi(apiPath);

      if (!parsed.name) {
        return { callWasSuccessful: false, error: "Invalid API path" };
      }

      console.log(apiPath);

      try {
        return {
          callWasSuccessful: true,
          response: new KubeObject(await apiKube.get(apiPath)),
        };
      } catch (e) {
        return { callWasSuccessful: false, error: getErrorMessage(e) };
      }
    };
  },

  causesSideEffects: true,
});

export default callForResourceInjectable;
