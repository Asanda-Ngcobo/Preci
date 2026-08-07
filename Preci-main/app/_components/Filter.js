"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const filters = ["All", "Car", "Housing", "Phone", "Gym", 'Credit Score'];

function Filter() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeFilter = searchParams.get("type") ?? "All";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("type", filter);

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <div className="flex gap-3 mb-8">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => handleFilter(filter)}
          className={`px-4 cursor-pointer py-2 rounded-3xl transition
            ${
              activeFilter === filter
                ? "bg-(--accent-primary) text-white"
                : "bg-(--accent-secondary)"
            }
          `}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default Filter;