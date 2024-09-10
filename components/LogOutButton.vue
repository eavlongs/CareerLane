<template>
    <div>
        <UButton
            color="red"
            size="md"
            :class="class"
            leading-icon="ic:outline-log-out"
            @click="logOut"
            type="submit"
            >Log Out
        </UButton>
    </div>
</template>

<script lang="ts" setup>
type Props = {
    class?: string;
};

const props = withDefaults(defineProps<Props>(), {
    class: "",
});

async function logOut() {
    await $fetch("/api/logout", {
        method: "POST",
    });

    window.location.href = "/";
}
</script>

<style></style>
