import { onMounted, onUnmounted, ref, unref } from "vue";
import type { Ref } from "vue";

type ContainerType = HTMLElement | Window | Document | null;

export const useScrollLoad = (
  scrollContainer: ContainerType | Ref<ContainerType>,
  url: (start: number, size: number) => string
) => {
  const size = 10;

  const list: Ref<any[]> = ref([]);
  const start = ref(0);

  const load = () => {
    fetchData();
  };

  const loadMore = () => {
    start.value = start.value + size;
    load();
  };

  const fetchData = () => {
    fetch(url(start.value, size))
      .then((res) => res.json())
      .then((res) => {
        list.value.push(...res);
      });
  };

  const getScrollRest = (element: HTMLElement) => {
    const clientHeight = element.clientHeight;
    const scrollHeight = element.scrollHeight;
    const scrollTop = element.scrollTop;

    return scrollHeight - scrollTop - clientHeight;
  };

  const handleScrollEvent = (e: Event) => {
    let element = e.target as HTMLElement;
    if ((e.target as Document).documentElement) {
      element = (e.target as Document).documentElement as HTMLElement;
    }

    const bottom = getScrollRest(element);
    if (bottom === 0) {
      loadMore();
    }
  };

  onMounted(() => {
    const element = unref(scrollContainer);

    if (element) {
      load();
      element.addEventListener("scroll", handleScrollEvent);
    }
  });

  onUnmounted(() => {
    const element = unref(scrollContainer);

    if (element) {
      element.removeEventListener("scroll", handleScrollEvent);
    }
  });

  return { list };
};
