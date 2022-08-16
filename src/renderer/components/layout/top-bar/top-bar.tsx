/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import styles from "./top-bar.module.scss";
import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react";
import type { IComputedValue } from "mobx";
import { cssNames } from "../../../utils";
import topBarItemsInjectable from "./top-bar-items/top-bar-items.injectable";
import { withInjectables } from "@ogre-tools/injectable-react";
import type { TopBarRegistration } from "./top-bar-registration";
import isLinuxInjectable from "../../../../common/vars/is-linux.injectable";
import isWindowsInjectable from "../../../../common/vars/is-windows.injectable";
import closeWindowInjectable from "./close-window.injectable";
import maximizeWindowInjectable from "./maximize-window.injectable";
import toggleMaximizeWindowInjectable from "./toggle-maximize-window.injectable";
import watchHistoryStateInjectable from "../../../remote-helpers/watch-history-state.injectable";
import topBarItems2Injectable from "./top-bar-items/top-bar-items2.injectable";
import type { TopBarItem } from "./top-bar-items/top-bar-item-injection-token";

interface Dependencies {
  items: IComputedValue<TopBarRegistration[]>;
  items2: IComputedValue<TopBarItem[]>;
  isWindows: boolean;
  isLinux: boolean;
  minimizeWindow: () => void;
  toggleMaximizeWindow: () => void;
  closeWindow: () => void;
  watchHistoryState: () => () => void;
}

const NonInjectedTopBar = observer(({
  items,
  items2,
  isWindows,
  isLinux,
  closeWindow,
  minimizeWindow,
  toggleMaximizeWindow,
  watchHistoryState,
}: Dependencies) => {
  const elem = useRef<HTMLDivElement | null>(null);

  const windowSizeToggle = (evt: React.MouseEvent) => {
    if (elem.current === evt.target) {
      toggleMaximizeWindow();
    }
  };

  useEffect(() => watchHistoryState(), []);

  return (
    <div
      className={styles.topBar}
      onDoubleClick={windowSizeToggle}
      ref={elem}>
      <div className={styles.items}>
        {items2.get().map((item) => {
          const Component = item.Component;

          return <Component key={item.id} />;
        })}
      </div>
      <div className={styles.items}>
        {renderRegisteredItems(items.get())}
        {(isWindows || isLinux) && (
          <div className={cssNames(styles.windowButtons, { [styles.linuxButtons]: isLinux })}>
            <div
              className={styles.minimize}
              data-testid="window-minimize"
              onClick={minimizeWindow}
            >
              <svg shapeRendering="crispEdges" viewBox="0 0 12 12">
                <rect
                  fill="currentColor"
                  width="10"
                  height="1"
                  x="1"
                  y="9"
                />
              </svg>
            </div>
            <div
              className={styles.maximize}
              data-testid="window-maximize"
              onClick={toggleMaximizeWindow}
            >
              <svg shapeRendering="crispEdges" viewBox="0 0 12 12">
                <rect
                  width="9"
                  height="9"
                  x="1.5"
                  y="1.5"
                  fill="none"
                  stroke="currentColor"
                />
              </svg>
            </div>
            <div
              className={styles.close}
              data-testid="window-close"
              onClick={closeWindow}
            >
              <svg shapeRendering="crispEdges" viewBox="0 0 12 12">
                <polygon fill="currentColor" points="11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

const renderRegisteredItems = (items: TopBarRegistration[]) => (
  items.map((registration, index) => {
    if (!registration?.components?.Item) {
      return null;
    }

    return <registration.components.Item key={index} />;
  })
);

export const TopBar = withInjectables<Dependencies>(NonInjectedTopBar, {
  getProps: (di) => ({
    items: di.inject(topBarItemsInjectable),
    items2: di.inject(topBarItems2Injectable),
    isLinux: di.inject(isLinuxInjectable),
    isWindows: di.inject(isWindowsInjectable),
    closeWindow: di.inject(closeWindowInjectable),
    minimizeWindow: di.inject(maximizeWindowInjectable),
    toggleMaximizeWindow: di.inject(toggleMaximizeWindowInjectable),
    watchHistoryState: di.inject(watchHistoryStateInjectable),
  }),
});
