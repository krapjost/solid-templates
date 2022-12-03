import { A } from "@solidjs/router";
import { createSignal, createEffect } from "solid-js";


const Header = () => {
  const [open, setOpen] = createSignal(false);
  const [mode, setMode] = createSignal(false);
  const [user, setUser] = createSignal(null);

  createEffect(() => {
    console.log(mode());
    if (localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })

  const toggleOpen = () => {
    setOpen(!open());
  }

  const toggleMode = () => {
    localStorage.theme = !mode() ? 'dark' : '';
    setMode(!mode());
  }

  const loginUser = () => {
    setUser({
      "id": "1",
      "name": "gidoong",
      "email": "gii@gmail.com",
      "img": "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
    })
  }

  return (
    <header class="fixed z-50 w-full shadow-sm bg-pulp-500/50">
      <div class="mx-auto max-w-screen-2xl py-1 sm:px-6 lg:px-8">
        <div class="flex items-center gap-2">
          <div class="flex flex-auto items-center gap-2">
            <A
              href="/"
              class="icon_color flex items-center justify-center shrink-0 rounded-lg h-10 w-10 p-2.5 shadow-sm"
            >
              <sr-only>Home</sr-only>
              <div i-carbon-home text-xl />
            </A>
            <div class="relative w-full max-w-lg">
              <label class="sr-only" for="search"> Search </label>
              <input
                class="prime_color h-10 w-full rounded-full border-none pl-4 pr-10 text-sm shadow-sm"
                id="search"
                type="search"
                placeholder="Search books..."
              />
              <button
                type="button"
                class="icon_color absolute top-1/2 right-1 -translate-y-1/2 rounded-full p-2 transition"
              >
                <sr-only>Submut Search</sr-only>
                <div i-carbon-search text-xl />
              </button>
            </div>
          </div>

          <div class="flex flex-none items-center justify-between gap-2 sm:justify-end" >

            <div class="flex gap-2">
              <A href="/writes"
                class="icon_color block shrink-0 rounded-full p-2 shadow-sm" >
                <div class="i-carbon-pen-fountain text-xl" />
              </A>
            </div>

            <div class="icon_color rounded-md">
              <button
                type="button"
                onClick={toggleOpen}
                class="flex items-center shrink-0 rounded-lg p-2.5 shadow-sm"
              >
                <sr-only>Menu</sr-only>
                {user()
                  ? <img
                    alt="Man"
                    src={user().img}
                    class="h-4 w-4 rounded-full object-cover" />
                  : <div class="h-4 w-4 rounded-full">
                    <div class="i-carbon-user" />
                  </div>
                }
                <div class={open() ? "i-carbon-chevron-up" : "i-carbon-chevron-down"} text-xl />
              </button>
              {open() &&
                <div class="relative">
                  <div
                    class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-sm modal_color"
                    role="menu"
                  >
                    <div class="flow-root py-2">
                      <div class="divider">
                        <div class="modal_item_color">
                          <button
                            type="button"
                            onClick={toggleMode}
                            class="flex items-center justify-between px-4 py-2 w-full text-sm">
                            <label for="DarkModeToggle" class="flex-none relative h-6 w-10 cursor-pointer">
                              <input
                                type="checkbox"
                                id="DarkModeToggle"
                                checked={mode()}
                                disabled
                                class="peer sr-only"
                              />
                              <span class="icon_color absolute inset-0 z-10 inline-flex items-center justify-center h-6 w-6 rounded-full transition peer-checked:translate-x-4" >
                                <div h-4 w-4 class={mode() ? "i-carbon-moon" : "i-carbon-sun"} />
                              </span>
                              <span class="prime_color absolute inset-0 rounded-full" />
                            </label>
                            <span ml-4 > {mode() ? "Light Mode" : "Dark Mode"} </span>
                          </button>
                          {
                            user() &&
                            <A href={`/user/${user().id}`}>
                              <p class="ml-2 hidden text-left text-xs sm:block">
                                <strong class="block font-medium">{user().name}</strong>
                                <span class="text-gray-500"> {user().email}</span>
                              </p>
                            </A>
                          }

                        </div>

                        <div class="modal_item_color">
                          <A href="/login" class="flex items-center justify-between w-ful px-4 py-2 text-sm">
                            <span class="icon_color inline-flex items-center justify-center h-6 w-6 rounded-full" >
                              <div h-4 w-4 class="i-carbon-login" />
                            </span>
                            Log In
                          </A>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }

            </div>
          </div>
        </div>
      </div >
    </header>
  )
};

export default Header;
