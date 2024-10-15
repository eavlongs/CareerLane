<template>
    <UButton color="red" size="md" :class="class" leading-icon="ic:outline-log-out" @click="logOut" type="submit">Log
        Out
    </UButton>
</template>

<script lang="ts" setup>
type Props = {
    class?: string;
};

const props = withDefaults(defineProps<Props>(), {
    class: "",
});


</script>

<style></style>
