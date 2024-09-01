<template>
    <div class="section" :class="props.class">
        <p class="text-xl font-semibold mb-4">{{ title }}</p>
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