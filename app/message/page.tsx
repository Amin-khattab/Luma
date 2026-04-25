import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function getInitials(firstName: string, lastName: string) {
  return `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();
}

function formatTime(date: Date) {
  return new Date(date).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatFullName(firstName: string, lastName: string) {
  return `${firstName} ${lastName}`.trim();
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ to?: string; error?: string }>;
}) {
  const { to, error } = await searchParams;

  const cookieStore = await cookies();
  const userCookie = cookieStore.get("UserId");
  const myId = Number(userCookie?.value);

  if (!myId) {
    redirect("/login");
  }

  const me = await prisma.user.findUnique({
    where: {
      id: myId,
    },
  });

  if (!me) {
    redirect("/login");
  }

  const users = await prisma.user.findMany({
    where: {
      id: {
        not: me.id,
      },
    },
    orderBy: {
      firstName: "asc",
    },
  });

  const activeUserId = Number(to);
  const activeUser = users.find((user) => user.id === activeUserId) ?? users[0] ?? null;
  const meName = formatFullName(me.firstName, me.lastName);

  const messages = activeUser
    ? await prisma.message.findMany({
        where: {
          OR: [
            {
              senderId: me.id,
              receiverId: activeUser.id,
            },
            {
              senderId: activeUser.id,
              receiverId: me.id,
            },
          ],
        },
        orderBy: {
          createdAt: "asc",
        },
      })
    : [];

  return (
    <main className="grid h-screen w-full overflow-hidden bg-[#16120e] text-stone-100 md:grid-cols-[70px_300px_1fr]">
      <aside className="hidden h-full border-r border-white/5 bg-[#110d09] px-3 py-4 md:flex md:flex-col md:items-center md:justify-between">
        <div className="flex flex-col items-center gap-3">
          <a
            href="/message"
            aria-label="Messages"
            className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 text-white shadow-[0_10px_22px_rgba(146,64,14,0.24)]"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 10.5 12 3l9 7.5"></path>
              <path d="M5.5 9.5V20h13V9.5"></path>
              <path d="M9.5 20v-6h5v6"></path>
            </svg>
          </a>

          <button
            type="button"
            aria-label="Direct messages"
            className="grid h-10 w-10 place-items-center rounded-2xl text-stone-500 transition hover:bg-white/5 hover:text-stone-100"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>

          <a
            href="/settings"
            aria-label="Settings"
            className="grid h-10 w-10 place-items-center rounded-2xl text-stone-500 transition hover:bg-white/5 hover:text-stone-100"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.7 1.7 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.07V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-.4-1.07 1.7 1.7 0 0 0-1-.6 1.7 1.7 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.07-.4H2.8a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.07-.4 1.7 1.7 0 0 0 .6-1 1.7 1.7 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6c.38-.2.68-.57.8-1V3a2 2 0 1 1 4 0v.1c.12.43.42.8.8 1a1.7 1.7 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.2.38.57.68 1 .8h.1a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1 .8z"></path>
            </svg>
          </a>
        </div>

        <a
          href="/settings"
          className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 text-xs font-semibold text-white ring-1 ring-white/8 transition hover:bg-white/10"
          aria-label="Open profile settings"
        >
          {getInitials(me.firstName, me.lastName)}
        </a>
      </aside>

      <section className="flex min-h-0 flex-col border-r border-white/5 bg-[#1a140f]">
        <div className="border-b border-white/5 px-4 py-4 md:px-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-300/70">
                Inbox
              </p>
              <h1 className="mt-2 text-[1.3rem] font-bold leading-tight text-white">
                Active Conversations
              </h1>
            </div>
            <a
              href="/settings"
              className="inline-flex max-w-[132px] items-center gap-2 rounded-2xl border border-white/8 bg-white/[0.03] px-2.5 py-2 transition hover:bg-white/[0.05]"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber-700 to-yellow-500 text-sm font-bold text-stone-950 shadow-[0_8px_16px_rgba(146,64,14,0.18)]">
                {getInitials(me.firstName, me.lastName)}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-500">
                  Profile
                </p>
                <p className="truncate text-sm font-medium text-stone-200">{me.firstName}</p>
              </div>
            </a>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/6 bg-[#130f0c] px-3.5 py-2.5 text-stone-500">
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              value="Search coming soon"
              readOnly
              aria-label="Search coming soon"
              className="w-full cursor-default bg-transparent text-sm text-stone-500 outline-none"
            />
          </div>

          {error && (
            <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {users.length === 0 ? (
            <div className="px-5 py-8 text-sm text-stone-400">No users available yet.</div>
          ) : (
            users.map((user, index) => {
              const isActive = activeUser?.id === user.id;

              return (
                <a
                  key={user.id}
                  href={`/message?to=${user.id}`}
                  className={[
                    "flex items-center gap-3 px-4 py-3.5 transition hover:bg-white/[0.03] md:px-5",
                    index !== users.length - 1 ? "border-b border-white/5" : "",
                    isActive ? "bg-amber-200/[0.05]" : "",
                  ].join(" ")}
                >
                  <div className="relative">
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-amber-700 to-amber-500 text-base font-semibold text-white">
                      {getInitials(user.firstName, user.lastName)}
                    </div>
                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#1a140f] bg-emerald-400"></span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="truncate text-[0.95rem] font-semibold text-white">
                        {user.firstName} {user.lastName}
                      </h2>
                      <span className="text-xs text-stone-500">@{user.username}</span>
                    </div>
                    <p className="mt-1 truncate text-[0.88rem] text-stone-400">@{user.username} • {user.email}</p>
                  </div>
                </a>
              );
            })
          )}
        </div>
      </section>

      <section className="flex min-h-0 flex-col bg-[#17120d]">
        {activeUser ? (
          <>
            <header className="border-b border-white/5 bg-[#17120d] px-5 py-3.5 md:px-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-amber-700 to-amber-500 text-base font-semibold text-white">
                      {getInitials(activeUser.firstName, activeUser.lastName)}
                    </div>
                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#17120d] bg-emerald-400"></span>
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-white">
                      {activeUser.firstName} {activeUser.lastName}
                    </h2>
                    <p className="mt-0.5 text-xs text-stone-400">@{activeUser.username}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 md:gap-2">
                  <button type="button" className="grid h-9 w-9 place-items-center rounded-2xl text-stone-400 transition hover:bg-white/5 hover:text-stone-100">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.79.65 2.64a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.44-1.31a2 2 0 0 1 2.11-.45c.85.31 1.74.53 2.64.65A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </button>

                  <button type="button" className="grid h-9 w-9 place-items-center rounded-2xl text-stone-400 transition hover:bg-white/5 hover:text-stone-100">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m23 7-7 5 7 5V7z"></path>
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                    </svg>
                  </button>

                  <a href="/settings" className="grid h-9 w-9 place-items-center rounded-2xl text-stone-400 transition hover:bg-white/5 hover:text-stone-100" aria-label="Conversation settings">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <circle cx="12" cy="5" r="1.8"></circle>
                      <circle cx="12" cy="12" r="1.8"></circle>
                      <circle cx="12" cy="19" r="1.8"></circle>
                    </svg>
                  </a>
                </div>
              </div>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 md:px-6">
              <div className="max-w-5xl space-y-6 pb-6">
                {messages.length === 0 ? (
                  <div className="rounded-[1.6rem] border border-white/6 bg-white/[0.03] px-5 py-4 text-sm text-stone-400">
                    No messages yet. Start the conversation.
                  </div>
                ) : (
                  messages.map((message) => {
                    const isMine = message.senderId === me.id;

                    return (
                      <div key={message.id} className={isMine ? "ml-auto max-w-xl" : "max-w-xl"}>
                        <div
                          className={
                            isMine
                              ? "ml-auto w-fit max-w-full break-words rounded-[1.35rem] bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-500 px-4 py-3 text-left text-[0.95rem] font-medium text-stone-950 shadow-[0_10px_18px_rgba(146,64,14,0.12)]"
                              : "inline-block break-words rounded-[1.35rem] bg-white/[0.06] px-4 py-3 text-[0.95rem] font-medium text-stone-100"
                          }
                        >
                          {message.content}
                        </div>
                        <p className={isMine ? "mt-2.5 text-right text-xs text-stone-500" : "mt-2.5 text-xs text-stone-500"}>
                          {formatTime(message.createdAt)}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <footer className="border-t border-white/5 bg-[#17120d] px-4 py-2.5 md:px-6">
              <form
                action="/api/message/send"
                method="post"
                className="flex items-center gap-2 rounded-[1.35rem] border border-white/6 bg-white/[0.03] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
              >
                <input type="hidden" name="receiverId" value={activeUser.id} />

                <button
                  type="button"
                  className="grid h-8 w-8 place-items-center rounded-2xl text-stone-500 transition hover:bg-white/5 hover:text-stone-100 disabled:opacity-60"
                  disabled
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21.44 11.05 12.25 20.24a6 6 0 1 1-8.49-8.49l9.9-9.9a4 4 0 0 1 5.66 5.66l-10.6 10.6a2 2 0 0 1-2.83-2.83l9.9-9.9"></path>
                  </svg>
                </button>

                <input
                  type="text"
                  name="content"
                  placeholder={`Message ${activeUser.firstName}...`}
                  className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-stone-500"
                  required
                />

                <button
                  type="button"
                  className="grid h-8 w-8 place-items-center rounded-2xl text-stone-500 transition hover:bg-white/5 hover:text-stone-100 disabled:opacity-60"
                  disabled
                >
                  <svg
                    className="h-[18px] w-[18px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <path d="M9 9h.01"></path>
                    <path d="M15 9h.01"></path>
                  </svg>
                </button>

                <button className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-500 text-stone-950 shadow-[0_8px_14px_rgba(146,64,14,0.14)] transition hover:translate-y-[-1px]">
                  <svg
                    className="h-[18px] w-[18px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 2 11 13"></path>
                    <path d="M22 2 15 22l-4-9-9-4 20-7z"></path>
                  </svg>
                </button>
              </form>
            </footer>
          </>
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center text-stone-400">
            <div>
              <h2 className="text-lg font-semibold text-white">No conversation selected</h2>
              <p className="mt-2 text-sm">Choose a user from the inbox to start messaging.</p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
