
import { Search, Bell, Plus } from "lucide-react";
import Button from "../../ui/Button.jsx";
import Input from "../../ui/Input.jsx";

export default function Header() {
    return (
        <header className="flex h-[54px] w-full items-center justify-between gap-3 border-b border-border-color bg-surface px-5">
            {/* Search */}
            <Input
                name="Search"
                placeholder="Search for product or supplier..."
                variant="search"
                labelClassName="sr-only"
                leadingIcon={<Search size={13} className="shrink-0 text-muted" />}
            />

            {/* Right Actions */}
            <div className="flex shrink-0 items-center gap-4">
                {/* Notifications */}
                <button
                    type="button"
                    aria-label="Notifications"
                    className="relative flex h-7 w-7 items-center justify-center rounded-md text-muted hover:bg-page"
                >
                    <Bell size={15} strokeWidth={1.8} />

                    <span className="absolute right-0.5 top-0.5 flex h-[13px] min-w-[13px] items-center justify-center rounded-full bg-danger px-0.5 text-[8px] font-semibold text-surface">
                        3
                    </span>
                </button>

                {/* New Order */}
                <Button
                    type="button"
                    size="sm"
                >
                    <Plus size={13} strokeWidth={2.5} />
                    <span>New Order</span>
                </Button>

                {/* User Profile */}
                <button
                    type="button"
                    className="flex items-center gap-2 text-left"
                >
                    <img
                        src="https://i.pravatar.cc/80?img=47"
                        alt="User avatar"
                        className="h-7 w-7 rounded-full border border-border-color object-cover"
                    />

                    <div className="hidden min-w-0 sm:block">
                        <p className="whitespace-nowrap text-[10px] font-semibold leading-3 text-ink">
                            Bloom & Timber Craft Co.
                        </p>
                        <p className="mt-0.5 whitespace-nowrap text-[9px] leading-3 text-muted">
                            Inventory Admin
                        </p>
                    </div>
                </button>
            </div>
        </header>
    );
}
