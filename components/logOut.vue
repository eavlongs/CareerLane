<script lang="ts" setup>
async function logOut() {
    await $fetch("/api/logout", {
        method: "POST",
    });

    window.location.href = "/";
}
</script>

<template>
    <div>
        <form @submit.prevent="logOut">
            <UButton
                color="red"
                size="md"
                class="ml-4 p-3"
                leading-icon="ic:outline-log-out"
                type="submit"
                >Log Out
            </UButton>
        </form>
    </div>
</template>

<style></style>
