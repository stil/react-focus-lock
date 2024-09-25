import * as React from "react";
import { Ref } from "react";
import { focusLockAPI } from "./Trap";
import { SideCarComponent } from "use-sidecar";

export interface ReactFocusLockProps<
  ChildrenType = React.ReactNode,
  LockProps = Record<string, any>
> {
  disabled?: boolean;

  /**
   * if true, will return focus to the previous position on trap disable.
   * Optionally, can pass focus options instead of `true` to control the focus
   * more precisely (ie. `{ preventScroll: true }`)
   *
   * can also accept a function with the first argument equals to element focus will be returned to
   * in order to provide full control to the user space
   */
  returnFocus?:
    | boolean
    | FocusOptions
    | ((returnTo: Element) => boolean | FocusOptions);

  /**
   * used to control behavior or "returning focus back to the lock"
   *
   * @deprecated Can lead to a wrong user experience. Use this option only if you known what you are doing
   * @see {@link https://github.com/theKashey/react-focus-lock/issues/162}
   * @example
   * prevent scroll example
   * ```tsx
   * <FocusLock focusOptions={{preventScroll: true}} />
   * ```
   */
  focusOptions?: FocusOptions;

  /**
   * @deprecated Use persistentFocus=false instead
   * enables(or disables) text selection. This also allows not to have ANY focus.
   */
  allowTextSelection?: boolean;

  /**
   * enables of disables "sticky" behavior, when any focusable element shall be focused.
   * This disallow any text selection on the page.
   * @default false
   */
  persistentFocus?: boolean;

  /**
   * enables aggressive focus capturing within iframes
   * - once disabled allows focus to move outside of iframe, if enabled inside iframe
   * - once enabled keep focus in the lock, no matter where lock is active (default)
   * @default true
   */
  crossFrame?: boolean;

  /**
   * enables or disables autoFocusing feature.
   * If enabled - will move focus inside Lock, selecting the first or autoFocusable element
   * If disable - will blur any focus on Lock activation.
   * @default true
   */
  autoFocus?: boolean;

  /**
   * disables hidden inputs before and after the lock.
   */
  noFocusGuards?: boolean | "tail";

  /**
   * Controls support a focus lock behavior when any elements tabIndex greater than 0.
   * @default false
   * @see - https://github.com/theKashey/react-focus-lock/issues/32
   */
  hasPositiveIndices?: boolean;

  /**
   * named focus group for focus scattering aka combined lock targets
   */
  group?: string;

  className?: string;

  /**
   * life-cycle hook, called on lock activation
   * @param node the observed node
   */
  onActivation?(node: HTMLElement): void;

  /**
   * life-cycle hook, called on deactivation
   * @param node the observed node
   */
  onDeactivation?(node: HTMLElement): void;

  /**
   * Component to use, defaults to 'div'
   */
  as?: string | React.ElementType<LockProps & { children: ChildrenType }>;

  lockProps?: LockProps;

  ref?: React.ForwardedRef<HTMLDivElement>;

  /**
   * Controls focus lock working areas. Lock will silently ignore all the events from `not allowed` areas
   * @param activeElement
   * @returns {Boolean} true if focus lock should handle activeElement, false if not
   */
  whiteList?: (activeElement: HTMLElement) => boolean;

  /**
   * Shards forms a scattered lock, same as `group` does, but in more "low" and controlled way
   */
  shards?: Shards;

  children?: ChildrenType;

  sideCar?: SideCarComponent;
}

export interface AutoFocusProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export interface FreeFocusProps {
  children: React.ReactNode;
  className?: string;
}

export interface InFocusGuardProps {
  children?: React.ReactNode;
}

export interface Trap {
  id: string;

  disabled: boolean;

  noFocusGuards: boolean;
  hasPositiveIndices: boolean;

  allowTextSelection: boolean;
  autoFocus: boolean;
  persistentFocus: boolean;
  crossFrame: boolean;

  group: string;
  className: string;

  /**
   * Controls focus lock working areas. Lock will silently ignore all the events from `not allowed` areas
   * @param activeElement
   * @returns {Boolean} true if focus lock should handle activeElement, false if not
   */
  whiteList?: (activeElement: HTMLElement) => boolean;

  shards: Shards;

  observed: HTMLElement;

  focusOptions: FocusOptions;

  onActivation: (api: typeof focusLockAPI) => void;
  onDeactivation: () => void;

  returnFocus: (val: boolean) => void;
}

export type Shards = ReadonlyArray<
  HTMLElement | { current: HTMLElement | null }
>;
