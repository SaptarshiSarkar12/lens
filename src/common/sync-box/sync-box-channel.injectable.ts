/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import type { Channel } from "../channel/channel";

export type SyncBoxChannel = Channel<{ id: string; value: unknown }>;

const syncBoxChannelInjectable = getInjectable({
  id: "sync-box-channel",

  instantiate: (): SyncBoxChannel => ({
    id: "sync-box-channel",
  }),
});

export default syncBoxChannelInjectable;
