<template>
    <div class="section" :class="props.class">
        <div class="flex items-center justify-between  mb-4">
            <p class="text-xl font-semibold">{{ title }}</p>
            <slot name="buttons" />
        </div>
        <slot />
        <template v-if="linkForSeeAllBtn">
            <div class="flex mt-4">
                <UButton class="block ml-auto" variant="link" :to="linkForSeeAllBtn">
                    <template v-if="seeAllText">{{ seeAllText }}</template>
                    <template v-else>See All {{ title }}</template>
                </UButton>
            </div>
        </template>

        <!-- TODO: add a condition for pagination -->
    </div>
</template>

<script lang="ts" setup>
type Props = {
    title: string;
    class?: string;
    linkForSeeAllBtn?: string;
    seeAllText?: string;
}

const props = withDefaults(defineProps<Props>(), {
    class: "",
})
</script>

<style></style>