/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import path from "path";

export type GetAbsolutePath = (path: string) => string;

const getAbsolutePathInjectable = getInjectable({
  id: "get-absolute-path",
  instantiate: (): GetAbsolutePath => path.resolve,
  causesSideEffects: true,
});

export default getAbsolutePathInjectable;
