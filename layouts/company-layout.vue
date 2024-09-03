<template>
    <div class="w-full">
        <div class="py-16 max-w-[2000px] mx-auto">
            <div class="fixed z-10 h-16 w-full bg-white grid items-center top-0 max-w-[2000px]">
                <div class="flex items-center gap-x-2 px-4 ">
                    <UButton icon="ic:round-menu" class="hover:bg-gray-200" size="xl" variant="ghost" color="black"
                      @click="isOpen = true" />
                    <USlideover v-model="isOpen" side="left">
                        <div>
                            <div class="h-16 px-4 flex items-center gap-x-4 border-b">
                                <UButton icon="ic:round-menu" class="hover:bg-gray-200" size="xl" variant="ghost"
                                  color="black" @click="isOpen = false" />
                                <NuxtLink to="/">
                                    <h1 class="font-bold text-2xl">CareerLane</h1>
                                </NuxtLink>
                            </div>
                            <div class="flex flex-col h-[calc(100vh-4rem)]">
                                <UButton v-for="l in navLinks" :to="l.path" variant="ghost"
                                  class="py-4 text-lg px-4 hover:bg-gray-200" color="black">
                                    {{ l.name }}
                                </UButton>
                                <div class="flex-grow w-full flex items-end justify-center mb-8">
                                    <UButton class="py-2 text-lg px-8" color="red" leading-icon="ic:outline-log-out">Log
                                        Out</UButton>
                                </div>
                            </div>
                        </div>
                    </USlideover>
                    <NuxtLink to="/">
                        <h1 class="font-bold text-2xl">CareerLane</h1>
                    </NuxtLink>

                    <UButton variant="ghost" color="black"
                      class="flex gap-x-2 ml-auto hover:bg-gray-200 max-w-[27rem] items-center" to="/c/profile">

                        <UAvatar :src="company.logo" size="lg" />
                        <!-- <div class="flex flex-col"> -->
                        <h1 class="font-semibold text-lg line-clamp-1">{{ company.name }}</h1>
                        <!-- <p class="text-sm">{{ company.location }}</p> -->
                        <!-- </div> -->

                    </UButton>
                </div>
            </div>

            <div class="w-full mx-auto">
                <slot />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const isOpen = ref(false)

const navLinks: { name: string; path: string }[] = [
    { name: "Dashboard", path: "/c/dashboard" },
    { name: "Jobs Posted", path: "/c/jobs" },
    { name: "Blacklisted Candidates", path: "/c/blacklist" },
    { name: "Company Profile", path: "/c/profile" },
    { name: "Account Management", path: "/c/account-management" },
]

const company = ref<Company>({
    id: "1",
    name: "Company Name",
    logo: "https://via.placeholder.com/150",
    description: "Company Description",
    location: "Company Location",
})

</script>

<style></style>