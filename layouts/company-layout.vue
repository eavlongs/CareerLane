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
                                <NuxtLink to="/c/dashboard">
                                    <h1 class="font-bold text-2xl">CareerLane</h1>
                                </NuxtLink>
                            </div>
                            <div class="flex flex-col h-[calc(100dvh-4rem)]">
                                <UButton v-for="l in navLinks" :to="l.path" variant="ghost"
                                  class="py-4 text-lg px-4 hover:bg-gray-200" color="black" @click="isOpen = false">
                                    {{ l.name }}
                                </UButton>
                                <div class="flex-grow w-full flex items-end justify-center mb-8">
                                    <LogOutButton class="py-2 text-lg px-8" />
                                </div>
                            </div>
                        </div>
                    </USlideover>

                    <NuxtLink to="/c/dashboard">
                        <h1 class="font-bold text-2xl">CareerLane</h1>
                    </NuxtLink>

                    <div class="flex gap-x-2 items-center ml-auto">
                        <UButton to="/" size="md">Home</UButton>
                        <UButton variant="ghost" color="black"
                          class="flex gap-x-2 hover:bg-gray-200 max-w-[27rem] items-center" to="/c/profile">

                            <UAvatar
                              :src="user?.avatar_url ? (`${runtimeConfig.public.storageUrlPrefix}${user.avatar_url}`) : COMPANY_LOGO_FALLBACK"
                              size="lg" img-class="object-contain" />

                            <h1 class="font-semibold text-lg line-clamp-1">{{ user!.name }}</h1>

                        </UButton>
                    </div>
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

const user = useUser()
const runtimeConfig = useRuntimeConfig()

</script>

<style></style>