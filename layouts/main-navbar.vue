<template>
    <div class="w-screen">
        <div class="py-16 max-w-[2000px] mx-auto">
            <div class="fixed h-16 w-full bg-white grid items-center top-0 max-w-[2000px]">
                <div class="flex items-center px-16">
                    <div class="flex items-center gap-x-4">
                        <UButton icon="ic:round-menu" class="hover:bg-gray-200 md:hidden" size="xl" variant="ghost"
                          color="black" @click="isOpen = true" />
                        <USlideover v-model="isOpen" side="left" class="md:hidden">
                            <div>
                                <div class="h-16 px-8 flex items-center gap-x-4 border-b">
                                    <UButton icon="ic:round-menu" class="hover:bg-gray-200" size="xl" variant="ghost"
                                      color="black" @click="isOpen = false" />
                                    <NuxtLink to="/">
                                        <h1 class="font-bold text-2xl">CareerLane</h1>
                                    </NuxtLink>
                                </div>
                                <div class="mt-6 flex flex-col">
                                    <UButton v-for="l in navLinks" :to="l.path" variant="ghost"
                                      class="py-4 text-lg px-8 hover:bg-gray-200" color="black">
                                        {{ l.name }}
                                    </UButton>
                                </div>
                            </div>
                        </USlideover>
                        <NuxtLink to="/">
                            <h1 class="font-bold text-2xl">CareerLane</h1>
                        </NuxtLink>
                    </div>
                    <div class="ml-auto font-semibold text-lg flex items-center gap-x-2">
                        <ULink v-for="l in navLinks" :to="l.path" class="p-2 hover:text-blue-400 hidden md:inline"
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
const isOpen = ref(false)

useHead({
    title: `${"CareerLane"}`,
    // meta: [
    //     { name: 'description', content: '' }
    // ],

})

const role: "user" | "company" | null = null
</script>

<style></style>