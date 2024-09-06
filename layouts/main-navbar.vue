<template>
    <div class="w-full">
        <div class="py-16 max-w-[2000px] mx-auto">
            <div
                class="fixed z-10 h-16 w-full bg-white grid items-center top-0 max-w-[2000px]"
            >
                <div class="flex items-center justify-between px-4 md:px-16">
                    <div class="flex items-center gap-x-2">
                        <UButton
                            icon="ic:round-menu"
                            class="hover:bg-gray-200 md:hidden"
                            size="xl"
                            variant="ghost"
                            color="black"
                            @click="isOpen = true"
                        />
                        <USlideover
                            v-model="isOpen"
                            side="left"
                            class="md:hidden"
                        >
                            <div>
                                <div
                                    class="h-16 px-4 flex items-center gap-x-4 border-b"
                                >
                                    <UButton
                                        icon="ic:round-menu"
                                        class="hover:bg-gray-200"
                                        size="xl"
                                        variant="ghost"
                                        color="black"
                                        @click="isOpen = false"
                                    />
                                    <NuxtLink to="/">
                                        <h1 class="font-bold text-2xl">
                                            CareerLane
                                        </h1>
                                    </NuxtLink>
                                </div>
                                <div
                                    class="flex flex-col h-[calc(100dvh-4rem)]"
                                >
                                    <UButton
                                        v-for="l in navLinks"
                                        :to="l.path"
                                        variant="ghost"
                                        class="py-4 text-lg px-4 hover:bg-gray-200"
                                        color="black"
                                    >
                                        {{ l.name }}
                                    </UButton>
                                    <template
                                        v-if="
                                            user &&
                                            user.role == UserTypeEnum.User
                                        "
                                    >
                                        <UButton
                                            to="/profile"
                                            variant="ghost"
                                            class="py-4 text-lg px-4 hover:bg-gray-200"
                                            color="black"
                                        >
                                            My Profile
                                        </UButton>
                                        <div
                                            class="flex-grow w-full flex items-end justify-center mb-8"
                                        >
                                            <UButton
                                                class="py-2 text-lg px-8"
                                                color="red"
                                                leading-icon="ic:outline-log-out"
                                                >Log Out</UButton
                                            >
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </USlideover>
                        <NuxtLink to="/">
                            <h1 class="font-bold text-2xl">CareerLane</h1>
                        </NuxtLink>
                    </div>

                    <div
                        class="font-semibold text-lg flex items-center gap-x-2"
                    >
                        <ULink
                            v-for="l in navLinks"
                            :to="l.path"
                            class="p-2 hover:text-blue-400 hidden md:inline"
                            :active="route.path === l.path"
                            active-class="text-blue-500"
                        >
                            {{ l.name }}
                        </ULink>
                        <div class="flex items-center">
                            <template v-if="!user">
                                <UButton variant="ghost" to="/login"
                                    >Log In</UButton
                                >
                                <UButton variant="ghost" to="/register"
                                    >Register</UButton
                                >
                            </template>

                            <template
                                v-else-if="user.role == UserTypeEnum.Company"
                            >
                                <UButton to="/dashboard">Dashboard</UButton>
                                <UButton
                                    color="red"
                                    size="md"
                                    class="ml-4"
                                    leading-icon="ic:outline-log-out"
                                    >Log Out</UButton
                                >
                            </template>

                            <template v-else>
                                <div class="hidden md:flex">
                                    <UButton
                                        variant="ghost"
                                        color="black"
                                        class="flex gap-x-2 ml-auto hover:bg-gray-200 max-w-[27rem] items-center"
                                    >
                                        <UAvatar
                                            src="/user.png"
                                            size="md"
                                            class="border"
                                        />
                                        <h1
                                            class="font-semibold text-lg line-clamp-1"
                                        >
                                            {{ user.name }}
                                        </h1>
                                    </UButton>

                                    <logOut />
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full md:w-4/5 mx-auto">
                <slot />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const navLinks: { name: string; path: string }[] = [
    { name: "About Us", path: "/about-us" },
    { name: "Jobs", path: "/jobs" },
    { name: "Companies", path: "/companies" },
];

const route = useRoute();
const isOpen = ref(false);

useHead({
    title: `${"CareerLane"}`,
    // meta: [
    //     { name: 'description', content: '' }
    // ],
});

const user = useUser();
</script>

<style></style>
