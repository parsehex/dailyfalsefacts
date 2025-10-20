<script setup lang="ts">
import { ref, onMounted } from "vue";

interface Props {
  /** number of random facts to show */
  count?: number;
}

const props = withDefaults(defineProps<Props>(), {
  count: 16,
});

const facts = ref<string[]>([]);
const isLoading = ref(true);
const hasError = ref(false);

async function loadLies() {
  try {
    const res = await fetch("/old-false-facts.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const allFacts: string[] = await res.json();

    // Pick random unique facts
    const selected: string[] = [];
    while (selected.length < props.count && selected.length < allFacts.length) {
      const fact = allFacts[Math.floor(Math.random() * allFacts.length)];
      if (!selected.includes(fact)) selected.push(fact);
    }

    facts.value = selected;
  } catch (err) {
    console.error("Failed to load lies:", err);
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
}

onMounted(loadLies);
</script>

<template>
  <div
    class="lies-ticker left-0 absolute w-full overflow-hidden border-2 bg-background text-sm font-semibold tracking-wide uppercase shadow-sm"
  >
    <div class="absolute top-0 left-0 z-10 bg-red-600 px-3 py-1 text-white">
      Lies
    </div>

    <div class="py-1 pl-24 whitespace-nowrap animate-marquee">
      <template v-if="isLoading">Loading lies...</template>
      <template v-else-if="hasError">Error loading lies.</template>
      <template v-else>
        <span v-for="(fact, i) in facts" :key="i">
          {{ fact }}
          <span v-if="i < facts.length - 1" class="px-4">•</span>
        </span>
      </template>
    </div>
  </div>
</template>

<style scoped>
@keyframes marquee {
  0% {
    transform: translate3d(0%, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
}

.animate-marquee {
  display: inline-block;
  animation: marquee 120s linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .animate-marquee {
    animation-play-state: paused !important;
  }
}
</style>
