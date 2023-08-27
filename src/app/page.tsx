"use client";

import { useGetUsersQuery } from "@/lib/redux/services/builderApi";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import Link from 'next/link';
export default function Home() {
  const dispatch = useAppDispatch();

  const { isLoading, isFetching, data, error } = useGetUsersQuery(null);

  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
   

      {error ? (
        <p>Oh no, there was an error</p>
      ) : isLoading || isFetching ? (
        <p>Loading...</p>
      ) : data ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 20,
          }}
        >
          {data.map((user) => (
            <div
              key={user.id}
              style={{ border: "1px solid #ccc", textAlign: "center" }}
            >
              <img
                src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
                alt={user.name}
                style={{ height: 180, width: 180 }}
              />
              <h3>{user.name}</h3>
            </div>
          ))}
            <Link href="/[builder]" as="/my-builder">
        Go to Dynamic Builder Page
      </Link>
        </div>
      ) : null}
    </main>
  );
}
