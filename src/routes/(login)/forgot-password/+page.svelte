<script>
  import Button from "$lib/components/Button.svelte";
  import Buttons from "$lib/components/Buttons.svelte";
  import Content from "$lib/components/Content.svelte";
  import Field from "$lib/components/Field.svelte";
  import Form from "$lib/components/Form.svelte";
  import Title from "$lib/components/Title.svelte";
</script>

<Title back href="/login" title="Forgot Password" />

<Form>
  <Field label="Email" --cols={2} type="email" />
</Form>

<Content>
  <p>A 4 digit OTP will be send to your provided email, if entered email is correct.</p>
</Content>

<Buttons --gap="25px">
  <Button name="Send OTP" icon="ri:send-plane-line" type="secondary" href="/forgot-password/reset-password" />
</Buttons>