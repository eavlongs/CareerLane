<template>
    <div class="w-screen">
        <div class="py-16 max-w-[2200px] mx-auto">
            <div class="fixed h-16 w-full bg-white flex items-center px-16 top-0 max-w-[2200px]">
                <NuxtLink to="/">
                    <h1 class="font-bold text-2xl">CareerLane</h1>
                </NuxtLink>
                <div class="ml-auto font-semibold text-lg flex items-center gap-x-2">
                    <NuxtLink v-for="l in navLinks" :to="l.path" class="nav-link">
                        {{ l.name }}
                    </NuxtLink>
                    <div class="ml-4 flex items-center">
                        <template v-if="role === null">
                            <UButton variant="ghost" to="/sign-in">Log In</UButton>
                            <UButton variant="ghost" to="/sign-up">Register</UButton>
                        </template>

                        <template v-else-if="role === 'user' || role === 'company'">
                            <UButton to="/dashboard">Dashboard</UButton>
                        </template>
                    </div>
                </div>
            </div>
            <div>
                <slot />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const navLinks: { name: string; path: string }[] = [
    { name: "About Us", path: "/about-us" },
    { name: "Jobs", path: "/jobs" },
    { name: "Companies", path: "/companies" }
]

const role: "user" | "company" | null = "user"
</script>

<style>
.nav-link {
    @apply cursor-pointer p-2;
}
</style>