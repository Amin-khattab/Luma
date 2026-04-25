import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function getInitials(firstName: string, lastName: string) {
  return `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();
}

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const { error, success } = await searchParams;

  const cookieStore = await cookies();
  const userCookie = cookieStore.get("UserId");
  const themeCookie = cookieStore.get("theme")?.value;
  const currentTheme = themeCookie === "light" ? "light" : "dark";
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

  const isLightTheme = currentTheme === "light";

  return (
    <main
      className={[
        "min-h-screen px-4 py-8 md:px-8 md:py-10",
        isLightTheme
          ? "bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 text-stone-900"
          : "bg-gradient-to-br from-[#120d09] via-[#1a120c] to-[#2a180c] text-stone-100",
      ].join(" ")}
    >
      <div
        className={[
          "mx-auto grid w-full max-w-6xl overflow-hidden rounded-[2rem] shadow-[0_30px_90px_rgba(120,73,11,0.18)] ring-1 backdrop-blur md:min-h-[760px] md:grid-cols-[0.95fr_1.05fr]",
          isLightTheme
            ? "bg-white/95 ring-amber-200"
            : "bg-[#16100b]/95 ring-white/10",
        ].join(" ")}
      >
        <section
          className={[
            "p-8 md:p-12",
            isLightTheme
              ? "bg-gradient-to-br from-stone-950 via-stone-900 to-amber-700 text-white"
              : "bg-gradient-to-br from-[#f0c48a] via-[#d89b4a] to-[#9a5a16] text-stone-950",
          ].join(" ")}
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <div
                className={[
                  "inline-flex w-fit items-center gap-3 rounded-full px-4 py-2 text-sm font-semibold tracking-[0.22em] ring-1",
                  isLightTheme
                    ? "bg-white/10 text-white/85 ring-white/15"
                    : "bg-stone-950/10 text-stone-950/80 ring-stone-950/10",
                ].join(" ")}
              >
                <span
                  className={[
                    "h-2.5 w-2.5 rounded-full shadow-[0_0_18px_rgba(253,224,71,0.9)]",
                    isLightTheme ? "bg-amber-300" : "bg-stone-950",
                  ].join(" ")}
                ></span>
                SETTINGS
              </div>

              <div className="mt-6 inline-flex w-fit items-center gap-3 rounded-[1.4rem] bg-white/10 px-4 py-3 ring-1 ring-white/15 backdrop-blur-sm">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-stone-950/15 text-sm font-bold">
                  {getInitials(me.firstName, me.lastName)}
                </div>
                <div>
                  <p className={isLightTheme ? "text-sm font-semibold text-white" : "text-sm font-semibold text-stone-950"}>
                    {me.firstName} {me.lastName}
                  </p>
                  <p className={isLightTheme ? "text-sm text-white/75" : "text-sm text-stone-950/70"}>@{me.username}</p>
                </div>
              </div>

              <h1 className="mt-8 max-w-md text-4xl font-bold leading-[1.02] md:text-6xl">
                Shape your space
              </h1>

              <p
                className={[
                  "mt-6 max-w-lg text-base leading-8 md:text-[1.2rem]",
                  isLightTheme ? "text-white/85" : "text-stone-950/80",
                ].join(" ")}
              >
                Update your identity, switch the app mood, and manage your session from one calm place.
              </p>

              <div className="mt-10 space-y-4">
                <div
                  className={[
                    "rounded-[1.6rem] p-5 ring-1 backdrop-blur-sm",
                    isLightTheme
                      ? "bg-white/10 ring-white/15"
                      : "bg-stone-950/10 ring-stone-950/10",
                  ].join(" ")}
                >
                  <p
                    className={[
                      "text-sm font-semibold uppercase tracking-wide",
                      isLightTheme ? "text-amber-100" : "text-stone-950/70",
                    ].join(" ")}
                  >
                    Account Control
                  </p>
                  <p
                    className={[
                      "mt-3 text-sm leading-7 md:text-base",
                      isLightTheme ? "text-white/90" : "text-stone-950/80",
                    ].join(" ")}
                  >
                    Keep your username current so people can find you without confusion.
                  </p>
                </div>

                <div
                  className={[
                    "rounded-[1.6rem] p-5 ring-1 backdrop-blur-sm",
                    isLightTheme
                      ? "bg-white/10 ring-white/15"
                      : "bg-stone-950/10 ring-stone-950/10",
                  ].join(" ")}
                >
                  <p
                    className={[
                      "text-sm font-semibold uppercase tracking-wide",
                      isLightTheme ? "text-amber-100" : "text-stone-950/70",
                    ].join(" ")}
                  >
                    Appearance
                  </p>
                  <p
                    className={[
                      "mt-3 text-sm leading-7 md:text-base",
                      isLightTheme ? "text-white/90" : "text-stone-950/80",
                    ].join(" ")}
                  >
                    Switch between a bright daytime canvas and the darker conversation room.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="/message"
              className={[
                "mt-8 inline-flex w-fit items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition",
                isLightTheme
                  ? "bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/15"
                  : "bg-stone-950/10 text-stone-950 ring-1 ring-stone-950/10 hover:bg-stone-950/15",
              ].join(" ")}
            >
              Back to messages
            </a>
          </div>
        </section>

        <section className="p-8 md:p-12">
          <div className="mx-auto max-w-2xl space-y-6">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-3xl bg-gradient-to-br from-amber-700 to-yellow-500 text-lg font-bold text-stone-950 shadow-[0_10px_20px_rgba(146,64,14,0.14)]">
                {getInitials(me.firstName, me.lastName)}
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">
                  Account Settings
                </p>
                <h2
                  className={[
                    "mt-2 text-3xl font-bold tracking-tight",
                    isLightTheme ? "text-stone-900" : "text-stone-100",
                  ].join(" ")}
                >
                  {me.firstName} {me.lastName}
                </h2>
                <p className={isLightTheme ? "mt-2 text-stone-600" : "mt-2 text-stone-400"}>
                  {me.email}
                </p>
              </div>
            </div>

            {error && (
              <div
                className={[
                  "rounded-2xl border px-4 py-3 text-sm",
                  isLightTheme
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-red-500/20 bg-red-500/10 text-red-300",
                ].join(" ")}
              >
                {error}
              </div>
            )}

            {success && (
              <div
                className={[
                  "rounded-2xl border px-4 py-3 text-sm",
                  isLightTheme
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
                ].join(" ")}
              >
                {success}
              </div>
            )}

            <div
              className={[
                "rounded-[1.8rem] p-6 ring-1",
                isLightTheme ? "bg-stone-50 ring-stone-200" : "bg-white/[0.03] ring-white/8",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className={isLightTheme ? "text-lg font-semibold text-stone-900" : "text-lg font-semibold text-white"}>
                    Username
                  </h3>
                  <p className={isLightTheme ? "mt-2 text-sm text-stone-600" : "mt-2 text-sm text-stone-400"}>
                    Change how your profile appears across conversations.
                  </p>
                </div>
                <span
                  className={[
                    "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]",
                    isLightTheme ? "bg-amber-100 text-amber-800" : "bg-amber-500/10 text-amber-300",
                  ].join(" ")}
                >
                  @{me.username}
                </span>
              </div>

              <form action="/api/settings/profile" method="post" className="mt-5 space-y-4">
                <label className="block">
                  <span className={isLightTheme ? "mb-2 block text-sm font-medium text-stone-700" : "mb-2 block text-sm font-medium text-stone-300"}>
                    New username
                  </span>
                  <input
                    type="text"
                    name="username"
                    defaultValue={me.username}
                    minLength={3}
                    required
                    className={[
                      "w-full rounded-2xl border px-5 py-4 text-base outline-none transition",
                      isLightTheme
                        ? "border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                        : "border-white/10 bg-[#120d09] text-white placeholder:text-stone-500 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10",
                    ].join(" ")}
                  />
                </label>
                <button
                  type="submit"
                  className={[
                    "rounded-2xl px-5 py-3 text-sm font-semibold transition hover:translate-y-[-1px]",
                    isLightTheme
                      ? "bg-stone-900 text-white hover:bg-stone-800"
                      : "bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-500 text-stone-950 hover:opacity-95",
                  ].join(" ")}
                >
                  Save username
                </button>
              </form>
            </div>

            <div
              className={[
                "rounded-[1.8rem] p-6 ring-1",
                isLightTheme ? "bg-stone-50 ring-stone-200" : "bg-white/[0.03] ring-white/8",
              ].join(" ")}
            >
              <h3 className={isLightTheme ? "text-lg font-semibold text-stone-900" : "text-lg font-semibold text-white"}>
                Appearance
              </h3>
              <p className={isLightTheme ? "mt-2 text-sm text-stone-600" : "mt-2 text-sm text-stone-400"}>
                Choose the mood you want to use while moving through the app.
              </p>

              <form action="/api/settings/theme" method="post" className="mt-5 grid gap-3 md:grid-cols-2">
                <button
                  type="submit"
                  name="theme"
                  value="light"
                  className={[
                    "rounded-[1.4rem] border px-5 py-4 text-left transition",
                    currentTheme === "light"
                      ? "border-amber-400 bg-amber-50 text-stone-900 ring-2 ring-amber-200"
                      : isLightTheme
                        ? "border-stone-200 bg-white text-stone-700 hover:border-amber-300"
                        : "border-white/10 bg-[#120d09] text-stone-300 hover:border-amber-500/30",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em]">Light</p>
                    {currentTheme === "light" && <span className="text-xs font-semibold uppercase tracking-[0.18em]">Active</span>}
                  </div>
                  <p className="mt-2 text-sm opacity-80">Warm surfaces, bright panels, easy daytime reading.</p>
                </button>

                <button
                  type="submit"
                  name="theme"
                  value="dark"
                  className={[
                    "rounded-[1.4rem] border px-5 py-4 text-left transition",
                    currentTheme === "dark"
                      ? "border-amber-500/40 bg-[#120d09] text-white ring-2 ring-amber-500/10"
                      : isLightTheme
                        ? "border-stone-200 bg-white text-stone-700 hover:border-stone-400"
                        : "border-white/10 bg-[#120d09] text-stone-300 hover:border-amber-500/30",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em]">Dark</p>
                    {currentTheme === "dark" && <span className="text-xs font-semibold uppercase tracking-[0.18em]">Active</span>}
                  </div>
                  <p className="mt-2 text-sm opacity-80">A quieter canvas for longer sessions and late-night chatting.</p>
                </button>
              </form>
            </div>

            <div
              className={[
                "rounded-[1.8rem] p-6 ring-1",
                isLightTheme ? "bg-stone-50 ring-stone-200" : "bg-white/[0.03] ring-white/8",
              ].join(" ")}
            >
              <h3 className={isLightTheme ? "text-lg font-semibold text-stone-900" : "text-lg font-semibold text-white"}>
                Session
              </h3>
              <p className={isLightTheme ? "mt-2 text-sm text-stone-600" : "mt-2 text-sm text-stone-400"}>
                End your current session on this device whenever you need to step away.
              </p>

              <form action="/api/logout" method="post" className="mt-5">
                <button
                  type="submit"
                  className={[
                    "rounded-2xl border px-5 py-3 text-sm font-semibold transition",
                    isLightTheme
                      ? "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                      : "border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-500/15",
                  ].join(" ")}
                >
                  Log out
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
