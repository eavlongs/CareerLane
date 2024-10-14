<template>
    <Section title="Similar Jobs" :noData="false" :handleNoData="{
        hide: true
    }" class="mt-6">
        <JobPostCard v-for="j in jobs" :job="j" :key="j.id" />
    </Section>
</template>

<script lang="ts" setup>
import type { PartialJobPost } from '~/utils/types';

type Props = {
    jobs: PartialJobPost[];
}
const props = defineProps<Props>();

</script>
