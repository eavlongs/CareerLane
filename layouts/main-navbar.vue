<template>
    <div class="w-screen">
        <div class="py-16 max-w-[2000px] mx-auto">
            <div class="fixed h-16 w-full bg-white flex items-center px-16 top-0 max-w-[2000px]">
                <NuxtLink to="/">
                    <h1 class="font-bold text-2xl">CareerLane</h1>
                </NuxtLink>
                <div class="ml-auto font-semibold text-lg flex items-center gap-x-2">
                    <ULink v-for="l in navLinks" :to="l.path" class="p-2 hover:text-blue-400"
                      :active="route.path === l.path" active-class="text-blue-500">
                        {{ l.name }}
                    </ULink>
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
            <div class="w-4/5 mx-auto">
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

const route = useRoute()

useHead({
    title: `${"CareerLane"}`,
    // meta: [
    //     { name: 'description', content: '' }
    // ],

})

const role: "user" | "company" | null = null
</script>

<style></style>