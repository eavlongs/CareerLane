<template>
    <div :class="className">
        <template v-if="pageName != ''">
            <h1 class="font-bold text-xl">{{ props.pageName }}</h1>
        </template>
        <slot />
    </div>
</template>

<script lang="ts" setup>
interface Props {
    pageName?: string;
    class?: string;
    padded?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    pageName: "",
    class: "",
    padded: true
})

const className = computed(() => {
    return "mt-2 " + (props.padded ? "px-2 md:px-14 " : "") + props.class
})
</script>