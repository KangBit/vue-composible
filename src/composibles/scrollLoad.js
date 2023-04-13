import { onMounted, onUnmounted, ref, unref } from "vue";

export const useScrollLoad = (target, url) => {
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
    const bottom = getScrollRest(e.target);

    if (bottom === 0) {
      loadMore();
    }
  };

  onMounted(() => {
    if (!target.value) {
      return;
    }

    load();
    target.value.addEventListener("scroll", handleScrollEvent);
  });

  onUnmounted(() => {
    if (!target.value) {
      return;
    }

    target.value.removeEventListener("scroll", handleScrollEvent);
  });

  return { list };
};
