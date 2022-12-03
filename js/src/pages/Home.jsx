import { A } from "@solidjs/router";
import {
  For,
  createResource,
  createEffect,
  createSignal,
  Show,
  Switch,
  Match,
  onCleanup,
} from "solid-js";
import { Motion, Presence } from "@motionone/solid";
import { Rerun } from "@solid-primitives/keyed";

const fetchImage = async () => {
  const res = await fetch("https://random.dog/woof?include=jpg");
  const data = await res.text();
  return `https://random.dog/${data}`;
};

function MainCarouselItem(props) {
  return (
    <div class="h-[70vh] w-full relative">
      <Suspense fallback={<p>Loading~~</p>}>
        <div class="full z-1 bg-white/70 dark:bg-black/70 absolute" />
        <img class="full object-cover" src={props.book.thumbnail} />
        <div class="flex flex-col items-start justify-between cursor-pointer z-2 p-4 rounded-lg backdrop-blur-md bg-pulp-200/20 w-2/3 h-1/3 absolute bottom-20 left-1/2 -translate-x-1/2 transition-transform group-hover:scale-110">
          <div class="flex items-start justify-between w-full">
            <span class="flex-none bg-pulp-500 text-pulp-800 text-4xl font-bold rounded-md py-1 px-2">
              {props.book.name}
            </span>
            <div class="flex shrink-0 items-center bg-white rounded-md pl-2 py-1 divide-x divide-pulp-500">
              <div class="i-carbon-thumbs-up mr-2" />
              <span class="px-2">{props.book.likes}</span>
            </div>
          </div>
          <p>{props.book.author}</p>
          <p>{props.book.description}</p>
          <p>
            <For each={props.book.tags}>
              {(tag) => (
                <span class="bg-white py-1 px-2 text-sm mr-1 rounded-md">
                  {tag}
                </span>
              )}
            </For>
          </p>
        </div>
        <div class="bottom-16 h-[20vh] z-1 w-full bg-gradient-to-t from-pulp-50 to-white/0 dark:from-pulp-800 dark:to-black/0 absolute" />
        <div class="bottom-0 h-16 z-1 w-full bg-pulp-50 absolute" />
      </Suspense>
    </div>
  );
}

function MainCarousel(props) {
  const books = () => props.books || [{}];

  const [index, setIndex] = createSignal(0);
  const [paused, setPaused] = createSignal(false);

  const next = () => {
    if (index() >= books().length - 1) {
      setIndex(0);
    } else {
      setIndex((i) => ++i);
    }
  };

  const slide = setInterval(() => {
    if (paused()) return;
    next();
  }, 3000);

  onCleanup(() => clearInterval(slide));

  return (
    <section
      onMouseLeave={() => setPaused(false)}
      onMouseEnter={() => setPaused(true)}
      class="h-[70vh] bg-pulp-50 dark:bg-pulp-800 overflow-hidden relative"
    >
      <div class="flex items-center justify-between w-full absolute bottom-0 z-15 py-2 px-4">
        <button
          onClick={() => next()}
          class="flex items-center justify-center gap-2 border transition hover:border-2 text-black border-black rounded-md h-12 p-2"
        >
          <span i-carbon-bookmark-add />
          <span>Add</span>
        </button>
        <A
          href={`/book/${books()[index()].id}`}
          class="flex items-center justify-center gap-2 border transition hover:border-2 text-black border-black rounded-md h-12 p-2"
        >
          <span i-carbon-book />
          <span>Read</span>
        </A>
        <button
          onClick={() => next()}
          class="flex items-center justify-center border transition hover:border-2 text-black border-black rounded-full w-12 h-12 p-2"
        >
          <div i-carbon-chevron-right />
        </button>
      </div>
      <Presence exitBeforeEnter>
        <Rerun on={index()}>
          <Motion
            class="group"
            initial={{ x: innerWidth }}
            animate={{ x: 0, transition: { delay: 0.01 } }}
            transition={{ duration: 0.2 }}
            exit={{ x: -innerWidth }}
          >
            <MainCarouselItem book={books()[index()]} />
          </Motion>
        </Rerun>
      </Presence>
    </section>
  );
}

function ListCard(props) {
  const [img] = createResource(fetchImage);

  return (
    <A
      href={`/book/${props.id}`}
      class="snap-center flex flex-shrink-0 w-34 h-55 sm:w-42 sm:h-68 relative overflow-hidden group rounded-md shadow-sm"
    >
      <span class="z-10 absolute right-2 top-2 text-xs px-3 py-1.5 sm:right-4 sm:top-4 font-medium text-pulp-600 bg-pulp-50 rounded-full">
        new
      </span>
      {img.loading ? (
        <div>Loading</div>
      ) : (
        <img
          src={img()}
          alt="book cover"
          class="w-full object-cover transition duration-500 group-hover:scale-105"
        />
      )}
      <div class="absolute z-5 w-full h-full bg-gray-800/50" />
      <div class="absolute z-8 bottom-2 left-2 sm:bottom-4 sm:left:4 text-gray-100">
        <h3 class="text-md sm:text-lg text-gray-100 group-hover:underline group-hover:underline-offset-4">
          <span class="sr-only">book name</span>
          {props.name}
        </h3>
        <p class="mt-2">
          <span class="sr-only">author</span>
          <span class="text-sm tracking-wider">{props.author}</span>
        </p>
        <span class="text-xs tracking-wider">{props.description}</span>
      </div>
    </A>
  );
}

function BookList(props) {
  return (
    <section class="mx-auto mt-6 overflow-x-hidden">
      <div class="max-w-screen-xl flex items-center justify-between mx-4 my-2 sm:mx-6 sm:my-4">
        <header>
          <h2 class="text-xl font-bold text-gray-900 sm:text-2xl">
            {props.sectionName}
          </h2>
        </header>
        <div>
          <label for="SortBy" class="sr-only">
            SortBy
          </label>
          <select
            id="SortBy"
            class="w-32 h-10 text-sm border-gray-300 rounded p-2"
          >
            <option value="Likes">Likes</option>
            <option value="Subs">Subscribe</option>
            <option value="Date">Date</option>
          </select>
        </div>
      </div>
      <div class="w-screen mx-auto overflow-x-hidden overflow-y-hidden">
        <div class="container-snap px-4 h-full w-full flex gap-2 sm:gap-4 items-center justify-start transition ease-out duration-700 snap-x overflow-x-auto">
          <Suspense fallback={<h2>fetching books</h2>}>
            <For each={props.books}>
              {(book) => (
                <ListCard id={book.id} name={book.name} author={book.author} />
              )}
            </For>
          </Suspense>
        </div>
      </div>
    </section>
  );
}

function SubHeader() {
  return (
    <div class="w-full flex items-center justify-end absolute top-12 p-1 z-10">
      <button
        type="button"
        class="flex items-center justify-between gap-2 py-2 px-4 text-md  font-bold text-black dark:text-white"
      >
        Category
        <div class="i-carbon-chevron-down text-xl" />
      </button>
    </div>
  );
}

export default function Home() {
  const { mainSection, bestSection, newSection, readingSection } =
    fetchBookListData();

  return (
    <div class="bg-pulp-50 dark:bg-pulp-800 min-h-screen">
      <SubHeader />
      <SuspenseList revealOrder="forwards">
        <MainCarousel books={mainSection()} />
        <BookList sectionName="Best" books={bestSection()} />
        <BookList sectionName="New" books={newSection()} />
        <BookList sectionName="Reading" books={readingSection()} />
      </SuspenseList>
    </div>
  );
}

function fetchBookListData() {
  const [mainSection] = createResource(fetchMainSection);
  const [bestSection] = createResource(fetchBestSection);
  const [newSection] = createResource(fetchNewSection);
  const [readingSection] = createResource(fetchReadingSection);
  return { mainSection, bestSection, newSection, readingSection };
}

function fetchMainSection() {
  return mockApiReq("main", 400);
}
function fetchBestSection() {
  return mockApiReq("best", 1000);
}
function fetchNewSection() {
  return mockApiReq("new", 500);
}
function fetchReadingSection() {
  return mockApiReq("reading", 800);
}

const mockApiReq = (q, delay) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve(mockData[q]);
    }, delay)
  );

const mockData = {
  main: [
    {
      id: "1",
      name: "one",
      author: "au one",
      thumbnail: "https://mdbcdn.b-cdn.net/img/new/slides/041.webp",
      description: "alksdlakw awkdmlkwad lakwmd l",
      tags: ["adi", "asdb", "nlkc", "lkdd"],
      likes: 12,
      recent_date: "2021-12-01",
      publish_date: "2020-12-10",
    },
    {
      id: "2",
      name: "two",
      author: "au one",
      thumbnail: "https://mdbcdn.b-cdn.net/img/new/slides/042.webp",
      description: "alksdlakw awkdmlkwad lakwmd l",
      tags: ["a", "dm", "c", "d"],
      likes: 12,
      recent_date: "2021-12-01",
      publish_date: "2020-12-10",
    },
    {
      id: "3",
      name: "three",
      author: "au one",
      thumbnail: "https://mdbcdn.b-cdn.net/img/new/slides/043.webp",
      description: "alksdlakw awkdmlkwad lakwmd l",
      tags: ["a", "aw", "dmlw"],
      likes: 12,
      recent_date: "2021-12-01",
      publish_date: "2020-12-10",
    },
    {
      id: "4",
      name: "four",
      author: "fmlqek",
      thumbnail: "https://mdbcdn.b-cdn.net/img/new/slides/044.webp",
      description: "dawlkdn awkdmlkwad lakwmd l",
      tags: ["a", "b", "c", "d", "m"],
      likes: 12,
      recent_date: "2021-12-01",
      publish_date: "2020-12-10",
    },
  ],
  best: [
    {
      id: "1",
      name: "book one",
      author: "au one",
      description: "alksdlakw awkdmlkwad lakwmd l",
      tags: ["a", "b", "c", "d"],
      likes: 12,
      recent_date: "2021-12-01",
      publish_date: "2020-12-10",
    },
    {
      id: "2",
      name: "book two",
      author: "au two",
      description: "edlakwm awkdmlkwad lakwmd l",
      tags: ["a", "b", "c"],
      likes: 12,
      recent_date: "2021-12-01",
      publish_date: "2020-12-10",
    },
    {
      id: "3",
      name: "book thr",
      author: "au thr",
      description: "lakwmd awkdmlkwad lakwmd l",
      tags: ["a", "b", "d"],
      likes: 12,
      recent_date: "2021-12-01",
      publish_date: "2020-12-10",
    },
    {
      id: "3",
      name: "book thr",
      author: "au thr",
      description: "lakwmd awkdmlkwad lakwmd l",
      tags: ["a", "b", "d"],
      likes: 12,
      recent_date: "2021-12-01",
      publish_date: "2020-12-10",
    },
    {
      id: "3",
      name: "book thr",
      author: "au thr",
      description: "lakwmd awkdmlkwad lakwmd l",
      tags: ["a", "b", "d"],
      likes: 12,
      recent_date: "2021-12-01",
      publish_date: "2020-12-10",
    },
    {
      id: "3",
      name: "book thr",
      author: "au thr",
      description: "lakwmd awkdmlkwad lakwmd l",
      tags: ["a", "b", "d"],
      likes: 12,
      recent_date: "2021-12-01",
      publish_date: "2020-12-10",
    },
    {
      id: "3",
      name: "book thr",
      author: "au thr",
      description: "lakwmd awkdmlkwad lakwmd l",
      tags: ["a", "b", "d"],
      likes: 12,
      recent_date: "2021-12-01",
      publish_date: "2020-12-10",
    },
    {
      id: "3",
      name: "book thr",
      author: "au thr",
      description: "lakwmd awkdmlkwad lakwmd l",
      tags: ["a", "b", "d"],
      likes: 12,
      recent_date: "2021-12-01",
      publish_date: "2020-12-10",
    },
  ],

  new: [
    {
      id: "1",
      name: "book one",
      author: "au one",
      description: "alksdlakw awkdmlkwad lakwmd l",
      tags: ["a", "b", "c", "d"],
      likes: 12,
      recent_date: "2021-12-01",
      publish_date: "2020-12-10",
    },
    {
      id: "2",
      name: "book two",
      author: "au two",
      description: "edlakwm awkdmlkwad lakwmd l",
      tags: ["a", "b", "c"],
      likes: 12,
      recent_date: "2021-12-01",
      publish_date: "2020-12-10",
    },
    {
      id: "3",
      name: "book thr",
      author: "au thr",
      description: "lakwmd awkdmlkwad lakwmd l",
      tags: ["a", "b", "d"],
      likes: 12,
      recent_date: "2021-12-01",
      publish_date: "2020-12-10",
    },
    {
      id: "3",
      name: "book thr",
      author: "au thr",
      description: "lakwmd awkdmlkwad lakwmd l",
      tags: ["a", "b", "d"],
      likes: 12,
      recent_date: "2021-12-01",
      publish_date: "2020-12-10",
    },
    {
      id: "3",
      name: "book thr",
      author: "au thr",
      description: "lakwmd awkdmlkwad lakwmd l",
      tags: ["a", "b", "d"],
      likes: 12,
      recent_date: "2021-12-01",
      publish_date: "2020-12-10",
    },
    {
      id: "3",
      name: "book thr",
      author: "au thr",
      description: "lakwmd awkdmlkwad lakwmd l",
      tags: ["a", "b", "d"],
      likes: 12,
      recent_date: "2021-12-01",
      publish_date: "2020-12-10",
    },
    {
      id: "3",
      name: "book thr",
      author: "au thr",
      description: "lakwmd awkdmlkwad lakwmd l",
      tags: ["a", "b", "d"],
      likes: 12,
      recent_date: "2021-12-01",
      publish_date: "2020-12-10",
    },
    {
      id: "3",
      name: "book thr",
      author: "au thr",
      description: "lakwmd awkdmlkwad lakwmd l",
      tags: ["a", "b", "d"],
      likes: 12,
      recent_date: "2021-12-01",
      publish_date: "2020-12-10",
    },
  ],
};
