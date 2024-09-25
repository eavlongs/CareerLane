<template>
    <UCard class="w-[90%] sm:w-[370px] md:w-[400px] bg-white p-4 shadow-lg">
        <p class="font-bold text-2xl text-center mb-8">Reset Password</p>

        <!-- Form for resetting the password -->
        <UForm
            :schema="schema"
            @submit.prevent="changePassword"
            class="grid gap-4"
            method="post"
            :state="state"
        >
            <!-- Email input field -->
            <UFormGroup label="Old Password" name="old_password">
                <UInput v-model="state.old_password" placeholder="*********" />
            </UFormGroup>

            <UFormGroup label="New Password" name="new_password">
                <UInput v-model="state.new_password" placeholder="*********" />
            </UFormGroup>

            <UFormGroup
                label="New Confirm Password"
                name="new_confirm_password"
            >
                <UInput
                    v-model="state.new_confirm_password"
                    placeholder="*********"
                />
            </UFormGroup>

            <!-- Submit button -->
            <UButton type="submit" class="block mx-auto mt-5" size="lg">
                Change Password
            </UButton>
        </UForm>
    </UCard>
</template>

<script lang="ts" setup>
// Define the validation schema

const state = reactive({
    old_password: undefined,
    new_password: undefined,
    new_confirm_password: undefined,
});

const runTimeConfig = useRuntimeConfig();
async function changePassword() {
    const response = await $fetch<{
        success: boolean;
        message: string;
    }>("http://localhost:8000/api/change-password", {
        method: "POST",
        body: JSON.stringify({
            old_password: state.old_password,
            new_password: state.new_password,
            new_confirm_password: state.new_confirm_password,
        }),
        credentials: "include",
    });

    if (response.success) {
        alert("Your Password has been change");
        navigateTo("/");
    } else {
        alert(response.message || "Failed to send change the password.");
    }
}
</script>

<style></style>
