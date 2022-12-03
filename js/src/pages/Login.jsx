export default function Login() {
  return (
    <div class="prime_color flex items-center justify-center">
      <div class="lg:grid min-h-screen lg:grid-cols-12 max-w-screen-2xl">
        <section class="relative flex h-32 items-end lg:col-span-5 lg:h-full xl:col-span-8">
          <div class="absolute h-full w-full bg-hero-graph-paper bg-gray-500 opacity-20"></div>
          <div class="hidden lg:relative lg:block lg:p-12">
            <dots />
            <h2 class="mt-6 text-2xl font-bold sm:text-3xl md:text-4xl">
              Dots leads you to the infinity
            </h2>
            <p class="mt-4 leading-relaxed">
              Unlimited contents, Be a Reader, Be a Writer.
            </p>
          </div>
        </section>

        <main
          aria-label="Main"
          class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-4"
        >
          <div class="max-w-xl lg:max-w-3xl flex-auto">
            <div class="relative -mt-16 block lg:hidden">
              <h1 class="mt-2 text-2xl font-bold sm:text-3xl md:text-4xl">
                Dots leads you to the infinity
              </h1>
              <p class="mt-4 leading-relaxed">
                Unlimited contents, Be a Reader, Be a Writer.
              </p>
            </div>

            <div my-8>
              <button class="rounded-full btn-ink w-full mb-4">
                Continue with Google
              </button>
              <button class="rounded-full btn-ink w-full">
                Continue with Apple
              </button>
            </div>

            <div class="flex items-center justify-between gap-2">
              <span class="flex-1 border-t-1 border-pulp-100" />
              <span class="flex-none text-pulp-200 text-sm uppercase">or</span>
              <span class="flex-1 border-t-1 border-pulp-100" />
            </div>

            <form action="#" class="my-8 grid grid-cols-6 gap-6">
              <div class="col-span-6">
                <label text_label for="Email">
                  Email
                </label>
                <input text_input type="email" id="Email" name="email" />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label text_label for="Password">
                  Password
                </label>
                <input
                  text_input
                  type="password"
                  id="Password"
                  name="password"
                />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label text_label for="PasswordConfirmation">
                  Password Confirmation
                </label>
                <input
                  text_input
                  type="password"
                  id="PasswordConfirmation"
                  name="password_confirmation"
                />
              </div>

              <div class="col-span-6">
                <label for="MarketingAccept" class="flex gap-4">
                  <input
                    type="checkbox"
                    id="MarketingAccept"
                    name="marketing_accept"
                    class="h-5 w-5 rounded-sm shadow-sm"
                  />

                  <span class="text-sm">
                    I want to receive emails about events.
                  </span>
                </label>
              </div>

              <div class="col-span-6">
                <p class="text-sm">
                  By creating an account, you agree to our{" "}
                  <a href="#" class="underline">
                    terms and conditions
                  </a>
                  {" and "}
                  <a href="#" class="underline">
                    privacy policy{" "}
                  </a>
                  .
                </p>
              </div>

              <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button btn-ink>Create an account</button>

                <p class="mt-4 text-sm sm:mt-0">
                  Already have an account?{" "}
                  <a href="#" class="underline">
                    Log in
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
