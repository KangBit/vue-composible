import { onMounted, onUnmounted, ref, unref } from "vue";
import type { Ref } from "vue";

type ContainerType = HTMLElement | Window | Document | null;

export const useScrollLoad = <ListItem>(
  scrollContainer: ContainerType | Ref<ContainerType>,
  url: (start: number, size: number) => string
) => {
  const size = 10;

  const list: Ref<ListItem[]> = ref([]);
  const start = ref(0);
  const isLoading = ref(false);

  const load = () => {
    fetchData();
  };

  const loadMore = () => {
    if (isLoading.value) {
      return;
    }

    start.value = start.value + size;
    load();
  };

  const fetchData = () => {
    isLoading.value = true;
    fetch(url(start.value, size))
      .then((res) => res.json())
      .then((res) => {
        list.value.push(...res);
      })
      .catch((err) => {
        start.value = start.value - size;
      })
      .finally(() => {
        isLoading.value = false;
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
    if (bottom < element.clientHeight * 2) {
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
