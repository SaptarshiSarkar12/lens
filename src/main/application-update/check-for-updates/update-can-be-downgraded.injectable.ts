/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import selectedUpdateChannelInjectable from "../../../common/application-update/selected-update-channel/selected-update-channel.injectable";
import buildSemanticVersionInjectable from "../../../common/vars/build-semantic-version.injectable";

const updateCanBeDowngradedInjectable = getInjectable({
  id: "update-can-be-downgraded",

  instantiate: (di) => {
    const selectedUpdateChannel = di.inject(selectedUpdateChannelInjectable);
    const semanticBuildVersion = di.inject(buildSemanticVersionInjectable);

    return computed(() => (
      semanticBuildVersion.prerelease[0] !== selectedUpdateChannel.value.get().id
    ));
  },
});

export default updateCanBeDowngradedInjectable;
