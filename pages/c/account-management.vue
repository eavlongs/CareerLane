<template>
    <PageWrapper>
        <div class="grid grid-cols-4 gap-x-6 items-start">
            <UVerticalNavigation :links="links" :ui="{
                padding: 'px-5 py-4',
                size: 'text-base',
                wrapper: 'relative bg-white p-2 h-auto rounded-md shadow-sm dark:bg-gray-800',
                base: 'group relative flex items-center gap-1.5 gap-y-4 focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-1 focus-visible:before:ring-primary-500 dark:focus-visible:before:ring-primary-400 before:absolute before:inset-px before:rounded-md disabled:cursor-not-allowed disabled:opacity-75',
                active: '',
            }">
                <template #default="{ link }">
                    <span class="group-hover:text-primary relative">{{ link.label }}</span>
                </template>
            </UVerticalNavigation>

            <div class="section col-span-3 flex flex-col gap-y-8">
                <ListSection :title="links[0].label" :id="links[0].to.replace('#', '')">
                    <p class="mb-4 text-sm">If you want to change your password, click the button below.</p>
                    <UButton to="/change-password" size="md" target="_blank">Change Password</UButton>
                </ListSection>

                <ListSection :title="links[1].label" :id="links[1].to.replace('#', '')">
                    <p class="mb-4 text-sm">If you want to link your account, click any of the following buttons.</p>
                    <div class="flex gap-x-2">
                        <template v-for="provider in linkWithProviders" :key="provider.name">
                            <a :href="provider.href">
                                <UButton :variant="provider.linked ? 'outline' : 'solid'" color="white"
                                  :disabled="provider.linked" :class="{
                                    'cursor-not-allowed': provider.linked
                                }">
                                    <img :src="provider.logo" :alt="`${provider.name} Logo`"
                                      class="w-4 aspect-square" />
                                    {{ provider.name }}
                                </UButton>
                            </a>
                        </template>
                    </div>
                </ListSection>

                <ListSection :title="links[2].label" :id="links[2].to.replace('#', '')">
                    <p class="mb-4 text-sm">If you want to delete your account, click the button below.</p>
                    <UButton color="red" @click="deleteAccountDialogOpen = true" size="md">
                        Delete Account
                    </UButton>

                    <DeleteAccountDialog v-model="deleteAccountDialogOpen"
                      @success="value => toastSuccessMessage(toast, value)"
                      @error="value => toastErrorMessage(toast, value)" />

                </ListSection>
            </div>
        </div>
    </PageWrapper>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: "company-layout"
})

const route = useRoute()
const toast = useToast()

const links = [{
    label: 'Change Password',
    to: '#change-password'
}, {
    label: 'Link Accounts',
    to: '#link-accounts'
}, {
    label: 'Delete Account',
    to: '#delete-account'
}]

const user = useUser()

const linkWithProviders: {
    name: string;
    logo: string;
    href: string;
    linked: boolean;
}[] = [
        {
            name: 'Google',
            logo: '/google-logo.svg',
            href: '/login/google',
            linked: user.value?.providers_linked ? user.value.providers_linked.includes(ProviderTypeEnum.GOOGLE) : false
        },
        {
            name: 'Facebook',
            logo: '/facebook-logo.svg',
            href: '/login/facebook',
            linked: user.value?.providers_linked ? user.value.providers_linked.includes(ProviderTypeEnum.FACEBOOK) : false
        },
        {
            name: 'Github',
            logo: '/github-logo.svg',
            href: '/login/github',
            linked: user.value?.providers_linked ? user.value.providers_linked.includes(ProviderTypeEnum.GITHUB) : false
        }
    ]

const deleteAccountDialogOpen = ref(false)

onMounted(async () => {
    if (route.query.link_type !== undefined && route.query.link_message !== undefined) {
        if (route.query.link_type === '1') {
            toastSuccessMessage(toast, route.query.link_message as string)
        } else {
            toastErrorMessage(toast, route.query.link_message as string)
        }


        await navigateTo({ query: {}, replace: true })

    }
})
</script>
