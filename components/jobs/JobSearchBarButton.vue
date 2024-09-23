<template>
    <UButton :to="path" size="lg" @click="emits('click')">Search</UButton>
</template>

<script lang="ts" setup>
type Props = {
    query: string;
}

const props = defineProps<Props>()
const emits = defineEmits(["click"])
const path = computed(() => {
    return queryBuilder('/jobs', {
        q: props.query
    })
})
</script>

<style></style>