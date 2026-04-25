export default async function Home({
    searchParams,
}:{
    searchParams:Promise<{error?:string; email?: string}>
}) {
    const {error, email} = await searchParams

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 px-4 py-8 text-stone-900 md:px-8 md:py-10">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white/95 shadow-[0_30px_90px_rgba(120,73,11,0.18)] ring-1 ring-amber-200 backdrop-blur md:min-h-[760px] md:grid-cols-[1.1fr_0.9fr]">
        <section className="bg-gradient-to-br from-stone-950 via-stone-900 to-amber-700 p-8 text-white md:p-12">
            <div className="flex h-full flex-col">
                <div className="inline-flex w-fit items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold tracking-[0.22em] text-white/85 ring-1 ring-white/15">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300 shadow-[0_0_18px_rgba(253,224,71,0.9)]"></span>
                    WELCOME BACK
                </div>

                <h1 className="mt-8 max-w-md text-4xl font-bold leading-[1.02] md:text-6xl">
                    Sign back in
                </h1>

                <p className="mt-6 max-w-lg text-base leading-8 text-white/85 md:text-[1.35rem]">
                    Pick up your conversations, reconnect with your people, and get back to a calmer messaging experience.
                </p>

                <div className="mt-10 space-y-4">
                    <div className="rounded-[1.6rem] bg-white/10 p-5 backdrop-blur-sm ring-1 ring-white/15">
                        <p className="text-sm font-semibold uppercase tracking-wide text-amber-100">
                            Fast Access
                        </p>
                        <p className="mt-3 text-sm leading-7 text-white/90 md:text-base">
                            Jump straight into your chats with a simple, focused sign-in flow.
                        </p>
                    </div>

                    <div className="rounded-[1.6rem] bg-white/10 p-5 backdrop-blur-sm ring-1 ring-white/15">
                        <p className="text-sm font-semibold uppercase tracking-wide text-amber-100">
                            Trusted Space
                        </p>
                        <p className="mt-3 text-sm leading-7 text-white/90 md:text-base">
                            Return to a place built for real conversations, privacy, and connection.
                        </p>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="rounded-[1.4rem] bg-white/8 p-4 text-center ring-1 ring-white/12">
                        <p className="text-2xl font-bold">Quick</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/65">Access</p>
                    </div>
                    <div className="rounded-[1.4rem] bg-white/8 p-4 text-center ring-1 ring-white/12">
                        <p className="text-2xl font-bold">Calm</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/65">Spaces</p>
                    </div>
                    <div className="rounded-[1.4rem] bg-white/8 p-4 text-center ring-1 ring-white/12">
                        <p className="text-2xl font-bold">Real</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/65">Chats</p>
                    </div>
                </div>

                <div className="mt-6 pt-2">
                    <div className="rounded-[1.6rem] bg-white/8 p-5 ring-1 ring-white/12">
                        <p className="text-sm text-white/80">Need a new account?</p>
                        <a href="/" className="mt-2 inline-flex text-sm font-semibold text-amber-200 underline decoration-amber-200/50 underline-offset-4">
                            Create one here
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <section className="p-8 md:p-12">
            <div className="mx-auto max-w-lg">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">
                    Sign In
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-stone-900">
                    Welcome back
                </h2>

                <p className="mt-3 text-base leading-7 text-stone-600">
                    Enter your details to open your Luma account and continue your conversations.
                </p>

                {error && (
                    <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <form action="/api/login" method="post" className="mt-10 space-y-6">
                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-stone-700">Email address</span>
                        <input type="email" name="email" autoComplete="email" required placeholder="you@example.com" defaultValue={email ?? ""} className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4 text-lg text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100" />
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-stone-700">Password</span>
                        <input type="password" name="password" autoComplete="current-password" required placeholder="Enter your password" className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4 text-lg text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100" />
                    </label>

                    <div className="flex items-center justify-between gap-4 text-sm">
                        <label className="flex items-center gap-3 text-stone-600">
                            <input type="checkbox" name="remember_me" className="h-4 w-4 rounded border-stone-300 text-amber-500 focus:ring-amber-300" />
                            <span>Remember me</span>
                        </label>

                        <span className="font-medium text-stone-500">Password reset coming soon</span>
                    </div>

                    <button type="submit" className="w-full rounded-2xl bg-stone-900 px-5 py-4 text-base font-semibold text-white transition hover:bg-stone-800">
                        Sign in
                    </button>
                </form>

                <div className="mt-8 rounded-[1.6rem] bg-amber-50/80 p-5 ring-1 ring-amber-100">
                    <p className="text-sm font-semibold text-stone-900">New here?</p>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                        Create a Luma account to start messaging in a space designed to feel warm, private, and simple.
                    </p>
                </div>

                <p className="mt-6 text-center text-sm text-stone-500">
                    Don&apos;t have an account?{" "}
                    <a href="/" className="font-semibold text-amber-600 hover:text-amber-700">Sign up</a>
                </p>
            </div>
        </section>
      </div>
    </main>
    
  );
}
