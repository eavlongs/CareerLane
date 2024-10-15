<template>
    <Dialog :title="guardDialogMessage" :titleOnly="true" :modelValue="isGuardDialogOpen"
      @update:model-value="_ => guardDialogType = GuardType.NONE" @submit="submit"
      :submitButtonText="submitButtonText" />
</template>

<script lang="ts" setup>
const { guardDialogType } = useGuard()
const isGuardDialogOpen = computed(() => guardDialogType.value !== 0)

const guardDialogMessage = ref('')
const submitButtonText = ref('')

watch(guardDialogType, () => {
    if (guardDialogType.value !== GuardType.NONE) {
        switch (guardDialogType.value) {
            case GuardType.NOT_LOGGED_IN:
                guardDialogMessage.value = 'Please sign in to continue'
                submitButtonText.value = 'Sign in'
                break
            case GuardType.NOT_NORMAL_USER:
                guardDialogMessage.value = "This action can only be performed on jobseeker account"
                submitButtonText.value = 'Log out'
                break
        }
    }
})

const submit = () => {
    switch (guardDialogType.value) {
        case GuardType.NOT_LOGGED_IN:
            navigateTo("/login")
            break
        case GuardType.NOT_NORMAL_USER:
            logOut()
            break
    }

    guardDialogType.value = GuardType.NONE
}

</script>

<style></style>