import { onMounted, onUnmounted, ref, unref } from "vue";

export const useScrollLoad = (scrollContainer, url) => {
  const size = 10;

  const list = ref([]);
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

  const getScrollRest = (element) => {
    const clientHeight = element.clientHeight;
    const scrollHeight = element.scrollHeight;
    const scrollTop = element.scrollTop;

    return scrollHeight - scrollTop - clientHeight;
  };

  const handleScrollEvent = (e) => {
    let element = e.target;
    if (element.documentElement) {
      element = element.documentElement;
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
