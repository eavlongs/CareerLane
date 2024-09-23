<template>
    <div>

    </div>
</template>

<script lang="ts" setup>
import { type JobSearchOptions } from "~/utils/types"

type Props = {
    modelValue: JobSearchOptions;
}

const props = defineProps<Props>();
const emits = defineEmits(["update:modelValue"]);

const updateModelValue = (value: JobSearchOptions) => {
    emits("update:modelValue", value);
}
</script>

<style></style>