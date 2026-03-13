// ─── Auth ──────────────────────────────────────────────────
export { useAuth } from "./useAuth";
export type { AuthUser } from "./useAuth";

// ─── Links ────────────────────────────────────────────────
export { useLinks } from "./useLinks";
export type { Link, CreateLinkInput, UpdateLinkInput } from "./useLinks";

// ─── Analytics ────────────────────────────────────────────
export { useAnalytics } from "./useHooks";
export type { AnalyticsSummary, AnalyticsRange } from "./useHooks";

// ─── Profile ──────────────────────────────────────────────
export { useProfile } from "./useHooks";
export type { ProfileData } from "./useHooks";

// ─── Utilities ────────────────────────────────────────────
export {
  useDebounce,
  useLocalStorage,
  useToast,
  useClipboard,
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useOutsideClick,
  useFileUpload,
  useIntersectionObserver,
} from "./useHooks";

export type { ToastItem, UploadResult } from "./useHooks";
