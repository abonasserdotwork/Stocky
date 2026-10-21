
import { Search, Bell, Plus } from "lucide-react";

export default function Header() {
    return (
        <header className="flex h-16 min-w-0 items-center justify-between gap-3 border-b border-border bg-surface px-3 sm:px-5">
            <label className="relative min-w-0 flex-1 sm:max-w-md">
                <span className="sr-only">Search products or suppliers</span>
                <Search
                    size={17}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                    type="search"
                    placeholder="Search products or suppliers..."
                    className="h-10 w-full rounded-lg border border-border bg-page/50 pl-10 pr-3 text-sm text-ink outline-none transition placeholder:text-muted/80 focus:border-primary focus:bg-surface focus:ring-2 focus:ring-primary/10"
                />
            </label>

            <div className="flex shrink-0 items-center gap-2 sm:gap-4">
                <button
                    type="button"
                    aria-label="Notifications"
                    className="relative flex h-10 w-10 items-center justify-center rounded-lg text-muted transition hover:bg-page hover:text-ink"
                >
                    <Bell size={18} strokeWidth={1.8} />

                    <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[9px] font-bold text-surface">
                        3
                    </span>
                </button>

                <button
                    type="button"
                    className="hidden h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover sm:inline-flex"
                >
                    <Plus size={16} strokeWidth={2.5} aria-hidden="true" />
                    <span>New Order</span>
                </button>

                <button
                    type="button"
                    className="flex items-center gap-2 rounded-lg p-1 text-left transition hover:bg-page"
                    aria-label="User profile: Bloom & Timber Craft Co., Inventory Admin"
                >
                    <img
                        src="https://i.pravatar.cc/80?img=47"
                        alt="User avatar"
                        className="h-9 w-9 rounded-full border border-border object-cover"
                    />

                    <div className="hidden min-w-0 lg:block">
                        <p className="whitespace-nowrap text-xs font-semibold leading-4 text-ink">
                            Bloom & Timber Craft Co.
                        </p>
                        <p className="mt-0.5 whitespace-nowrap text-xs leading-4 text-muted">
                            Inventory Admin
                        </p>
                    </div>
                </button>
            </div>
        </header>
    );
}
