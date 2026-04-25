export default async function Home({
    searchParams,
}:{
    searchParams:Promise<{
        error?:string
        first_name?: string
        last_name?: string
        username?: string
        email?: string
        phone_number?: string
    }>
}) {

    const {error, first_name, last_name, username, email, phone_number} = await searchParams
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 px-4 py-8 text-stone-900 md:px-8 md:py-10">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white/95 shadow-[0_30px_90px_rgba(120,73,11,0.18)] ring-1 ring-amber-200 backdrop-blur md:min-h-[720px] md:grid-cols-[1.1fr_0.9fr]">
        <section className="bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-300 p-8 text-white md:p-10">
            <div className="flex h-full flex-col">
                <div className="inline-flex w-fit items-center gap-3 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold tracking-[0.22em] text-white/85 ring-1 ring-white/20">
                    <span className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.9)]"></span>
                    WELCOME
                </div>

                <h1 className="mt-6 max-w-md text-4xl font-bold leading-[1.02] md:text-5xl">
                    Luma
                </h1>

                <p className="mt-5 max-w-lg text-base leading-7 text-white/90 md:text-[1.2rem]">
                    A warm, secure place to chat with the people you care about and meet new ones without the noise.
                </p>

                <div className="mt-8 space-y-3">
                    <div className="rounded-[1.6rem] bg-white/20 p-4 backdrop-blur-sm ring-1 ring-white/25">
                        <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
                            Private Conversations
                        </p>
                        <p className="mt-2 text-sm leading-6 text-white/95 md:text-base">
                            Keep your messages simple, personal, and made for real connection.
                        </p>
                    </div>

                    <div className="rounded-[1.6rem] bg-white/20 p-4 backdrop-blur-sm ring-1 ring-white/25">
                        <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
                            Fast And Friendly
                        </p>
                        <p className="mt-2 text-sm leading-6 text-white/95 md:text-base">
                            Start chatting quickly with a clean and easy sign-up experience.
                        </p>
                    </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                    <div className="rounded-[1.4rem] bg-white/18 p-3 text-center ring-1 ring-white/20">
                        <p className="text-2xl font-bold">24/7</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/75">Connection</p>
                    </div>
                    <div className="rounded-[1.4rem] bg-white/18 p-3 text-center ring-1 ring-white/20">
                        <p className="text-2xl font-bold">Safe</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/75">Messaging</p>
                    </div>
                    <div className="rounded-[1.4rem] bg-white/18 p-3 text-center ring-1 ring-white/20">
                        <p className="text-2xl font-bold">Easy</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/75">Setup</p>
                    </div>
                </div>

                <div className="mt-5 pt-1">
                    <div className="rounded-[1.6rem] bg-stone-950/10 p-4 ring-1 ring-white/15">
                        <p className="text-sm text-white/85">Already have an account?</p>
                        <a href="/login" className="mt-2 inline-flex text-sm font-semibold text-white underline decoration-white/45 underline-offset-4">
                            Sign in to continue
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <section className="p-8 md:p-10">
            <div className="mx-auto max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">
                    Create Account
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-stone-900">
                    Join today
                </h2>

                <p className="mt-3 text-base leading-6 text-stone-600">
                    Create your Luma profile and start chatting in a space that feels simple, calm, and personal.
                </p>

                {error && (
                    <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <form action="/api/sign_up" method="post" className="mt-7 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-stone-700">First name</span>
                            <input type="text" name="first_name" autoComplete="given-name" required placeholder="Amin" defaultValue={first_name ?? ""} className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-5 py-3.5 text-lg text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100" />
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-stone-700">Last name</span>
                            <input type="text" name="last_name" autoComplete="family-name" required placeholder="Khattab" defaultValue={last_name ?? ""} className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-5 py-3.5 text-lg text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100" />
                        </label>
                    </div>

                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-stone-700">Username</span>
                        <input type="text" name="username" autoComplete="username" required placeholder="@amin" defaultValue={username ?? ""} className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-5 py-3.5 text-lg text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100" />
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-stone-700">Email address</span>
                        <input type="email" name="email" autoComplete="email" required placeholder="you@example.com" defaultValue={email ?? ""} className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-5 py-3.5 text-lg text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100" />
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-stone-700">Phone number</span>
                        <input type="tel" name="phone_number" autoComplete="tel" required placeholder="+964 770 000 0000" defaultValue={phone_number ?? ""} className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-5 py-3.5 text-lg text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100" />
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-stone-700">Password</span>
                        <input type="password" name="password" autoComplete="new-password" required placeholder="Create a strong password" minLength={8} className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-5 py-3.5 text-lg text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100" />
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-stone-700">Confirm password</span>
                        <input type="password" name="confirm_password" autoComplete="new-password" required placeholder="Repeat your password" className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-5 py-3.5 text-lg text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100" />
                    </label>

                    <label className="flex items-start gap-3 rounded-2xl bg-amber-50/80 p-3.5 text-sm text-stone-600 ring-1 ring-amber-100">
                        <input type="checkbox" name="agree_terms" required className="mt-1 h-4 w-4 rounded border-stone-300 text-amber-500 focus:ring-amber-300" />
                        <span>
                            I agree to the terms and privacy policy.
                        </span>
                    </label>

                    <button type="submit" className="w-full rounded-2xl bg-stone-900 px-5 py-3.5 text-base font-semibold text-white transition hover:bg-stone-800">
                        Create account
                    </button>
                </form>

                <p className="mt-5 text-center text-sm text-stone-500">
                    Already have an account?{" "}
                    <a href="/login" className="font-semibold text-amber-600 hover:text-amber-700">Sign in</a>
                </p>
            </div>
        </section>
      </div>
    </main>
    
  );
}
